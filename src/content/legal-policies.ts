export type LegalPolicyKey = "privacy" | "terms" | "cookies";

export type LegalIconKey =
  | "alert-circle"
  | "check-circle"
  | "cookie"
  | "copyright"
  | "database"
  | "file-check"
  | "file-text"
  | "info"
  | "layers"
  | "lock"
  | "mail"
  | "monitor"
  | "refresh"
  | "settings"
  | "shield"
  | "sliders"
  | "user-check"
  | "users";

export interface PolicySection {
  icon: LegalIconKey;
  number: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  email?: string;
}

export interface LegalPolicy {
  key: LegalPolicyKey;
  href: string;
  label: string;
  title: string;
  description: string;
  updatedLabel: string;
  icon: LegalIconKey;
  sections: PolicySection[];
  note?: string;
  noteIcon?: LegalIconKey;
}

export const legalPolicies: LegalPolicy[] = [
  {
    key: "privacy",
    href: "/legal?tab=privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    updatedLabel: "Updated December 2024",
    description:
      "What we collect, why we collect it, and how we protect it while you use Movmash.",
    icon: "shield",
    sections: [
      {
        icon: "database",
        number: "1",
        title: "Information we collect",
        description:
          "When you use Movmash, we only collect the minimum information needed to run the service:",
        items: [
          "Basic profile details from Google Sign-In such as your name, email, and avatar",
          "Room activity details like creation time and participant counts",
          "Room chat messages while sessions are active",
        ],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "user-check",
        number: "2",
        title: "How we use it",
        description:
          "That information is used to keep Movmash working well and keep rooms usable:",
        items: [
          "Create and maintain rooms",
          "Show your name and avatar to other room participants",
          "Support synchronized playback and participant management",
          "Improve reliability and overall product quality",
        ],
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
      {
        icon: "lock",
        number: "3",
        title: "Storage and security",
        description: "Privacy and security are part of the product, not an afterthought:",
        items: [
          "Local video files are not uploaded to our servers",
          "Chat messages are not stored permanently",
          "Data is transmitted using encrypted, industry-standard protocols",
          "We do not sell your personal information",
        ],
        gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
      },
      {
        icon: "shield",
        number: "4",
        title: "Your rights",
        description:
          "You can request access, correction, or deletion of your personal data at any time by contacting support.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "mail",
        number: "5",
        title: "Contact us",
        description: "If you have questions about this Privacy Policy, reach us at",
        items: [],
        email: "support@movmash.com",
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
    ],
  },
  {
    key: "terms",
    href: "/legal?tab=terms",
    label: "Terms of Service",
    title: "Terms of Service",
    updatedLabel: "Updated December 2024",
    description:
      "The responsibilities that help keep Movmash respectful, safe, and dependable for everyone.",
    icon: "file-text",
    note: "These terms are here to keep the experience fair, safe, and clear for every room participant.",
    noteIcon: "file-text",
    sections: [
      {
        icon: "check-circle",
        number: "1",
        title: "Acceptance of terms",
        description:
          "By accessing or using Movmash, you agree to these terms. If you do not agree, please do not use the service.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "monitor",
        number: "2",
        title: "What the service does",
        description:
          "Movmash helps people watch together in real time with synchronized playback, room chat, reactions, and screen sharing tools.",
        items: [],
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
      {
        icon: "users",
        number: "3",
        title: "User responsibilities",
        description: "When you use Movmash, you agree to:",
        items: [
          "Only share content you have the right to share",
          "Respect copyright and intellectual property rights",
          "Avoid illegal, abusive, or harmful behavior",
          "Avoid disrupting or attempting to compromise the service",
          "Treat other participants respectfully",
        ],
        gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
      },
      {
        icon: "file-check",
        number: "4",
        title: "Content policy",
        description:
          "You are responsible for the content you bring into rooms. We may remove content or restrict use if it violates these terms or creates harm.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "copyright",
        number: "5",
        title: "Intellectual property",
        description:
          "Movmash and its original product features remain the property of Movmash and are protected under applicable intellectual property laws.",
        items: [],
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
      {
        icon: "alert-circle",
        number: "6",
        title: "Limitation of liability",
        description:
          "Movmash is provided as-is. We cannot guarantee uninterrupted service and are not liable for losses arising from ordinary use of the product.",
        items: [],
        gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
      },
      {
        icon: "refresh",
        number: "7",
        title: "Changes to terms",
        description:
          "We may update these terms over time. Continued use after an update means you accept the revised version.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "mail",
        number: "8",
        title: "Contact",
        description: "Questions about these Terms of Service can be sent to",
        items: [],
        email: "support@movmash.com",
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
    ],
  },
  {
    key: "cookies",
    href: "/legal?tab=cookies",
    label: "Cookie Policy",
    title: "Cookie Policy",
    updatedLabel: "Updated December 2024",
    description:
      "How cookies help Movmash remember your preferences and improve the product without overwhelming your privacy.",
    icon: "cookie",
    note: "We use cookies responsibly to keep the experience smoother while respecting your privacy.",
    noteIcon: "cookie",
    sections: [
      {
        icon: "info",
        number: "1",
        title: "What cookies are",
        description:
          "Cookies are small text files saved on your device to help a website remember settings and improve how the experience feels from visit to visit.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "settings",
        number: "2",
        title: "How we use them",
        description: "Movmash uses cookies for a small set of practical reasons:",
        items: [
          "Authentication so you stay signed in during your session",
          "Preferences so your settings do not need to be chosen again",
          "Analytics so we can understand usage patterns and improve the product",
        ],
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
      {
        icon: "layers",
        number: "3",
        title: "Types of cookies",
        description: "Different cookies support different parts of the experience:",
        items: [
          "Essential cookies for core product functionality",
          "Functional cookies for remembering choices and preferences",
          "Analytics cookies for measuring and improving service quality",
        ],
        gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
      },
      {
        icon: "sliders",
        number: "4",
        title: "Managing cookies",
        description:
          "You can control or remove cookies from your browser settings. Disabling some cookies may affect how parts of Movmash work.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "mail",
        number: "5",
        title: "Contact",
        description: "Questions about our cookie policy can be sent to",
        items: [],
        email: "support@movmash.com",
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
    ],
  },
];

export function getLegalPolicy(key?: string | null) {
  return legalPolicies.find((policy) => policy.key === key) ?? legalPolicies[0];
}
