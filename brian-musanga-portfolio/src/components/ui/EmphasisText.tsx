export function EmphasisText({
  text,
  emphasis,
}: {
  text: string;
  emphasis: string;
}) {
  const index = text.indexOf(emphasis);

  if (index === -1) {
    return <>{text}</>;
  }

  const before = text.slice(0, index);
  const after = text.slice(index + emphasis.length);

  return (
    <>
      {before}
      <em className="not-italic text-accent">{emphasis}</em>
      {after}
    </>
  );
}
