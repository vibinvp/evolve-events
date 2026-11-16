/** Renders a headline as word spans (server-side) so GSAP can animate them without touching React's DOM. */
export function SplitText({
  text,
  className,
  as: Tag = "span",
  when = "scroll",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
  when?: "hero" | "scroll";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-split={when}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">
            <span className="word-inner">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
