import type { ReactNode } from "react";

/**
 * The arcade in the app — where you actually play. Every "play this" affordance on the
 * marketing site points here, so it lives in one place rather than being retyped per link.
 */
export const PLAY_URL = "https://app.movmash.com/games";

/**
 * One entry per game in the arcade. Accent and glyph mirror each game's own manifest in
 * @movmash/arcade-client, so a game reads the same here as it does inside the room.
 *
 * Screenshots are pre-cropped to 5:4 from the room captures in /game-ss, which is the ratio
 * the card and the detail row both render at — no CSS crop math to keep in sync.
 */

const glyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
};

const TicTacToeGlyph = () => (
  <svg {...glyphProps} aria-hidden="true">
    <path d="M9 3v18 M15 3v18 M3 9h18 M3 15h18" />
  </svg>
);

const ConnectFourGlyph = () => (
  <svg {...glyphProps} aria-hidden="true">
    <path d="M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6 M12 14a3 3 0 1 1 0 6 3 3 0 0 1 0-6 M5 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6 M19 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6" />
  </svg>
);

const JigsawGlyph = () => (
  <svg {...glyphProps} aria-hidden="true">
    <path d="M3 3h6a3 3 0 0 1 6 0h6v6a3 3 0 0 0 0 6v6h-6a3 3 0 0 1-6 0H3V3z" />
  </svg>
);

export interface GameEntry {
  slug: string;
  name: string;
  accent: string;
  glyph: ReactNode;
  image: string;
  imageAlt: string;
  /** Card copy on the landing page. */
  blurb: string;
  /** Card copy on the games page, where the surrounding text already sets the scene. */
  shortBlurb: string;
  players: string;
  mode: string;
}

export const GAMES: GameEntry[] = [
  {
    slug: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    accent: "#dc685a",
    glyph: <TicTacToeGlyph />,
    image: "/assets/games/tic-tac-toe.png",
    imageAlt:
      "Online Tic-Tac-Toe in a Movmash room: a 3 by 3 board with X and O marks",
    blurb: "Three in a row. Quick enough to fit between two episodes.",
    shortBlurb: "Three in a row. About a minute a round.",
    players: "2 players",
    mode: "Turn-based",
  },
  {
    slug: "connect-4",
    name: "Connect 4",
    accent: "#3b82f6",
    glyph: <ConnectFourGlyph />,
    image: "/assets/games/connect-4.png",
    imageAlt:
      "Connect 4 online multiplayer on Movmash: a blue board with red and yellow discs",
    blurb: "Drop discs and line up four. The longer of the two head-to-head games.",
    shortBlurb: "Drop discs, line up four. The longer match.",
    players: "2 players",
    mode: "Turn-based",
  },
  {
    slug: "jigsaw",
    name: "Jigsaw Puzzle",
    accent: "#8b5cf6",
    glyph: <JigsawGlyph />,
    image: "/assets/games/jigsaw.png",
    imageAlt:
      "Co-op online jigsaw puzzle on Movmash: loose pieces on the left, a partly solved grid on the right",
    blurb: "One picture, everyone placing pieces. The calm one for a long call.",
    shortBlurb: "One picture, up to eight people solving it.",
    players: "Up to 8",
    mode: "Co-op",
  },
];
