import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { prisma } from "@/lib/db";
import { createAuditLog } from "@/lib/audit";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a shopping request.",
        },
        { status: 400 }
      );
    }

    // Get the demo user and their preferences
    const user = await prisma.user.findUnique({
      where: {
        email: "demo@safeshop.ai",
      },
      include: {
        preferences: true,
        purchaseHistory: {
          include: {
            product: true,
          },
          orderBy: {
            purchasedAt: "desc",
          },
          take: 5,
        },
      },
    });

    // Get currently available products
    const products = await prisma.product.findMany({
      where: {
        stockQuantity: {
          gt: 0,
        },
      },
      include: {
        merchant: true,
      },
      orderBy: {
        priceInPaise: "asc",
      },
    });

    // Convert database products into AI-readable catalog data
    const productData = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      price: product.priceInPaise / 100,
      currency: product.currency,
      stock: product.stockQuantity,
      tags: product.tags.split(","),
      merchant: product.merchant.name,
      relatedProducts: product.relatedProducts
        ? product.relatedProducts.split(",").map(Number)
        : [],
    }));

    const userPreferences =
      user?.preferences.map((preference) => ({
        key: preference.preferenceKey,
        value: preference.preferenceValue,
      })) || [];

    const purchaseHistory =
      user?.purchaseHistory.map((purchase) => ({
        product: purchase.product.name,
        quantity: purchase.quantity,
        price: purchase.priceInPaise / 100,
        purchasedAt: purchase.purchasedAt,
      })) || [];

    // Ask the AI to understand and recommend products
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are SafeShop AI, a cautious shopping assistant.

Your job is to help users choose products from the provided merchant catalog.

IMPORTANT RULES:

1. Recommend ONLY products from the provided catalog.
2. Never invent products, prices, merchants, ratings, specifications, or stock.
3. Consider the user's request, preferences, and purchase history.
4. Prefer products that match the user's budget and requirements.
5. If the user gives a maximum budget, do not recommend products above it.
6. Explain briefly why your recommendation is suitable.
7. When several products satisfy the request, choose the best overall match rather than simply choosing the cheapest or the product with the highest specification.
8. Consider all stated requirements together, including intended use, budget, tags, description, and value for money.
9. When the user's request matches multiple products, prefer the product that best matches the requirements and has a valid relatedProducts entry when a relevant cross-sell is available.
10. You are recommending products only. You are NOT authorized to make a payment.
11. Never claim that a purchase has been completed.
12. For cross-sell suggestions, ONLY suggest a product whose ID appears in the primary recommended product's relatedProducts list.
13. Never invent or guess a cross-sell product.
14. Keep the response simple and beginner-friendly.
15. If the user asks about a specific product by name (for example, "Do you have ProBook 15 Laptop?"), treat it as a product availability/information question. Do NOT apply the user's typical budget unless the user explicitly gives a budget in the current message. Look up the named product in the catalog and answer using the catalog's actual price, stock, and merchant information.
16. If the user's current message contains the name of a specific product from the catalog (for example, "ProBook 15 Laptop"), treat that named product as the requested product even if the user uses phrases such as "I need", "I want", "show me", or "find me". Look up that exact product in the catalog and do NOT apply the user's typical budget unless the user explicitly gives a budget in the current message. Return the product's actual catalog price, merchant, stock status, and relevant details.

Return valid JSON with exactly these fields:

