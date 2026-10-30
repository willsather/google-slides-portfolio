import Navigation from "@/app/navigation";
import Slides from "@/app/slides";
import SpeakerNotes from "@/app/speaker-notes";

export default function GoogleSlidesPortfolio() {
  return (
    <div className="bg-background flex h-screen flex-col">
      <Navigation />

      <Slides />

      <SpeakerNotes />
    </div>
  );
}
