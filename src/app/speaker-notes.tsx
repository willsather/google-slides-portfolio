export default function SpeakerNotes() {
  return (
    <div className="bg-muted/10 h-24 border-t p-4">
      <textarea
        className="text-muted-foreground placeholder-muted-foreground h-full w-full resize-none bg-transparent text-sm focus:outline-none"
        placeholder="Click to add speaker notes"
      />
    </div>
  );
}
