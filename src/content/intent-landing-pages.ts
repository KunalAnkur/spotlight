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
  metadataTitle: "Long Distance Date Night | Watch Movies Together Online",
  metadataDescription:
    "Plan a long-distance date night with synced movie watching, private rooms, live chat, and reactions. Movmash helps couples watch together online and feel closer from anywhere.",
  metadataKeywords: [
    "long distance date night",
    "ldr date night",
    "watch movies together long distance",
    "virtual movie date",
    "watch together for couples",
    "long distance relationship movie night",
  ],
  kicker: "Long-distance date night",
  title: "Make long-distance date night",
  titleAccent: "feel a little closer.",
  intro:
    "Movmash gives couples a simple way to watch movies together online in a private room with synced playback, chat, and light reactions.",
  ctaLabel: "Start Your Date Night Room",
  ctaHref: "https://app.movmash.com",
  secondaryCtaLabel: "See Setup",
  secondaryCtaHref: "/#how-it-works",
  heroSignals: ["Private room for two", "Watch together online", "Easy browser join"],
  mediaType: "image",
  mediaSrc: "/assets/app-showcase.png",
  mediaAlt: "Movmash room layout for a private long-distance movie night",
  mediaCaption:
    "A private room layout that keeps the movie central and the conversation easy to follow while you spend time together.",
  benefitEyebrow: "Built for date-night comfort",
  benefitTitle: "More room for the actual date.",
  benefitCopy:
    "Nothing should feel technical when the goal is simply spending time together.",
  benefits: [
    {
      icon: Heart,
      title: "Closer than texting through a movie",
      description:
        "Synced playback and light reactions make the night feel shared instead of split.",
    },
    {
      icon: LockKeyhole,
      title: "Private by default",
      description:
        "Keep the room just for the two of you with a private link and a calmer layout.",
    },
    {
      icon: Sparkles,
      title: "Easy to enter on both sides",
      description:
        "No heavy app install and no awkward first ten minutes of explaining where everything is.",
    },
    {
      icon: Shield,
      title: "Flexible when plans change",
      description:
        "Use a supported link, switch to screen sharing, or stream a local file when plans shift.",
    },
  ],
  scenarioEyebrow: "Use it for",
  scenarioTitle: "A better fit for cozy nights in.",
  scenarioCopy:
    "Use it for movie nights, surprise links, comfort rewatches, or a small weekly ritual that feels more present.",
  scenarios: [
    {
      title: "Weekly movie nights",
      description:
        "Create a simple ritual that gives the relationship a shared rhythm.",
    },
    {
      title: "Surprise dates",
      description:
        "Send a room link and turn an ordinary evening into something a little softer.",
    },
    {
      title: "Comfort rewatches",
      description:
        "Go back to familiar shows and films when the goal is just to feel close.",
    },
  ],
  stepsEyebrow: "How it works",
  stepsTitle: "Open Movmash, send the link, settle in.",
  stepsCopy:
    "The setup stays calm, even if one person has never used Movmash before.",
  steps: [
    {
      title: "Open Movmash",
      description:
        "Create a private room and choose the source that fits the night.",
    },
    {
      title: "Send the link",
      description:
        "The other person joins from the browser without extra friction before the date starts.",
    },
    {
      title: "Watch and react",
      description:
        "Press play and keep the conversation close instead of split across different tabs.",
    },
  ],
  faqs: [
    {
      question: "Can we use Movmash for a private long-distance date night?",
      answer:
        "Yes. Rooms are private by default, so you can keep the session just for the people you invite.",
    },
    {
      question: "Does my partner need to install anything first?",
      answer:
        "No. The join flow stays browser-based, which helps the room feel simple to open and easy to trust.",
    },
    {
      question: "Can we use this even if our source is not directly supported?",
      answer:
        "Yes. Screen sharing and local file streaming give you flexible ways to keep the date going when a direct link is not enough.",
    },
    {
      question: "Is this only for couples?",
      answer:
        "Not at all. It is designed with couples in mind on this page, but the same room flow works for friends, siblings, or anyone trying to share a movie night from different places.",
    },
  ],
  exploreTitle: "Explore more",
  exploreLinks: [
    {
      title: "Watch together page",
      description: "See the broader setup for groups, episode drops, and casual nights in.",
      href: "/watch-together",
    },
    {
      title: "Movmash blog",
      description: "Read date-night ideas and future shared-watching guides.",
      href: "/blog",
    },
    {
      title: "Main landing page",
      description: "Return to the core Movmash overview and demo.",
      href: "/",
    },
  ],
  finalTitle: "Make the next long-distance movie night easier to start.",
  finalCopy:
    "Movmash keeps the room simple, private, and warm enough that the date can feel like the main event.",
  finalSignals: ["Private room links", "No downloads required", "Easy browser join"],
};
