/* =========================================================
   島作選物 DAOZAO — 互動腳本
   作者：工程（作品集示範 #2）
   功能：行動選單、捲動效果、商品分類/排序、前端購物車、聯絡表單驗證
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 商品資料（示範用，可替換為後端 API / JSON） ---------- */
  const PRODUCTS = [
    { id: "p01", cat: "ceramic", name: "手拉坏淺碟", maker: "林春生 · 苗栗", price: 680, badge: "", desc: "帶灰白釉色的手拉坏淺碟，適合盛放小菜或點心。", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80" },
    { id: "p02", cat: "ceramic", name: "窯變釉馬克杯", maker: "林春生 · 苗栗", price: 520, badge: "", desc: "每只窯變色澤皆不同，握把厚實好拿，容量約 350ml。", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80" },
    { id: "p03", cat: "ceramic", name: "灰釉茶倉", maker: "島作自家", price: 880, badge: "新品", desc: "附軟木塞的茶葉罐，避光防潮，可存放約 100g 茶葉。", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80" },
    { id: "p04", cat: "textile", name: "天然藍染方巾", maker: "陳阿蕊 · 台南", price: 450, badge: "", desc: "植物藍染，可當餐墊或拭巾，使用後顏色會自然變化。", img: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=800&q=80" },
    { id: "p05", cat: "textile", name: "亞麻餐桌巾", maker: "陳阿蕊 · 台南", price: 1280, badge: "熱銷", desc: "100% 亞麻，透氣親膚，鋪上餐桌立刻有了生活感。", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80" },
    { id: "p06", cat: "textile", name: "藺草編織托特包", maker: "苑裡工坊 · 苗栗", price: 1680, badge: "售完", soldout: true, desc: "手工編織藺草提袋，自然散發淡淡草香，夏日必備。", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80" },
    { id: "p07", cat: "tea", name: "炭焙凍頂烏龍", maker: "高有義 · 南投", price: 760, badge: "", desc: "中焙火，茶湯琥珀透亮，尾韻甘甜回甘，耐沖泡。", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80" },
    { id: "p08", cat: "tea", name: "東方美人茶罐", maker: "高有義 · 南投", price: 980, badge: "限量", desc: "小綠葉蟬著蜒，蜜香與果香交織，每罐 75g。", img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
    { id: "p09", cat: "tea", name: "手作鳳梨酥禮盒", maker: "島作合作", price: 420, badge: "", desc: "本產土鳳梨熬製內餡，酸甜不膩，10 入禮盒裝。", img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80" },
    { id: "p10", cat: "daily", name: "相思木托盤", maker: "木匠工坊 · 台中", price: 890, badge: "", desc: "台灣相思木手工研磨，木紋獨一無二，天然蜂蠟塗裝。", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80" },
    { id: "p11", cat: "daily", name: "手工大豆蠟燭", maker: "島作自家", price: 560, badge: "", desc: "天然大豆蠟與木質燭芯，氣味為檜木與柑橘，約可燃 40 小時。", img: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80" },
    { id: "p12", cat: "daily", name: "藺草杯墊（四入）", maker: "苑裡工坊 · 苗栗", price: 320, badge: "", desc: "吸水性佳的藺草編織杯墊，一組四片，附棉繩綁束。", img: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=800&q=80" },
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const money = (n) => "NT$ " + n.toLocaleString("zh-Hant-TW");
  const FREE_SHIP = 1200;

  /* ---------- 1. 行動選單 ---------- */
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  function setNav(open) {
    if (!navToggle || !mainNav) return;
    navToggle.classList.toggle("is-open", open);
    mainNav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
  }
  navToggle?.addEventListener("click", () => setNav(!mainNav.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setNav(false));
  $$("#mainNav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setNav(false); closeCart(); } });

  /* ---------- 2. Header 陰影 + 回頂端 ---------- */
  const header = $("#siteHeader");
  const toTop = $("#toTop");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 20);
    toTop?.classList.toggle("is-visible", y > 700);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 3. 捲動進場 ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 4. 商品渲染 / 分類 / 排序 ---------- */
  const grid = $("#productGrid");
  const emptyHint = $("#emptyHint");
  const sortSelect = $("#sortSelect");
  let activeCat = "all";

  function cardHTML(p) {
    const badge = p.badge
      ? `<span class="product-badge${p.soldout ? " is-soldout" : ""}">${p.badge}</span>` : "";
    const btn = p.soldout
      ? `<button class="add-btn" disabled>已售完</button>`
      : `<button class="add-btn" data-add="${p.id}">加入購物車</button>`;
    return `
      <article class="product-card" data-cat="${p.cat}">
        <div class="product-media">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          ${badge}
        </div>
        <div class="product-body">
          <p class="product-maker">${p.maker}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-foot">
            <span class="product-price">${money(p.price)}</span>
            ${btn}
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    if (!grid) return;
    let list = activeCat === "all" ? PRODUCTS.slice() : PRODUCTS.filter((p) => p.cat === activeCat);
    const sort = sortSelect?.value || "featured";
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    grid.innerHTML = list.map(cardHTML).join("");
    if (emptyHint) emptyHint.hidden = list.length > 0;
    $$(".product-card", grid).forEach((c, i) => { c.style.animationDelay = i * 0.05 + "s"; });
  }
  renderProducts();

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      activeCat = tab.dataset.category;
      renderProducts();
    });
  });
  sortSelect?.addEventListener("change", renderProducts);

  /* ---------- 5. 前端購物車 ---------- */
  const cart = new Map(); // id -> qty
  const drawer = $("#cartDrawer");
  const overlay = $("#cartOverlay");
  const cartBody = $("#cartBody");
  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");
  const cartNote = $("#cartNote");
  const checkoutBtn = $("#checkoutBtn");

  function openCart() {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    setTimeout(() => { overlay.hidden = true; }, 350);
  }

  function itemBy(id) { return PRODUCTS.find((p) => p.id === id); }

  function renderCart() {
    const entries = [...cart.entries()];
    const totalQty = entries.reduce((s, [, q]) => s + q, 0);
    const totalPrice = entries.reduce((s, [id, q]) => s + itemBy(id).price * q, 0);

    if (cartCount) {
      cartCount.textContent = String(totalQty);
      cartCount.classList.remove("is-bump");
      void cartCount.offsetWidth;
      cartCount.classList.add("is-bump");
    }
    if (cartTotal) cartTotal.textContent = money(totalPrice);
    if (checkoutBtn) checkoutBtn.disabled = entries.length === 0;

    if (cartNote) {
      if (totalPrice >= FREE_SHIP || entries.length === 0) {
        cartNote.textContent = entries.length ? "已達免運門檻 🎉" : `滿 NT$1,200 免運`;
        cartNote.classList.toggle("is-free", entries.length > 0);
      } else {
        cartNote.textContent = `再買 ${money(FREE_SHIP - totalPrice)} 即可免運`;
        cartNote.classList.remove("is-free");
      }
    }

    if (!cartBody) return;
    if (entries.length === 0) {
      cartBody.innerHTML = `<div class="cart-empty"><span aria-hidden="true">🧺</span>購物車還是空的，去逛逛本季選品吧。</div>`;
      return;
    }
    cartBody.innerHTML = entries.map(([id, q]) => {
      const p = itemBy(id);
      return `
        <div class="cart-item" data-id="${id}">
          <img src="${p.img}" alt="${p.name}" />
          <div>
            <p class="cart-item-name">${p.name}</p>
            <p class="cart-item-price">${money(p.price)}</p>
            <button class="cart-remove" data-remove="${id}">移除</button>
          </div>
          <div class="qty" role="group" aria-label="${p.name} 數量">
            <button data-dec="${id}" aria-label="減少數量">−</button>
            <span>${q}</span>
            <button data-inc="${id}" aria-label="增加數量">+</button>
          </div>
        </div>`;
    }).join("");
  }

  function addToCart(id) {
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    openCart();
  }

  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (btn) addToCart(btn.dataset.add);
  });

  cartBody?.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rem = e.target.closest("[data-remove]");
    if (inc) { const id = inc.dataset.inc; cart.set(id, cart.get(id) + 1); renderCart(); }
    if (dec) { const id = dec.dataset.dec; const q = cart.get(id) - 1; q <= 0 ? cart.delete(id) : cart.set(id, q); renderCart(); }
    if (rem) { cart.delete(rem.dataset.remove); renderCart(); }
  });

  $("#cartBtn")?.addEventListener("click", openCart);
  $("#cartClose")?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);
  checkoutBtn?.addEventListener("click", () => {
    if (checkoutBtn.disabled) return;
    checkoutBtn.textContent = "示範模式，未開放結帳";
    setTimeout(() => { checkoutBtn.textContent = "前往結帳"; }, 1800);
  });

  renderCart();

  /* ---------- 6. 聯絡表單驗證 ---------- */
  const form = $("#contactForm");
  const success = $("#formSuccess");

  const rules = {
    "c-name": (v) => (v.trim().length >= 2 ? "" : "請輸入姓名（至少 2 個字）"),
    "c-email": (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "請輸入有效的 Email"),
    "c-phone": (v) => (!v.trim() || /^0\d{8,9}$/.test(v.trim().replace(/\D/g, "")) ? "" : "電話格式有誤，例如 0912-345-678"),
    "c-topic": (v) => (v ? "" : "請選擇來訊主題"),
    "c-msg": (v) => (v.trim().length >= 10 ? "" : "請輸入至少 10 個字的訊息內容"),
  };

  function validateField(id) {
    const input = $("#" + id);
    if (!input) return true;
    const field = input.closest(".field");
    const errEl = $(`.error[data-for="${id}"]`);
    const msg = rules[id] ? rules[id](input.value) : "";
    field?.classList.toggle("has-error", !!msg);
    if (errEl) errEl.textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach((id) => {
    const input = $("#" + id);
    input?.addEventListener("blur", () => validateField(id));
    input?.addEventListener("input", () => { if (input.closest(".field")?.classList.contains("has-error")) validateField(id); });
    input?.addEventListener("change", () => { if (input.closest(".field")?.classList.contains("has-error")) validateField(id); });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(rules).map((id) => validateField(id)); // 逐一驗證，讓所有欄位都顯示錯誤
    if (!results.every(Boolean)) {
      $(".field.has-error input, .field.has-error select, .field.has-error textarea")?.focus();
      return;
    }
    // 示範：僅前端顯示成功。實際串接時改為 fetch() 送出 API 或 Netlify Forms。
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  $("#resetForm")?.addEventListener("click", () => {
    form.reset();
    $$(".field").forEach((f) => f.classList.remove("has-error"));
    $$(".error").forEach((el) => (el.textContent = ""));
    form.hidden = false;
    success.hidden = true;
    $("#c-name")?.focus();
  });

  /* ---------- 7. 頁尾年份 ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
