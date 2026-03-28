import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Heart,
  LockKeyhole,
  MessageCircle,
  MonitorPlay,
  PlayCircle,
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
  metadataTitle: "Watch Together Online | Free Watch Party App",
  metadataDescription:
    "Watch together online with synced playback, private room links, live chat, reactions, and screen sharing. Movmash makes movie nights and watch parties easy to start.",
  metadataKeywords: [
    "watch together",
    "watch together online",
    "watch movies together",
    "watch at the same time",
    "watch together app",
    "watch party app",
  ],
  kicker: "Watch together",
  title: "Start a watch party",
  titleAccent: "that feels easy from the first click.",
  intro:
    "Movmash makes it easy to watch together online with synced playback, private room links, chat, and screen sharing. Open the room, share one link, and start without a messy setup.",
  ctaLabel: "Start Watching Together",
  ctaHref: "https://app.movmash.com",
  secondaryCtaLabel: "See Setup",
  secondaryCtaHref: "/#how-it-works",
  heroSignals: ["Watch together online", "Private room links", "No app install"],
  mediaType: "video",
  mediaAlt: "Movmash demo video showing a synced watch room with chat and reactions",
  mediaCaption:
    "A Movmash room keeps the video clear, the join flow simple, and the conversation close to the moment on screen.",
  benefitEyebrow: "Why it works better",
  benefitTitle: "People settle in fast.",
  benefitCopy:
    "The room feels familiar quickly, so people can stop figuring things out and start watching.",
  benefits: [
    {
      icon: PlayCircle,
      title: "Stay on the same second",
      description:
        "Supported links stay synced so nobody reacts late or gets pulled out of the moment.",
    },
    {
      icon: Users,
      title: "Guests join fast",
      description:
        "Send one link and bring people in without turning movie night into setup time.",
    },
    {
      icon: MonitorPlay,
      title: "Flexible when plans change",
      description:
        "Screen sharing and local files help when a simple pasted link is not enough.",
    },
    {
      icon: MessageCircle,
      title: "Conversation stays close",
      description:
        "Chat and reactions stay nearby without covering the thing everyone came to watch.",
    },
  ],
  scenarioEyebrow: "",
  scenarioTitle: "",
  scenarioCopy: "",
  scenarios: [],
  stepsEyebrow: "How it works",
  stepsTitle: "Open Movmash, share one link, press play.",
  stepsCopy:
    "Open the room, send the link, and start together in just a few clicks.",
  steps: [
    {
      title: "Open Movmash",
      description:
        "Start a room and choose the source that fits tonight.",
    },
    {
      title: "Share one link",
      description:
        "Guests join from the browser without slowing the night down.",
    },
    {
      title: "Watch together",
      description:
        "Press play on a synced link, screen share, or local file and stay in the same moment.",
    },
  ],
  faqs: [
    {
      question: "Do guests need an account to watch together?",
      answer:
        "No. Guests can join the room from the browser with the room link. The host can start the session without forcing everyone through a heavy setup flow.",
    },
    {
      question: "Can we watch movies together online, not just short videos?",
      answer:
        "Yes. Movmash supports synced links, screen sharing, and local file streaming, so the room can fit full movie nights as well as quick clips or episodes.",
    },
    {
      question: "What if the platform I want to watch is not directly supported?",
      answer:
        "Use screen sharing or stream a local file. That gives you a flexible fallback when the night needs more than a simple pasted link.",
    },
    {
      question: "Does the room stay private?",
      answer:
        "Yes. Rooms are private by default and are only accessible to people who have the invite link.",
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
      title: "Movmash blog",
      description: "Browse practical guides and shared-watching ideas.",
      href: "/blog",
    },
    {
      title: "Main landing page",
      description: "Go back to the full Movmash overview and demo.",
      href: "/",
    },
  ],
  finalTitle: "Open a room and watch together tonight.",
  finalCopy:
    "Movmash keeps shared watching simple, clear, and easy to start from the first click.",
  finalSignals: ["Free to start", "No downloads required", "Works in the browser"],
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
