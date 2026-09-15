/** Business Friction Check v1.0-proto — question bank + opportunity library */
export type AnswerValue =
  | "working_well"
  | "could_improve"
  | "needs_attention"
  | "unsure"
  | "not_applicable"
  | null;

export type OrgType = "business" | "church" | "nonprofit" | "other";

export const QUIZ_VERSION = "1.0-proto";

export const CHOICES: { value: Exclude<AnswerValue, null>; label: string }[] = [
  { value: "working_well", label: "Working well" },
  { value: "could_improve", label: "Could be better" },
  { value: "needs_attention", label: "Needs attention" },
  { value: "unsure", label: "Not sure" },
  { value: "not_applicable", label: "Doesn't apply" },
];

export const STATE_LABEL: Record<string, string> = {
  working_well: "Working well",
  could_improve: "Could be better",
  needs_attention: "Needs attention",
  unsure: "Not sure",
  not_applicable: "Doesn't apply",
  null: "Not answered",
};

export const STATE_RANK: Record<string, number> = {
  needs_attention: 3,
  could_improve: 2,
  unsure: 1,
  working_well: 0,
  not_applicable: 0,
  null: 0,
};

export type Question = { id: string; text: string; example: string };
export type Screen = { id: string; title: string; intro: string; questions: Question[] };

export const SCREENS: Screen[] = [
  {
    "id": "serving",
    "title": "Serving people",
    "intro": "Think about what happens when someone contacts you, needs an update, or wants to take the next step.",
    "questions": [
      {
        "id": "P01",
        "text": "Do people get a useful answer when they contact you?",
        "example": "Calls, emails, messages, or requests wait because everyone is busy or it is unclear who should respond."
      },
      {
        "id": "P02",
        "text": "Do important follow-ups happen when they should?",
        "example": "An estimate, registration, application, or commitment gets forgotten once the first conversation is over."
      },
      {
        "id": "P03",
        "text": "Is it easy for people to take the next step online?",
        "example": "Someone has trouble finding information, using a form, booking, registering, or giving from their phone."
      },
      {
        "id": "P04",
        "text": "Do people know what is happening without having to chase you?",
        "example": "People call again for updates, repeat their story, or hear different answers from different staff."
      },
      {
        "id": "P05",
        "text": "Do you stay in touch when people are due to return, renew, or reconnect?",
        "example": "Repeat visits, service dates, renewals, or appropriate follow-up depend on someone remembering."
      }
    ]
  },
  {
    "id": "work",
    "title": "Getting work done",
    "intro": "Think about the work behind the scenes: finding information, passing it along, and getting things right.",
    "questions": [
      {
        "id": "W01",
        "text": "Can people find the right information when they need it?",
        "example": "The answer is buried in email, someone's phone, an old spreadsheet, or several versions of a file."
      },
      {
        "id": "W02",
        "text": "Does information get where it needs to go without being entered again?",
        "example": "Someone copies details between forms, email, spreadsheets, calendars, or another system."
      },
      {
        "id": "W03",
        "text": "When work changes hands, is the next step clear?",
        "example": "A request gets passed along, but nobody knows who owns it or whether it was finished."
      },
      {
        "id": "W04",
        "text": "Does work get done correctly without avoidable repeats?",
        "example": "Missing details, the wrong document, or an unclear instruction leads to corrections or another visit."
      },
      {
        "id": "W05",
        "text": "Can new staff and volunteers get started without lots of extra help?",
        "example": "Logins, equipment, instructions, or training take repeated interruptions to sort out."
      }
    ]
  },
  {
    "id": "resources",
    "title": "Making resources go further",
    "intro": "Think about where time and money go\u2014and what is hardest to keep track of.",
    "questions": [
      {
        "id": "R01",
        "text": "Do you know what you are paying for and whether you still need it?",
        "example": "Subscriptions, phone plans, software, or automatic renewals continue without a clear owner or review."
      },
      {
        "id": "R02",
        "text": "Can you see which work uses the most resources and what you get from it?",
        "example": "You are busy, but it is hard to tell which jobs, services, or programs consume the most time and money."
      },
      {
        "id": "R03",
        "text": "Do schedules, reminders, and coverage come together reliably?",
        "example": "Cancellations, no-shows, double-bookings, empty slots, or missing volunteers create extra work."
      },
      {
        "id": "R04",
        "text": "Do payments and financial follow-ups move without repeated chasing?",
        "example": "Work waits to be invoiced, a payment fails, or a pledge or reimbursement lacks a clear next step."
      },
      {
        "id": "R05",
        "text": "Can the owner or leader focus without being pulled into routine problems?",
        "example": "Everyday approvals, repeated questions, and small decisions keep returning to the same person."
      }
    ]
  },
  {
    "id": "dependable",
    "title": "Keeping things dependable",
    "intro": "Think about what happens when someone is away, a system stops working, or you need help.",
    "questions": [
      {
        "id": "D01",
        "text": "Could someone else keep essential work moving if a key person were away?",
        "example": "Only one person knows the process, holds the account, receives the renewal notice, or can approve the next step."
      },
      {
        "id": "D02",
        "text": "Can you keep serving people when everyday technology has a problem?",
        "example": "Slow or unreliable equipment, internet, phones, payment tools, or event technology interrupt service."
      },
      {
        "id": "D03",
        "text": "Would you know how to get important work back if it disappeared?",
        "example": "You are unsure what is protected, how recovery works, or whether anyone has successfully tried it."
      },
      {
        "id": "D04",
        "text": "Are you comfortable that the right people have access to your information?",
        "example": "Shared logins, former staff, old devices, or unfamiliar messages leave you uncertain about who can see or change things."
      },
      {
        "id": "D05",
        "text": "Do you know who is responsible for keeping your technology in order?",
        "example": "Problems bounce between helpers or vendors, maintenance is unclear, or equipment and account decisions wait until something breaks."
      }
    ]
  }
];

