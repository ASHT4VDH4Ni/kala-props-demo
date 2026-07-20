/* =========================================================
   KALA PROPS LLP — site interactivity
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const $  = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Image fallback (graceful degrade if a photo fails) ---------- */
  $$('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.background = 'linear-gradient(135deg, #e9e0cd, #d9b77e)';
      img.style.minHeight = '100%';
      img.alt = img.alt || 'Kala Props';
    }, { once:true });
  });

  /* =========================================================
     DATA — categories & products
  ========================================================= */
  const CATEGORIES = [
    { name:'Sofas & Diwans',      tag:'Living',      filter:'Sofas',   img:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop' },
    { name:'Dining Table & Chairs', tag:'Dining',    filter:'Dining',  img:'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop' },
    { name:'Bedroom',             tag:'Rest',        filter:'Bedroom', img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
    { name:'Office Furniture',    tag:'Work',        filter:'Office',  img:'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
    { name:'Outdoor Furniture',   tag:'Al fresco',   filter:'Outdoor', img:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop' },
    { name:'Lamps & Lighting',    tag:'Ambience',    filter:'Lighting',img:'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=800&auto=format&fit=crop' },
    { name:'Decor & Wall Art',    tag:'Detail',      filter:'Decor',   img:'https://images.unsplash.com/photo-1513519245088-0e12902e0a67?q=80&w=800&auto=format&fit=crop' },
    { name:'Storage & Cabinets',  tag:'Order',       filter:'Storage', img:'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop' },
    { name:'Kids Furniture',      tag:'Play',        filter:'Kids',    img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop' },
    { name:'Cafe & Salon',        tag:'Hospitality', filter:'Cafe',    img:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop' },
    { name:'Furnishings',         tag:'Textiles',    filter:'Furnishings', img:'https://images.unsplash.com/photo-1615529162924-f8605388461d?q=80&w=800&auto=format&fit=crop' },
    { name:'Gym Equipment',       tag:'Fitness',      filter:'Gym',     img:'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop' },
  ];

  const PRODUCTS = [
    { name:'Walnut Wave Sofa', cat:'Sofas',   price:'₹1,850 / day', img:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=700&auto=format&fit=crop' },
    { name:'Chesterfield Leather Diwan', cat:'Sofas', price:'₹2,100 / day', img:'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=700&auto=format&fit=crop' },
    { name:'Oak Six-Seater Dining Set', cat:'Dining', price:'₹2,400 / day', img:'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=700&auto=format&fit=crop' },
    { name:'Brass-Rim Bistro Table', cat:'Dining', price:'₹650 / day', img:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=700&auto=format&fit=crop' },
    { name:'Cane Canopy Bed', cat:'Bedroom', price:'₹2,900 / day', img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=700&auto=format&fit=crop' },
    { name:'Upholstered Bedside Table', cat:'Bedroom', price:'₹350 / day', img:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=700&auto=format&fit=crop' },
    { name:'Ergonomic Executive Chair', cat:'Office', price:'₹450 / day', img:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=700&auto=format&fit=crop' },
    { name:'Walnut Conference Table (8-seat)', cat:'Office', price:'₹3,200 / day', img:'https://images.unsplash.com/photo-1519974719765-e6559eac2575?q=80&w=700&auto=format&fit=crop' },
    { name:'Rattan Balcony Set', cat:'Outdoor', price:'₹1,100 / day', img:'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=700&auto=format&fit=crop' },
    { name:'Teak Sunbed Duo', cat:'Outdoor', price:'₹1,600 / day', img:'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=700&auto=format&fit=crop' },
    { name:'Arc Floor Lamp', cat:'Lighting', price:'₹380 / day', img:'https://images.unsplash.com/photo-1543198126-42aca9a30f77?q=80&w=700&auto=format&fit=crop' },
    { name:'Amber Pendant Cluster', cat:'Lighting', price:'₹520 / day', img:'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=700&auto=format&fit=crop' },
    { name:'Antique Brass Mirror', cat:'Decor', price:'₹420 / day', img:'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=700&auto=format&fit=crop' },
    { name:'Abstract Canvas Triptych', cat:'Decor', price:'₹700 / day', img:'https://images.unsplash.com/photo-1513519245088-0e12902e0a67?q=80&w=700&auto=format&fit=crop' },
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
          <span class="product-card__price">${p.price}</span>
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
     Modals (location / quote / sign-in)
  ========================================================= */
  function openModal(el){ el.classList.add('is-open'); el.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
  function closeModal(el){ el.classList.remove('is-open'); el.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

  const locationModal = $('#locationModal');
  const quoteModal = $('#quoteModal');
  const signInModal = $('#signInModal');

  // First-visit location prompt
  setTimeout(() => openModal(locationModal), 900);

  $('#openLocationModal').addEventListener('click', () => openModal(locationModal));

  const CITY_INFO = {
    Mumbai:    { phone:'+91 81087 43156', address:'Lower Parel, Mumbai — 400013', wa:'918108743156' },
    Hyderabad: { phone:'+91 90000 12345', address:'Gachibowli, Hyderabad — 500032', wa:'919000012345' },
  };
  function applyCity(city){
    const info = CITY_INFO[city] || CITY_INFO.Mumbai;
    $('#announceCity').textContent = city;
    $('#announceCity2').textContent = city;
    $('#contactPhone').textContent = info.phone;
    $('#contactAddress').textContent = info.address;
    $('#footerAddress').textContent = info.address;
    $('#footerPhoneLink').textContent = info.phone;
    $('#footerPhoneLink').href = `tel:${info.phone.replace(/\s/g,'')}`;
    const waMsg = encodeURIComponent(`Hi! I'm interested in renting furniture from Kala Props in ${city}. Could you help me with the details?`);
    $('#whatsappInline').href = `https://wa.me/${info.wa}?text=${waMsg}`;
    $('#whatsappFloat').href = `https://wa.me/${info.wa}?text=${waMsg}`;
  }
  $$('.loc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyCity(btn.dataset.city);
      closeModal(locationModal);
      showToast(`Showing availability for ${btn.dataset.city}`);
    });
  });
  applyCity('Mumbai');

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
    showToast('Thanks! Our team will call you shortly.');
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

  /* ---------- Main quote form ---------- */
  $('#quoteForm').addEventListener('submit', e => {
    e.preventDefault();
    $('#formNote').textContent = 'Thank you! Your enquiry has been received — we\u2019ll be in touch within 4 working hours.';
    $('#formNote').style.color = 'var(--brass)';
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

  /* =========================================================
     Hero slider
  ========================================================= */
  const slides = $$('.hero__slide');
  const dotsWrap = $('#heroDots');
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(b);
  });
  let heroIndex = 0;
  function goToSlide(i){
    slides[heroIndex].classList.remove('is-active');
    dotsWrap.children[heroIndex].classList.remove('is-active');
    heroIndex = i;
    slides[heroIndex].classList.add('is-active');
    dotsWrap.children[heroIndex].classList.add('is-active');
  }
  setInterval(() => goToSlide((heroIndex + 1) % slides.length), 5500);

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

  /* ---------- About video (placeholder behaviour) ---------- */
  $('#aboutPlay').addEventListener('click', () => showToast('Showreel coming soon — reach out for a live studio walkthrough.'));

  /* ---------- Back to top ---------- */
  $('#backToTop').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* =========================================================
     Stat counters (animate on view)
  ========================================================= */
  const statEls = $$('.stat__num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  statEls.forEach(el => statObserver.observe(el));

  function animateCount(el){
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

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
  $$('.why-card, .process-step, .use-card').forEach((el,i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
  });
  observeReveals();

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();

});
