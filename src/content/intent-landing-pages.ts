import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  FileVideo,
  Heart,
  Link2,
  LockKeyhole,
  MessageCircle,
  MonitorPlay,
  PlayCircle,
  ScreenShare,
  Share2,
  Shield,
  Sparkles,
  Tv2,
  Users,
} from "lucide-react";

export interface IntentLandingPageBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IntentLandingPageScenario {
  title: string;
  description: string;
}

export interface IntentLandingPageStep {
  title: string;
  description: string;
}

export interface IntentLandingPageFaq {
  question: string;
  answer: string;
}

/**
 * Prose block. Card blurbs alone read as a feature list rather than an answer, so pages
 * competing for an explainer query carry a few real paragraphs too.
 */
export interface IntentLandingPageOverview {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

/** One of the ways a room can put a video on everyone's screen. */
export interface IntentLandingPageMode {
  icon: LucideIcon;
  name: string;
  summary: string;
  bestFor: string;
  needs: string;
  limit: string;
}

export interface IntentLandingPagePlatformGroup {
  label: string;
  items: string[];
  note: string;
}

/**
 * Hub links out to the blog guides that cover a topic in depth.
 *
 * The intent page targets the broad term and hands the specific ones to the articles, which
 * is also the only inbound link several of them have — they were indexed but unranked with
 * nothing pointing at them.
 */
export interface IntentLandingPageGuide {
  title: string;
  description: string;
  href: string;
}

export interface IntentLandingPageLink {
  title: string;
  description: string;
  href: string;
}

export interface IntentLandingPageData {
  slug: string;
  metadataTitle: string;
  metadataDescription: string;
  metadataKeywords: string[];
  kicker: string;
  title: string;
  titleAccent?: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  heroSignals: string[];
  mediaType: "video" | "image";
  mediaSrc?: string;
  mediaAlt: string;
  mediaCaption: string;
  overview?: IntentLandingPageOverview;
  modesEyebrow?: string;
  modesTitle?: string;
  modesCopy?: string;
  modes?: IntentLandingPageMode[];
  platformsEyebrow?: string;
  platformsTitle?: string;
  platformsCopy?: string;
  platformGroups?: IntentLandingPagePlatformGroup[];
  benefitEyebrow: string;
  benefitTitle: string;
  benefitCopy: string;
  benefits: IntentLandingPageBenefit[];
  scenarioEyebrow: string;
  scenarioTitle: string;
  scenarioCopy: string;
  scenarios: IntentLandingPageScenario[];
  stepsEyebrow: string;
  stepsTitle: string;
  stepsCopy: string;
  steps: IntentLandingPageStep[];
  faqs: IntentLandingPageFaq[];
  guidesEyebrow?: string;
  guidesTitle?: string;
  guidesCopy?: string;
  guides?: IntentLandingPageGuide[];
  exploreTitle: string;
  exploreLinks: IntentLandingPageLink[];
  finalTitle: string;
  finalCopy: string;
  finalSignals: string[];
}

export const watchTogetherPageData: IntentLandingPageData = {
  slug: "watch-together",
  metadataTitle: "Watch Together Online — Free, No Download",
  metadataDescription:
    "Watch together online in a private room — a synced video link, your screen, or your own files. Friends join from any browser with one link. No download, free to start.",
  metadataKeywords: [
    "watch together",
    "watch together online",
    "watch movies together online",
    "watch party online",
    "watch together app",
    "watch together website",
    "watch together local files",
    "watch together screen share",
  ],
  kicker: "Watch together",
  title: "Watch together online",
  titleAccent: "with anyone, from any browser.",
  intro:
    "Movmash is a watch together website: open a private room, share one link, and watch movies, shows, or videos at the same time with synced playback, chat, and reactions. Guests join in the browser — nothing to install.",
  ctaLabel: "Start Watching Together",
  ctaHref: "https://app.movmash.com",
  secondaryCtaLabel: "See how it works",
  secondaryCtaHref: "/#how-it-works",
  heroSignals: ["Watch together online", "Private room links", "No app install"],
  mediaType: "video",
  mediaAlt: "Movmash demo video showing a synced watch room with chat and reactions",
  mediaCaption:
    "A Movmash room keeps the video clear, the join flow simple, and the conversation close to the moment on screen.",

  overview: {
    eyebrow: "What it means",
    title: "What watching together online actually involves.",
    paragraphs: [
      "Watching something together online sounds simple until you try it. Two people press play on the same video a few seconds apart and spend the rest of the night nudging each other back into sync. Someone screen shares and the audio does not come through. Someone else is on a phone and the link will not open. The film is not the hard part — staying on the same second is.",
      "A watch together site solves this by keeping one shared clock. Instead of everyone controlling their own copy, the room holds a single playback position. When one person pauses, everyone pauses. When someone joins twenty minutes late, they land exactly where the room already is rather than at the beginning. That is the whole difference between watching at the same time and genuinely watching together online.",
      "Movmash puts that shared clock in a private room you open in a browser tab. You choose how the video gets there — a supported link, your screen, or a file already on your computer — and everything else stays the same: one room, one link, synced playback, chat and reactions alongside the video instead of in a separate app.",
      "Guests do not need an account and nobody installs anything. You send a link, they open it, and the room is running. Creating the room takes a Google sign-in so it stays yours; joining one takes nothing at all.",
    ],
  },

  modesEyebrow: "Three ways to watch",
  modesTitle: "Pick how the video gets on screen.",
  modesCopy:
    "Different nights need different setups. A supported link is the smoothest path, screen sharing covers the services that do not allow direct embedding, and local files cover everything that never went online in the first place.",
  modes: [
    {
      icon: Link2,
      name: "Paste a supported link",
      summary:
        "Drop in a URL from a supported platform and the room handles playback for everyone at once. This is the cleanest option: each person streams the video themselves at their own quality, while the room keeps the timeline shared.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion and direct HLS streams",
      needs: "Just the link",
      limit: "Only works with platforms that allow embedded playback",
    },
    {
      icon: ScreenShare,
      name: "Share your screen",
      summary:
        "Play the video on your own machine and broadcast it into the room. Because the room is showing your screen rather than embedding a service, this is what covers subscription platforms that block direct embedding.",
      bestFor: "Netflix, Disney+, Prime Video and anything else in a browser",
      needs: "A browser tab, window, or full screen to share",
      limit: "Share a browser tab for working audio — window and full-screen shares often drop it",
    },
    {
      icon: FileVideo,
      name: "Stream a local file",
      summary:
        "Play a video file straight from your computer into the room. The file is streamed to the people in the room as it plays and is never uploaded to or stored on our servers.",
      bestFor: "Downloads, home videos, edits, and anything not on a streaming service",
      needs: "A video file on the hosting computer",
      limit: "The host has to stay in the room, since the file is playing from their machine",
    },
  ],

  benefitEyebrow: "Why it works better",
  benefitTitle: "People settle in fast.",
  benefitCopy:
    "The room feels familiar quickly, so people can stop figuring things out and start watching.",
  benefits: [
    {
      icon: PlayCircle,
      title: "Stay on the same second",
      description:
        "The room holds one playback position for everyone. Pause, seek, or join late and it stays shared, so nobody reacts to a scene the rest of the room has not reached yet.",
    },
    {
      icon: Users,
      title: "Guests join fast",
      description:
        "Send one link and bring people in without turning movie night into setup time. No account, no download, no permissions to talk anyone through.",
    },
    {
      icon: MonitorPlay,
      title: "Flexible when plans change",
      description:
        "If a link will not embed, switch to screen sharing. If the file never went online, stream it locally. You are not stuck with one method for the whole night.",
    },
    {
      icon: MessageCircle,
      title: "Conversation stays close",
      description:
        "Chat and reactions sit next to the video rather than in a separate app, so nobody is watching in one window and talking in another.",
    },
  ],

  scenarioEyebrow: "Use it for",
  scenarioTitle: "Built for more than one kind of night.",
  scenarioCopy:
    "The same room works whether it is two people three time zones apart or a group catching the same episode on release night.",
  scenarios: [
    {
      title: "Movie night with friends",
      description:
        "Pick something, share the room link, and start together instead of counting down over a group chat and hoping everyone hits play at once.",
    },
    {
      title: "Episode drops and rewatches",
      description:
        "Watch series together the night they land, or go back through an old favourite with the people who quote it best.",
    },
    {
      title: "Long-distance viewing",
      description:
        "Keep a standing night with a partner, sibling, or friend in another country when the alternative is texting through the same film separately.",
    },
  ],

  platformsEyebrow: "What you can watch",
  platformsTitle: "Works with the sources you already use.",
  platformsCopy:
    "Some platforms play directly in the room. Others do not allow embedded playback anywhere — those are what screen sharing is for, and it covers effectively any service you can open in a browser.",
  platformGroups: [
    {
      label: "Plays directly from a link",
      items: ["YouTube", "Vimeo", "Twitch", "Dailymotion", "Direct HLS streams"],
      note: "Paste the URL and the room syncs playback for everyone.",
    },
    {
      label: "Watch via screen share",
      items: ["Netflix", "Disney+", "Prime Video", "Max", "Hulu", "Crunchyroll"],
      note: "These block embedded playback, so you share the tab instead. Everyone needs their own subscription.",
    },
    {
      label: "Straight from your computer",
      items: ["MP4 and MKV files", "Downloads", "Home videos", "Personal edits"],
      note: "Streamed from your machine to the room. Never uploaded, never stored on our servers.",
    },
  ],

  stepsEyebrow: "How it works",
  stepsTitle: "Open Movmash, share one link, press play.",
  stepsCopy:
    "Three steps, and only the first one needs an account. From a cold start most rooms are watching inside a minute.",
  steps: [
    {
      title: "Open a room",
      description:
        "Sign in with Google and create a room. Pick whether you are pasting a link, sharing your screen, or playing a local file.",
    },
    {
      title: "Share one link",
      description:
        "Send the room link however you already talk — chat, DM, group thread. Guests open it in any browser and are in, with no account and no install.",
    },
    {
      title: "Press play together",
      description:
        "Playback stays shared from that point on. Pause for snacks, rewind the line nobody caught, and the whole room moves with you.",
    },
  ],

  faqs: [
    {
      question: "How do I watch a movie together online with friends?",
      answer:
        "Open a room on Movmash, choose your source, and send the room link to whoever is joining. They open it in a browser and land in the room already synced to wherever you are. If the film is on a service that does not allow embedding, share your browser tab instead of pasting a link — the rest works the same.",
    },
    {
      question: "Do guests need an account to watch together?",
      answer:
        "No. Guests join from the browser with the room link and nothing else. Creating a room takes a Google sign-in so the room stays tied to you, but the people you invite never have to sign up.",
    },
    {
      question: "Is Movmash free?",
      answer:
        "Yes, there is a free plan and you can start a room on it without paying. Free rooms are built for two people, which covers most long-distance watching. Paid plans are what raise the participant limit past that, along with watch time, video calls, and screen-share quality.",
    },
    {
      question: "How many people can watch together in one room?",
      answer:
        "Free rooms support two participants. Premium rooms are built for larger groups of more than fifty, so a whole friend group can watch together in the same room.",
    },
    {
      question: "Can we watch Netflix or Disney+ together?",
      answer:
        "Yes, through screen sharing. Subscription services block embedded playback everywhere, so no watch party tool can pull them in from a link. Share your browser tab and the room sees what you see. Everyone still needs their own subscription to the service.",
    },
    {
      question: "Can I watch local video files with friends?",
      answer:
        "Yes. You can stream a video file straight from your computer into the room, which covers downloads, home videos, and anything that was never on a streaming service. The file is streamed as it plays — we never upload or store it on our servers.",
    },
    {
      question: "Do I need to download an app?",
      answer:
        "No. Movmash runs in the browser on desktop and mobile. There is nothing to install for the host or for guests, which is usually the difference between a night that starts and a night that turns into troubleshooting.",
    },
    {
      question: "Why does my screen share have no sound?",
      answer:
        "Almost always because a window or full screen was shared instead of a browser tab. Tab sharing is the only mode that reliably carries audio, so if people can see the video but not hear it, stop the share and pick the specific tab instead.",
    },
    {
      question: "Does the room stay private?",
      answer:
        "Yes. Rooms are private by default and only reachable by people who have the invite link. There is no public directory and nothing is listed or browsable.",
    },
    {
      question: "Can we watch together on a phone?",
      answer:
        "Yes. Guests can join and watch from a mobile browser with the same link. Hosting is more comfortable on a computer, especially if you are screen sharing or streaming a local file.",
    },
    {
      question: "What can we do besides watch?",
      answer:
        "Every room has chat and reactions, and there are games you can play in the same room without leaving it — Tic-Tac-Toe, Connect 4, and a co-op jigsaw. They are on the free plan, which makes them a decent way to fill the gap while everyone is still arriving.",
    },
  ],

  exploreTitle: "Explore more",
  exploreLinks: [
    {
      title: "Long-distance date night",
      description: "See the warmer two-person version of the same room flow.",
      href: "/long-distance-date-night",
    },
    {
      title: "Games to play together",
      description: "Free browser games that run inside the room you are already in.",
      href: "/games",
    },
    {
      title: "Movmash blog",
      description: "Browse practical guides and shared-watching ideas.",
      href: "/blog",
    },
  ],
  finalTitle: "Open a room and watch together tonight.",
  finalCopy:
    "Movmash keeps shared watching simple, clear, and easy to start from the first click.",
  finalSignals: ["Private room links", "No downloads required", "Works in the browser"],
};

export const longDistanceDateNightPageData: IntentLandingPageData = {
  slug: "long-distance-date-night",
  metadataTitle: "Long Distance Date Night | Free for Two",
  metadataDescription:
    "Watch movies together long distance in a private room for two — synced playback, chat and reactions. Free for two people, works in any browser, nothing to install.",
  metadataKeywords: [
    "long distance date night",
    "ldr date night",
    "watch movies together long distance",
    "virtual movie date",
    "watch together for couples",
    "long distance relationship movie night",
    "online movie date",
    "couple movie watching website",
  ],
  kicker: "Long-distance date night",
  title: "Long-distance date night",
  titleAccent: "that actually feels like a date.",
  intro:
    "Open a private room for two, share one link, and watch movies together long distance with synced playback, chat and reactions. Rooms for two are free, and the person joining does not need an account.",
  ctaLabel: "Start Your Date Night Room",
  ctaHref: "https://app.movmash.com",
  secondaryCtaLabel: "See how it works",
  secondaryCtaHref: "/#how-it-works",
  heroSignals: ["Private room for two", "Free for two people", "Easy browser join"],
  mediaType: "image",
  mediaSrc: "/assets/app-showcase.png",
  mediaAlt: "Movmash room layout for a private long-distance movie night",
  mediaCaption:
    "A private room layout that keeps the movie central and the conversation easy to follow while you spend time together.",

  overview: {
    eyebrow: "Why it is different",
    title: "Long-distance watching has its own problems.",
    paragraphs: [
      "Watching something with a partner in another city is not the same problem as a group watch party, and tools built for groups tend to miss what actually goes wrong. It is two people, usually at the end of a long day, often in different time zones, trying to spend an hour feeling like they are in the same room. The technology only has to do one thing: get out of the way.",
      "The failure is rarely the video. It is that one of you is three hours ahead and already tired. It is the ten minutes spent deciding what to watch, then another ten getting the thing to actually play on both ends. It is texting reactions into a separate app while the film runs, so you are technically watching together and practically watching alone. By the time it works, the evening you were protecting is mostly gone.",
      "A room for two fixes the mechanical half of that. Playback stays on one shared clock, so a pause is a pause for both of you and neither person is quietly thirty seconds ahead. Chat and reactions sit beside the video instead of in another window. And the join is a link — the person on the other end opens it and is simply there, with no account, no install, and no walking them through anything.",
      "Rooms for two are on the free plan, which is worth saying plainly because it is the case most watch-party tools charge for. Two people is not a trial tier here. It is the shape of the product, and it happens to be exactly the shape of a long-distance relationship.",
    ],
  },

  modesEyebrow: "Getting the film on screen",
  modesTitle: "Three ways to start, depending on what you are watching.",
  modesCopy:
    "Most date nights are a subscription service, which means screen sharing is the one to learn. The other two are there for when it is something simpler or something you already have.",
  modes: [
    {
      icon: ScreenShare,
      name: "Share your screen",
      summary:
        "Play the film on your machine and broadcast it into the room. This is the route for the services most couples actually use, because none of them allow a video to be embedded somewhere else.",
      bestFor: "Netflix, Disney+, Prime Video, Max and anything in a browser",
      needs: "Both of you still need your own subscription",
      limit: "Share the browser tab, not the whole screen — it is the only way the sound comes through",
    },
    {
      icon: Link2,
      name: "Paste a supported link",
      summary:
        "Drop in a URL and the room syncs playback for both of you. Lighter than screen sharing because each side streams it directly, which helps on a weaker connection.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion and direct streams",
      needs: "Just the link",
      limit: "Only works where the platform allows embedded playback",
    },
    {
      icon: FileVideo,
      name: "Play a local file",
      summary:
        "Stream a video straight from your computer into the room. Useful for the things that were never on a service — a download, an old favourite, something you made.",
      bestFor: "Downloads, home videos, anything offline",
      needs: "The file on the hosting side",
      limit: "Whoever is hosting has to stay in the room, since it plays from their machine",
    },
  ],

  benefitEyebrow: "Built for date-night comfort",
  benefitTitle: "More room for the actual date.",
  benefitCopy:
    "Nothing should feel technical when the goal is simply spending time together.",
  benefits: [
    {
      icon: Heart,
      title: "Closer than texting through a movie",
      description:
        "Synced playback and light reactions make the night feel shared instead of split. You react to the same second, not to a message about a scene that already passed.",
    },
    {
      icon: LockKeyhole,
      title: "Private by default",
      description:
        "The room is reachable only by the link you send. There is no directory, nothing public, and nobody arrives who was not invited.",
    },
    {
      icon: Sparkles,
      title: "Easy to enter on both sides",
      description:
        "No install and no account for the person joining, which spares you the awkward first ten minutes of explaining where everything is.",
    },
    {
      icon: Shield,
      title: "Flexible when plans change",
      description:
        "Use a link, switch to screen sharing, or stream a local file. If the plan for the evening changes, the room does not have to.",
    },
  ],

  scenarioEyebrow: "Use it for",
  scenarioTitle: "The nights worth protecting.",
  scenarioCopy:
    "The couples who keep this going tend to make it a standing thing rather than something they arrange each time.",
  scenarios: [
    {
      title: "A weekly standing night",
      description:
        "Same evening, same room link, no negotiating. A ritual survives a busy week in a way that 'we should watch something sometime' never does.",
    },
    {
      title: "Surprise dates",
      description:
        "Send a link with no warning and turn an ordinary evening into something better. It works because the setup cost on the other end is nothing.",
    },
    {
      title: "Comfort rewatches",
      description:
        "Something you have both seen twice is the right pick when the point is company rather than the film. Nobody has to concentrate to feel close.",
    },
  ],

  guidesEyebrow: "Go deeper",
  guidesTitle: "Guides for long-distance couples.",
  guidesCopy:
    "Longer reads on making distance feel smaller — date-night ideas, the apps worth having, and why shared watching helps in the first place.",
  guides: [
    {
      title: "25 long-distance date night ideas",
      description: "Virtual date ideas that hold up past the first week, not a list of novelties.",
      href: "/blog/ldr-date-night-ideas",
    },
    {
      title: "How to watch Netflix together long distance",
      description: "Netflix removed watch party. Here is what still works in 2026, compared honestly.",
      href: "/blog/how-to-watch-netflix-together-long-distance",
    },
    {
      title: "Best apps for LDR couples",
      description: "Eleven apps for synced movie nights, daily connection, and game nights.",
      href: "/blog/best-apps-for-ldr-couples",
    },
    {
      title: "Why watching together matters in LDR",
      description: "Emotional synchrony, shared memories, and filling the quiet hours distance creates.",
      href: "/blog/why-watching-together-is-important-in-long-distance-relationships",
    },
    {
      title: "How to feel close when miles apart",
      description: "Shared activities over status updates, small repeatable rituals, and time-zone planning.",
      href: "/blog/how-long-distance-couples-can-feel-close-even-when-miles-apart",
    },
    {
      title: "Watch movies together online free",
      description: "The general version of the setup, for friends and groups as well as couples.",
      href: "/blog/watch-movies-together-online-free",
    },
  ],

  stepsEyebrow: "How it works",
  stepsTitle: "Open Movmash, send the link, settle in.",
  stepsCopy:
    "The setup stays calm, even if one person has never used Movmash before and is doing this half asleep.",
  steps: [
    {
      title: "Open a room",
      description:
        "Sign in with Google and create a private room. Pick whether you are sharing your screen, pasting a link, or playing a file.",
    },
    {
      title: "Send the link",
      description:
        "They open it in whatever browser is already in front of them, on a laptop or a phone. No account, no install, no instructions from you.",
    },
    {
      title: "Watch and react",
      description:
        "Press play. Playback stays shared from there, so pausing to talk does not mean re-syncing afterwards.",
    },
  ],

  faqs: [
    {
      question: "How can couples watch movies together online?",
      answer:
        "Open a private room, choose how the film gets on screen, and send your partner the link. For a subscription service like Netflix or Disney+ you share your browser tab, since none of them allow embedded playback anywhere. For YouTube or a direct link you can paste the URL and the room syncs both sides automatically.",
    },
    {
      question: "Is it free for two people?",
      answer:
        "Yes. Rooms for two are on the free plan, which covers most long-distance watching. Paid plans raise the participant limit, watch time, video calls and screen-share quality — none of which a couple necessarily needs.",
    },
    {
      question: "Does my partner need an account?",
      answer:
        "No. They open the room link in a browser and they are in. Only the person creating the room signs in, with Google, so the room stays tied to them.",
    },
    {
      question: "Can we watch Netflix together long distance?",
      answer:
        "Yes, through screen sharing. Netflix retired its own watch party feature and blocks embedded playback, so no tool can pull it in from a link — sharing your tab is how it is done. You will both still need your own Netflix accounts.",
    },
    {
      question: "What if we are in different time zones?",
      answer:
        "Pick the slot by whoever has the earlier morning rather than splitting the difference, and keep it fixed week to week so nobody is recalculating. A shorter film on a hard night beats cancelling — an hour together is worth more than a perfect three-hour plan that never happens.",
    },
    {
      question: "Does the video stay in sync if one of us pauses?",
      answer:
        "Yes. The room holds one playback position for both of you, so a pause is a pause for both. You can stop to talk, or rewind the line neither of you caught, without anyone having to count down to get back in step.",
    },
    {
      question: "Can we talk while we watch?",
      answer:
        "Every room has text chat and reactions beside the video. Paid plans add video and voice calling in the room, which some couples prefer for a date night and others find gets in the way of the film.",
    },
    {
      question: "Can we do this from a phone?",
      answer:
        "Yes. Joining works from a mobile browser with the same link, so it does not matter if one of you is on a laptop and the other is in bed with a phone. Hosting is easier on a computer, especially for screen sharing.",
    },
    {
      question: "Is the room private?",
      answer:
        "Yes. Rooms are private by default and only reachable by someone with the link. There is no public listing and nothing browsable.",
    },
    {
      question: "What should we watch?",
      answer:
        "Decide before the call rather than during it — the deciding is what eats the evening. A series you are both working through removes the choice entirely, which is why standing weekly nights usually end up being a show rather than a film.",
    },
    {
      question: "Is this only for couples?",
      answer:
        "Not at all. This page is written with couples in mind, but the same room works for friends, siblings, or anyone sharing a film from different places. The watch-together page covers the group version.",
    },
  ],

  exploreTitle: "Explore more",
  exploreLinks: [
    {
      title: "Watch together online",
      description: "The broader setup for groups, episode drops, and casual nights in.",
      href: "/watch-together",
    },
    {
      title: "Games to play together",
      description: "Free browser games that run in the same room, for when the film ends.",
      href: "/games",
    },
    {
      title: "Movmash blog",
      description: "Date-night ideas and shared-watching guides.",
      href: "/blog",
    },
  ],
  finalTitle: "Make the next long-distance movie night easier to start.",
  finalCopy:
    "Movmash keeps the room simple, private, and warm enough that the date can feel like the main event.",
  finalSignals: ["Private room links", "Free for two people", "Easy browser join"],
};
