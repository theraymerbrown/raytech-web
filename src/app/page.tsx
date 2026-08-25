import Image from "next/image";

const PHONE = "(502) 229-7527";
const PHONE_HREF = "tel:+15022297527";
const EMAIL = "adam@raytech.co";
const EMAIL_HREF = "mailto:adam@raytech.co?subject=Let%27s%20talk%20%E2%80%94%20RayTech";
const ADDRESS = "401 4th Street, Shelbyville, KY 40065";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" id="top">
            <Image
              src="/images/logo.png"
              alt="RayTech Services"
              width={160}
              height={40}
              priority
            />
            <span>Shelbyville, KY</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#story">Story</a>
            <a href="#offers">What we do</a>
            <a href="#how">How we work</a>
            <a className="btn btn-primary" href="#talk">
              Let’s talk
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* 1. Humans first */}
        <section className="hero" aria-label="Welcome">
          <div className="hero-media">
            <Image
              src="/images/team.jpg"
              alt="The RayTech Services team outdoors in matching shirts"
              fill
              priority
              quality={88}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 28%" }}
            />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow" style={{ color: "rgba(255,220,200,0.95)" }}>
              RayTech Services · Since about 2009
            </p>
            <h1>Real humans. Real follow-through.</h1>
            <p>
              Local technology people serving small businesses and organizations
              across Shelby County and the Louisville–Lexington corridor — not a
              faceless helpdesk.
            </p>
            <div className="hero-actions">
              <a className="btn btn-on-dark" href="#talk">
                Let’s talk
              </a>
              <a className="btn btn-ghost" href="#offers" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}>
                What we do
              </a>
            </div>
            <p className="hero-sub">
              Shelbyville · Louisville–Lexington corridor · {PHONE}
            </p>
          </div>
        </section>

        {/* 2. Story */}
        <section className="section" id="story">
          <div className="wrap story-grid">
            <div className="story-photo">
              <Image
                src="/images/adam-rooftop.jpg"
                alt="Adam Raymer-Brown, owner of RayTech Services"
                width={800}
                height={1000}
                sizes="(max-width: 800px) 100vw, 40vw"
              />
            </div>
            <div className="story-copy">
              <p className="eyebrow">Who we are</p>
              <h2>A local shop, not a ticket mill.</h2>
              <p className="lede">
                I’m Adam Raymer-Brown. I run RayTech Services LLC out of
                Shelbyville, Kentucky — and I care that tech gives you freedom,
                not frustration.
              </p>
              <p>
                We’ve been at this since about 2009: networks you can stand in
                front of, cameras that actually record, clean standards instead
                of reinventing every closet, and a human who follows up when
                something’s open.
              </p>
              <p>
                If you’re a church secretary, a lawyer, or anyone running a
                small office that needs calm, reliable systems — we speak plain
                English and show up.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Offers — no invented prices */}
        <section className="section" id="offers" style={{ background: "var(--paper-deep)" }}>
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>Clear work. Clear care.</h2>
            <p className="lede">
              After you know who we are — here’s how we help. Package names and
              pricing are a conversation, not a mystery menu.
            </p>
            <div className="offer-grid">
              <article className="offer-card">
                <h3>Infrastructure done right</h3>
                <p>
                  Networks, Wi‑Fi, security cameras, and closet cleanup — a
                  standard stack, not a new invention every job.
                </p>
              </article>
              <article className="offer-card">
                <h3>Ongoing care</h3>
                <p>
                  We maintain what we install. Health checks, backups that get
                  tested, and priority when something breaks.
                </p>
              </article>
              <article className="offer-card">
                <h3>Projects with a finish line</h3>
                <p>
                  Scoped work with clear outcomes — so you’re not living in open
                  hourly surprises.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 4. How it feels */}
        <section className="section" id="how">
          <div className="wrap">
            <p className="eyebrow">How we work</p>
            <h2>Simple rules. Nothing slips.</h2>
            <p className="lede">
              The way the shop runs is the product — not jargon.
            </p>
            <ul className="how-list">
              <li>
                <strong>Infrastructure first</strong>
                <span>A rack you can stand in front of. Real gear, real labels.</span>
              </li>
              <li>
                <strong>Standard stack</strong>
                <span>Same checklists, same quality bar — less chaos next visit.</span>
              </li>
              <li>
                <strong>Human close</strong>
                <span>We don’t leave without next steps written down.</span>
              </li>
              <li>
                <strong>Follow-through</strong>
                <span>Open items get an owner. Quotes don’t rot in silence.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Light proof */}
        <section className="section-tight facts" aria-label="Facts">
          <div className="wrap">
            <dl className="facts-grid">
              <div>
                <dt>Since ~2009</dt>
                <dd>Serving central Kentucky</dd>
              </div>
              <div>
                <dt>Shelbyville, KY</dt>
                <dd>{ADDRESS}</dd>
              </div>
              <div>
                <dt>Local + remote</dt>
                <dd>Shelby · Louisville–Lexington corridor</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 6. Ask */}
        <section className="section cta-band" id="talk">
          <div className="wrap">
            <p className="eyebrow" style={{ color: "rgba(255,200,170,0.95)" }}>
              Next step
            </p>
            <h2>Let’s talk.</h2>
            <p className="lede">
              Tell us what’s noisy — tech, cameras, the closet, the stress. We’ll
              answer like neighbors who know racks.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <a className="btn btn-on-dark" href={EMAIL_HREF}>
                Let’s talk
              </a>
              <a
                className="btn btn-ghost"
                href={PHONE_HREF}
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}
              >
                {PHONE}
              </a>
            </div>
            <p className="contact-line">
              <a href={EMAIL_HREF}>{EMAIL}</a>
              {" · "}
              {ADDRESS}
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image
              src="/images/logo.png"
              alt="RayTech Services"
              width={140}
              height={36}
            />
            <p>RayTech Services, LLC</p>
            <p>{ADDRESS}</p>
            <p>
              <a href={PHONE_HREF}>{PHONE}</a>
              {" · "}
              <a href={EMAIL_HREF}>{EMAIL}</a>
            </p>
          </div>
          <div className="footer-links">
            <a href="#story">Story</a>
            <a href="#offers">What we do</a>
            <a href="#talk">Let’s talk</a>
          </div>
        </div>
      </footer>
    </>
  );
}
