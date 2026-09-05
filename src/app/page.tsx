"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import SimulationBanner from "@/components/SimulationBanner";

declare global {
  interface Window {
    Razorpay: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const PRODUCT_ID = 1;
const QUANTITY = 1;
const CASE_ID = 3;


export default function Home() {
  const [query, setQuery] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentMessage, setAgentMessage] = useState("");
  const [recommendation, setRecommendation] = useState<any>(null);
  const [crossSell, setCrossSell] = useState<any>(null);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [remainingBalance, setRemainingBalance] = useState<number | null>(
    null
  );
  const [includeCase, setIncludeCase] = useState(false);
  useEffect(() => {
    async function loadWallet() {
      try {
        const response = await fetch("/api/wallet/test?userId=1");
        const data = await response.json();
  
        if (data.success) {
          setWalletBalance(data.walletBalance);
        }
      } catch (error) {
        console.error("Wallet load error:", error);
      }
    }
  
    loadWallet();
  }, []);

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      setAgentMessage(
        "Voice input is not supported in this browser. Please use Chrome."
      );
      return;
    }
  
    const recognition = new SpeechRecognition();
  
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
  
    recognition.onstart = () => {
      setListening(true);
    };
  
    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setQuery(spokenText);
    };
  
    recognition.onerror = () => {
      setAgentMessage("I couldn't hear you. Please try again.");
      setListening(false);
    };
  
    recognition.onend = () => {
      setListening(false);
    };
  
    recognition.start();
  }
  async function askAgent() {
    try {
      setAgentLoading(true);
      setAgentMessage("");
  
      const response = await fetch("/api/agent/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          message: query,
        }),
      });
  
      const data = await response.json();
  
      if (!data.success) {
        throw new Error(data.error || "Unable to get AI recommendation.");
      }
  
      setAgentMessage(data.message);
      setRecommendation(data.recommendations?.[0] || null);
      setCrossSell(data.crossSell || null);
      console.log("Niza recommendation:", data.recommendations?.[0]);
    } catch (error) {
      setAgentMessage(
        error instanceof Error
          ? error.message
          : "Unable to get AI recommendation."
      );
    } finally {
      setAgentLoading(false);
    }
  }
  async function startPayment() {
    try {
      setLoading(true);
      setMessage("");

      // Ask our server to create the payment order.
      // The server gets the real product price from the database.
      const orderResponse = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: recommendation?.id || PRODUCT_ID,
          quantity: QUANTITY,
          userId: 1,
          includeCase,
          caseProductId: crossSell?.id,
        }),
      });

      const data = await orderResponse.json();

      if (!data.success) {
        throw new Error(data.error || "Unable to create test order.");
      }

      setWalletBalance(data.wallet.balance);
      setRemainingBalance(data.wallet.remainingAfterPurchase);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SafeShop AI",
        description: `${data.product.name} — TEST MODE`,
        order_id: data.order.id,

        handler: async function (response: any) {
          setMessage("Verifying test payment...");

          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: 1,
              productId: recommendation?.id || PRODUCT_ID,
              quantity: QUANTITY,
              includeCase,
              caseProductId: crossSell?.id,
              orderId: data.order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verification = await verifyResponse.json();

          if (verification.success) {
            setWalletBalance(verification.purchase.walletBalanceAfter);
            setRemainingBalance(
              verification.purchase.walletBalanceAfter
            );

            setMessage(
              `Purchase successful in TEST MODE. ${verification.purchase.product.name} purchased for ₹${verification.purchase.totalAmount}.`
            );
          } else {
            setMessage(
              verification.error || "Payment verification failed."
            );
          }
        },

        modal: {
          ondismiss: function () {
            setMessage("Payment window closed. No purchase was completed.");
          },
        },

        theme: {
          color: "#111827",
        },
      };

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout has not loaded yet. Please try again."
        );
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        setMessage(
          "Test payment failed. Your SafeShop AI Wallet was not deducted."
        );
      });

      razorpay.open();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="flex min-h-screen flex-col bg-zinc-50">
        <SimulationBanner />

        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Razorpay AI Buildathon 2026 · Track 1
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
            SafeShop AI
          </h1>

          <p className="text-lg leading-7 text-zinc-600">
            Your trusted AI shopping agent with a separate
            test wallet.
          </p>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
  <p className="text-sm font-medium text-zinc-500">
    WHAT ARE YOU LOOKING FOR?
  </p>

  <div className="mt-3 flex gap-2">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Example: headphones under ₹3000 with good battery life"
      className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-500"
    />
    <button
      type="button"
      onClick={startListening}
      className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-lg hover:bg-zinc-50"
      title="Speak to Niza"
    >
      {listening ? "🔴" : "🎙️"}
    </button>
    <button
      onClick={askAgent}
      disabled={agentLoading || !query.trim()}
      className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
    >
      {agentLoading ? "Thinking..." : "Ask Niza"}
    </button>
  </div>

  {agentMessage && (
    <div className="mt-4 rounded-lg bg-zinc-100 p-4 text-sm text-zinc-700">
      {agentMessage}
    </div>
  )}
