import { defaultLocale, type Locale } from "@/i18n/config";
import * as ar from "@/content/landing-translations/ar";
import * as es from "@/content/landing-translations/es";
import * as tr from "@/content/landing-translations/tr";

/** The games in the arcade. A game added to GAMES needs its words here, in every language. */
export type GameSlug = "tic-tac-toe" | "connect-4" | "jigsaw";

/** What the site says about one game beyond its name, which lives with the home-page cards. */
export interface GameCopy {
  /** Card copy on the games page, where the surrounding text already sets the scene. */
  shortBlurb: string;
  imageAlt: string;
  /** Longer copy for the games page detail row. */
  detail: string;
  /** One concrete piece of play advice — the reason the row is worth reading. */
  tip: string;
}

/** Every word on the games page, in one language. */
export interface GamesPageCopy {
  // No "| Movmash" suffix: the root layout's title template already appends it on child routes.
  metadataTitle: string;
  metadataDescription: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  /** The name of the list of games in the page's structured data. */
  listName: string;
  kicker: string;
  title: string;
  titleAccent: string;
  intro: string;
  cta: string;
  videoLabel: string;
  /** Read out for a game card. {name} is the game. */
  cardLabel: string;
  liveTitle: string;
  liveTitleLink: string;
  liveCopy: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overview: string[];
  detailsTitle: string;
  detailsCopy: string;
  worthKnowing: string;
  /** {name} is the game. */
  play: string;
  readGuide: string;
  /** The line under the games. {guide} and {watch} become links carrying the two labels below. */
  broader: string;
  /** The same line where the guide is not published in this language yet. */
  broaderWithoutGuide: string;
  broaderGuideLabel: string;
  broaderWatchLabel: string;
  stepsTitle: string;
  steps: { title: string; description: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  games: Record<GameSlug, GameCopy>;
}

const en: GamesPageCopy = {
  metadataTitle: "Online Games to Play with Friends | Free, No Download",
  metadataDescription:
    "Free online games you can play with friends in one link — Tic-Tac-Toe, Connect 4 and a co-op jigsaw puzzle. In the browser, no download, no sign-up for guests.",
  breadcrumbHome: "Home",
  breadcrumbName: "Games",
  listName: "Online games to play with friends on Movmash",
  kicker: "Games · Free · No download",
  title: "Online games to play with friends,",
  titleAccent: "in one link.",
  intro:
    "Games that run inside a Movmash room. Send the link, your friend opens it in any browser, and you play. No app, no sign-up for guests, no cost.",
  cta: "Open a room and play",
  videoLabel: "Movmash demo video",
  cardLabel: "Play {name} on Movmash",
  liveTitle: "Three games live now,",
  liveTitleLink: "more on the way",
  liveCopy: "Every one of them is free, browser-based, and opens inside the room you are already in.",
  overviewEyebrow: "Why in the room",
  overviewTitle: "What playing games together online actually needs.",
  overview: [
    "Playing a game with someone in another city is rarely blocked by the game itself — it is blocked by everything around it. One of you has an account, the other does not. The app is on the wrong platform. There is a download, then an update, then a login, and by the time everyone is finally in, the twenty minutes you actually had together is gone.",
    "That overhead is why so many long-distance game nights quietly stop happening. The games on Movmash are built the other way round: they run inside the room you are already in, in the browser, on the same link you were using to watch something. Nobody installs anything and guests do not make an account.",
    "That also means you are not choosing between watching and playing. The room does both. Put something on, play a round of Connect 4 while the next episode loads, go back to the film — same tab, same people, nothing closed or reopened in between.",
    "All three games are on the free plan. Paid plans raise room size, watch time, video calls and screen-share quality; they do not gate the games or add extra ones.",
  ],
  detailsTitle: "A closer look at each one",
  detailsCopy: "What each game is actually like to play, and one thing worth knowing before you start.",
  worthKnowing: "Worth knowing:",
  play: "Play {name}",
  readGuide: "Read the full guide",
  broader:
    "Want the broader version? {guide} covers the setup end to end, and {watch} covers the video side of the same room.",
  broaderWithoutGuide: "For the video side of the same room, see {watch}.",
  broaderGuideLabel: "How to play games together online",
  broaderWatchLabel: "watching together online",
  stepsTitle: "Starting a game takes about a minute",
  steps: [
    {
      title: "Open a room",
      description:
        "Sign in with Google and start a room. You do not need to decide between watching and playing — the games live in the same room either way.",
    },
    {
      title: "Send the link",
      description:
        "Share it however you normally talk. Whoever opens it joins in the browser with no account and no install, on a phone or a computer.",
    },
    {
      title: "Pick a game",
      description:
        "Open the arcade inside the room and choose. Head-to-head games start as soon as the second player is in; the jigsaw takes as many as eight.",
    },
  ],
  faqTitle: "Questions about playing together",
  faqs: [
    {
      question: "Are the games free?",
      answer:
        "Yes, all three are on the free plan, with no trial and no per-game charge. Paid plans add room size, watch time, video calls and screen-share quality — they do not unlock games or add extra ones.",
    },
    {
      question: "Do my friends need an account to play?",
      answer:
        "No. Guests join from the browser with the room link and start playing straight away. Only the person creating the room signs in, with Google, so the room stays tied to them.",
    },
    {
      question: "Do we need to download anything?",
      answer:
        "No. Every game runs in the browser on desktop and mobile. There is nothing to install, nothing to update, and nothing that only works on one platform.",
    },
    {
      question: "How many people can play at once?",
      answer:
        "Tic-Tac-Toe and Connect 4 are two-player, turn-based games. The jigsaw is co-op and takes up to eight people working the same board at the same time.",
    },
    {
      question: "Can we watch something and play in the same room?",
      answer:
        "Yes, and that is the point of putting them in the room rather than on a separate site. Play between episodes or while people are still arriving, then go back to the video without closing anything.",
    },
    {
      question: "Can we play on a phone?",
      answer:
        "Yes. The games work in a mobile browser with the same room link, so it does not matter if one person is on a laptop and the other is on a phone.",
    },
    {
      question: "What games are you adding next?",
      answer:
        "More are in progress. The three here are the ones that are live and stable today — we would rather list what actually works than a roadmap you cannot play yet.",
    },
  ],
  games: {
    "tic-tac-toe": {
      shortBlurb: "Three in a row. About a minute a round.",
      imageAlt: "Online Tic-Tac-Toe in a Movmash room: a 3 by 3 board with X and O marks",
      detail:
        "The one everybody already knows, which is exactly why it works as a warm-up. A round lasts about a minute, so it fills the gap while the last person is still finding the link, and it never needs explaining to anyone.",
      // The guide this row links to says the same, and why: after a corner the only reply that
      // does not lose is the centre, after the centre there are four. (This used to recommend
      // the centre as sitting on "twice as many lines as any corner" — a corner sits on three.)
      tip: "Open in a corner if you go first. It leaves your opponent exactly one reply that holds the draw — the centre — so it wins more games against a careless opponent than any other first move.",
    },
    "connect-4": {
      shortBlurb: "Drop discs, line up four. The longer match.",
      imageAlt: "Connect 4 online multiplayer on Movmash: a blue board with red and yellow discs",
      detail:
        "The longer head-to-head game, and the one with actual depth. Matches run five to ten minutes, which makes it the better fit for a proper break between episodes rather than a gap-filler between them.",
      tip: "Play the centre column early. Discs there contribute to more possible fours than any other column, and controlling it forces your opponent to react to you for the rest of the match.",
    },
    jigsaw: {
      shortBlurb: "One picture, up to eight people solving it.",
      imageAlt:
        "Co-op online jigsaw puzzle on Movmash: loose pieces on the left, a partly solved grid on the right",
      detail:
        "The calm one, and the only game here that scales past two people. Up to eight can work the same board at once, with difficulty levels and a choice of picture, so it stretches to fill a long call instead of ending in a minute.",
      tip: "Split the board rather than all digging through the same pile. One person on edges while everyone else claims a colour region is far faster than eight people racing for the same piece.",
    },
  },
};

const pages: Record<Locale, GamesPageCopy> = { en, tr: tr.gamesPage, es: es.gamesPage, ar: ar.gamesPage };

/** The games page in one language. */
export function getGamesPage(locale: Locale): GamesPageCopy {
  return pages[locale] ?? pages[defaultLocale];
}
