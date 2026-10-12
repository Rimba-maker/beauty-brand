import { PRODUCTS, image, money } from '../data/content';
import { initializeCampaign, selectCampaign } from './campaign';
import { filterCollection, acknowledgeBag, revealRitual, revealMenu } from './motion';

type BagItem = { id: string; shade: string; quantity: number };
const storageKey = 'dewy-atelier-bag';
const productDialog = document.querySelector<HTMLDialogElement>('#product-dialog')!;
const bagDialog = document.querySelector<HTMLDialogElement>('#bag-dialog')!;
const quizDialog = document.querySelector<HTMLDialogElement>('#quiz-dialog')!;
const productDetail = document.querySelector<HTMLElement>('#product-detail')!;
const bagContent = document.querySelector<HTMLElement>('#bag-content')!;
const quizForm = document.querySelector<HTMLFormElement>('#ritual-form')!;
const quizResults = document.querySelector<HTMLElement>('#quiz-results')!;
const toast = document.querySelector<HTMLElement>('.toast')!;
const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu')!;
let bag: BagItem[] = [];
let selectedProduct = PRODUCTS[0]!;
let selectedShade = '';
let toastTimeout: number;
let storageAvailable = true;

try {
  const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (Array.isArray(stored)) {
    for (const entry of stored) {
      if (!entry || typeof entry !== 'object') continue;
      const product = PRODUCTS.find(p => p.id === entry.id);
      if (!product || typeof entry.shade !== 'string' || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 99) continue;
      if (product.shades.length ? !product.shades.some(s => s.name === entry.shade) : entry.shade !== '') continue;
      const existing = bag.find(item => item.id === entry.id && item.shade === entry.shade);
      if (existing) existing.quantity = Math.min(99, existing.quantity + entry.quantity);
      else bag.push({ id: product.id, shade: entry.shade, quantity: entry.quantity });
    }
  }
} catch { storageAvailable = false; }

function announce(message: string) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.hidden = false;
  toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 3500);
}

function updateBag() {
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-bag-count]').forEach(el => { el.textContent = String(count); });
  if (bagDialog.open) renderBag();
  try { localStorage.setItem(storageKey, JSON.stringify(bag)); storageAvailable = true; }
  catch { storageAvailable = false; }
}

function renderBag() {
  if (!bag.length) {
    bagContent.innerHTML = '<p>Your bag is waiting for a little beauty.</p><p class="notice">Explore the collection, choose your essentials, and make a ritual your own.</p><button class="button" data-continue>Discover the collection</button><p class="notice">This is a shopping demo. No payments or orders are processed.</p>';
    return;
  }
  const subtotal = bag.reduce((sum,item) => sum + PRODUCTS.find(p => p.id === item.id)!.price * item.quantity,0);
  bagContent.innerHTML = bag.map((item,index) => {
    const product = PRODUCTS.find(p => p.id === item.id)!;
    return `<article class="bag-item"><img src="${image(product.image)}" alt="Illustrative photography for ${product.name}" width="72" height="96"><div><h3>${product.name}</h3><p>${item.shade || product.detail}</p><p>${money(product.price)} each</p><div class="quantity"><button data-quantity="${index}" data-delta="-1" aria-label="Decrease ${product.name} quantity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14"/></svg></button><span>${item.quantity}</span><button data-quantity="${index}" data-delta="1" aria-label="Increase ${product.name} quantity" ${item.quantity===99?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg></button></div><button class="remove-item" data-remove="${index}" aria-label="Remove ${product.name}${item.shade?' in '+item.shade:''}">Remove</button></div></article>`;
  }).join('') + `<div class="bag-total"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><p class="notice">Shopping demo only. No payment is taken and no order will be placed.${storageAvailable?' Your bag is saved in this browser.':' Browser storage is unavailable; your bag lasts for this visit only.'}</p><button class="button" data-continue>Continue discovering</button>`;
}

function openProduct(id: string) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  selectedProduct = product;
  selectedShade = product.shades[0]?.name ?? '';
  quizDialog.close();
  bagDialog.close();
  productDetail.innerHTML = `<img src="${image(product.image)}" alt="Illustrative photography for ${product.name}" width="700" height="900"><div class="detail-copy"><h2 id="detail-title">${product.name}</h2><span class="detail-price">${money(product.price)}</span><p>${product.description}</p>${product.shades.length?`<fieldset><legend>Choose your shade</legend><div class="shade-options">${product.shades.map((shade,i)=>`<button type="button" class="shade-choice" data-shade="${shade.name}" aria-pressed="${i===0}"><span class="swatch shade-${shade.color}" aria-hidden="true"></span>${shade.name}</button>`).join('')}</div></fieldset>`:''}<button class="button" data-add>Add to bag · ${money(product.price)}</button><details><summary>Your little ritual</summary><p>${product.ritual}</p></details><p class="notice">Fictional collection · Stock imagery is illustrative. Shade swatches are digital representations, not verified product colour matches.</p><p data-add-status role="status" class="notice"></p></div>`;
  productDialog.showModal();
}

