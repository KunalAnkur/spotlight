import Image from "next/image";

const demoVideoEmbedUrl = "https://www.youtube-nocookie.com/embed/QmiWGfZTHps?rel=0";

const ShowcaseSection = () => {
  return (
    <section className="landing-section">
      <div className="landing-shell relative z-10">
        {/* Section Header */}
        <div className="landing-section-heading mb-10 md:mb-12">
          <h2 className="landing-section-title mb-3 md:mb-4">
            See It In{" "}
            <span className="text-gradient">Action</span>
          </h2>
          <p className="landing-section-copy">
            A calm, focused interface for video, chat, and reactions in one shared room.
          </p>
        </div>

        {/* App Showcase Image - smaller and more refined */}
        <div className="max-w-4xl mx-auto">
          <div className="landing-subtle-surface overflow-hidden rounded-2xl">
            <div className="relative">
              <Image
                src="/assets/app-showcase.png"
                alt="Movmash app interface showing video player with chat and reactions"
                width={1200}
                height={675}
                className="relative z-10 h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* Product demo video */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="mb-2 font-parkinsans text-2xl font-semibold tracking-tight text-white md:mb-3 md:text-3xl lg:text-4xl">
              Watch the{" "}
              <span className="text-gradient">Demo</span>
            </h3>
            <p className="landing-section-copy">
              A quick look at how the real Movmash flow feels in practice.
            </p>
          </div>

          <div className="landing-subtle-surface overflow-hidden rounded-2xl">
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={demoVideoEmbedUrl}
                title="Movmash demo video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
