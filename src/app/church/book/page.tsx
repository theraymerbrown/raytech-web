import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a short call | Raytech Services",
  description: "Schedule a short church-tech consult with Adam Raymer-Brown.",
};

/** Swap this for the real Calendly / HubSpot / Bookings URL when live */
const REAL_BOOKING_URL: string | null = null;

export default function ChurchBookPage() {
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
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "3rem 1.35rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.35rem", fontWeight: 700 }}>Raytech</div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(28,25,21,0.55)", marginTop: "0.2rem" }}>
            Services
          </div>
        </header>

        <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.85rem", marginBottom: "0.75rem" }}>
          Book a short call
        </h1>
        <p style={{ marginBottom: "1.25rem", color: "rgba(28,25,21,0.75)" }}>
          A brief consult about your church tech notes — no pressure, no price menu on this page.
        </p>

        {REAL_BOOKING_URL ? (
          <p>
            <a href={REAL_BOOKING_URL} style={{ color: "#2f6f9f", fontWeight: 700, fontSize: "1.1rem" }}>
              Open the booking calendar →
            </a>
          </p>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #d9d2c3", borderRadius: 12, padding: "1.25rem" }}>
            <p style={{ marginTop: 0, fontWeight: 700 }}>Calendar link coming online</p>
            <p style={{ color: "rgba(28,25,21,0.72)" }}>
              Meanwhile, email{" "}
              <a href="mailto:services@raytech.co?subject=Church%20tech%20consult%20(journal)" style={{ color: "#2f6f9f", fontWeight: 700 }}>
                services@raytech.co
              </a>{" "}
              with a couple times that work, and Adam will confirm.
            </p>
          </div>
        )}

        <footer style={{ marginTop: "2.5rem", paddingTop: "1.25rem", borderTop: "1px solid #d9d2c3" }}>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(28,25,21,0.72)" }}>
            Want more resources?{" "}
            <Link href="/church" style={{ color: "#2f6f9f", fontWeight: 700 }}>
              raytech.co/church
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
