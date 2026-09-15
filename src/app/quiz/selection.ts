import {
  ALL_QUESTIONS,
  OPP_DEFS,
  Q_INDEX,
  Q_TO_OPP,
  STATE_RANK,
  type AnswerValue,
  type OrgType,
} from "./quiz-data";

export type DisplayedCard = {
  oid: string;
  reason: "priority" | "system";
  support: string[];
  exploreOnly: boolean;
  variant: "reported_concern" | "clarity" | "explore";
  highestState?: string;
  subvariant?: "scheduling" | "payment" | "combined";
};

export function selectOpportunities(
  responses: Record<string, AnswerValue>,
  priorities: string[]
): DisplayedCard[] {
  const selected: DisplayedCard[] = [];
  const seen = new Set<string>();

  const add = (oid: string, meta: Omit<DisplayedCard, "oid">) => {
    if (seen.has(oid)) return;
    seen.add(oid);
    selected.push({ oid, ...meta });
  };

  priorities.forEach((qid) => {
    const oid = Q_TO_OPP[qid];
    if (!oid) return;
    const val = responses[qid];
    const exploreOnly =
      val === "working_well" || val === "not_applicable" || val == null;
    add(oid, {
      reason: "priority",
      support: [qid],
      exploreOnly,
      variant: exploreOnly ? "explore" : val === "unsure" ? "clarity" : "reported_concern",
    });
  });

  const cardStats = (oid: string, allowed: string[]) => {
    const contribs = OPP_DEFS[oid].map
      .map((qid) => ({ qid, value: responses[qid] }))
      .filter((c) => c.value && allowed.includes(c.value));
    if (!contribs.length) return null;
    let highest = 0;
    const counts: Record<string, number> = {};
    contribs.forEach((c) => {
      const r = STATE_RANK[c.value as string] || 0;
      highest = Math.max(highest, r);
      counts[c.value as string] = (counts[c.value as string] || 0) + 1;
    });
    const highestState =
      Object.keys(STATE_RANK).find((k) => STATE_RANK[k] === highest) || "";
    return {
      oid,
      contribs,
      highest,
      highestState,
      countAtHighest: counts[highestState] || 0,
      lowestPos: Math.min(...contribs.map((c) => Q_INDEX[c.qid])),
    };
  };

  const fillFrom = (states: string[], variant: DisplayedCard["variant"]) => {
    if (selected.length >= 3) return;
    const candidates = Object.keys(OPP_DEFS)
      .filter((oid) => !seen.has(oid))
      .map((oid) => cardStats(oid, states))
      .filter(Boolean) as NonNullable<ReturnType<typeof cardStats>>[];
    candidates.sort((a, b) => {
      if (b.highest !== a.highest) return b.highest - a.highest;
      if (b.countAtHighest !== a.countAtHighest) return b.countAtHighest - a.countAtHighest;
      return a.lowestPos - b.lowestPos;
    });
    candidates.forEach((c) => {
      if (selected.length >= 3) return;
      add(c.oid, {
        reason: "system",
        support: c.contribs.map((x) => x.qid),
        exploreOnly: false,
        variant,
        highestState: c.highestState,
      });
    });
  };

  fillFrom(["needs_attention"], "reported_concern");
  fillFrom(["could_improve"], "reported_concern");
  fillFrom(["unsure"], "clarity");

  selected.forEach((card) => {
    const useful = OPP_DEFS[card.oid].map.filter((qid) =>
      ["needs_attention", "could_improve", "unsure"].includes(responses[qid] as string)
    );
    if (useful.length) {
      card.support = [...new Set([...card.support, ...useful])];
    }
    if (card.oid === "O08") {
      const r03Active =
        ["needs_attention", "could_improve", "unsure"].includes(responses.R03 as string) ||
        priorities.includes("R03");
      const r04Active =
        ["needs_attention", "could_improve", "unsure"].includes(responses.R04 as string) ||
        priorities.includes("R04");
      if (r03Active && !r04Active) card.subvariant = "scheduling";
      else if (r04Active && !r03Active) card.subvariant = "payment";
      else card.subvariant = "combined";
    }
  });

  return selected.slice(0, 3);
}

export function specialResultState(
  responses: Record<string, AnswerValue>,
  priorities: string[]
): "all_well" | "all_unsure" | "all_na" | "many_concerns" | null {
  const vals = ALL_QUESTIONS.map((q) => responses[q.id]);
  const applicable = vals.filter((v) => v !== null && v !== "not_applicable");
  if (vals.every((v) => v === null || v === "not_applicable")) return "all_na";
  if (applicable.length > 0 && applicable.every((v) => v === "unsure")) return "all_unsure";
  if (applicable.length > 0 && applicable.every((v) => v === "working_well") && priorities.length === 0)
    return "all_well";
  const concerns = vals.filter((v) => v === "needs_attention" || v === "could_improve").length;
  if (concerns >= 8) return "many_concerns";
  return null;
}

export function isChurchOrNonprofit(orgType: OrgType | null) {
  return orgType === "church" || orgType === "nonprofit";
}
