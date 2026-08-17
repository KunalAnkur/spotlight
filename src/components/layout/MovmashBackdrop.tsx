/**
 * Two soft blooms on a flat #09090c ground — the whole background.
 *
 * The earlier version stacked a dot grid, an SVG noise plate and three pulsing orbs on top
 * of each other. Against the scaled-down type that reads as texture competing with the
 * content, so the mockup keeps only the two blooms that tint the page rose at the top and
 * fuchsia at the middle-right.
 */
const MovmashBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#09090c]" />

    <div className="absolute -left-40 -top-[220px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.14),transparent_68%)] blur-[120px]" />
    <div className="absolute -right-[200px] top-[40%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.11),transparent_68%)] blur-[120px]" />
  </div>
);

export default MovmashBackdrop;
