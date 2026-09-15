/**
 * Google Form → Sheet capture for Business Friction Check.
 *
 * SETUP (Adam / Grok Build):
 * 1. Create a Google Form titled "Business Friction Check Responses".
 * 2. Add short-answer (or paragraph) questions in THIS EXACT ORDER (names matter for mapping):
 *    timestamp, quiz_version, submission_id, org_type, team_size, location, city_zip,
 *    priority_mode, priorities, displayed_opportunities,
 *    P01, P02, P03, P04, P05, W01, W02, W03, W04, W05,
 *    R01, R02, R03, R04, R05, D01, D02, D03, D04, D05,
 *    contact_request_type, contact_name, contact_org, contact_email, contact_phone,
 *    contact_method, contact_timing, contact_note, special_state
 * 3. Link responses to Sheet (or use existing Sheet
 *    "Business Friction Check Responses (proto)").
 * 4. Open the live form → View page source / Inspect pre-filled link, or open
 *    https://docs.google.com/forms/d/e/FORM_ID/viewform then
 *    formResponse URL. Collect entry.XXXXXXXX for each question.
 * 5. Paste FORM_ACTION_URL and ENTRY_IDS below (or set NEXT_PUBLIC_BFC_FORM_ACTION).
 *
 * Until entry IDs are filled, the quiz still works and stores a local backup;
 * POST is skipped when FORM_ACTION_URL is empty.
 */

export type FormFieldKey =
  | "timestamp"
  | "quiz_version"
  | "submission_id"
  | "org_type"
  | "team_size"
  | "location"
  | "city_zip"
  | "priority_mode"
  | "priorities"
  | "displayed_opportunities"
  | "P01" | "P02" | "P03" | "P04" | "P05"
  | "W01" | "W02" | "W03" | "W04" | "W05"
  | "R01" | "R02" | "R03" | "R04" | "R05"
  | "D01" | "D02" | "D03" | "D04" | "D05"
  | "contact_request_type"
  | "contact_name"
  | "contact_org"
  | "contact_email"
  | "contact_phone"
  | "contact_method"
  | "contact_timing"
  | "contact_note"
  | "special_state";

/** Live form action, e.g. https://docs.google.com/forms/d/e/XXXX/formResponse */
export const FORM_ACTION_URL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_BFC_FORM_ACTION) ||
  "https://docs.google.com/forms/d/e/1FAIpQLSeYgY9aKdPKTM72bJ_ZgROoyTjPGKpHSQJLlrETP4HMiauE7A/formResponse";

/**
 * Map logical fields → Google Form entry.NNNNNNNNN IDs.
 * Leave empty string until Form is created; quiz will not POST until both
 * FORM_ACTION_URL and required entry IDs are set.
 */
export const ENTRY_IDS: Record<FormFieldKey, string> = {
  timestamp: "entry.165713694",
  quiz_version: "entry.261939020",
  submission_id: "entry.172689779",
  org_type: "entry.1453344801",
  team_size: "entry.323819894",
  location: "entry.491633175",
  city_zip: "entry.938852809",
  priority_mode: "entry.2112231399",
  priorities: "entry.151230408",
  displayed_opportunities: "entry.621343590",
  P01: "entry.919943795", P02: "entry.1502703078", P03: "entry.1106205501", P04: "entry.1871093207", P05: "entry.262730907",
  W01: "entry.1973474928", W02: "entry.1887592500", W03: "entry.1704368330", W04: "entry.563216848", W05: "entry.1593811798",
  R01: "entry.1573427986", R02: "entry.1768331299", R03: "entry.868162955", R04: "entry.497803652", R05: "entry.1474277926",
  D01: "entry.1204044979", D02: "entry.1721432669", D03: "entry.1210907974", D04: "entry.1538873712", D05: "entry.230886490",
  contact_request_type: "entry.759368630",
  contact_name: "entry.1691239192",
  contact_org: "entry.1290947013",
  contact_email: "entry.1135535924",
  contact_phone: "entry.205509698",
  contact_method: "entry.174197010",
  contact_timing: "entry.723832181",
  contact_note: "entry.807291605",
  special_state: "entry.317154960",
};

export function formIsConfigured(): boolean {
  if (!FORM_ACTION_URL) return false;
  // Require core identity fields at minimum
  return Boolean(ENTRY_IDS.submission_id && ENTRY_IDS.org_type && ENTRY_IDS.P01);
}

export async function postToGoogleForm(
  payload: Partial<Record<FormFieldKey, string>>
): Promise<{ ok: boolean; reason?: string }> {
  if (!formIsConfigured()) {
    return { ok: false, reason: "Form not configured yet" };
  }
  const body = new URLSearchParams();
  (Object.keys(ENTRY_IDS) as FormFieldKey[]).forEach((key) => {
    const entry = ENTRY_IDS[key];
    if (!entry) return;
    body.append(entry, payload[key] ?? "");
  });
  try {
    // no-cors: Google Forms does not return CORS headers; request still lands
    await fetch(FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e) };
  }
}
