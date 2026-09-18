import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 12-Week Tech Journal — $7 Pilot | Raytech Services",
  description:
    "Get church tech out of your head — from scattered notes to one written place. $7 digital pilot.",
};

export default function ChurchJournalPage() {
  return (
    <main
      style={{
        fontFamily: '"Source Sans 3", system-ui, sans-serif',
        background: "#f3efe6",
        color: "#1c1915",
        minHeight: "100vh",
        lineHeight: 1.55,
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "2.5rem 1.25rem 3.5rem" }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.75rem",
          }}
        >
          Raytech Services
        </div>
        <div
          style={{
            display: "inline-block",
            background: "rgba(181,106,74,0.14)",
            color: "#b56a4a",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "0.35rem 0.7rem",
            borderRadius: 999,
            marginBottom: "1.5rem",
          }}
        >
          Pilot Edition · Digital
        </div>
        <h1
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(1.85rem, 5vw, 2.35rem)",
            lineHeight: 1.15,
            marginBottom: "0.65rem",
            fontWeight: 700,
          }}
        >
          The 12-Week Tech Journal
        </h1>
        <p
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontStyle: "italic",
            color: "rgba(28,25,21,0.62)",
            fontSize: "1.05rem",
            marginBottom: "1.25rem",
          }}
        >
          Get church tech out of your head — from scattered notes to one written place.
        </p>
        <ul style={{ margin: "1rem 0 1.5rem 1.1rem" }}>
          <li style={{ margin: "0.4rem 0" }}>Write it down only — you don’t fix anything in this book</li>
          <li style={{ margin: "0.4rem 0" }}>About 20 minutes a week for 12 weeks</li>
          <li style={{ margin: "0.4rem 0" }}>“I don’t know” is a good answer</li>
          <li style={{ margin: "0.4rem 0" }}>Pilot thank-you: free print when the final edition ships</li>
        </ul>
        <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "2rem", fontWeight: 700, margin: "1.25rem 0 0.35rem" }}>
          $7{" "}
          <span style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(28,25,21,0.62)", fontFamily: '"Source Sans 3", sans-serif' }}>
            digital download
          </span>
        </p>
        <p style={{ fontSize: "0.92rem", color: "rgba(28,25,21,0.62)", marginBottom: "1.5rem" }}>
          Pay $7 (PayPal, Venmo, or X Money → <strong>@theraymerbrown</strong>). Put your{" "}
          <strong>church name + email</strong> in the payment note. Then open{" "}
          <strong>raytech.co/church/thanks</strong> for your download.{" "}
          <em>X Money: X app → Send → @theraymerbrown → $7.</em>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", margin: "1.25rem 0" }}>
          <a
            href="https://www.paypal.com/paypalme/adamraymer826/7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 700,
              padding: "0.95rem 1rem",
              borderRadius: 10,
              background: "#1c1915",
              color: "#f3efe6",
            }}
          >
            Pay $7 with PayPal
          </a>
          <a
            href="https://venmo.com/u/adam-raymer-brown?txn=pay&amount=7&note=12-Week%20Tech%20Journal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 700,
              padding: "0.95rem 1rem",
              borderRadius: 10,
              border: "1.5px solid #008CFF",
              color: "#008CFF",
              background: "#fff",
            }}
          >
            Pay $7 with Venmo · @adam-raymer-brown
          </a>
          <a
            href="https://x.com/theraymerbrown"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 700,
              padding: "0.95rem 1rem",
              borderRadius: 10,
              border: "1.5px solid #2f6f9f",
              color: "#2f6f9f",
              background: "#fff",
            }}
          >
            Pay $7 with X Money · @theraymerbrown
          </a>
        </div>
        <div
          style={{
            background: "#e8e2d4",
            borderRadius: 10,
            padding: "1.1rem 1.2rem",
            marginTop: "1.5rem",
            fontSize: "0.95rem",
            borderLeft: "3px solid #b56a4a",
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.35rem" }}>After you pay</strong>
          Open{" "}
          <Link href="/church/thanks" style={{ color: "#2f6f9f", fontWeight: 700 }}>
            raytech.co/church/thanks
          </Link>{" "}
          to download your journal PDF.
        </div>
        <p style={{ marginTop: "1.35rem", fontSize: "0.92rem", color: "rgba(28,25,21,0.62)" }}>
          Gift for a church office? Pay $7 and put their email in the note, or just tell Adam and he’ll send it.
        </p>
        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #d9d2c3",
            fontSize: "0.85rem",
            color: "rgba(28,25,21,0.62)",
          }}
        >
          <p>
            Write it down. Serve well.
            <br />
            Adam Raymer-Brown · Raytech Services ·{" "}
            <a href="https://raytech.co" style={{ color: "#2f6f9f" }}>
              raytech.co
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
