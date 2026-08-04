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
    updatedLabel: "Updated August 2026",
    description:
      "What we collect, why we collect it, and how we protect it while you use Movmash.",
    icon: "shield",
    sections: [
      {
        icon: "database",
        number: "1",
        title: "Information we collect",
        description:
          "We collect what is needed to run watch parties, keep your account secure, and bill paid plans:",
        items: [
          "Account details from Google Sign-In — your name, email address, and avatar",
          "Sign-in and session details — your IP address, approximate location (country and region derived from it), device type, and browser",
          "Room activity — rooms you create or join, the video links or file names in a playlist, participant counts, and how long a room played",
          "Watch-time usage — the minutes you have hosted on a given day, used to apply free-plan limits",
          "Billing details for paid plans — amount, currency, payment status, and the transaction reference from our payment provider",
          "Your preference for receiving marketing emails, and any feedback you choose to send us",
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
          "Create and maintain rooms, and support synchronized playback",
          "Show your name and avatar to other participants in your room",
          "Keep your account secure — session records let you see and revoke active sign-ins",
          "Apply free-plan limits, and process payments and renewals for paid plans",
          "Send marketing emails only if you have opted in; you can withdraw that at any time",
          "Improve reliability and overall product quality",
        ],
        gradient: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500",
      },
      {
        icon: "users",
        number: "3",
        title: "Who we share it with",
        description:
          "We do not sell your personal information. We share only what is necessary with the providers that run parts of the service:",
        items: [
          "Google — sign-in and identity verification",
          "DodoPayments — payment processing for paid plans; card details are handled by them and never reach our servers",
          "PostHog — product analytics that help us understand how features are used",
          "Approximate location is derived on our own servers from your IP using a local database; your IP is not sent to a location service for this",
        ],
        gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
      },
      {
        icon: "lock",
        number: "4",
        title: "Storage, security and retention",
        description: "Privacy and security are part of the product, not an afterthought:",
        items: [
          "Local video files are never uploaded to our servers — they are streamed directly between participants",
          "Chat messages are not stored permanently",
          "Data is transmitted using encrypted, industry-standard protocols",
          "Sign-in sessions expire automatically, and you can revoke them sooner from your account",
          "Account, billing, and usage records are kept while your account exists, and removed on request except where we must keep them for legal or accounting reasons",
        ],
        gradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500",
      },
      {
        icon: "shield",
        number: "5",
        title: "Your rights",
        description:
          "You can request access to, correction of, or deletion of your personal data at any time by contacting support. You can also withdraw marketing consent, or ask us for a copy of your data in a portable form. If you are in the EU or Turkey, GDPR and KVKK rights apply to you.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "mail",
        number: "6",
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
    updatedLabel: "Updated August 2026",
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
        icon: "layers",
        number: "7",
        title: "Plans, pricing and limits",
        description:
          "Movmash offers a free tier and paid plans. As the product develops we may change what a plan includes — its features, its usage limits, and its price.",
        items: [
          "Paid plans renew automatically at the end of each billing period until you cancel them.",
          "You can cancel at any time from your subscription page. Access continues until the end of the period you have already paid for; we do not refund the remainder of a period.",
          "We may change the features, usage limits, or price of any plan. Existing subscribers are given notice before such a change takes effect for them, and a price increase never applies to a billing period you have already paid for.",
          "Free tier limits, including the daily watch-time allowance, may change without individual notice.",
          "Prices are shown at checkout and may vary by country and currency.",
        ],
        gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
      },
      {
        icon: "refresh",
        number: "8",
        title: "Changes to terms",
        description:
          "We may update these terms over time. Continued use after an update means you accept the revised version.",
        items: [],
        gradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500",
      },
      {
        icon: "mail",
        number: "9",
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
