const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ownedAnimations = new Map<HTMLElement, Animation>();
let collectionTransition: ViewTransition | undefined;
let filterGeneration = 0;

function playFeedback(element: HTMLElement | null, frames: Keyframe[], duration: number) {
  if (!element) return;
  ownedAnimations.get(element)?.cancel();
  if (reducedMotion.matches || document.hidden) return;
  const animation = element.animate(frames, {
    duration,
    easing: 'cubic-bezier(.16,1,.3,1)',
  });
  ownedAnimations.set(element, animation);
  const cleanup = () => {
    if (ownedAnimations.get(element) === animation) ownedAnimations.delete(element);
  };
  void animation.finished.then(cleanup, cleanup);
}

function cancelMotion() {
  ownedAnimations.forEach(animation => animation.cancel());
  ownedAnimations.clear();
  collectionTransition?.skipTransition();
}

reducedMotion.addEventListener('change', event => {
  if (event.matches) cancelMotion();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelMotion();
});

export function filterCollection(filter: string) {
  const generation = ++filterGeneration;
  collectionTransition?.skipTransition();
  const applyFilter = () => {
    if (generation !== filterGeneration) return;
    document.querySelectorAll<HTMLElement>('[data-filter]').forEach(control => {
      control.setAttribute('aria-pressed', String(control.dataset.filter === filter));
    });
    let count = 0;
    document.querySelectorAll<HTMLElement>('.product-card').forEach(card => {
      card.hidden = filter !== 'All' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    const countLabel = document.querySelector('[data-product-count]');
    if (countLabel) countLabel.textContent = `${count} ${count === 1 ? 'essential' : 'essentials'}`;
  };
  if (reducedMotion.matches || document.hidden || typeof document.startViewTransition !== 'function') {
    applyFilter();
    return;
  }
  const transition = document.startViewTransition(applyFilter);
  collectionTransition = transition;
  // Skipping an interrupted transition rejects ready, but still runs its update callback.
  void transition.ready.catch(() => {});
  void transition.finished.then(() => {
    if (collectionTransition === transition) collectionTransition = undefined;
  }, () => {
    applyFilter();
    if (collectionTransition === transition) collectionTransition = undefined;
  });
}

export function acknowledgeBag() {
  const lavender = getComputedStyle(document.documentElement).getPropertyValue('--color-lavender').trim();
  playFeedback(document.querySelector<HTMLElement>('.bag-toggle'), [
    { backgroundColor: lavender },
    { backgroundColor: 'transparent' },
  ], 320);
}

export function revealRitual() {
  playFeedback(document.querySelector<HTMLElement>('#quiz-results'), [
    { opacity: .65, filter: 'blur(2px)' },
    { opacity: 1, filter: 'blur(0)' },
  ], 260);
}

export function revealMenu() {
  playFeedback(document.querySelector<HTMLElement>('#mobile-menu'), [
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0 0)' },
  ], 240);
}
