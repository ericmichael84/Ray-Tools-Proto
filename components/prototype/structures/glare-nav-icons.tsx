import type { ScreenId } from "@/lib/prototype/types";

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex size-[18px] shrink-0 items-center justify-center text-current"
      aria-hidden
    >
      {children}
    </span>
  );
}

/** Line-style icons aligned to Glare Playground nav density (18px). */
export function GlareNavIcon({ screen }: { screen: ScreenId }) {
  switch (screen) {
    case "dashboard":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <path
              d="M2.5 9.5h4v6h-4v-6zm4.5-7h4v13h-4V2.5zm4.5 4h4v9h-4v-9z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      );
    case "call-rubric":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <path
              d="M4.5 3.5h9v11h-9v-11z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 6.5h5M6.5 9h5M6.5 11.5h3"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </IconBox>
      );
    case "data-comparison":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <path
              d="M3 4.5h5.5v9H3v-9zm6.5 0h5.5v4H9.5v-4zm0 5h5.5v4H9.5v-4z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      );
    case "signal-generator":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <path
              d="M9 2.5l1.2 3.7h3.8l-3 2.3 1.1 3.5L9 9.5l-3.1 2.5 1.1-3.5-3-2.3h3.8L9 2.5z"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 14.5h9"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </IconBox>
      );
    case "design-analysis":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <circle
              cx="8"
              cy="8"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              d="M11.5 11.5L15 15"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </IconBox>
      );
    case "settings":
      return (
        <IconBox>
          <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
            <path
              d="M9 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M14.2 11.5l-.6 1.1 1 .9-1.4 2.4-1.2-.4-1 .9-1.3-.6-1.8 1.5-1.8-1.5-1.3.6-1-.9-1.2.4-1.4-2.4 1-.9-.6-1.1.2-2.3h2.3l.2-2.3 1.1-.6-.9-1 2.4-1.4.4 1.2.9 1 .6 1.3-1.5 1.8 1.5 1.8.6 1.3.9 1 .4 1.2 2.4 1.4-.9 1 .6 1.1-.2 2.3h-2.3z"
              stroke="currentColor"
              strokeWidth="1.05"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      );
  }
}
