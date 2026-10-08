import type { ReactNode } from "react";
import type { GameSlug } from "@/content/games-page";

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
  /** What the games page says about the game is kept per language under this slug (content/games-page.ts). */
  slug: GameSlug;
  /** Key into the "games" namespace: the game's name and its home-page card, in every language. */
  i18nKey: string;
  name: string;
  accent: string;
  glyph: ReactNode;
  image: string;
  /** Card copy on the landing page. */
  blurb: string;
  players: string;
  mode: string;
  /** The blog guide that covers this game in full. The games page is the hub; these are
   *  the spokes, and they were sitting in the sitemap with nothing linking to them. */
  guideHref: string;
}

export const GAMES: GameEntry[] = [
  {
    slug: "tic-tac-toe",
    i18nKey: "ticTacToe",
    name: "Tic-Tac-Toe",
    accent: "#dc685a",
    glyph: <TicTacToeGlyph />,
    image: "/assets/games/tic-tac-toe.png",
    blurb: "Three in a row. Quick enough to fit between two episodes.",
    players: "2 players",
    mode: "Turn-based",
    guideHref: "/blog/play-tic-tac-toe-online-with-friends",
  },
  {
    slug: "connect-4",
    i18nKey: "connect4",
    name: "Connect 4",
    accent: "#3b82f6",
    glyph: <ConnectFourGlyph />,
    image: "/assets/games/connect-4.png",
    blurb: "Drop discs and line up four. The longer of the two head-to-head games.",
    players: "2 players",
    mode: "Turn-based",
    guideHref: "/blog/play-connect-4-online-with-friends",
  },
  {
    slug: "jigsaw",
    i18nKey: "jigsaw",
    name: "Jigsaw Puzzle",
    accent: "#8b5cf6",
    glyph: <JigsawGlyph />,
    image: "/assets/games/jigsaw.png",
    blurb: "One picture, everyone placing pieces. The calm one for a long call.",
    players: "Up to 8",
    mode: "Co-op",
    guideHref: "/blog/online-jigsaw-puzzle-with-friends",
  },
];
