"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  merchant: string;
  stockQuantity: number;
};

type AuditEvent = {
  id: number;
  eventType: string;
  result: string;
  amountInPaise?: number | null;
};

export default function MerchantDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const productsResponse = await fetch("/api/products/search");
        const productsData = await productsResponse.json();

        const auditResponse = await fetch("/api/audit");
        const auditData = await auditResponse.json();

        setProducts(
            (productsData.products || []).map((product: any) => ({
              id: product.id,
              name: product.name,
              price: Number(product.price || product.priceInPaise / 100 || 0),
              merchant:
                typeof product.merchant === "string"
                  ? product.merchant
                  : product.merchant?.name || "Unknown merchant",
              stockQuantity: Number(
                product.stockQuantity ?? product.stock ?? 0
              ),
            }))
          );
          setAuditEvents(auditData.logs || []);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const recommendations = auditEvents.filter(
    (event) => event.eventType === "RECOMMENDATION"
  ).length;

  const orders = auditEvents.filter(
    (event) => event.eventType === "PURCHASE" && event.result === "SUCCESS"
  ).length;

  const crossSells = auditEvents.filter(
    (event) => event.eventType === "CROSS_SELL"
  ).length;

  const simulatedGMV =
    auditEvents
      .filter(
        (event) => event.eventType === "PURCHASE" && event.result === "SUCCESS"
      )
      .reduce((total, event) => total + (event.amountInPaise || 0), 0) / 100;

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 p-8">
        <p className="text-zinc-600">Loading merchant dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-amber-700">
            DEMO / TEST DASHBOARD
          </p>

          <h1 className="mt-1 text-3xl font-bold text-zinc-950">
            Merchant Dashboard
          </h1>

          <p className="mt-2 text-zinc-600">
            See how SafeShop AI helps merchants become discoverable to AI
            buyers.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">AI Products</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{products.length}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">AI Recommendations</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{recommendations}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">AI Orders</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{orders}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Simulated GMV</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">₹{simulatedGMV}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-950">
              AI-Readable Catalog
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Products currently available to SafeShop AI
            </p>

            <div className="mt-5 space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl bg-zinc-50 p-4"
                >
                  <div>
                    <p className="font-medium text-black">
                      {product.name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {product.merchant}
                    </p>
                  </div>

                  <div className="text-right">
                  <p className="font-semibold text-zinc-900">₹{product.price}</p>
                    <p className="text-xs text-zinc-500">
                      Stock: {product.stockQuantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-950">
              AI Growth Metrics
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">
                  Cross-sell offers shown
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">{crossSells}</p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">
                  Successful AI orders
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">{orders}</p>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">
                  Catalog status
                </p>
                <p className="mt-1 font-semibold text-green-700">
                  ● Available to AI buyers
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <strong>TEST METRICS:</strong> These numbers are generated
                from the SafeShop AI demo environment and do not represent
                real merchant revenue.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}