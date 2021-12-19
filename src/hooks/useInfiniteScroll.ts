import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (target: any, loadMore: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const intersectionObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !isFetching) {
            setIsFetching(true);
            await loadMore();
            setIsFetching(false);
          }
        });
      },
      {
        threshold: 1.0,
      }
    );
  }, []);

  useEffect(() => {
    if (target.current && intersectionObserver.current) {
      intersectionObserver.current.observe(target.current);
    }
  }, [target]);

  return [isFetching];
};

export default useInfiniteScroll;
