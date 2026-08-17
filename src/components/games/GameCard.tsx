import Image from "next/image";
import { PLAY_URL, type GameEntry } from "@/components/games/games-content";

interface GameCardProps {
  game: GameEntry;
  /** Landing page uses the longer blurb; the games page has surrounding copy already. */
  blurb: string;
}

// A card is the game itself, so clicking one goes straight into the arcade in the app rather
// than to more reading about it — the marketing copy is already on the card.
const GameCard = ({ game, blurb }: GameCardProps) => (
  <a
    href={PLAY_URL}
    rel="noopener noreferrer"
    className="game-card"
    aria-label={`Play ${game.name} on Movmash`}
    style={{ ["--acc" as string]: game.accent }}
  >
    <div className="game-shot">
      <Image
        src={game.image}
        alt={game.imageAlt}
        width={1200}
        height={960}
        sizes="(max-width: 860px) 100vw, 33vw"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="relative z-[2] flex flex-1 flex-col px-[22px] pb-[22px] pt-5">
      <div className="mb-[9px] flex items-center gap-[11px]">
        <span className="game-glyph">{game.glyph}</span>
        <h3 className="font-parkinsans text-[19px] font-semibold tracking-tight text-white">
          {game.name}
        </h3>
      </div>

      <p className="flex-1 text-sm leading-[1.6] text-white/68">{blurb}</p>

      <span className="mt-4 flex items-center gap-[9px] text-[12.5px] text-white/46">
        <b className="font-semibold" style={{ color: game.accent }}>
          {game.players}
        </b>
        <i className="h-[3px] w-[3px] shrink-0 rounded-full bg-current opacity-50" />
        {game.mode}
        <i className="h-[3px] w-[3px] shrink-0 rounded-full bg-current opacity-50" />
        Free
      </span>
    </div>
  </a>
);

export default GameCard;
