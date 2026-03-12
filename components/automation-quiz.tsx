"use client";

import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Quiz data
   ───────────────────────────────────────────── */

type Answer = {
  text: string;
  points: number;
  tags: AutomationArea[];
};

type Question = {
  id: string;
  question: string;
  answers: Answer[];
};

type AutomationArea =
  | "follow-up"
  | "onboarding"
  | "reporting"
  | "scheduling"
  | "delivery"
  | "admin";

const areaLabels: Record<AutomationArea, string> = {
  "follow-up": "Follow-Up & Lead Nurture",
  onboarding: "Client Onboarding",
  reporting: "Reporting & Status Updates",
  scheduling: "Scheduling & Calendar Management",
  delivery: "Delivery & Fulfillment",
  admin: "Admin & Data Entry",
};

const areaDescriptions: Record<AutomationArea, string> = {
  "follow-up":
    "You're manually chasing leads and following up with prospects. An automated follow-up sequence could recover hours every week and stop deals from slipping through the cracks.",
  onboarding:
    "Every new client means the same manual setup — welcome emails, access provisioning, kickoff scheduling. This is one of the easiest and highest-ROI things to automate.",
  reporting:
    "You're pulling data, building reports, and sending updates by hand. Automated dashboards and scheduled reports would free up significant weekly time.",
  scheduling:
    "Booking calls, rescheduling, sending reminders — it's eating your calendar. Scheduling automation eliminates the back-and-forth entirely.",
  delivery:
    "Your delivery process depends on you showing up. Templated workflows, automated handoffs, and delivery tracking can reduce your involvement to oversight only.",
  admin:
    "Data entry, invoicing, file management, and other repetitive admin tasks are taxing your day. These are almost always automatable with existing tools.",
};