</div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  AI WALLET
                </p>

                <p className="mt-1 text-2xl font-semibold text-zinc-950">
                  {walletBalance !== null
                    ? `₹${walletBalance}`
                    : "Loading..."}
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                TEST WALLET
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              No real money. Separate from your personal bank
              account.
            </p>
            <div className="mt-4 flex gap-2">
  <input
    type="number"
    min="1"
    placeholder="Amount"
    id="testFundAmount"
    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
  />

  <button
    onClick={async () => {
      const input = document.getElementById(
        "testFundAmount"
      ) as HTMLInputElement;

      const amount = Number(input.value);

      if (!amount || amount <= 0) {
        alert("Enter a valid test amount.");
        return;
      }

      const response = await fetch("/api/wallet/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          amount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Unable to add test funds.");
        return;
      }

      setWalletBalance(data.walletBalance);
      input.value = "";
    }}
    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
  >
    Add Test Funds
  </button>
</div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              AI RECOMMENDATION
            </p>
            {recommendation?.imageUrl ? (
              <img
                src={recommendation.imageUrl}
                alt={recommendation.name}
                className="mt-4 h-64 w-full rounded-xl object-contain bg-zinc-50"
              />
            ) : recommendation?.name ? (
              <div className="mt-4 flex h-64 w-full items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-400">
                Product image unavailable
              </div>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
              {recommendation?.name || "Suitable Product"}
            </h2>

            <p className="mt-2 text-zinc-600">
              {recommendation?.description || "No description available."}
            </p>
           
            {crossSell && !includeCase && (
  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
    <p className="text-sm font-semibold text-zinc-900">
      Recommended add-on
    </p>

    <p className="mt-1 text-sm text-zinc-600">
      {crossSell.name} — ₹{crossSell.price}
    </p>

    <p className="mt-1 text-xs text-zinc-500">
      {crossSell.reason}
    </p>

    <div className="mt-3 flex gap-2">
      <button
        onClick={() => setIncludeCase(true)}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      >
        Yes, add it
      </button>

      <button
        onClick={() => setCrossSell(null)}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
      >
        No thanks
      </button>
    </div>
  </div>
)}
            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-zinc-500">
                Price
              </span>

              <span className="text-xl font-semibold text-zinc-950">
                ₹{recommendation?.price || 2499}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-500">
                After purchase
              </span>

              <span className="font-medium text-zinc-700">
                {remainingBalance !== null
                  ? `₹${remainingBalance}`
                  : "₹1703"}
              </span>
            </div>

            <button
  onClick={startPayment}
  disabled={loading}
  className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white disabled:opacity-50"
>
  {loading
    ? "Creating Test Order..."
    : `Approve & Pay ₹${
        (recommendation?.price || 0) +
        (includeCase && crossSell ? crossSell.price : 0)
      }`}
</button>

            {message && (
              <div className="mt-4 rounded-lg bg-zinc-100 p-4 text-sm text-zinc-700">
                {message}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-zinc-400">
            TEST / SIMULATION ONLY — No real money or real
            financial transactions.
          </p>
        </main>
      </div>
    </>
  );
}