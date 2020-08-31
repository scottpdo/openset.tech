function scrollToTarget(selector) {
  const el: HTMLElement = document.querySelector(selector);
  if (!el) return;
  window.scrollBy({
    top: el.getBoundingClientRect().y,
    behavior: "smooth",
  });
}

export default scrollToTarget;
