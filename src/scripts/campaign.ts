import { CAMPAIGNS, PRODUCTS, image, money } from '../data/content';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const ease = 'cubic-bezier(.16, 1, .3, 1)';
let campaign: HTMLElement | null = null;
let media: HTMLElement | null = null;
let current = 0;
let request = 0;
let transition: Animation | null = null;
let opening: Animation[] = [];

function stopOpening() {
  opening.forEach(animation => animation.cancel());
  opening = [];
}

function settlePhotograph() {
  if (!media) return;
  // The selected photograph becomes the base before any interrupted reveal is removed.
  media.dataset.active = String(current);
  transition?.cancel();
  transition = null;
  media.querySelectorAll('[data-revealing]').forEach(photo => photo.removeAttribute('data-revealing'));
}

function showSelection(index: number) {
  campaign?.querySelectorAll<HTMLElement>('[data-campaign]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.campaign === String(index)));
  });
}

function status(message: string) {
  const element = campaign?.querySelector<HTMLElement>('[data-campaign-status]');
  if (element) element.textContent = message;
}

function updateEditorial(index: number) {
  if (!campaign || !media) return;
  const edit = CAMPAIGNS[index]!;
  const product = PRODUCTS.find(item => item.id === edit.productId)!;
  const button = campaign.querySelector<HTMLButtonElement>('.campaign-product')!;
  const productPhoto = button.querySelector<HTMLImageElement>('[data-campaign-product-image]')!;
  button.dataset.product = product.id;
  button.setAttribute('aria-label', `Discover ${product.name}, ${money(product.price)}`);
  productPhoto.src = image(product.image);
  productPhoto.alt = `Illustrative photography for ${product.name}`;
  button.querySelector('[data-campaign-product-copy]')!.textContent = index === 0 ? 'Your first step to dew' : product.tagline;
  button.querySelector('[data-campaign-product-name]')!.textContent = product.name;
  button.querySelector('[data-campaign-product-price]')!.textContent = `${money(product.price)} · Discover & add`;
  campaign.querySelector('[data-campaign-label]')!.textContent = edit.label;
  campaign.querySelector('[data-campaign-position]')!.textContent = String(index + 1).padStart(2, '0');
  media.querySelectorAll<HTMLImageElement>('[data-campaign-image]').forEach(photo => {
    photo.setAttribute('aria-hidden', String(photo.dataset.campaignImage !== String(index)));
  });
  showSelection(index);
  status(`${edit.label}. ${product.name}, ${money(product.price)}. Discover this edit's product below the photograph.`);
}

export function initializeCampaign() {
  if (campaign) return;
  campaign = document.querySelector<HTMLElement>('.campaign');
  media = campaign?.querySelector<HTMLElement>('.campaign-media') ?? null;
  if (!campaign || !media) return;
  current = Number(media.dataset.active ?? 0);

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    stopOpening();
    settlePhotograph();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    request++;
    stopOpening();
    settlePhotograph();
    media?.removeAttribute('aria-busy');
    showSelection(current);
    status('');
  });

  const bounds = campaign.getBoundingClientRect();
  if (reducedMotion.matches || document.hidden || window.scrollY > 8 || bounds.top >= window.innerHeight || bounds.bottom <= 0 || typeof media.animate !== 'function') return;
  // One opening of the atelier: the photograph's aperture and two typeset lines.
  opening = [media.animate([
    { clipPath: 'inset(10% 12% 10% 12%)' },
    { clipPath: 'inset(0% 0% 0% 0%)' },
  ], { duration: 720, easing: ease })];
  campaign.querySelectorAll<HTMLElement>('[data-headline-line]').forEach((line, index) => {
    opening.push(line.animate([
      { transform: 'translateY(110%)' },
      { transform: 'translateY(0)' },
    ], { duration: 600, delay: 80 + index * 80, easing: ease, fill: 'backwards' }));
  });
  const sequence = opening;
  void Promise.all(sequence.map(animation => animation.finished)).then(() => {
    if (opening === sequence) stopOpening();
  }).catch(() => { /* Cancellation leaves the fully visible stylesheet state. */ });
}

export async function selectCampaign(value: string) {
  if (!campaign || !media || !/^\d+$/.test(value)) return;
  const index = Number(value);
  const edit = CAMPAIGNS[index];
  if (!edit) return;
  const token = ++request;
  stopOpening();
  settlePhotograph();
  showSelection(index);
  media.removeAttribute('aria-busy');
  if (index === current) {
    status(`${edit.label} is selected.`);
    return;
  }

  const incoming = media.querySelector<HTMLImageElement>(`[data-campaign-image="${index}"]`)!;
  const product = PRODUCTS.find(item => item.id === edit.productId)!;
  const productPhoto = new Image();
  productPhoto.src = image(product.image);
  media.setAttribute('aria-busy', 'true');
  status(`Loading ${edit.label}. The current edit remains available.`);
  try {
    // Decode both images while leaving the current photograph and product usable.
    await Promise.all([incoming.decode(), productPhoto.decode()]);
  } catch {
    if (token !== request) return;
    media.removeAttribute('aria-busy');
    showSelection(current);
    status(`The ${edit.label.toLowerCase()} photograph could not load. The current edit is still available; choose an edit to try again.`);
    return;
  }
  if (token !== request || document.hidden) return;
  media.removeAttribute('aria-busy');
  const forward = index > current;
  current = index;
  incoming.alt = edit.alt;
  updateEditorial(index);
  if (reducedMotion.matches || typeof incoming.animate !== 'function') {
    settlePhotograph();
    return;
  }

  // Keep the previous frame behind the incoming photograph, never an empty surface.
  incoming.setAttribute('data-revealing', '');
  const animation = incoming.animate([
    { clipPath: forward ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0 0 0)' },
  ], { duration: 460, easing: ease, fill: 'both' });
  transition = animation;
  try {
    await animation.finished;
    if (transition === animation) settlePhotograph();
  } catch { /* A new edit, reduced motion, or a hidden page already settled the frame. */ }
}
