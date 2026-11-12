export function Gallery({ items }: { items: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {items.map((img, i) => (
        <figure
          key={i}
          className={`group relative overflow-hidden rounded-xl bg-muted ${i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            width={1280}
            height={896}
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <figcaption className="bg-image-fade absolute inset-x-0 bottom-0 p-3 text-xs text-navy-deep-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {img.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
