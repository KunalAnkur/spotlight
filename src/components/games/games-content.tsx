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
  /** Key into the "games" namespace, for the translated home-page card. */
  i18nKey: string;
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
  /** Longer copy for the games page detail row. */
  detail: string;
  /** One concrete piece of play advice — the reason the row is worth reading. */
  tip: string;
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
    imageAlt:
      "Online Tic-Tac-Toe in a Movmash room: a 3 by 3 board with X and O marks",
    blurb: "Three in a row. Quick enough to fit between two episodes.",
    shortBlurb: "Three in a row. About a minute a round.",
    players: "2 players",
    mode: "Turn-based",
    detail:
      "The one everybody already knows, which is exactly why it works as a warm-up. A round lasts about a minute, so it fills the gap while the last person is still finding the link, and it never needs explaining to anyone.",
    tip: "Take the centre square if you go first. It sits on four of the eight winning lines, twice as many as any corner, and it is the single move that most often decides an otherwise drawn game.",
    guideHref: "/blog/play-tic-tac-toe-online-with-friends",
  },
  {
    slug: "connect-4",
    i18nKey: "connect4",
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
    detail:
      "The longer head-to-head game, and the one with actual depth. Matches run five to ten minutes, which makes it the better fit for a proper break between episodes rather than a gap-filler between them.",
    tip: "Play the centre column early. Discs there contribute to more possible fours than any other column, and controlling it forces your opponent to react to you for the rest of the match.",
    guideHref: "/blog/play-connect-4-online-with-friends",
  },
  {
    slug: "jigsaw",
    i18nKey: "jigsaw",
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
    detail:
      "The calm one, and the only game here that scales past two people. Up to eight can work the same board at once, with difficulty levels and a choice of picture, so it stretches to fill a long call instead of ending in a minute.",
    tip: "Split the board rather than all digging through the same pile. One person on edges while everyone else claims a colour region is far faster than eight people racing for the same piece.",
    guideHref: "/blog/online-jigsaw-puzzle-with-friends",
  },
];
