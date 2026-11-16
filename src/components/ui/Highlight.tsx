/** Statement whose words light up one by one as it scrolls through the screen. */
export function Highlight({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className} data-highlight>
      {text.split(" ").map((w, i, a) => (
        <span key={i}>
          <span className="hl-word">{w}</span>
          {i < a.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
