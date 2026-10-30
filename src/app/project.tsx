export default function Project({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description: string;
}) {
  return (
    <div className="space-y-4">
      <h1 className="mt-20 mb-4 text-center text-4xl font-bold">{name}</h1>

      <a href={`https://${url}`} target="_blank" rel="noreferrer">
        <p className="text-muted-foreground text-center font-mono text-lg italic hover:underline">
          {url}
        </p>
      </a>

      <p className="text-muted-foreground text-center text-sm">{description}</p>
    </div>
  );
}
