/**
 * The home page FAQ, in display order.
 *
 * The array holds keys rather than copy: FAQSection renders it through the message catalogue
 * and FAQPageSchema serialises the same resolved strings into JSON-LD, so the structured data
 * always matches what is on the page — in whichever language the page rendered.
 */
export interface Faq {
  /** Key into the "faqItems" namespace; `<key>Q` and `<key>A` hold the pair. */
  key: string;
}

export const homeFaqs: Faq[] = [
  { key: "guestsDownload" },
  { key: "whatGames" },
  { key: "gamesFree" },
  { key: "friendsAccount" },
  { key: "platforms" },
  { key: "screenShare" },
  { key: "localFiles" },
  { key: "participantLimit" },
  { key: "privacy" },
];
