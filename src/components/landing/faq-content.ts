/**
 * The home page FAQ, in display order.
 *
 * One list, two consumers: FAQSection renders it and FAQPageSchema serialises it into
 * JSON-LD. They used to be separate copies in FAQSection.tsx and page.tsx, which is exactly
 * the pair that drifts — the structured data has to match what is on the page to be a valid
 * rich result.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: "Do guests need to download anything?",
    answer:
      "No. Guests can join from the browser with the room link, so the room can start without an extra install step.",
  },
  {
    question: "What games can I play with friends on Movmash?",
    answer:
      "Tic-Tac-Toe, Connect 4 and a jigsaw puzzle you solve together, with more on the way. They all run in the browser inside your room, so nobody has to leave or install anything.",
  },
  {
    question: "Are the games free?",
    answer:
      "Yes. Every game is on the free plan. Paid plans add room size, watch time, video calls and screen-share quality — they do not unlock games.",
  },
  {
    question: "Do my friends need to create an account?",
    answer:
      "Friends can join and watch without creating an account. Creating a room or being the host requires signing in with Google for a seamless experience.",
  },
  {
    question: "What platforms can I watch together?",
    answer:
      "Movmash supports YouTube, Vimeo, Twitch, Dailymotion, HLS streams, and more. You can also share your screen to watch premium streaming services or any other platform together.",
  },
  {
    question: "How does screen sharing work?",
    answer:
      "In Stream mode you can share your browser tab, an application window, or your entire screen. For the best audio quality we recommend sharing a browser tab — everyone in the room sees and hears exactly what you share.",
  },
  {
    question: "Can I watch local video files with friends?",
    answer:
      "Absolutely. In Stream mode you can play video files from your computer to everyone in the room. Your files stay on your computer — we don't store them on our servers.",
  },
  {
    question: "Is there a limit on room participants?",
    answer:
      "Free rooms support up to 2 participants. Premium is built for larger rooms with more than 50 participants.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. Rooms are private by default — only people with the room link can join. We don't store your video files, and all communications are encrypted.",
  },
];
