const inViewport = (el: React.RefObject<HTMLDivElement>): boolean => {
  const rect = el.current.getBoundingClientRect();
  return rect.top + rect.height >= 0 && rect.top < window.innerHeight;
};

export default inViewport;