const questions: Question[] = [
  {
    id: "q1",
    question: "How do you currently follow up with leads or prospects?",
    answers: [
      {
        text: "I remember when I remember. Some fall through the cracks.",
        points: 3,
        tags: ["follow-up"],
      },
      {
        text: "I have a spreadsheet or CRM, but I still send follow-ups manually.",
        points: 2,
        tags: ["follow-up"],
      },
      {
        text: "Automated sequences handle most of it.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q2",
    question: "What happens when a new client signs up?",
    answers: [
      {
        text: "I manually send a welcome email, set up their accounts, and schedule a kickoff.",
        points: 3,
        tags: ["onboarding", "admin"],
      },
      {
        text: "Some parts are templated, but I still do most of it by hand.",
        points: 2,
        tags: ["onboarding"],
      },
      {
        text: "It's mostly automated — they get onboarded without me doing much.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q3",
    question:
      "How do clients or your team know where things stand on active projects?",
    answers: [
      {
        text: "They ask me. I'm the status update.",
        points: 3,
        tags: ["reporting", "delivery"],
      },
      {
        text: "I send manual updates weekly — Slack messages, emails, or spreadsheets.",
        points: 2,
        tags: ["reporting"],
      },
      {
        text: "There's a dashboard or automated status system they can check.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q4",
    question: "How much time do you spend scheduling calls and meetings?",
    answers: [
      {
        text: "Way too much. Back-and-forth emails every week.",
        points: 3,
        tags: ["scheduling", "admin"],
      },
      {
        text: "I use Calendly or similar, but still coordinate a lot manually.",
        points: 1,
        tags: ["scheduling"],
      },
      {
        text: "Scheduling is fully automated — I just show up.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q5",
    question:
      "If you disappeared for a week, would client delivery keep running?",
    answers: [
      {
        text: "Absolutely not. I am the delivery.",
        points: 3,
        tags: ["delivery"],
      },
      {
        text: "Some things would continue, but critical pieces would stall.",
        points: 2,
        tags: ["delivery", "admin"],
      },
      {
        text: "Yes — systems and team handle it without me.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q6",
    question: "How do you handle invoicing, proposals, and contracts?",
    answers: [
      {
        text: "I create each one from scratch or copy-paste from old ones.",
        points: 3,
        tags: ["admin"],
      },
      {
        text: "I use templates but still manually fill in details and send them.",
        points: 2,
        tags: ["admin"],
      },
      {
        text: "Mostly automated — triggered by events or self-serve.",
        points: 0,
        tags: [],
      },
    ],
  },
  {
    id: "q7",
    question: "How many different tools do you check daily to run your business?",
    answers: [
      {
        text: "5+ tools, and I'm the one moving data between them.",
        points: 3,
        tags: ["admin", "reporting"],
      },
      {
        text: "3–4 tools. Some are connected, but I still do a lot of copy-pasting.",
        points: 2,
        tags: ["admin"],
      },
      {
        text: "My stack is integrated — data flows where it needs to go.",
        points: 0,
        tags: [],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Quiz component
   ───────────────────────────────────────────── */

function computeResults(selections: Record<string, number>) {
  let totalPoints = 0;
  const tagCounts: Record<AutomationArea, number> = {
    "follow-up": 0,
    onboarding: 0,
    reporting: 0,
    scheduling: 0,
    delivery: 0,
    admin: 0,
  };

  for (const [qIndex, aIndex] of Object.entries(selections)) {
    const q = questions[Number(qIndex)];
    const a = q.answers[aIndex];
    totalPoints += a.points;
    for (const tag of a.tags) {
      tagCounts[tag]++;
    }
  }

  const topAreas = (Object.entries(tagCounts) as [AutomationArea, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area]) => area);

  return { totalPoints, topAreas };
}

function getVerdict(points: number): { headline: string; body: string } {
  if (points >= 16) {
    return {
      headline: "You're running a manual operation.",
      body: "Almost every major area of your business has automation potential. You're probably spending 10–15+ hours a week on things a system could handle. The good news: you have massive upside waiting. The Diagnostic will show you exactly where to start.",
    };
  }
  if (points >= 10) {
    return {
      headline: "You've got real automation gaps.",
      body: "Some parts of your operation are working, but you're still the bottleneck in key areas. A focused audit would help you identify which 2–3 automations will free up the most time — and which ones to skip.",
    };
  }
  if (points >= 5) {
    return {
      headline: "You're partly automated — but there's leverage left.",
      body: "You've done some of the work, but there are still manual processes costing you hours every week. The Diagnostic can help you find the remaining high-leverage moves.",
    };
  }
  return {
    headline: "You're in good shape.",
    body: "Your systems are doing most of the heavy lifting. If you're still feeling operational drag, the bottleneck might be architectural rather than task-level — and that's exactly what the Diagnostic is designed to uncover.",
  };
}

export function AutomationQuiz() {
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const answered = Object.keys(selections).length;
  const allAnswered = answered === questions.length;

  function selectAnswer(qIndex: number, aIndex: number) {
    if (showResults) return;
    setSelections((prev) => ({ ...prev, [qIndex]: aIndex }));
  }

  function handleShowResults() {
    if (!allAnswered) return;
    setShowResults(true);
  }

  function handleReset() {
    setSelections({});
    setShowResults(false);
  }

  if (showResults) {
    const { totalPoints, topAreas } = computeResults(selections);
    const verdict = getVerdict(totalPoints);

    return (
      <div className="quiz-results">
        <div className="quiz-results__header">
          <p className="eyebrow">Your Results</p>
          <h3>{verdict.headline}</h3>
          <p className="quiz-results__body">{verdict.body}</p>
        </div>

        {topAreas.length > 0 && (
          <div className="quiz-results__areas">
            <h4>Your top automation opportunities:</h4>
            <div className="quiz-area-cards">
              {topAreas.map((area, i) => (
                <div className="quiz-area-card surface-card" key={area}>
                  <span className="quiz-area-rank">#{i + 1}</span>
                  <h5>{areaLabels[area]}</h5>
                  <p>{areaDescriptions[area]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="quiz-results__cta">
          <p>
            This quiz shows you <em>where</em> to look. The Diagnostic shows you{" "}
            <em>exactly what to build</em>, in what order, and why — customized
            to your specific business.
          </p>
          <div className="quiz-cta-row">
            <Link className="button button-primary" href="#apply">
              Book Your Diagnostic — $297 →
            </Link>
            <button
              className="button button-secondary"
              onClick={handleReset}
              type="button"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <div
          className="quiz-progress__bar"
          style={{ width: `${(answered / questions.length) * 100}%` }}
        />
      </div>
      <p className="quiz-counter">
        {answered} of {questions.length} answered
      </p>

      <div className="quiz-questions">
        {questions.map((q, qIndex) => (
          <div
            className={`quiz-question ${selections[qIndex] !== undefined ? "quiz-question--answered" : ""}`}
            key={q.id}
          >
            <p className="quiz-question__number">
              {String(qIndex + 1).padStart(2, "0")}
            </p>
            <p className="quiz-question__text">{q.question}</p>
            <div className="quiz-answers">
              {q.answers.map((a, aIndex) => (
                <button
                  className={`quiz-answer ${selections[qIndex] === aIndex ? "quiz-answer--selected" : ""}`}
                  key={a.text}
                  onClick={() => selectAnswer(qIndex, aIndex)}
                  type="button"
                >
                  {a.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="quiz-submit-row">
          <button
            className="button button-primary"
            onClick={handleShowResults}
            type="button"
          >
            See My Results →
          </button>
        </div>
      )}
    </div>
  );
}
