interface Props { text: string }

/** One source-label treatment for Astro pages and the React search dialog. */
export default function SourceLabel({ text }: Props) {
  const match = /^(Hust-opensource-Xuejie|CSdiy)(?:\s+(.+))?$/.exec(text);
  if (!match) return <>{text}</>;
  return <span className="source-label">
    <span className="source-tag">{match[1]}</span>
    {match[2] && <span className="source-label-text">{match[2]}</span>}
  </span>;
}
