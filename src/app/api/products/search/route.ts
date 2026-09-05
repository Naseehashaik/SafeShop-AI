import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const maxPrice = Number(searchParams.get("maxPrice") || 0);
    const category = searchParams.get("category")?.trim() || "";

    const where: any = {
      stockQuantity: {
        gt: 0,
      },
    };

    // Search product name, description, category, or tags
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { category: { contains: q } },
        { tags: { contains: q } },
      ];
    }

    // Maximum price in rupees
    if (maxPrice > 0) {
      where.priceInPaise = {
        lte: Math.round(maxPrice * 100),
      };
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        merchant: true,
      },
      orderBy: {
        priceInPaise: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      query: q,
      count: products.length,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.priceInPaise / 100,
        currency: "INR",
        stockQuantity: product.stockQuantity,
        tags: product.tags?.split(",") || [],
        merchant: {
          id: product.merchant.id,
          name: product.merchant.name,
          slug: product.merchant.slug,
        },
      })),
    });
  } catch (error) {
    console.error("Product search error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to search products",
      },
      { status: 500 }
    );
  }
}