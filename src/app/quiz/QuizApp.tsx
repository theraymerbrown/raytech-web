"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ALL_QUESTIONS,
  CHOICES,
  OPP_DEFS,
  Q_BY_ID,
  Q_INDEX,
  QUIZ_VERSION,
  SCREENS,
  STATE_LABEL,
  STATE_RANK,
  type AnswerValue,
  type OrgType,
} from "./quiz-data";
import {
  isChurchOrNonprofit,
  selectOpportunities,
  specialResultState,
  type DisplayedCard,
} from "./selection";
import { formIsConfigured, postToGoogleForm, type FormFieldKey } from "./form-config";
import "./quiz.css";

type Step =
  | "welcome"
  | "context"
  | "screen0"
  | "screen1"
  | "screen2"
  | "screen3"
  | "priority"
  | "results";

type ContactMode = null | "results" | "conversation";

function uid() {
  return `bfc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function toast(msg: string) {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.className = "quiz-toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

export default function QuizApp() {
  const [step, setStep] = useState<Step>("welcome");
  const [orgType, setOrgType] = useState<OrgType | null>(null);
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [cityZip, setCityZip] = useState("");
  const [responses, setResponses] = useState<Record<string, AnswerValue>>(() =>
    Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, null]))
  );
  const [priorities, setPriorities] = useState<string[]>([]);
  const [priorityMode, setPriorityMode] = useState<string | null>(null);
  const [showAllPriority, setShowAllPriority] = useState(false);
  const [contactMode, setContactMode] = useState<ContactMode>(null);
  const [thankYou, setThankYou] = useState<string | null>(null);
  const [submissionId] = useState(() => uid());
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [postedOnce, setPostedOnce] = useState(false);

  const cards = useMemo(
    () => selectOpportunities(responses, priorities),
    [responses, priorities]
  );
  const special = useMemo(
    () => specialResultState(responses, priorities),
    [responses, priorities]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    if (step !== "results" || postedOnce) return;
    void submitPayload("none");
    setPostedOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function go(s: Step) {
    setStep(s);
  }

  function setAnswer(id: string, value: AnswerValue) {
    setResponses((prev) => ({ ...prev, [id]: value }));
    if (value === "not_applicable") {
      setPriorities((p) => p.filter((x) => x !== id));
    }
  }

  async function submitPayload(
    contactRequestType: string,
    contact?: Record<string, string>
  ) {
    const payload: Partial<Record<FormFieldKey, string>> = {
      timestamp: new Date().toISOString(),
      quiz_version: QUIZ_VERSION,
      submission_id: submissionId,
      org_type: orgType || "",
      team_size: teamSize || "",
      location: location || "",
      city_zip: cityZip || "",
      priority_mode: priorityMode || "",
      priorities: priorities.join(","),
      displayed_opportunities: cards
        .map((c) => `${c.oid}${c.subvariant ? `:${c.subvariant}` : ""}`)
        .join(","),
      special_state: special || "",
      contact_request_type: contactRequestType,
      contact_name: contact?.name || "",
      contact_org: contact?.org || "",
      contact_email: contact?.email || "",
      contact_phone: contact?.phone || "",
      contact_method: contact?.method || "",
      contact_timing: contact?.timing || "",
      contact_note: contact?.note || "",
    };
    ALL_QUESTIONS.forEach((q) => {
      payload[q.id as FormFieldKey] = responses[q.id] ?? "null";
    });

    try {
      const prev = JSON.parse(localStorage.getItem("raytech_bfc_contacts") || "[]");
      prev.push(payload);
      localStorage.setItem("raytech_bfc_contacts", JSON.stringify(prev));
    } catch {
      /* ignore */
    }

    if (!formIsConfigured()) {
      setSubmitStatus("Saved locally. Google Form not configured yet.");
      return { ok: false as const };
    }
    const res = await postToGoogleForm(payload);
    setSubmitStatus(
      res.ok
        ? "Submitted to Raytech response sheet."
        : `Local save only (${res.reason || "form error"}).`
    );
    return res;
  }

  const progress = (() => {
    const map: Record<Step, [number, string]> = {
      welcome: [0, "Welcome"],
      context: [8, "About your organization"],
      screen0: [20, "Serving people"],
      screen1: [40, "Getting work done"],
      screen2: [60, "Making resources go further"],
      screen3: [80, "Keeping things dependable"],
      priority: [90, "Priorities"],
      results: [100, "Your results"],
    };
    return map[step];
  })();

  return (
    <div className="quiz-shell">
      <div className="quiz-topbar">
        <a className="brand-link" href="/">
          <Image
            src="/images/logo.png"
            alt="RayTech Services"
            width={140}
            height={36}
            priority
          />
        </a>
        <span className="quiz-badge">quiz_version {QUIZ_VERSION}</span>
      </div>

      {step !== "welcome" && (
        <div className="quiz-progress">
          <div className="quiz-progress-meta">
            <span>{progress[1]}</span>
            <span>{progress[0]}%</span>
          </div>
          <div className="quiz-bar">
            <span style={{ width: `${progress[0]}%` }} />
          </div>
        </div>
      )}

      <main className="quiz-card">
        {step === "welcome" && (
          <Welcome
            onStart={() => go("context")}
            onDemo={(letter) => {
              applyDemo(letter, {
                setOrgType,
                setTeamSize,
                setLocation,
                setResponses,
                setPriorities,
                setPriorityMode,
              });
              setPostedOnce(false);
              go("results");
            }}
          />
        )}
        {step === "context" && (
          <Context
            orgType={orgType}
            teamSize={teamSize}
            location={location}
            cityZip={cityZip}
            setOrgType={setOrgType}
            setTeamSize={setTeamSize}
            setLocation={setLocation}
            setCityZip={setCityZip}
            onBack={() => go("welcome")}
            onNext={() => go("screen0")}
          />
        )}
        {step.startsWith("screen") && (
          <QuestionScreen
            idx={Number(step.replace("screen", ""))}
            responses={responses}
            setAnswer={setAnswer}
            onBack={() => {
              const idx = Number(step.replace("screen", ""));
              go(idx === 0 ? "context" : (`screen${idx - 1}` as Step));
            }}
            onNext={() => {
              const idx = Number(step.replace("screen", ""));
              go(idx < 3 ? (`screen${idx + 1}` as Step) : "priority");
            }}
          />
        )}
        {step === "priority" && (
          <Priority
            responses={responses}
            priorities={priorities}
            setPriorities={setPriorities}
            priorityMode={priorityMode}
            setPriorityMode={setPriorityMode}
            showAllPriority={showAllPriority}
            setShowAllPriority={setShowAllPriority}
            onBack={() => go("screen3")}
            onNext={() => {
              if (priorities.length) setPriorityMode("selected");
              go("results");
            }}
          />
        )}
        {step === "results" && (
          <Results
            orgType={orgType}
            responses={responses}
            cards={cards}
            special={special}
            contactMode={contactMode}
            setContactMode={setContactMode}
            thankYou={thankYou}
            setThankYou={setThankYou}
            submitStatus={submitStatus}
            onBack={() => go("priority")}
            onRestart={() => {
              setResponses(Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, null])));
              setOrgType(null);
              setTeamSize(null);
              setLocation(null);
              setCityZip("");
              setPriorities([]);
              setPriorityMode(null);
              setShowAllPriority(false);
              setContactMode(null);
              setThankYou(null);
              setPostedOnce(false);
              go("welcome");
            }}
            onSubmitContact={async (type, fields) => {
              await submitPayload(type, fields);
              setThankYou(
                type === "conversation"
                  ? "Thanks. Raytech has received your request and the areas you chose to discuss."
                  : "Your request has been received."
              );
              setContactMode(null);
            }}
          />
        )}
      </main>

      <footer className="quiz-footer">
        Raytech Services · Shelby County, Kentucky and nearby
        <br />
        A practical check—not a diagnosis or price quote.
      </footer>
    </div>
  );
}

function Welcome({
  onStart,
  onDemo,
}: {
  onStart: () => void;
  onDemo: (letter: string) => void;
}) {
  return (
    <div className="quiz-stack">
      <h1>Where does work get stuck?</h1>
      <p className="quiz-lede">
        A practical check for small businesses, churches, and nonprofits.
      </p>
      <p>
        Slow replies. Repeated work. Surprise bills. Too much depending on one
        person. Small frustrations can take a lot out of a small organization.
      </p>
      <p>
        This practical check helps you spot what could work better—so you can
        spend more time serving people and less time chasing problems.
      </p>
      <div className="quiz-points">
        <strong>What you get</strong>
        <ul>
          <li>Your main opportunities</li>
          <li>A few practical next steps</li>
          <li>The option to talk them through with Raytech Services</li>
        </ul>
      </div>
      <p className="quiz-small quiz-muted">
        <strong>Reassurance:</strong> No technical knowledge needed. “Not sure”
        is a useful answer. See your results without entering an email address.
      </p>
      <p className="quiz-small">20 quick check-ins. Add detail only where it helps.</p>
      <p className="quiz-small quiz-muted">
        For businesses, churches, and nonprofits in Shelby County and nearby
        communities.
      </p>
      <div className="quiz-cta">
        <button className="btn btn-primary" type="button" onClick={onStart}>
          Find what could work better
        </button>
      </div>
      <details className="quiz-debug">
        <summary>Prototype helpers · fictional examples (A–E)</summary>
        <p className="quiz-helper">
          Loads section 13 scenarios so you can verify card selection.
        </p>
        <div className="quiz-pills">
          {["A", "B", "C", "D", "E"].map((letter) => (
            <button
              key={letter}
              type="button"
              className="quiz-pill"
              onClick={() => onDemo(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}

function Context(props: {
  orgType: OrgType | null;
  teamSize: string | null;
  location: string | null;
  cityZip: string;
  setOrgType: (v: OrgType) => void;
  setTeamSize: (v: string) => void;
  setLocation: (v: string) => void;
  setCityZip: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const types: [OrgType, string][] = [
    ["business", "Business"],
    ["church", "Church or ministry"],
    ["nonprofit", "Nonprofit"],
    ["other", "Other"],
  ];
  const sizes = ["1–4", "5–10", "11–25", "26–50", "51+", "Not sure"];
  const locs: [string, string][] = [
    ["shelby", "Shelby County, Kentucky"],
    ["nearby", "Nearby county"],
    ["elsewhere", "Somewhere else"],
  ];
  const ready = props.orgType && props.teamSize && props.location;
  return (
    <div className="quiz-stack">
      <h2>A little about your organization</h2>
      <p className="quiz-muted">
        This helps us use the right wording. You can continue even if you are
        outside Shelby County or unsure of size.
      </p>
      <div className="quiz-field">
        <span className="label">What kind of organization is this?</span>
        <div className="quiz-choice-grid cols-2">
          {types.map(([v, l]) => (
            <label
              key={v}
              className={`quiz-choice ${props.orgType === v ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="orgType"
                checked={props.orgType === v}
                onChange={() => props.setOrgType(v)}
              />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="quiz-field">
        <span className="label">About how many people regularly help run it?</span>
        <p className="quiz-helper">
          Include regular staff and volunteers who use your systems.
        </p>
        <div className="quiz-choice-grid cols-2">
          {sizes.map((s) => (
            <label
              key={s}
              className={`quiz-choice ${props.teamSize === s ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="teamSize"
                checked={props.teamSize === s}
                onChange={() => props.setTeamSize(s)}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="quiz-field">
        <span className="label">Where are you based?</span>
        <div className="quiz-choice-grid">
          {locs.map(([v, l]) => (
            <label
              key={v}
              className={`quiz-choice ${props.location === v ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="location"
                checked={props.location === v}
                onChange={() => props.setLocation(v)}
              />
              <span>{l}</span>
            </label>
          ))}
        </div>
        <label className="quiz-helper" htmlFor="cityZip" style={{ display: "block", marginTop: 12 }}>
          City or ZIP (optional)
        </label>
        <input
          id="cityZip"
          value={props.cityZip}
          onChange={(e) => props.setCityZip(e.target.value)}
          placeholder="e.g. Shelbyville or 40065"
          style={{
            width: "100%",
            padding: "0.65rem 0.75rem",
            border: "1px solid var(--line)",
            borderRadius: 10,
          }}
        />
      </div>
      <div className="quiz-nav">
        <button className="btn btn-ghost" type="button" onClick={props.onBack}>
          Back
        </button>
        <button
          className="btn btn-primary"
          type="button"
          disabled={!ready}
          onClick={props.onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function QuestionScreen({
  idx,
  responses,
  setAnswer,
  onBack,
  onNext,
}: {
  idx: number;
  responses: Record<string, AnswerValue>;
  setAnswer: (id: string, v: AnswerValue) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const screen = SCREENS[idx];
  return (
    <div className="quiz-stack">
      <h2>
        Screen {idx + 1}: {screen.title}
      </h2>
      <p className="quiz-lede">{screen.intro}</p>
      <p className="quiz-small quiz-muted">
        How is each area working for your organization today? Choose the answer
        that fits best.
      </p>
      {screen.questions.map((q) => (
        <div className="quiz-q" key={q.id}>
          <div className="quiz-qid">{q.id}</div>
          <div className="quiz-qtext">{q.text}</div>
          <div className="quiz-qex">{q.example}</div>
          <div className="quiz-answers">
            {CHOICES.map((c) => (
              <label
                key={c.value}
                className={`quiz-answer ${responses[q.id] === c.value ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={responses[q.id] === c.value}
                  onChange={() => setAnswer(q.id, c.value)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className="quiz-skip"
            onClick={() => setAnswer(q.id, null)}
          >
            Skip this one
          </button>
        </div>
      ))}
      <div className="quiz-nav">
        <button className="btn btn-ghost" type="button" onClick={onBack}>
          Back
        </button>
        <button className="btn btn-primary" type="button" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
}

function Priority(props: {
  responses: Record<string, AnswerValue>;
  priorities: string[];
  setPriorities: (v: string[] | ((p: string[]) => string[])) => void;
  priorityMode: string | null;
  setPriorityMode: (v: string | null) => void;
  showAllPriority: boolean;
  setShowAllPriority: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const flagged = ALL_QUESTIONS.filter((q) => {
    const v = props.responses[q.id];
    return v === "needs_attention" || v === "could_improve" || v === "unsure";
  });
  const pool = props.showAllPriority ? ALL_QUESTIONS : flagged;
  const hideList =
    props.priorityMode === "none_now" || props.priorityMode === "help_choose";

  function toggle(id: string) {
    const v = props.responses[id];
    if (v === "not_applicable") {
      toast("That area is marked Doesn't apply. Change the answer first.");
      return;
    }
    props.setPriorities((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast("You can choose up to two areas.");
        return prev;
      }
      return [...prev, id];
    });
    props.setPriorityMode("selected");
  }

  function helpChoose() {
    const ranked = ALL_QUESTIONS.map((q) => ({
      id: q.id,
      v: props.responses[q.id],
      pos: Q_INDEX[q.id],
    }))
      .filter(
        (x) =>
          x.v === "needs_attention" ||
          x.v === "could_improve" ||
          x.v === "unsure"
      )
      .sort(
        (a, b) =>
          (STATE_RANK[b.v as string] || 0) - (STATE_RANK[a.v as string] || 0) ||
          a.pos - b.pos
      )
      .slice(0, 2)
      .map((x) => x.id);
    props.setPriorityMode("help_choose");
    props.setPriorities(ranked);
    toast(ranked.length ? "Suggested priorities selected." : "No flagged areas to suggest.");
  }

  return (
    <div className="quiz-stack">
      <h2>What would you most like to make easier?</h2>
      <p>
        Choose up to two areas you would most like help with. You can see all
        your answers in your results.
      </p>
      <div className="quiz-pills">
        <button
          type="button"
          className={`quiz-pill ${props.showAllPriority ? "active" : ""}`}
          onClick={() => {
            props.setShowAllPriority(!props.showAllPriority);
            if (
              props.priorityMode === "none_now" ||
              props.priorityMode === "help_choose"
            ) {
              props.setPriorityMode("selected");
            }
          }}
        >
          Choose from all areas
        </button>
        <button
          type="button"
          className={`quiz-pill ${props.priorityMode === "help_choose" ? "active" : ""}`}
          onClick={helpChoose}
        >
          Help me choose
        </button>
        <button
          type="button"
          className={`quiz-pill ${props.priorityMode === "none_now" ? "active" : ""}`}
          onClick={() => {
            props.setPriorityMode("none_now");
            props.setPriorities([]);
          }}
        >
          Nothing to prioritize right now
        </button>
      </div>
      {!props.showAllPriority && flagged.length === 0 && (
        <p className="quiz-helper">
          Nothing is currently marked as needing attention, could be better, or
          unsure. You can still choose from all areas.
        </p>
      )}
      {!hideList && (
        <div>
          {pool.map((q) => {
            const selected = props.priorities.includes(q.id);
            const ord = selected ? props.priorities.indexOf(q.id) + 1 : "·";
            return (
              <button
                type="button"
                key={q.id}
                className={`quiz-priority ${selected ? "selected" : ""}`}
                onClick={() => toggle(q.id)}
                style={{ width: "100%", textAlign: "left" }}
              >
                <div className="quiz-ord">{ord}</div>
                <div>
                  <div>
                    <strong>{q.text}</strong>
                  </div>
                  <div className="quiz-small quiz-muted">
                    {q.id} · {STATE_LABEL[String(props.responses[q.id])]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      <p className="quiz-small quiz-muted">
        Selected: {props.priorities.length}/2
      </p>
      <div className="quiz-nav">
        <button className="btn btn-ghost" type="button" onClick={props.onBack}>
          Back
        </button>
        <button className="btn btn-primary" type="button" onClick={props.onNext}>
          See my results
        </button>
      </div>
    </div>
  );
}

function Results(props: {
  orgType: OrgType | null;
  responses: Record<string, AnswerValue>;
  cards: DisplayedCard[];
  special: string | null;
  contactMode: ContactMode;
  setContactMode: (v: ContactMode) => void;
  thankYou: string | null;
  setThankYou: (v: string | null) => void;
  submitStatus: string;
  onBack: () => void;
  onRestart: () => void;
  onSubmitContact: (
    type: string,
    fields: Record<string, string>
  ) => Promise<void>;
}) {
  let banner = "";
  if (props.special === "all_well") {
    banner =
      "Your answers suggest that everyday work is mostly running as you would like. Keep the habits that support it, and revisit the check when your people, workload, or systems change. You can still choose an area you would like to improve.";
  } else if (props.special === "all_unsure") {
    banner =
      "Your best starting point may be a clearer picture of how things work today. Choose one area that matters most, identify who handles it, and follow a recent example together.";
  } else if (props.special === "all_na") {
    banner =
      "We do not have enough applicable answers to suggest a useful priority yet. You can revisit the questions or tell us what is getting in the way in your own words.";
  } else if (props.special === "many_concerns") {
    banner =
      "Several areas could use attention. You do not have to tackle them all at once. Start with the one that most affects the people you serve, the resources you need, or the work that must keep moving.";
  }

  return (
    <div>
      <h1>Here is where work could get easier.</h1>
      <p className="quiz-lede">
        Based on your answers, these are useful places to start. Your check
        reflects what you experience today; a closer look can help identify the
        cause and the right fix.
      </p>
      {banner && <div className="quiz-banner">{banner}</div>}
      {props.cards.map((card, i) => (
        <OppCard
          key={card.oid}
          card={card}
          index={i}
          orgType={props.orgType}
          responses={props.responses}
        />
      ))}
      <div className="quiz-full">
        <h2>Your full picture</h2>
        <p className="quiz-muted quiz-small">
          All twenty answers, including strengths and unknowns. Skipped items
          show as “Not answered.”
        </p>
        {SCREENS.map((screen) => (
          <div className="quiz-screen-group" key={screen.id}>
            <h3>{screen.title}</h3>
            {screen.questions.map((q) => {
              const v = props.responses[q.id];
              const key = v === null ? "null" : v;
              return (
                <div className="quiz-row" key={q.id}>
                  <div>
                    {q.id}. {q.text}
                  </div>
                  <div className={`st st-${key}`}>{STATE_LABEL[key]}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <ContactBlock
        contactMode={props.contactMode}
        setContactMode={props.setContactMode}
        thankYou={props.thankYou}
        setThankYou={props.setThankYou}
        onSubmitContact={props.onSubmitContact}
      />
      {props.submitStatus && (
        <p className="quiz-status">{props.submitStatus}</p>
      )}

      <div className="quiz-nav">
        <button className="btn btn-ghost" type="button" onClick={props.onBack}>
          Back to priorities
        </button>
        <button className="btn btn-secondary" type="button" onClick={props.onRestart}>
          Start over
        </button>
      </div>
    </div>
  );
}

function OppCard({
  card,
  index,
  orgType,
  responses,
}: {
  card: DisplayedCard;
  index: number;
  orgType: OrgType | null;
  responses: Record<string, AnswerValue>;
}) {
  const def = OPP_DEFS[card.oid];
  let title = def.title;
  let mean = def.mean;
  let better = def.better;
  let first = def.first;
  let help = def.help;

  if (card.oid === "O09" && isChurchOrNonprofit(orgType)) {
    title = def.titleChurchNonprofit || title;
  }
  if (card.oid === "O08") {
    if (card.subvariant === "scheduling" && def.scheduling) {
      ({ title, mean, better, first, help } = def.scheduling);
    } else if (card.subvariant === "payment" && def.payment) {
      ({ title, mean, better, first, help } = def.payment);
    }
  }

  const onlyUnsure =
    card.support.every((qid) => responses[qid] === "unsure") && !card.exploreOnly;
  if (onlyUnsure || card.variant === "clarity") {
    mean =
      'You marked this area “Not sure.” That does not mean it is broken. Checking who owns it and how it works can help you decide whether anything needs to change.';
  }

  const tags: string[] = [];
  if (card.exploreOnly) tags.push("explore|An area you chose to explore");
  else if (card.variant === "clarity") tags.push("clarity|A useful place to get clarity");
  else if (
    card.highestState === "needs_attention" ||
    card.support.some((q) => responses[q] === "needs_attention")
  )
    tags.push("concern|Needs attention");
  else tags.push("improve|Could be better");

  return (
    <article className="quiz-opp">
      <div className="quiz-tags">
        {tags.map((t) => {
          const [cls, label] = t.split("|");
          return (
            <span key={t} className={`quiz-tag ${cls}`}>
              {label}
            </span>
          );
        })}
        {def.branches.slice(0, 2).map((b) => (
          <span key={b} className="quiz-tag">
            {b}
          </span>
        ))}
      </div>
      <h3>
        {index + 1}. {title}
      </h3>
      <p className="quiz-small quiz-muted">Based on: {card.support.join(", ")}</p>
      <div className="quiz-sec">
        <strong>What this could mean</strong>
        <div>{mean}</div>
      </div>
      <div className="quiz-sec">
        <strong>What better looks like</strong>
        <div>{better}</div>
      </div>
      <div className="quiz-sec">
        <strong>Try this first</strong>
        <div>{first}</div>
      </div>
      <div className="quiz-sec">
        <strong>How Raytech can help</strong>
        <div>{help}</div>
      </div>
      <div className="quiz-sec">
        <strong>Your related answers</strong>
        <div className="quiz-small">
          {card.support.map((qid) => (
            <div key={qid}>
              {qid}: {STATE_LABEL[String(responses[qid])]} — {Q_BY_ID[qid]?.text}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ContactBlock(props: {
  contactMode: ContactMode;
  setContactMode: (v: ContactMode) => void;
  thankYou: string | null;
  setThankYou: (v: string | null) => void;
  onSubmitContact: (
    type: string,
    fields: Record<string, string>
  ) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("email");
  const [timing, setTiming] = useState("soon");
  const [note, setNote] = useState("");

  if (props.thankYou) {
    return (
      <div className="quiz-contact">
        <h3>Thanks</h3>
        <p>{props.thankYou}</p>
        <button
          className="btn btn-secondary"
          type="button"
          style={{ marginTop: 10 }}
          onClick={() => {
            props.setThankYou(null);
            props.setContactMode(null);
          }}
        >
          Keep exploring my results
        </button>
      </div>
    );
  }

  if (!props.contactMode) {
    return (
      <div className="quiz-contact">
        <h3>Want help choosing a practical first step?</h3>
        <p>
          Raytech can walk through the areas you flagged, look at how the work
          happens today, and help you decide what is worth improving first.
        </p>
        <div className="quiz-cta">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => props.setContactMode("conversation")}
          >
            Ask Raytech to help me prioritize
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => props.setContactMode("results")}
          >
            Send me my results
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => toast("You can keep scrolling your results.")}
          >
            Keep exploring my results
          </button>
        </div>
      </div>
    );
  }

  if (props.contactMode === "results") {
    return (
      <div className="quiz-contact">
        <h3>Send me my results</h3>
        <p className="quiz-small">
          We will use this email to send the results you requested.
        </p>
        <div className="quiz-form">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Organization (optional)"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
          <div className="quiz-cta">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                if (!email.trim()) {
                  toast("Please enter an email address.");
                  return;
                }
                void props.onSubmitContact("results_copy", {
                  email: email.trim(),
                  name,
                  org,
                });
              }}
            >
              Submit request
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => props.setContactMode(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-contact">
      <h3>Ask Raytech to help me prioritize</h3>
      <p className="quiz-small">
        Raytech may contact me about the help I am requesting.
      </p>
      <div className="quiz-form">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Organization"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="email">Prefer email</option>
          <option value="phone">Prefer phone</option>
        </select>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select value={timing} onChange={(e) => setTiming(e.target.value)}>
          <option value="soon">Soon</option>
          <option value="months">In the next few months</option>
          <option value="exploring">Just exploring</option>
        </select>
        <textarea
          placeholder="Anything helpful to know (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="quiz-cta">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              if (!name.trim() || !org.trim()) {
                toast("Name and organization are required.");
                return;
              }
              if (method === "email" && !email.trim()) {
                toast("Please enter an email address.");
                return;
              }
              if (method === "phone" && !phone.trim()) {
                toast("Please enter a phone number.");
                return;
              }
              void props.onSubmitContact("conversation", {
                name: name.trim(),
                org: org.trim(),
                email: email.trim(),
                phone: phone.trim(),
                method,
                timing,
                note,
              });
            }}
          >
            Submit request
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => props.setContactMode(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function applyDemo(
  letter: string,
  setters: {
    setOrgType: (v: OrgType) => void;
    setTeamSize: (v: string) => void;
    setLocation: (v: string) => void;
    setResponses: (v: Record<string, AnswerValue>) => void;
    setPriorities: (v: string[]) => void;
    setPriorityMode: (v: string | null) => void;
  }
) {
  const base: Record<string, AnswerValue> = Object.fromEntries(
    ALL_QUESTIONS.map((q) => [q.id, "working_well" as AnswerValue])
  );
  if (letter === "A") {
    setters.setOrgType("business");
    setters.setTeamSize("11–25");
    setters.setLocation("shelby");
    base.P01 = "needs_attention";
    base.P02 = "needs_attention";
    base.R04 = "could_improve";
    base.D03 = "unsure";
    base.R03 = "not_applicable";
    setters.setPriorities(["P02", "P01"]);
    setters.setPriorityMode("selected");
  } else if (letter === "B") {
    setters.setOrgType("church");
    setters.setTeamSize("5–10");
    setters.setLocation("shelby");
    base.R03 = "needs_attention";
    base.D01 = "needs_attention";
    base.W01 = "could_improve";
    base.D05 = "could_improve";
    base.R04 = "not_applicable";
    setters.setPriorities(["R03", "D01"]);
    setters.setPriorityMode("selected");
  } else if (letter === "C") {
    setters.setOrgType("nonprofit");
    setters.setTeamSize("11–25");
    setters.setLocation("nearby");
    base.W02 = "needs_attention";
    base.W03 = "needs_attention";
    base.R02 = "needs_attention";
    base.R04 = "could_improve";
    setters.setPriorities(["W02", "R02"]);
    setters.setPriorityMode("selected");
  } else if (letter === "D") {
    setters.setOrgType("other");
    setters.setTeamSize("Not sure");
    setters.setLocation("elsewhere");
    ALL_QUESTIONS.forEach((q) => {
      base[q.id] = "unsure";
    });
    base.P03 = "not_applicable";
    base.R04 = "not_applicable";
    setters.setPriorities([]);
    setters.setPriorityMode("none_now");
  } else if (letter === "E") {
    setters.setOrgType("business");
    setters.setTeamSize("5–10");
    setters.setLocation("shelby");
    setters.setPriorities([]);
    setters.setPriorityMode("none_now");
  }
  setters.setResponses(base);
  toast(`Loaded example ${letter}`);
}
