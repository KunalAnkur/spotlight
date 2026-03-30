import type { ComponentType } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.226V2h-3.193v13.766c0 1.338-1.039 2.438-2.375 2.512a2.521 2.521 0 0 1-2.657-2.514 2.522 2.522 0 0 1 2.522-2.522c.262 0 .513.04.75.117V10.12a5.712 5.712 0 0 0-.75-.05A5.716 5.716 0 0 0 4.4 15.787a5.716 5.716 0 0 0 6.086 5.706 5.716 5.716 0 0 0 5.333-5.707V8.792a7.937 7.937 0 0 0 4.781 1.601V7.201a4.76 4.76 0 0 1-1.011-.515Z" />
    </svg>
  );
}

export interface MovmashSocialLink {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
  contactChipClassName: string;
  contactIconClassName: string;
  footerIconClassName: string;
}

export const movmashSocialLinks: MovmashSocialLink[] = [
  {
    icon: Twitter,
    href: "https://twitter.com/movmash",
    label: "Twitter",
    contactChipClassName: "bg-sky-400/10",
    contactIconClassName: "text-sky-300",
    footerIconClassName: "text-white/66 hover:text-white/74",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/movmash",
    label: "Instagram",
    contactChipClassName: "bg-pink-400/10",
    contactIconClassName: "text-pink-300",
    footerIconClassName: "text-white/66 hover:text-white/74",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@movmash",
    label: "TikTok",
    contactChipClassName: "bg-white/8",
    contactIconClassName: "text-white/82",
    footerIconClassName: "text-white/66 hover:text-white/74",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/movmash",
    label: "LinkedIn",
    contactChipClassName: "bg-blue-400/10",
    contactIconClassName: "text-blue-300",
    footerIconClassName: "text-white/66 hover:text-white/74",
  },
];

interface MovmashSocialLinksProps {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}

export default function MovmashSocialLinks({
  className,
  linkClassName,
  iconClassName,
}: MovmashSocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      {movmashSocialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors duration-200",
            social.footerIconClassName,
            linkClassName
          )}
        >
          <social.icon className={cn("h-5 w-5", iconClassName)} />
        </a>
      ))}
    </div>
  );
}
