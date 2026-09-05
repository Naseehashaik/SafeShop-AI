"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";

type AuditLog = {
  id: number;
  timestamp: string;
  eventType: string;
  actor: string;
  userId: number | null;
  productId: number | null;
  amountInPaise: number | null;
  referenceId: string | null;
  result: string;
  explanation: string;
};

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAuditLogs() {
      try {
        const response = await fetch("/api/audit");

        if (!response.ok) {
          throw new Error("Unable to load audit trail.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Unable to load audit trail.");
        }

        setLogs(data.logs);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load audit trail."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAuditLogs();
  }, []);

  return (
    <> 
    <Navigation current="audit" />
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#f7f8fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "#fff3cd",
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: "#856404",
            }}
          >
            TEST / SIMULATION ONLY
          </div>

          <h1
            style={{
              fontSize: "36px",
              margin: "0 0 8px",
              color: "#111111",
              fontWeight: "700",
            }}
          >
            🔐 Audit Trail
          </h1>

          <p
            style={{
              margin: 0,
              color: "#333",
              fontSize: "16px",
            }}
          >
            Transparent record of AI shopping and wallet actions.
          </p>
        </div>

        {loading && (
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            Loading audit events...
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              padding: "20px",
              borderRadius: "12px",
              color: "#a00000",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && logs.length === 0 && (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            No audit events yet.
          </div>
        )}

        {!loading &&
          !error &&
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#444",
                      marginBottom: "6px",
                    }}
                  >
                    {new Date(log.timestamp).toLocaleString()}
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      color:"#111"
                    }}
                  >
                    {log.eventType}
                  </h2>
                </div>

                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background:
                      log.result === "SUCCESS"
                        ? "#e7f7ed"
                        : "#ffe5e5",
                    color:
                      log.result === "SUCCESS"
                        ? "#147a3d"
                        : "#a00000",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  {log.result}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <Info label="Actor" value={log.actor} />

                <Info
                    label="Amount"
                    value={
                        log.amountInPaise !== null
                        ? `₹${log.amountInPaise / 100}`
                        : "—"
                    }
                />

                <Info
                  label="User ID"
                  value={log.userId?.toString() || "—"}
                />

                <Info
                  label="Product ID"
                  value={log.productId?.toString() || "—"}
                />

                <Info
                  label="Reference"
                  value={log.referenceId || "—"}
                />
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "#f7f8fa",
                  borderRadius: "10px",
                }}
              >
                <strong style={{
                    color: "#111111",
                    fontSize: "16px",
                    fontWeight: "700",
                  }} 
                >
                  Why this happened
                </strong>

                <p
                  style={{
                    margin: "8px 0 0",
                    color: "#333",
                    lineHeight: 1.5,
                  }}
                >
                  {log.explanation}
                </p>
              </div>
            </div>
          ))}
      </div>
      </main>
  </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "12px",
        background: "#f7f8fa",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#777",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: "bold",
          color: "#111",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}