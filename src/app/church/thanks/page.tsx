import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you — The 12-Week Tech Journal | Raytech Services",
  description: "Download your 12-Week Tech Journal Pilot Edition PDF.",
};

export default function ChurchThanksPage() {
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
        <h1
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(1.7rem, 4.5vw, 2.1rem)",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
            fontWeight: 700,
          }}
        >
          Thank you — here’s your journal
        </h1>
        <p style={{ color: "rgba(28,25,21,0.62)", marginBottom: "1.5rem" }}>
          If you just paid $7, you’re in the right place. Download the Pilot Edition, fill it on your
          computer or print it — about 20 minutes a week.
        </p>
        <a
          href="/church/12-week-tech-journal-pilot.pdf"
          download
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            fontWeight: 700,
            padding: "1rem 1.1rem",
            borderRadius: 10,
            background: "#1c1915",
            color: "#f3efe6",
            margin: "1.25rem 0",
          }}
        >
          Download the PDF
        </a>
        <div
          style={{
            background: "#e8e2d4",
            borderRadius: 10,
            padding: "1.2rem 1.25rem",
            margin: "1.25rem 0",
            borderLeft: "3px solid #b56a4a",
          }}
        >
          <strong>How to use it</strong>
          <ol style={{ margin: "0.6rem 0 0 1.1rem" }}>
            <li style={{ margin: "0.35rem 0" }}>
              Open in Adobe Acrobat, Preview, or Edge — type in the blanks \(AcroForm fillable\) or print and write.
            </li>
            <li style={{ margin: "0.35rem 0" }}>Same day each week helps. “I don’t know” is a good answer.</li>
            <li style={{ margin: "0.35rem 0" }}>Never write real passwords in the book — only where they live.</li>
          </ol>
        </div>
        <div style={{ marginTop: "1.75rem" }}>
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
            Didn’t pay yet?
          </h2>
          <p style={{ fontSize: "0.92rem", color: "rgba(28,25,21,0.62)" }}>
            Go back to <Link href="/church" style={{ color: "#2f6f9f" }}>raytech.co/church</Link> and pay $7
            (PayPal, Venmo, or X Money @theraymerbrown). This page is honor-system for the pilot.
          </p>
        </div>
        <div style={{ marginTop: "1.75rem" }}>
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
            When you’re done (or stuck)
          </h2>
          <p style={{ fontSize: "0.92rem", color: "rgba(28,25,21,0.62)" }}>
            Short feedback form on <a href="https://raytech.co" style={{ color: "#2f6f9f" }}>raytech.co</a> (journal
            page). Second set of eyes later:{" "}
            <a href="mailto:services@raytech.co" style={{ color: "#2f6f9f" }}>
              services@raytech.co
            </a>
            .
          </p>
        </div>
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
            Adam Raymer-Brown · Raytech Services
          </p>
        </div>
      </div>
    </main>
  );
}
