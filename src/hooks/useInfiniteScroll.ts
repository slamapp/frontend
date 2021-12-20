import { RefObject, useEffect, useRef, useState } from "react";

const useInfiniteScroll = (
  target: RefObject<HTMLElement>,
  loadMore: any,
  threshold = 1.0
) => {
  const [isFetching, setIsFetching] = useState(false);
  const intersectionObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !isFetching) {
            console.log("intersecting!");
            setIsFetching(true);
            await loadMore();
            setIsFetching(false);
          }
        });
      },
      { threshold }
    );
  }, [isFetching, loadMore, threshold]);

  useEffect(() => {
    if (target.current && intersectionObserver.current) {
      intersectionObserver.current.observe(target.current);
    }
  }, [target]);

  return [isFetching];
};

export default useInfiniteScroll;
