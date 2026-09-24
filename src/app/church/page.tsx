import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 12-Week Tech Journal — $7 Pilot | Raytech Services",
  description:
    "One written place for church tech — what you have, where it is, who takes care of it, who to call. $7 digital pilot.",
};

/** Placeholder until Calendly / HubSpot / Bookings URL is live */
const BOOKING_URL = "/church/book";

const payLinkStyle = {
  flex: "1 1 0",
  minWidth: 96,
  maxWidth: 140,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: "0.35rem",
  textDecoration: "none",
  padding: "0.75rem 0.5rem",
  borderRadius: 12,
  background: "#fff",
  border: "1px solid #d9d2c3",
  color: "#1c1915",
};

function ConsultSlab() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d9d2c3",
        borderRadius: 14,
        padding: "1.75rem 1.4rem",
        margin: "2rem 0",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "1.45rem",
          fontWeight: 700,
          margin: "0 0 0.65rem",
          lineHeight: 1.25,
        }}
      >
        Hey — want a one-on-one call?
      </p>
      <p style={{ margin: "0 0 1.15rem", color: "rgba(28,25,21,0.72)", fontSize: "1rem" }}>
        If you'd rather talk than finish the book alone, book a short consult with Adam.
      </p>
      <a
        href={BOOKING_URL}
        style={{
          display: "inline-block",
          textDecoration: "none",
          background: "#2f6f9f",
          color: "#fff",
          fontWeight: 700,
          padding: "0.9rem 1.35rem",
          borderRadius: 10,
          fontSize: "1.02rem",
        }}
      >
        Book a short call
      </a>
    </div>
  );
}

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
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2.5rem 1.35rem 3.5rem" }}>
        {/* Header: wordmark only */}
        <header style={{ marginBottom: "2.25rem" }}>
          <div
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Raytech
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(28,25,21,0.55)",
              marginTop: "0.2rem",
            }}
          >
            Services · Pilot Edition
          </div>
        </header>

        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#b56a4a",
            marginBottom: "1.25rem",
            lineHeight: 1.45,
          }}
        >
          For church offices that are tired of tech living in one person's head
        </p>

        <h1
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(1.75rem, 5vw, 2.45rem)",
            lineHeight: 1.18,
            marginBottom: "1rem",
            fontWeight: 700,
          }}
        >
          Get one written place that says what you have, where it is, who takes care of it, and who to call —
          so Sunday and the office keep moving when someone is out.
        </h1>

        <p style={{ fontFamily: "Fraunces, Georgia, serif", fontStyle: "italic", color: "rgba(28,25,21,0.62)", fontSize: "1.08rem", marginBottom: "0.25rem" }}>
          About 20 minutes a week.
        </p>
        <p style={{ fontFamily: "Fraunces, Georgia, serif", fontStyle: "italic", color: "rgba(28,25,21,0.62)", fontSize: "1.08rem", marginBottom: "0.25rem" }}>
          Twelve weeks.
        </p>
        <p style={{ fontFamily: "Fraunces, Georgia, serif", fontStyle: "italic", color: "rgba(28,25,21,0.62)", fontSize: "1.08rem", marginBottom: "0.5rem" }}>
          No fixing. No jargon.
        </p>

        <a
          href="#get-journal"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            background: "#b56a4a",
            color: "#fff",
            fontWeight: 700,
            padding: "0.95rem 1.25rem",
            borderRadius: 10,
            fontSize: "1.02rem",
            margin: "1.75rem 0 0.5rem",
          }}
        >
          Get the $7 digital journal
        </a>

        <ConsultSlab />

        <section
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "1.5rem 1.35rem 1.6rem",
            margin: "0 0 2rem",
            border: "1px solid #d9d2c3",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.35rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/adam-casual.jpg"
              alt="Adam Raymer-Brown"
              width={72}
              height={72}
              style={{
                width: 72,
                height: 72,
                borderRadius: "999px",
                objectFit: "cover",
                flexShrink: 0,
                border: "2px solid #e8e2d4",
              }}
            />
            <div>
              <p style={{ margin: "0 0 0.25rem", fontWeight: 700, fontFamily: "Fraunces, Georgia, serif", fontSize: "1.15rem" }}>
                Hi — I'm Adam Raymer-Brown.
              </p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(28,25,21,0.62)" }}>
                Raytech Services
              </p>
            </div>
          </div>
          <p style={{ marginBottom: "0.85rem" }}>I've spent 20 years in IT.</p>
          <p style={{ marginBottom: "0.85rem" }}>A lot of that time has been with churches.</p>
          <p style={{ marginBottom: "0.85rem" }}>Every time I walk in, I ask the same things:</p>
          <p style={{ marginBottom: "0.35rem" }}>Where's the internet box?</p>
          <p style={{ marginBottom: "0.35rem" }}>Who has the passwords?</p>
          <p style={{ marginBottom: "0.85rem" }}>Who pays for the website?</p>
          <p style={{ marginBottom: "0.85rem" }}>Most of the time the answers live in one person's head.</p>
          <p style={{ marginBottom: "0.85rem" }}>And that person is tired of carrying it all.</p>
          <p style={{ marginBottom: 0 }}>
            This journal is for you — the part-time admin, the volunteer who "just knows," the pastor who
            wants clarity without another project.
          </p>
        </section>

        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.45rem", marginBottom: "1rem", fontWeight: 700 }}>
          When you finish, your church will have:
        </h2>
        <ul style={{ margin: "0 0 1.75rem 1.1rem", padding: 0 }}>
          <li style={{ margin: "0.55rem 0" }}>One written map of people, equipment, and accounts</li>
          <li style={{ margin: "0.55rem 0" }}>A clear note of where passwords are kept (never the passwords themselves)</li>
          <li style={{ margin: "0.55rem 0" }}>Internet, email, giving, and files named in plain language</li>
          <li style={{ margin: "0.55rem 0" }}>A one-page summary someone else can grab when you're out</li>
          <li style={{ margin: "0.55rem 0" }}>Honest blanks where you don't know yet — those are useful too</li>
        </ul>

        <p style={{ marginBottom: "0.55rem" }}>You will not fix anything in this book.</p>
        <p style={{ marginBottom: "0.55rem" }}>You're only writing down what's already there.</p>
        <p style={{ marginBottom: "0.55rem" }}>If you can fill out a permission slip, you can do this.</p>
        <p style={{ marginBottom: "1.5rem" }}>"I don't know" is a good answer.</p>

        <div
          style={{
            background: "#fff",
            borderLeft: "3px solid #b56a4a",
            borderRadius: 10,
            padding: "1.25rem 1.35rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ margin: 0, fontFamily: "Fraunces, Georgia, serif", fontSize: "1.12rem", lineHeight: 1.45 }}>
            We don't sell you a binder of tech homework.
          </p>
          <p style={{ margin: "0.85rem 0 0", lineHeight: 1.5 }}>
            We give you a calm path to get church tech out of your head and onto paper — so the church isn't one
            flu season away from chaos.
          </p>
        </div>


        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.35rem", marginBottom: "0.85rem", fontWeight: 700 }}>
          What's inside
        </h2>
        <p style={{ marginBottom: "0.55rem" }}>Twelve short weeks.</p>
        <p style={{ marginBottom: "0.85rem" }}>
          People. Equipment. Passwords (where they live). Internet. Email. Giving. Files. Bills. Backups. Access. Who to
          call. One-page summary.
        </p>
        <p style={{ marginBottom: "0.85rem" }}>
          Plus a short "where are you stuck?" path when you're ready for a second set of eyes.
        </p>
        <p style={{ marginBottom: "2rem", color: "rgba(28,25,21,0.72)" }}>
          Pilot thank-you: early reviewers get a free printed copy when the final edition ships.
        </p>

        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.35rem", marginBottom: "0.85rem", fontWeight: 700 }}>
          The digital pilot is $7.
        </h2>
        <p style={{ marginBottom: "0.55rem" }}>I'm not going to spend much more time selling it.</p>
        <p style={{ marginBottom: "0.55rem" }}>If it's useful, you'll know in the first two weeks of writing.</p>
        <p style={{ marginBottom: "2rem" }}>
          If you want help beyond the book, reach out — we'll tell you plainly whether Raytech is a fit.
        </p>

        <div id="get-journal" style={{ scrollMarginTop: "1.5rem" }}>
          <div
            style={{
              background: "#e8e2d4",
              borderRadius: 10,
              padding: "1.15rem 1.25rem",
              marginBottom: "1.25rem",
              borderLeft: "3px solid #b56a4a",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "0.45rem" }}>Step 1 — Pay $7</p>
            <p style={{ fontSize: "0.92rem", color: "rgba(28,25,21,0.72)", marginBottom: 0 }}>
              Use one of the links below. In the payment note, put your <strong>church name + email</strong>. X Money:
              open the X app → Send → <strong>@theraymerbrown</strong> → $7.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "stretch",
              gap: "0.75rem",
              margin: "0 0 1.5rem",
              flexWrap: "wrap",
            }}
          >
            <a href="https://www.paypal.com/paypalme/adamraymer826/7" target="_blank" rel="noopener noreferrer" aria-label="Pay $7 with PayPal" title="PayPal" style={payLinkStyle}>
              <span style={{ width: 44, height: 44, borderRadius: 10, background: "#003087", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.15rem", fontFamily: "system-ui, sans-serif" }}>P</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700 }}>PayPal</span>
            </a>
            <a href="https://venmo.com/u/adam-raymer-brown?txn=pay&amount=7&note=12-Week%20Tech%20Journal" target="_blank" rel="noopener noreferrer" aria-label="Pay $7 with Venmo" title="Venmo" style={payLinkStyle}>
              <span style={{ width: 44, height: 44, borderRadius: 10, background: "#008CFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.15rem", fontFamily: "system-ui, sans-serif" }}>V</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700 }}>Venmo</span>
            </a>
            <a href="https://x.com/theraymerbrown" target="_blank" rel="noopener noreferrer" aria-label="Pay $7 with X Money to @theraymerbrown" title="X Money" style={payLinkStyle}>
              <span style={{ width: 44, height: 44, borderRadius: 10, background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.2rem", fontFamily: "system-ui, sans-serif" }}>𝕏</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700 }}>X Money</span>
            </a>
          </div>

          <div
            style={{
              background: "#e4eef5",
              borderRadius: 10,
              padding: "1.15rem 1.25rem",
              borderLeft: "3px solid #2f6f9f",
              marginBottom: "1.25rem",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "0.45rem" }}>Step 2</p>
            <p style={{ fontSize: "1.02rem", marginBottom: 0, color: "rgba(28,25,21,0.85)" }}>
              After payment is sent,{" "}
              <Link href="/church/thanks" style={{ color: "#2f6f9f", fontWeight: 700 }}>
                click here
              </Link>
              .
            </p>
          </div>
        </div>

        <p style={{ marginTop: "0.5rem", fontSize: "0.92rem", color: "rgba(28,25,21,0.62)", marginBottom: "2rem" }}>
          Gift for a church office? Pay $7 and put their email in the note, or just tell Adam and he'll send it.
        </p>

        <ConsultSlab />

        {/* Footer: resources line only — no booking CTA */}
        <footer
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #d9d2c3",
            fontSize: "0.95rem",
            color: "rgba(28,25,21,0.72)",
          }}
        >
          <p style={{ margin: 0 }}>
            Want more resources?{" "}
            <a href="https://raytech.co/church" style={{ color: "#2f6f9f", fontWeight: 700 }}>
              raytech.co/church
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
