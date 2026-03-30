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
    <section className="landing-section">
      <div className="landing-shell relative z-10">
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-40 w-[34rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(225,29,72,0.10)_0%,transparent_72%)] blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-parkinsans text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[3rem]">
              Works with the{" "}
              <span className="text-gradient">sources you already use</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/66 md:text-lg md:leading-8">
              Bring in a supported link, share a tab, or stream a local file without changing how you host.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-6xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {platforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[1.25rem] bg-white/[0.02] px-3 py-4 text-center">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${platform.surfaceClass}`}>
                      <platform.icon className={`h-5 w-5 ${platform.iconClass}`} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <div className="font-parkinsans text-[13px] font-semibold tracking-tight whitespace-nowrap text-white md:text-sm">
                        {platform.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-white/50 md:text-[15px]">
              Also works with Dailymotion and other direct video links when you just need a room and a URL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
