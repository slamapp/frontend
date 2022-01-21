import { useEffect, useRef, useState } from "react";

let observer: IntersectionObserver | null = null;
const LOAD_IMG_EVENT_TYPE = "loadImage";

const onIntersection = (
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

interface Props {
  lazy?: boolean;
  threshold?: number;
  block?: boolean;
  src: string;
  width?: number | "auto";
  height?: number;
  alt?: string;
  mode?: "cover" | "fill" | "contain";
  [x: string]: any;
}

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  block,
  src,
  width,
  height,
  alt,
  mode = "cover",
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const imageStyle = {
    display: block ? "block" : undefined,
    width,
    height,
    objectFit: mode,
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);

      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    if (imgElement) {
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
      }
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) {
      return;
    }

    observer = new IntersectionObserver(onIntersection, { threshold });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{
        ...props.style,
        ...imageStyle,
      }}
    />
  );
};

export default Image;
