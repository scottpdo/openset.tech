const inViewport = (
  el: React.RefObject<HTMLDivElement>,
  threshold: number = 0
): boolean => {
  const rect = el.current.getBoundingClientRect();
  const h = window.innerHeight;
  return (
    rect.top + rect.height >= threshold * h && rect.top < (1 - threshold) * h
  );
};

export default inViewport;
