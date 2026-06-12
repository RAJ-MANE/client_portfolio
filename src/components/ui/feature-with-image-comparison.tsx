import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

interface FeatureProps {
  badge?: string;
  title?: string;
  description?: string;
  image1?: string;
  image2?: string;
  alt1?: string;
  alt2?: string;
  inset?: number;
}

function Feature({
  badge = "Platform",
  title = "Something new!",
  description = "Managing a small business today is already tough.",
  image1 = "https://www.twblocks.com/_next/image?url=%2Ffeature8.png&w=3840&q=75",
  image2 = "https://www.twblocks.com/_next/image?url=%2Fdarkmode-feature8.png&w=3840&q=75",
  alt1 = "feature8",
  alt2 = "darkmode-feature8.png",
  inset: initialInset = 50
}: FeatureProps) {
  const [inset, setInset] = useState<number>(initialInset);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setInset(percentage);
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <Badge>{badge}</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-white">
              {title}
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-white/60">
              {description}
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              ref={containerRef}
              className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none cursor-ew-resize border border-white/10 shadow-2xl"
              onMouseDown={(e) => {
                if (e.button === 0) {
                  setIsDragging(true);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  setInset(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                }
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                if (e.touches.length > 0) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.touches[0].clientX - rect.left;
                  setInset(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                }
              }}
            >
              <div
                className="bg-[#C8B195]/40 h-full w-[2px] absolute z-20 top-0 -ml-[1px] select-none pointer-events-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-[#C8B195] text-[#121816] rounded-md hover:scale-110 active:scale-95 transition-all w-5.5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2.5 z-30 cursor-ew-resize flex justify-center items-center shadow-[0_0_15px_rgba(200,177,149,0.4)] border border-[#C8B195]/20"
                  aria-label="Drag to compare"
                  type="button"
                >
                  <GripVertical className="h-4 w-4 select-none" />
                </button>
              </div>
              <Image
                src={image1}
                alt={alt1}
                width={1920}
                height={1080}
                priority
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none pointer-events-none"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              />
              <Image
                src={image2}
                alt={alt2}
                width={1920}
                height={1080}
                priority
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
