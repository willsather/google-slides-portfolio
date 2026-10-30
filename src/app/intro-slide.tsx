import Image from "next/image";

import { Github, Linkedin, Twitter } from "@/components/icons/social";

export default function IntroSlide() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
        {/* Profile Image */}
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src="/profile.jpg"
            alt="Will Sather"
            width={128}
            height={128}
            className="object-cover"
            priority
          />
        </div>

        {/* Name and Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Will Sather</h1>
          <p className="text-muted-foreground text-xl">
            customer-facing software engineer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 pt-4">
          <a
            href="https://github.sather.ws"
            target="_blank"
            rel="noreferrer"
            className="bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-6" />
          </a>

          <a
            href="https://linkedin.sather.ws"
            target="_blank"
            rel="noreferrer"
            className="bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-6" />
          </a>

          <a
            href="https://twitter.com/willsather"
            target="_blank"
            rel="noreferrer"
            className="bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="size-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
