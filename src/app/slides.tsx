"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IntroSlide from "@/app/intro-slide";
import Project from "@/app/project";
import Sidebar from "@/app/sidebar";
import Toolbar from "@/app/toolbar";

const slides = [
  {
    name: "Intro",
    component: IntroSlide,
    title: "Will Sather",
    url: "",
    description: "Software Engineer & Web Developer",
  },
  {
    name: "Website",
    url: "www.sather.ws",
    title: "Personal Website",
    description: "resume, blog, and just about me",
  },
  {
    name: "JetBlue",
    title: "JetBlue Vercel Demo",
    url: "jetblue.vercel.app",
    description:
      "demo version of the jetblue.com website using next.js and vercel",
  },
  {
    name: "TechCrunch",
    title: "TechCrunch Skills Assessment",
    url: "techcrunchy.vercel.app",
    description: "recreated techcrunch.com using next.js and vercel",
  },
  {
    name: "Family Tree",
    title: "Sather Family Tree",
    url: "www.sather.family",
    description:
      "paired with v0 and my grandparents to build a digital family tree",
  },
  {
    name: "MN Civic Tech",
    title: "MN Civic Tech",
    url: "www.mncivictech.org",
    description:
      "co-founded a civic tech nonprofit in minnesota (and of course built the website)",
  },
];

export default function Slides({ present }: { present?: boolean }) {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFont, setSelectedFont] = useState("font-sans");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCurrentSlide((prev) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          return prev < slides.length - 1 ? prev + 1 : prev;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          return prev > 0 ? prev - 1 : prev;
        }

        return prev;
      });

      if (
        event.key === "Escape" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  // Render the slide content based on the current slide
  const renderSlideContent = () => {
    const slide = slides[currentSlide];

    if (currentSlide === 0 && slide.component) {
      return <slide.component />;
    }

    return (
      <Project
        name={slide.title}
        url={slide.url}
        description={slide.description}
      />
    );
  };

  return (
    <>
      {!present ? (
        <Toolbar
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
        />
      ) : null}

      <div className={`flex flex-1 overflow-hidden ${selectedFont}`}>
        {/* Left Sidebar */}
        {!present ? (
          <Sidebar
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        ) : null}

        {/* Slide Content */}
        <div className="bg-muted/20 flex-1 p-8">
          <div className="bg-background mx-auto aspect-video max-w-4xl rounded-lg p-8 shadow-lg">
            {renderSlideContent()}
          </div>
        </div>
      </div>
    </>
  );
}
