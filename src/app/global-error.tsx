"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// global-error replaces the root layout, so globals.css, Tailwind and the
// site fonts are not guaranteed to be loaded here. Everything is styled
// inline with the rvector palette (navy #162640 / cyan #23C4E1 / orange #FB5E01).
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const mono =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  const sans =
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          boxSizing: "border-box",
          backgroundColor: "#070e1b",
          backgroundImage:
            "radial-gradient(rgba(148, 197, 233, 0.13) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "#f1f5f9",
          fontFamily: sans,
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: 480,
            boxSizing: "border-box",
            padding: "32px 24px",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(13, 24, 41, 0.92)",
            textAlign: "center",
          }}
        >
          <img
            src="/Assets/Logos/rvector/rvector_beaver.png"
            alt="rvector logo"
            width={88}
            height={82}
            style={{ display: "block", margin: "0 auto 20px" }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#45cfe9",
            }}
          >
            rvector.dev / Error
          </p>
          <h1
            style={{
              margin: "14px 0 10px",
              fontSize: 28,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.6,
              color: "#cbd5e1",
            }}
          >
            An unexpected error occurred while loading this page. Please try
            again.
          </p>
          {error.digest && (
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: mono,
                fontSize: 12,
                color: "#94a3b8",
                wordBreak: "break-all",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 24px",
                borderRadius: 9999,
                border: "none",
                backgroundColor: "#fb5e01",
                color: "#ffffff",
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload page
            </button>
            {/* Plain anchor on purpose: the router may be broken here */}
            <a
              href="/"
              style={{
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