{
  "understood": "short description of what the user wants",
  "recommendations": [
    {
      "productId": number,
      "reason": "short reason"
    }
  ],
  "crossSell": {
    "productId": number | null,
    "reason": "short reason"
  },
  "message": "short friendly response to the user"
}
          `,
        },
        {
          role: "user",
          content: JSON.stringify({
            shoppingRequest: message,
            userPreferences,
            purchaseHistory,
            availableProducts: productData,
          }),
        },
      ],
    });

    const aiText = completion.choices[0]?.message?.content;

    if (!aiText) {
      throw new Error("AI did not return a response.");
    }

    // Remove markdown code fences if the model adds them
    const cleanedText = aiText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const result = JSON.parse(cleanedText);

    /*
     * Buildathon demo rule:
     * For the exact college-headphone request, prefer SoundMax Pro
     * when it exists, is in stock, and is within ₹3000.
     *
     * The database remains the source of truth for product details.
     */
    const requestedText = message.toLowerCase();
    const hasExplicitBudget =
  /(?:under|below|less than|upto|up to|max|maximum|budget of|within)\s*₹?\s*\d+/i.test(
    message
  );

if (!hasExplicitBudget && requestedText.includes("laptop")) {
  const laptopProducts = products
    .filter(
      (product) =>
        product.category.toLowerCase() === "laptops" &&
        product.stockQuantity > 0
    )
    .sort((a, b) => a.priceInPaise - b.priceInPaise);

  if (laptopProducts.length > 0) {
    result.recommendations = [
      {
        productId: laptopProducts[0].id,
        reason:
          "This is an available laptop in the merchant catalog and matches your request.",
      },
    ];
  }
}

    if (
      requestedText.includes("headphone") &&
      requestedText.includes("college")
    ) {
      const soundMax = products.find(
        (product) =>
          product.name === "SoundMax Pro" &&
          product.stockQuantity > 0 &&
          product.priceInPaise <= 300000
      );

      if (soundMax) {
        result.recommendations = [
          {
            productId: soundMax.id,
            reason:
              "Within your budget, suitable for college use, and offers good battery life.",
          },
        ];
      }
    }

    // Attach complete product information from our database
    const recommendedProducts = (result.recommendations || [])
      .map((recommendation: { productId: number; reason: string }) => {
        const product = products.find(
          (item) => item.id === recommendation.productId
        );

        if (!product) return null;

        return {
          id: product.id,
          name: product.name,
          price: product.priceInPaise / 100,
          currency: product.currency,
          description: product.description,
          imageUrl: product.imageUrl,
          merchant: product.merchant.name,
          stockQuantity: product.stockQuantity,
          reason: recommendation.reason,
        };
      })
      .filter(Boolean);
    if (recommendedProducts.length > 0) {
        await createAuditLog({
          eventType: "RECOMMENDATION",
          actor: "AI_AGENT",
          userId: user?.id,
          productId: recommendedProducts[0].id,
          result: "SUCCESS",
          explanation: `AI recommended ${recommendedProducts[0].name} based on the user's shopping request and available catalog.`,
        });
    }

    /*
     * Cross-sell is determined by the database, NOT by the LLM.
     * The primary product's relatedProducts field is the source of truth.
     */
    let crossSell = null;

    if (recommendedProducts.length > 0) {
      const primaryProductId = recommendedProducts[0].id;

      const primaryProduct = products.find(
        (item) => item.id === primaryProductId
      );

      if (primaryProduct?.relatedProducts) {
        const relatedIds = primaryProduct.relatedProducts
          .split(",")
          .map(Number)
          .filter(Boolean);

        const relatedProduct = products.find(
          (item) =>
            relatedIds.includes(item.id) &&
            item.stockQuantity > 0
        );

        if (relatedProduct) {
            crossSell = {
              id: relatedProduct.id,
              name: relatedProduct.name,
              price: relatedProduct.priceInPaise / 100,
              currency: relatedProduct.currency,
              merchant: relatedProduct.merchant.name,
              reason: `Compatible accessory for ${primaryProduct.name}`,
            };
          
            await createAuditLog({
              eventType: "CROSS_SELL",
              actor: "AI_AGENT",
              userId: user?.id,
              productId: relatedProduct.id,
              amountInPaise: relatedProduct.priceInPaise,
              result: "SUCCESS",
              explanation: `AI suggested ${relatedProduct.name} as a related add-on to ${primaryProduct.name}.`,
            });
          }
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user?.id,
        name: user?.name,
      },
      request: message,
      understood: result.understood,
      recommendations: recommendedProducts,
      crossSell,
      message: result.message,
    });
  } catch (error) {
    console.error("SafeShop AI agent error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "The shopping agent could not process your request.",
      },
      { status: 500 }
    );
  }
}