import { Globe, Monitor, Tv, Twitch, Video, Youtube, Film } from "lucide-react";

const platforms = [
  {
    name: "YouTube",
    icon: Youtube,
    surfaceClass: "bg-red-500/10",
    iconClass: "text-red-300",
  },
  {
    name: "Vimeo",
    icon: Film,
    surfaceClass: "bg-sky-500/10",
    iconClass: "text-sky-300",
  },
  {
    name: "Twitch",
    icon: Twitch,
    surfaceClass: "bg-violet-500/10",
    iconClass: "text-violet-300",
  },
  {
    name: "Screen share",
    icon: Monitor,
    surfaceClass: "bg-rose-500/10",
    iconClass: "text-rose-300",
  },
  {
    name: "Local files",
    icon: Tv,
    surfaceClass: "bg-pink-500/10",
    iconClass: "text-pink-300",
  },
  {
    name: "HLS streams",
    icon: Video,
    surfaceClass: "bg-fuchsia-500/10",
    iconClass: "text-fuchsia-300",
  },
  {
    name: "Direct URLs",
    icon: Globe,
    surfaceClass: "bg-white/[0.04]",
    iconClass: "text-white/78",
  },
];

const PlatformsSection = () => {
  return (
    <section id="platforms" className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading">
          <h2 className="landing-section-title">
            Works with the{" "}
            <span className="text-gradient">sources you already use</span>
          </h2>
          <p className="landing-section-copy">
            Bring in a supported link, share a tab, or stream a local file without changing how you host.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-[11px] rounded-[20px] bg-white/[0.022] px-2.5 py-4 text-center">
                <div className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[14px] ${platform.surfaceClass}`}>
                  <platform.icon className={`h-[19px] w-[19px] ${platform.iconClass}`} strokeWidth={2.1} />
                </div>

                <div className="min-w-0">
                  <div className="whitespace-nowrap font-parkinsans text-[13px] font-semibold tracking-tight text-white">
                    {platform.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-[22px] text-center text-sm leading-[1.6] text-white/50">
          Also works with Dailymotion and other direct video links when you just need a room and a URL.
        </p>
      </div>
    </section>
  );
};

export default PlatformsSection;
