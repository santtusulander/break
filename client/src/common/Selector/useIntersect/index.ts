import { useEffect, useRef, useState } from "react";

const useIntersect = ({ root = null, rootMargin, threshold = 0 }: IntersectionObserverInit): [React.Dispatch<React.SetStateAction<Element | null>>, undefined | IntersectionObserverEntry] => {
  const [entry, updateEntry] = useState<undefined | IntersectionObserverEntry>(undefined);
  const [node, setNode] = useState<Element | null>(null);

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold
    })
  );

  useEffect(
    () => {

      const { current: currentObserver } = observer;
      currentObserver.disconnect();

      if (node) currentObserver.observe(node);

      return () => currentObserver.disconnect();
    },
    [node]
  );

  return [setNode, entry];
};

export default useIntersect