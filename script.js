/* =========================================================
   KALA PROPS — site interactivity (Antique / Archive edition)
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const $  = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Image fallback (graceful degrade if a photo fails) ---------- */
  $$('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.background = 'linear-gradient(135deg, #dcc999, #9c7a3c)';
      img.style.minHeight = '100%';
      img.alt = img.alt || 'Kala Props';
    }, { once:true });
  });

  /* =========================================================
     DATA — collection departments & featured lots
     Images are the studio's own product photography.
  ========================================================= */
  const CATEGORIES = [
    { name:'Ceramics & Vases',     tag:'Tableware',  filter:'Ceramics',  img:'assets/ceramic-vase-indigo-floral.jpg' },
    { name:'Brass & Metalware',    tag:'Curios',      filter:'Brass',     img:'assets/brass-candlesticks.jpg' },
    { name:'Silverware & Trays',   tag:'Vanity',       filter:'Silver',    img:'assets/silver-mirror-tray.jpg' },
    { name:'Candle & Tealight',    tag:'Ambience',    filter:'Candles',   img:'assets/tealight-blue-floral.jpg' },
    { name:'Vintage Figurines',    tag:'Statement',    filter:'Figurines', img:'assets/brass-horse-rearing.jpg' },
    { name:'Festive & Period',     tag:'Seasonal',     filter:'Festive',   img:'assets/ceramic-pumpkins-blue.jpg' },
    { name:'Tabletop Styling',     tag:'Sets',        filter:'Tabletop',  img:'assets/ceramic-jar-tabletop-styling.jpg' },
    { name:'Garden & Botanical',   tag:'Outdoor',     filter:'Garden',    img:'assets/brass-watering-can.jpg' },
  ];

  const PRODUCTS = [
    { name:'Rose Bone China Tea Service', cat:'Ceramics', ref:'REF. 0142', img:'assets/hero-tea-service.jpg' },
    { name:'Red Floral Ceramic Bowl Trio', cat:'Ceramics', ref:'REF. 0118', img:'assets/ceramic-bowls-red-floral.jpg' },
    { name:'Teal Songbird Ginger Jar', cat:'Ceramics', ref:'REF. 0126', img:'assets/ceramic-jar-teal-bird.jpg' },
    { name:'Indigo Blossom Ginger Jars', cat:'Ceramics', ref:'REF. 0131', img:'assets/ceramic-jars-blue-white.jpg' },
    { name:'Hand-Painted Floral Jug Pair', cat:'Ceramics', ref:'REF. 0154', img:'assets/ceramic-jugs-hand-painted.jpg' },
    { name:'Chevron & Bloom Jar Pair', cat:'Ceramics', ref:'REF. 0163', img:'assets/ceramic-jars-chevron.jpg' },
    { name:'Botanical Leaf Vase Pair', cat:'Ceramics', ref:'REF. 0171', img:'assets/ceramic-vase-green-leaf.jpg' },
    { name:'Tabletop Styling Jar Pair', cat:'Tabletop', ref:'REF. 0182', img:'assets/ceramic-jar-tabletop-styling.jpg' },
    { name:'Hand-Painted Porcelain Pumpkins', cat:'Festive', ref:'REF. 0205', img:'assets/ceramic-pumpkins-blue.jpg' },
    { name:'Painted Ceramic Trees', cat:'Festive', ref:'REF. 0211', img:'assets/ceramic-festive-trees.jpg' },
    { name:'Vintage Brass Watering Can', cat:'Garden', ref:'REF. 0233', img:'assets/brass-watering-can.jpg' },
    { name:'Aged Brass Watering Can, No. 2', cat:'Garden', ref:'REF. 0234', img:'assets/brass-watering-can-alt.jpg' },
    { name:'Graduated Brass Candlestick Set', cat:'Brass', ref:'REF. 0248', img:'assets/brass-candlesticks.jpg' },
    { name:'Ribbed Metallic Period Jars', cat:'Brass', ref:'REF. 0256', img:'assets/brass-metallic-jars.jpg' },
    { name:'Ornate Brass Vase Pair', cat:'Brass', ref:'REF. 0261', img:'assets/brass-vase-ornate.jpg' },
    { name:'Brass Swan Pair', cat:'Figurines', ref:'REF. 0274', img:'assets/brass-swan-pair.jpg' },
    { name:'Brass Horse, Standing', cat:'Figurines', ref:'REF. 0279', img:'assets/brass-horse-standing.jpg' },
    { name:'Brass Horse, Rearing', cat:'Figurines', ref:'REF. 0280', img:'assets/brass-horse-rearing.jpg' },
    { name:'Filigree Silver Mirror Tray', cat:'Silver', ref:'REF. 0292', img:'assets/silver-mirror-tray.jpg' },
    { name:'Gilt Mirror Tray Set', cat:'Silver', ref:'REF. 0296', img:'assets/brass-mirror-tray-set.jpg' },
    { name:'Minimalist White Tealight Holder', cat:'Candles', ref:'REF. 0303', img:'assets/tealight-white-minimal.jpg' },
    { name:'Green Floral Tealight Duo', cat:'Candles', ref:'REF. 0308', img:'assets/tealight-green-floral.jpg' },
    { name:'Indigo Floral Tealight Duo', cat:'Candles', ref:'REF. 0309', img:'assets/tealight-blue-floral.jpg' },
    { name:'Hanging Teardrop Tealights', cat:'Candles', ref:'REF. 0314', img:'assets/tealight-hanging-indigo.jpg' },
    { name:'Blue Onion-Dome Candle Holders', cat:'Candles', ref:'REF. 0319', img:'assets/candleholder-onion-blue.jpg' },
    { name:'Painted Onion-Dome Candle Holders', cat:'Candles', ref:'REF. 0320', img:'assets/candleholder-onion-multicolor.jpg' },
  ];

  /* ---------- Render categories ---------- */
  const catGrid = $('#catGrid');
  catGrid.innerHTML = CATEGORIES.map((c,i) => `
    <div class="cat-card reveal" data-filter="${c.filter}" style="transition-delay:${(i%4)*70}ms">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="cat-card__scrim"></div>
      <div class="cat-card__label">
        <small>${c.tag}</small>
        <span>${c.name}</span>
      </div>
    </div>
  `).join('');
  $$('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const f = card.dataset.filter;
      setFilter(f);
      $('#catalog').scrollIntoView({ behavior:'smooth' });
    });
  });

  /* ---------- Render products + filtering ---------- */
  const productGrid = $('#productGrid');
  const wishlist = new Set();
  const wishCount = $('#wishCount');

  function renderProducts(filter='all'){
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    productGrid.innerHTML = list.map((p,i) => `
      <article class="product-card reveal" style="transition-delay:${(i%4)*60}ms">
        <div class="product-card__media">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <button class="product-card__wish" data-name="${p.name}" aria-label="Add ${p.name} to wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 20.4S3.6 15.1 3.6 9.3A4.9 4.9 0 0 1 12 6a4.9 4.9 0 0 1 8.4 3.3c0 5.8-8.4 11.1-8.4 11.1Z" stroke="currentColor" stroke-width="1.8"/></svg>
          </button>
          <span class="product-card__ref">${p.ref}</span>
        </div>
        <div class="product-card__body">
          <p class="product-card__cat">${p.cat}</p>
          <h3 class="product-card__name">${p.name}</h3>
          <a href="#contact" class="product-card__cta">Enquire →</a>
        </div>
      </article>
    `).join('');
    requestAnimationFrame(observeReveals);

    $$('.product-card__wish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = btn.dataset.name;
        if (wishlist.has(name)) { wishlist.delete(name); btn.classList.remove('is-active'); }
        else { wishlist.add(name); btn.classList.add('is-active'); showToast(`Added “${name}” to your wishlist`); }
        wishCount.textContent = wishlist.size;
      });
    });
  }
  renderProducts();

  function setFilter(filter){
    $$('.filter-tab').forEach(t => t.classList.toggle('is-active', t.dataset.filter === filter));
    if (!$$('.filter-tab').some(t => t.classList.contains('is-active'))) {
      $('.filter-tab[data-filter="all"]').classList.add('is-active');
    }
    renderProducts(filter);
  }
  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => setFilter(tab.dataset.filter));
  });
  // mega menu quick-filter links
  $$('.mega a[data-filter]').forEach(link => {
    link.addEventListener('click', () => setFilter(link.dataset.filter));
  });

  /* =========================================================
     Header scroll state
  ========================================================= */
  const header = $('#siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    $('#backToTop').classList.toggle('is-visible', window.scrollY > 800);
  }, { passive:true });

  /* ---------- Mobile menu ---------- */
  const hamburger = $('#hamburgerBtn');
  const mobileMenu = $('#mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }));

  /* ---------- Search panel ---------- */
  const searchPanel = $('#searchPanel');
  $('#searchToggle').addEventListener('click', () => {
    searchPanel.classList.toggle('is-open');
    if (searchPanel.classList.contains('is-open')) setTimeout(() => $('#searchInput').focus(), 300);
  });
  $('#searchClose').addEventListener('click', () => searchPanel.classList.remove('is-open'));
  $('#searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()){
      searchPanel.classList.remove('is-open');
      $('#catalog').scrollIntoView({ behavior:'smooth' });
      showToast(`Searching for “${e.target.value.trim()}”…`);
    }
  });

  /* =========================================================
     Modals (quote / sign-in)
  ========================================================= */
  function openModal(el){ el.classList.add('is-open'); el.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
  function closeModal(el){ el.classList.remove('is-open'); el.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

  const quoteModal = $('#quoteModal');
  const signInModal = $('#signInModal');

  $('#headerQuoteBtn').addEventListener('click', (e) => { e.preventDefault(); openModal(quoteModal); });
  $('#footerQuoteBtn').addEventListener('click', () => openModal(quoteModal));
  $('#signInToggle').addEventListener('click', () => openModal(signInModal));

  $$('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => {
    closeModal(quoteModal); closeModal(signInModal);
  }));
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal-overlay.is-open').forEach(closeModal);
  });

  $('#modalQuoteForm').addEventListener('submit', e => {
    e.preventDefault();
    closeModal(quoteModal);
    showToast('Thanks! We\u2019ll call you shortly to confirm.');
    e.target.reset();
  });
  $('#signInForm').addEventListener('submit', e => {
    e.preventDefault();
    closeModal(signInModal);
    showToast('Signed in — welcome back.');
  });
  $('#switchToSignUp').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Account creation opens in a moment — our team will assist you.');
  });

  /* ---------- WhatsApp link (single location, fixed number) ---------- */
  const WA_NUMBER = '919136810335';
  const waMsg = encodeURIComponent("Hi! I'm interested in renting props from Kala Props. Could you help me with the details?");
  $('#whatsappInline').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  $('#whatsappFloat').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  /* ---------- Main enquiry form ---------- */
  $('#quoteForm').addEventListener('submit', e => {
    e.preventDefault();
    $('#formNote').textContent = 'Thank you! Your enquiry has been received — we\u2019ll be in touch shortly.';
    $('#formNote').style.color = 'var(--brass-dark)';
    showToast('Enquiry submitted successfully.');
    e.target.reset();
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(msg){
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  /* ---------- Testimonial carousel ---------- */
  const testis = $$('.testi');
  const testiDots = $('#testiDots');
  testis.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => goToTesti(i));
    testiDots.appendChild(b);
  });
  let testiIndex = 0;
  function goToTesti(i){
    testis[testiIndex].classList.remove('is-active');
    testiDots.children[testiIndex].classList.remove('is-active');
    testiIndex = i;
    testis[testiIndex].classList.add('is-active');
    testiDots.children[testiIndex].classList.add('is-active');
  }
  setInterval(() => goToTesti((testiIndex + 1) % testis.length), 6000);

  /* ---------- FAQ accordion ---------- */
  $$('.faq-item').forEach(item => {
    $('.faq-q', item).addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      $$('.faq-item').forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Back to top ---------- */
  $('#backToTop').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* =========================================================
     Scroll reveal
  ========================================================= */
  let revealObserver;
  function observeReveals(){
    if (!revealObserver){
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold:0.12 });
    }
    $$('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveals();

  /* Mark static sections as reveal targets too */
  $$('.why-card, .process-step, .travel-row').forEach((el,i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
  });
  observeReveals();

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();

});
