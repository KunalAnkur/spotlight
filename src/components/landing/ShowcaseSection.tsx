import Image from "next/image";

const quickSignals = ["Private rooms", "Synced playback", "Live chat", "No install"];

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="landing-section pt-8 md:pt-10">
      <div className="landing-shell relative z-10">
        <div className="landing-section-heading mb-10 md:mb-12">
          <h2 className="landing-section-title mb-3 md:mb-4">
            A Room Layout That Feels{" "}
            <span className="text-gradient">Clear Right Away</span>
          </h2>
          <p className="landing-section-copy">
            The room keeps the video prominent while chat, reactions, and controls stay easy to understand.
          </p>
        </div>

        <div className="mx-auto max-w-6xl animate-slide-up">
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <div className="pointer-events-none absolute inset-x-12 top-10 -z-10 h-28 bg-gradient-to-r from-[#e11d48]/14 via-[#db2777]/10 to-[#c026d3]/14 blur-3xl" />
            <Image
              src="/assets/app-showcase.png"
              alt="Movmash app interface showing video player with chat and reactions"
              width={1200}
              height={675}
              className="h-auto w-full"
            />

            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(9,9,12,0)_0%,rgba(9,9,12,0.78)_100%)] px-4 py-4 sm:px-6">
              <div className="landing-meta-line justify-center gap-x-5 gap-y-2 text-white/66">
                {quickSignals.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400/75" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