export const ALL_QUESTIONS: Question[] = SCREENS.flatMap((s) => s.questions);
export const Q_INDEX: Record<string, number> = Object.fromEntries(
  ALL_QUESTIONS.map((q, i) => [q.id, i])
);
export const Q_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q])
);

export type OppDef = {
  map: string[];
  title: string;
  titleChurchNonprofit?: string;
  branches: string[];
  mean: string;
  better: string;
  first: string;
  help: string;
  scheduling?: { title: string; mean: string; better: string; first: string; help: string };
  payment?: { title: string; mean: string; better: string; first: string; help: string };
};

export const OPP_DEFS: Record<string, OppDef> = {
  "O01": {
    "map": [
      "P01",
      "P04"
    ],
    "title": "Help people get answers and updates sooner",
    "branches": [
      "Bring more in",
      "Stay in control"
    ],
    "mean": "When calls, messages, and updates live in different places, people can wait even when everyone is working hard.",
    "better": "Incoming requests have a clear owner, useful replies arrive sooner, and people know what happens next.",
    "first": "Look at ten recent requests. Can you tell who answered each one, when they gave a useful answer, and what happened next?",
    "help": "We can help organize incoming requests, make responsibility clear, and set up practical reminders and updates."
  },
  "O02": {
    "map": [
      "P02",
      "P05"
    ],
    "title": "Keep important follow-ups moving",
    "branches": [
      "Bring more in"
    ],
    "mean": "Quotes, registrations, renewals, or other commitments may depend on somebody remembering at the right moment.",
    "better": "Open commitments are visible, the next step is clear, and follow-up happens without repeated mental reminders.",
    "first": "List the commitments still open from the last month. Give each one a next step, a responsible person, and a date.",
    "help": "We can help build a manageable follow-up process around the tools you already use, with reminders and a shared view of what is still open."
  },
  "O03": {
    "map": [
      "P03"
    ],
    "title": "Make the next step easier online",
    "branches": [
      "Bring more in"
    ],
    "mean": "An unclear page, awkward form, or missing confirmation can make it harder for someone to contact you, book, register, or give.",
    "better": "People can find the right action, complete it from their phone, and know that it reached the right person.",
    "first": "Ask someone unfamiliar with the process to find the action on a phone and walk through it. Use a safe test entry where needed, and check that it reaches your team.",
    "help": "We can review the whole path, simplify the steps, and make sure the information arrives where it needs to go."
  },
  "O04": {
    "map": [
      "W01",
      "W02",
      "W03"
    ],
    "title": "Find information and pass work along more easily",
    "branches": [
      "Make resources go further",
      "Stay in control"
    ],
    "mean": "People may be searching, copying details, or waiting for someone else because the information and the next step are spread across different places.",
    "better": "Everyone can find the current information, see who owns the next step, and avoid entering the same details repeatedly.",
    "first": "Follow one ordinary request from beginning to end. Write down every place its information is stored or copied and every person who handles it.",
    "help": "We can help simplify that path, organize shared information, and connect steps that currently require repeated manual work."
  },
  "O05": {
    "map": [
      "W04",
      "W05"
    ],
    "title": "Reduce preventable mistakes and repeated work",
    "branches": [
      "Make resources go further"
    ],
    "mean": "Missing information, inconsistent instructions, or difficult onboarding may be creating avoidable corrections and interruptions.",
    "better": "People start with the information and instructions they need, and work reaches the next stage ready to use.",
    "first": "Pick a task you recently had to redo. What one detail or instruction would have prevented the repeat?",
    "help": "We can help improve intake forms, checklists, shared instructions, and the setup process for new people."
  },
  "O06": {
    "map": [
      "R01"
    ],
    "title": "Know what you are paying for",
    "branches": [
      "Make resources go further"
    ],
    "mean": "Recurring charges can outlast the person, project, or need that originally justified them.",
    "better": "Each recurring service has a purpose, an owner, and a review date\u2014and spending matches what you actually use.",
    "first": "Review one month of recurring technology charges. For each charge, identify who uses it and what would be affected if it ended. Check annual renewals separately.",
    "help": "We can help match bills to actual accounts and usage, identify overlap, and create a clear renewal plan."
  },
  "O07": {
    "map": [
      "R02"
    ],
    "title": "See where your resources are going",
    "branches": [
      "Make resources go further"
    ],
    "mean": "A busy organization can still struggle to see which work uses the most time, money, or capacity.",
    "better": "You have enough trustworthy information to make practical decisions about staffing, scheduling, services, programs, or pricing.",
    "first": "Compare a few recent jobs, services, or activities. Where did the actual time or cost differ most from what you expected?",
    "help": "We can help bring the relevant information together and create a useful view of the decisions you need to make."
  },
  "O08": {
    "map": [
      "R03",
      "R04"
    ],
    "title": "Make schedules and payment follow-through easier",
    "branches": [
      "Bring more in",
      "Make resources go further"
    ],
    "mean": "Missing reminders, incomplete paperwork, cancellations, or unclear responsibility may be creating empty spaces or delayed payments.",
    "better": "People know when and where they are needed, and payments or financial commitments have a visible next step.",
    "first": "Review the next two weeks of bookings or commitments, or the last ten completed items awaiting financial follow-up. Look for one missing confirmation or next action.",
    "help": "We can help organize reminders, scheduling, completion steps, and payment follow-up so fewer items need repeated chasing.",
    "scheduling": {
      "title": "Make schedules and coverage easier",
      "mean": "Cancellations, no-shows, double-bookings, empty slots, or missing coverage may be creating extra coordination work.",
      "better": "People know when and where they are needed, confirmations go out reliably, and coverage has a backup path.",
      "first": "Review the next two weeks of bookings, shifts, or commitments. Look for one missing confirmation, uncovered slot, or unclear ownership.",
      "help": "We can help organize reminders, scheduling, and coverage so fewer items need repeated chasing."
    },
    "payment": {
      "title": "Keep payments and financial follow-ups moving",
      "mean": "Work may wait to be invoiced, a payment may fail, or a pledge or reimbursement may lack a clear next step.",
      "better": "Payments and financial commitments have a visible next step without repeated chasing.",
      "first": "Review the last ten completed items awaiting financial follow-up. Look for one missing next action.",
      "help": "We can help organize completion steps and payment follow-up so fewer items need repeated chasing."
    }
  },
  "O09": {
    "map": [
      "R05",
      "D01"
    ],
    "title": "Let more work move without the owner",
    "titleChurchNonprofit": "Let more work move without the leader",
    "branches": [
      "Make resources go further",
      "Stay in control"
    ],
    "mean": "Too many routine questions, approvals, or essential tasks may return to one person.",
    "better": "Other people can handle everyday work within clear boundaries, and essential tasks have coverage when someone is away.",
    "first": "Write down the five questions or tasks that interrupted you most recently. Which could someone else handle with a clear instruction or access to the right information?",
    "help": "We can help document recurring tasks, establish shared ownership, and make the necessary information and access available to the appropriate people."
  },
  "O10": {
    "map": [
      "D02"
    ],
    "title": "Keep serving people when technology misbehaves",
    "branches": [
      "Stay in control"
    ],
    "mean": "Everyday service may be too dependent on equipment or connections that are slow, unreliable, or difficult to work around.",
    "better": "The tools you rely on work consistently, and your team knows the fallback when something stops.",
    "first": "Choose the technology problem that most recently interrupted service. What stopped, who was affected, and what allowed work to resume?",
    "help": "We can trace the cause, improve the weak point, and work out a practical fallback for the activities that matter most."
  },
  "O11": {
    "map": [
      "D03"
    ],
    "title": "Know how important work can be recovered",
    "branches": [
      "Stay in control"
    ],
    "mean": "Important information may feel protected without a clear, demonstrated way to recover it.",
    "better": "You know what is covered, who is responsible, and how important information can be recovered when needed.",
    "first": "Ask the responsible person to show a recent successful recovery of a non-sensitive test item. Do not delete live information to test it.",
    "help": "We can review what needs protection, check the existing recovery arrangements, and help demonstrate that the agreed process works."
  },
  "O12": {
    "map": [
      "D04",
      "D05"
    ],
    "title": "Put access and technology ownership in order",
    "branches": [
      "Stay in control"
    ],
    "mean": "Accounts, equipment, outside helpers, and maintenance responsibilities may have accumulated without a clear shared picture.",
    "better": "The right people have the access they need, essential responsibilities are assigned, and your organization knows where to turn for help.",
    "first": "List the main systems you rely on, who is responsible for each, and who should still have access. Do not put passwords on that list.",
    "help": "We can help organize accounts, ownership, support responsibilities, and a practical maintenance plan."
  }
};

export const Q_TO_OPP: Record<string, string> = {};
Object.entries(OPP_DEFS).forEach(([oid, def]) => {
  def.map.forEach((qid) => {
    Q_TO_OPP[qid] = oid;
  });
});