function openQuiz() {
  productDialog.close();
  bagDialog.close();
  quizForm.hidden = false;
  quizResults.hidden = true;
  quizDialog.showModal();
}

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !expanded;
  if (expanded) revealMenu();
});
mobileMenu.addEventListener('click', event => {
  if (!(event.target instanceof Element) || !event.target.closest('a,button')) return;
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open menu');
});
document.addEventListener('keydown', event => {
  if (event.key==='Escape' && !mobileMenu.hidden) {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Open menu');
    menuToggle.focus();
  }
});

for (const dialog of [productDialog,bagDialog,quizDialog]) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}

document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLElement>('button');
  if (!button) return;
  if (button.hasAttribute('data-close')) { button.closest<HTMLDialogElement>('dialog')?.close(); return; }
  if (button.hasAttribute('data-open-bag')) { productDialog.close(); quizDialog.close(); renderBag(); bagDialog.showModal(); return; }
  if (button.hasAttribute('data-open-quiz')) { openQuiz(); return; }
  if (button.dataset.product) { openProduct(button.dataset.product); return; }
  if (button.dataset.shade) {
    if (!selectedProduct.shades.some(s => s.name === button.dataset.shade)) return;
    selectedShade = button.dataset.shade;
    productDetail.querySelectorAll<HTMLElement>('[data-shade]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.shade===selectedShade)));
    return;
  }
  if (button.hasAttribute('data-add')) {
    const existing = bag.find(item => item.id===selectedProduct.id && item.shade===selectedShade);
    if (existing?.quantity === 99) { productDetail.querySelector('[data-add-status]')!.textContent='You have reached 99 of this item. Change quantities in your bag.'; return; }
    if (existing) existing.quantity++;
    else bag.push({id:selectedProduct.id,shade:selectedShade,quantity:1});
    updateBag();
    acknowledgeBag();
    productDetail.querySelector('[data-add-status]')!.textContent = `Added ${selectedProduct.name}${selectedShade?' in '+selectedShade:''} to your bag.${storageAvailable?'':' Browser storage is unavailable; your bag lasts for this visit only.'}`;
    button.textContent = `Add another · ${money(selectedProduct.price)}`;
    return;
  }
  if (button.dataset.quantity !== undefined) {
    const index = Number(button.dataset.quantity);
    const item = bag[index];
    if (!item) return;
    item.quantity = Math.min(99,item.quantity+Number(button.dataset.delta));
    if (item.quantity < 1) bag.splice(index,1);
    updateBag();
    acknowledgeBag();
    const nextControl = bagContent.querySelector<HTMLButtonElement>(`[data-quantity="${Math.min(index,bag.length-1)}"][data-delta="${button.dataset.delta}"]`) ?? bagContent.querySelector<HTMLButtonElement>('[data-continue]');
    nextControl?.focus();
    announce('Bag updated.');
    return;
  }
  if (button.dataset.remove !== undefined) {
    bag.splice(Number(button.dataset.remove),1);updateBag();
    acknowledgeBag();
    bagContent.querySelector<HTMLButtonElement>('[data-remove], [data-continue]')?.focus();
    announce('Item removed from your bag.');return;
  }
  if (button.hasAttribute('data-continue')) { bagDialog.close(); document.querySelector('#products')?.scrollIntoView({behavior:'auto'}); return; }
  if (button.dataset.filter) {
    filterCollection(button.dataset.filter);
    return;
  }
  if (button.dataset.campaign !== undefined) {
    selectCampaign(button.dataset.campaign);
    return;
  }
  if (button.hasAttribute('data-retake')) { quizResults.hidden=true;quizForm.hidden=false;quizForm.querySelector('input')?.focus(); }
});

quizForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(quizForm);
  const colour = data.get('mood')==='colour';
  const full = data.get('pace')==='complete';
  const ids = colour ? ['cloud-blush','petal-tint',...(full?['velvet-brow','dewy-mist']:[])] : ['glow-drops','halo-stick',...(full?['velvet-brow','dewy-mist']:[])];
  quizResults.innerHTML = `<h3 class="section-heading" tabindex="-1">${colour?'A little colour, a lot of you.':'Your naturally luminous ritual.'}</h3><p>${full?'A few thoughtful steps to take your time with.':'Two essentials. A beautifully simple place to start.'}</p><div class="quiz-results">${ids.map(id=>{const p=PRODUCTS.find(product=>product.id===id)!;return `<article class="quiz-result"><img src="${image(p.image)}" alt="Illustrative ${p.category.toLowerCase()} photography" width="75" height="94"><div><h3>${p.name}</h3><p>${p.tagline} · ${money(p.price)}</p><button data-product="${p.id}">Explore this essential</button></div></article>`;}).join('')}</div><button class="button button-outline" data-retake>Try another ritual</button><p class="notice">Suggestions based on your preferences, not a skin diagnosis. Choose the products that feel right for you.</p>`;
  quizForm.hidden=true;
  quizResults.hidden=false;
  revealRitual();
  quizResults.querySelector<HTMLElement>('h3')?.focus();
});

updateBag();
initializeCampaign();
