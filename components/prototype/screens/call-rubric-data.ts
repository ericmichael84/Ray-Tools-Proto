/** Index + detail payloads aligned to Figma `call-rubric-index` / `single-call-view`. */

export type CallRubricIndexRow = {
  id: string;
  client: string;
  dateShort: string;
  scores: readonly [number, number, number, number, number, number];
  totalNum: number;
  totalDen: number;
};

export const CALL_RUBRIC_INDEX_ROWS: CallRubricIndexRow[] = [
  {
    id: "sn-1",
    client: "SimpleNursing",
    dateShort: "Apr 15, 2026",
    scores: [3, 3, 4, 5, 3, 5],
    totalNum: 23,
    totalDen: 30,
  },
  {
    id: "zz-1",
    client: "Zazzle2",
    dateShort: "Apr 10, 2026",
    scores: [3, 3, 3, 5, 3, 5],
    totalNum: 22,
    totalDen: 30,
  },
  {
    id: "sn-test",
    client: "SimpleNursingTest",
    dateShort: "Apr 13, 2026",
    scores: [3, 3, 3, 5, 3, 5],
    totalNum: 22,
    totalDen: 30,
  },
  {
    id: "sn-2",
    client: "SimpleNursing",
    dateShort: "Apr 10, 2026",
    scores: [3, 3, 3, 5, 5, 5],
    totalNum: 24,
    totalDen: 30,
  },
  {
    id: "zz-2",
    client: "Zazzle",
    dateShort: "Apr 10, 2026",
    scores: [3, 2, 3, 2, 2, 2],
    totalNum: 14,
    totalDen: 30,
  },
  {
    id: "sn-brand",
    client: "SimpleNursing Brand",
    dateShort: "Apr 6, 2026",
    scores: [3, 3, 3, 3, 2, 3],
    totalNum: 17,
    totalDen: 30,
  },
  {
    id: "zz-3",
    client: "Zazzle",
    dateShort: "Apr 3, 2026",
    scores: [2, 3, 4, 3, 2, 3],
    totalNum: 17,
    totalDen: 30,
  },
];

export type CallRubricDetail = {
  id: string;
  client: string;
  dateLong: string;
  transcriptFile: string;
  totalNum: number;
  totalDen: number;
  band: string;
  tagline: string;
  scores: readonly [number, number, number, number, number, number];
  strengths: readonly string[];
  improvements: readonly string[];
};

const SIMPLE_NURSING_DETAIL: CallRubricDetail = {
  id: "sn-1",
  client: "SimpleNursing",
  dateLong: "April 15, 2026",
  transcriptFile: "(GMT20260414-163109_Recording.transcript.vtt)",
  totalNum: 23,
  totalDen: 30,
  band: "Advancing",
  tagline: "Dynamic Engagement with Strong Decision Locking",
  scores: [3, 3, 4, 5, 3, 5],
  strengths: [
    "High level of client engagement and ownership demonstrated.",
    "Effective use of reframe techniques to shape client perspectives.",
    "Strong momentum with decisive language and actionable planning.",
    "Clear grounding of discussions in data and evidence.",
  ],
  improvements: [
    "Clarify role responsibilities to ensure full alignment among all parties.",
    "Increase participation from quieter participants like Eric Zwierzynski to diversify input.",
    "Enhance reframe adoption by addressing areas where reframes were not fully accepted.",
    "Focus discussions to manage Bryan Zmijewski's talk time for balanced contributions.",
  ],
};

export function callDetailFromRow(row: CallRubricIndexRow): CallRubricDetail {
  if (row.id === "sn-1") {
    return SIMPLE_NURSING_DETAIL;
  }
  const t = row.totalNum / row.totalDen;
  const band =
    t >= 5 / 6
      ? "Leading"
      : t >= 19 / 30
        ? "Advancing"
        : t >= 13 / 30
          ? "Functional"
          : "Reactive";
  return {
    id: row.id,
    client: row.client,
    dateLong: row.dateShort,
    transcriptFile: "(sample-transcript.vtt)",
    totalNum: row.totalNum,
    totalDen: row.totalDen,
    band,
    tagline: "Assessment summary (placeholder for this call).",
    scores: row.scores,
    strengths: [
      "Client stayed engaged on priorities discussed in the call.",
      "Clear next steps captured before closing.",
    ],
    improvements: [
      "Tighten framing on ownership gaps flagged in the rubric.",
      "Balance airtime across participants where possible.",
    ],
  };
}

export function totalPillClass(totalNum: number, totalDen: number): string {
  const ratio = totalNum / totalDen;
  if (ratio >= 0.72) return "glare-total-pill";
  return "glare-total-pill glare-total-pill--caution";
}
