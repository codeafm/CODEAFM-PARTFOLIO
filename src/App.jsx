// App.jsx - обновленная версия с улучшенным дизайном
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

/* ================= SETTINGS ================= */
const TELEGRAM_URL = "https://t.me/fizbit00";
const EMAIL_TO = "codeafm@gmail.com";
const FORMSPREE_ID = "your_form_id";

const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

/* ================= HOOKS ================= */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ================= VK ADS ================= */
function VkAd({ client = "ad-1915617", slot = "1915617", width = 300, height = 250 }) {
  const ref = useRef(null);

  useEffect(() => {
    const push = () => {
      try {
        (window.MRGtag = window.MRGtag || []).push({});
      } catch {}
    };

    push();
    const t1 = window.setTimeout(push, 700);
    const t2 = window.setTimeout(push, 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="ad-box" style={{ width, height }}>
      <ins
        ref={ref}
        className="mrg-tag"
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
}

function InPageAd({ client = "ad-1916992", slot = "1916992" }) {
  const ref = useRef(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let stopped = false;
    let observer;

    const render = () => {
      [0, 700, 1600].forEach((delay) => {
        window.setTimeout(() => {
          try {
            (window.MRGtag = window.MRGtag || []).push({});
          } catch {}
        }, delay);
      });

      window.setTimeout(() => {
        if (stopped || !ref.current) return;
        const hasContent = !!ref.current.querySelector("iframe") || ref.current.childNodes.length > 0;
        setBlocked(!hasContent);
      }, 2600);
    };

    if ("IntersectionObserver" in window && ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              render();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(ref.current);
    } else {
      render();
    }

    return () => {
      stopped = true;
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="native-ad reveal">
      <div className="native-ad__label">Sponsored</div>
      <ins ref={ref} className="mrg-tag" data-ad-client={client} data-ad-slot={slot} />
      {blocked && <p>Реклама не загрузилась. Возможно, включён AdBlock.</p>}
    </div>
  );
}

/* ================= DATA ================= */
const appsData = [
  {
    title: "Sweet Candy Blast",
    desc: "Яркая match-3 игра с уровнями, бустерами, картой прогресса, анимациями, звуками, Firebase, пушами и рекламной монетизацией.",
    tags: ["Flutter", "Game", "Firebase", "Ads", "RuStore"],
    icon: asset("icons/sweetcandy.png"),
    screenshots: [
      asset("screenshots/sweetcandy/1.jpg"),
      asset("screenshots/sweetcandy/2.jpg"),
      asset("screenshots/sweetcandy/3.jpg"),
      asset("screenshots/sweetcandy/4.jpg"),
      asset("screenshots/sweetcandy/5.jpg"),
    ],
    accent: "pink",
    status: "Game / Release",
    featured: true,
  },
  {
    title: "Bottle Sort Puzzle",
    desc: "Головоломка сортировки бутылок: 1000+ уровней, подсказки, дополнительные бутылки, магазин скинов, эффекты победы и rewarded-реклама.",
    tags: ["Flutter", "Puzzle", "Ads", "Shop"],
    icon: asset("icons/bottlesort.png"),
    screenshots: [
      asset("screenshots/bottlesort/1.jpg"),
      asset("screenshots/bottlesort/2.jpg"),
      asset("screenshots/bottlesort/3.jpg"),
      asset("screenshots/bottlesort/4.jpg"),
    ],
    accent: "blue",
    status: "Puzzle Game",
    featured: true,
  },
  {
    title: "Merge Market",
    desc: "Мобильная merge-игра с городом, магазинами, прогрессом зданий, подарками первого запуска, рекламой и экономикой монет/алмазов.",
    tags: ["Flutter", "Merge", "Economy", "Firebase"],
    icon: asset("icons/mergemarket.png"),
    screenshots: [
      asset("screenshots/mergemarket/1.jpg"),
      asset("screenshots/mergemarket/2.jpg"),
      asset("screenshots/mergemarket/3.jpg"),
      asset("screenshots/mergemarket/4.jpg"),
    ],
    accent: "amber",
    status: "Merge Game",
    featured: true,
  },
  {
    title: "PrimeVPN",
    desc: "VPN-приложение с бесплатными и премиум-локациями, OpenVPN, подписками, биллингом и удобным Android-интерфейсом.",
    tags: ["Android", "OpenVPN", "Billing", "Premium"],
    icon: asset("icons/primevpn.png"),
    screenshots: [
      asset("screenshots/primevpn/1.jpg"),
      asset("screenshots/primevpn/2.jpg"),
      asset("screenshots/primevpn/3.jpg"),
      asset("screenshots/primevpn/4.jpg"),
    ],
    accent: "cyan",
    status: "Android App",
    download: asset("downloads/PrimeVPN_v1.0.apk"),
  },
  {
    title: "Bubble Pop",
    desc: "Казуальная аркада с плавной анимацией, быстрым игровым циклом и лёгкой механикой для коротких игровых сессий.",
    tags: ["Game", "Android", "Arcade"],
    icon: asset("icons/bubblepop.png"),
    screenshots: [
      asset("screenshots/bubblepop/1.png"),
      asset("screenshots/bubblepop/2.png"),
      asset("screenshots/bubblepop/3.png"),
      asset("screenshots/bubblepop/4.png"),
    ],
    accent: "purple",
    status: "Arcade",
    download: asset("downloads/BubblePop_v1.0.apk"),
  },
  {
    title: "2048 Game",
    desc: "Классическая головоломка 2048 с плавной анимацией, таблицей рекордов, аккуратным UI и удобным управлением.",
    tags: ["Game", "Android", "Puzzle"],
    icon: asset("icons/2048.png"),
    screenshots: [
      asset("screenshots/2048/1.jpg"),
      asset("screenshots/2048/2.jpg"),
      asset("screenshots/2048/3.jpg"),
      asset("screenshots/2048/4.jpg"),
    ],
    accent: "orange",
    status: "Puzzle",
    download: asset("downloads/2048_v1.0.apk"),
  },
  {
    title: "Dot Is Dead",
    desc: "Ритм-аркада с динамичной анимацией, уровнями, таблицей рекордов и быстрым визуальным стилем.",
    tags: ["Game", "Android", "Rhythm"],
    icon: asset("icons/dotisdead.png"),
    screenshots: [
      asset("screenshots/dotisdead/1.jpg"),
      asset("screenshots/dotisdead/2.jpg"),
      asset("screenshots/dotisdead/3.jpg"),
      asset("screenshots/dotisdead/4.jpg"),
    ],
    accent: "rose",
    status: "Rhythm",
    download: asset("downloads/DotisDead_v1.0.apk"),
  },
  {
    title: "Geometry Rush Dash",
    desc: "Неоновый раннер-платформер: прыжки, монеты, ловушки, ритм, скорость и яркая аркадная подача.",
    tags: ["Game", "Android", "Runner", "Neon"],
    icon: asset("icons/georush.jpg"),
    screenshots: [
      asset("screenshots/georush/1.jpg"),
      asset("screenshots/georush/2.jpg"),
      asset("screenshots/georush/3.jpg"),

    ],
    accent: "lime",
    status: "Runner",
    download: asset("downloads/RushGeo_v1.0.apk"),
  },
];

const services = [
  ["01", "Mobile Apps", "Android и Flutter-приложения с красивым UI, Firebase, пушами, рекламой и публикацией."],
  ["02", "Casual Games", "Игровая логика, уровни, магазин, бустеры, анимации, звуки, rewarded ads и релиз."],
  ["03", "Backend & API", "Node.js, Express, Firestore, API, CRM, Telegram Bot, FCM, webhooks и админ-панели."],
  ["04", "Release & Store", "Подготовка APK/AAB, иконки, скриншоты, описание, RuStore/Google Play и обновления."],
];

/* ================= MODALS ================= */
function RequestModal({ open, onClose }) {
  const [mode, setMode] = useState("choice");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!open) return;
    setMode("choice");
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const submitMailto = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Заявка с сайта CodeAFM");
    const body = encodeURIComponent(`Имя: ${form.name}\nEmail: ${form.email}\n\nСообщение:\n${form.message}`);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="modal" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="modal__panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__top">
          <div>
            <span className="eyebrow">Start Project</span>
            <h3>Оставить заявку</h3>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        {mode === "choice" ? (
          <div className="modal__body">
            <p className="muted">Выберите быстрый способ связи. Telegram лучше для срочных задач, email — для подробного ТЗ.</p>
            <div className="contact-options">
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="contact-option contact-option--telegram">
                <b>📱 Telegram</b>
                <span>Открыть чат</span>
              </a>
              <button className="contact-option" onClick={() => setMode("email")}>
                <b>✉️ Email form</b>
                <span>Заполнить форму</span>
              </button>
            </div>
          </div>
        ) : FORMSPREE_ID !== "your_form_id" ? (
          <form className="modal__body form" action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST">
            <input name="name" placeholder="Ваше имя" required />
            <input name="email" type="email" placeholder="Email" required />
            <textarea name="message" placeholder="Опишите задачу, сроки, бюджет…" required />
            <button className="button button--primary button--full" type="submit">Отправить</button>
          </form>
        ) : (
          <form className="modal__body form" onSubmit={submitMailto}>
            <input placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <textarea placeholder="Опишите задачу, сроки, бюджет…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <button className="button button--primary button--full" type="submit">Отправить через Email</button>
          </form>
        )}
      </div>
    </div>
  );
}

function ScreenshotModal({ images, open, onClose, startIndex }) {
  const [index, setIndex] = useState(startIndex || 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setIndex(startIndex || 0);
    setLoading(true);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!open || !images.length) return null;

  return (
    <div className="lightbox" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="lightbox__inner" onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-button lightbox__close" onClick={onClose} aria-label="Закрыть">✕</button>
        <img 
          src={images[index]} 
          alt={`Screenshot ${index + 1}`} 
          onLoad={() => setLoading(false)}
          style={{ opacity: loading ? 0 : 1 }}
        />
        <div className="lightbox__bar">
          <button onClick={() => setIndex((v) => (v - 1 + images.length) % images.length)} aria-label="Предыдущий">‹</button>
          <span>{index + 1} / {images.length}</span>
          <button onClick={() => setIndex((v) => (v + 1) % images.length)} aria-label="Следующий">›</button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */
function Nav({ onRequest }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" role="navigation" aria-label="Основная навигация">
          <a className="brand" href="#top" onClick={close}>
            <span className="brand__mark">C</span>
            <span>CodeAFM</span>
          </a>

          <button 
            className={`nav-toggle ${open ? 'open' : ''}`} 
            onClick={toggleMenu} 
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-links ${open ? "nav-links--open" : ""}`}>
            <a href="#apps" onClick={close}>Проекты</a>
            <a href="#services" onClick={close}>Услуги</a>
            <a href="#about" onClick={close}>Обо мне</a>
            <a href="#contact" onClick={close}>Контакты</a>
            <button className="button button--primary button--small" onClick={() => { close(); onRequest(); }}>
              Заказать
            </button>
          </div>
        </nav>
      </header>
      <div className={`nav-backdrop ${open ? 'active' : ''}`} onClick={close} />
    </>
  );
}

function Hero({ onRequest }) {
  const heroImages = appsData.flatMap((app) => app.screenshots.slice(0, 1)).slice(0, 6);
  const [image, setImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setImage((v) => (v + 1) % heroImages.length), 3500);
    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="top" className="hero" aria-label="Главный раздел">
      <div className="hero__bg" />
      <div className="hero__content reveal is-visible">
        <span className="eyebrow">CODEAFM • Mobile Apps • Games • Backend</span>
        <h1>
          Premium digital products
          <span>for mobile business</span>
        </h1>
        <p>
          Создаю приложения, игры и backend-системы под ключ: дизайн, код, Firebase, 
          реклама, уведомления, аналитика, APK/AAB и публикация в сторах.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#apps">Смотреть проекты</a>
          <button className="button button--glass" onClick={onRequest}>Обсудить проект</button>
        </div>
        <div className="hero__stats">
          <div>
            <b>{appsData.length}+</b>
            <span>готовых проектов</span>
          </div>
          <div>
            <b>Full</b>
            <span>цикл разработки</span>
          </div>
          <div>
            <b>Store</b>
            <span>релиз и поддержка</span>
          </div>
        </div>
      </div>

      <div className="hero-device reveal is-visible">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            {!loaded && <div className="loading-placeholder" />}
            {heroImages.map((src, i) => (
              <img 
                key={src} 
                src={src} 
                alt={`Project preview ${i + 1}`} 
                className={i === image ? "active" : ""}
                onLoad={() => setLoaded(true)}
                loading="lazy"
              />
            ))}
            <div className="phone-screen__caption">
              <b>Live Portfolio</b>
              <span>games • apps • backend</span>
            </div>
          </div>
        </div>
        <div className="floating-card floating-card--top">Firebase + Push</div>
        <div className="floating-card floating-card--bottom">Ads + Analytics</div>
      </div>
    </section>
  );
}

function SectionTitle({ label, title, text }) {
  return (
    <div className="section-title reveal">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProjectCard({ app, onRequest }) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openLightbox = (i) => {
    setStartIndex(i);
    setOpen(true);
  };

  return (
    <article className={`project-card reveal ${app.featured ? "project-card--featured" : ""}`} data-accent={app.accent}>
      <div className="project-card__visual">
        <div className="project-card__glow" />
        <div className="project-icon">
          <img src={app.icon} alt={`${app.title} icon`} onError={(e) => (e.currentTarget.style.display = "none")} loading="lazy" />
        </div>
        <span>{app.status}</span>
      </div>

      <div className="project-card__body">
        <div className="project-card__top">
          <h3>{app.title}</h3>
          {app.featured && <span className="featured-badge">★ Featured</span>}
        </div>
        <p>{app.desc}</p>
        <div className="tags">
          {app.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-card__actions">
          {app.download ? (
            <a className="button button--mini" href={app.download} download>⬇ Скачать APK</a>
          ) : (
            <button className="button button--mini" onClick={onRequest}>О проекте</button>
          )}
          {app.screenshots.length > 0 && (
            <button className="button button--mini button--glass" onClick={() => openLightbox(0)}>
              🖼 Скриншоты
            </button>
          )}
        </div>
      </div>

      {app.screenshots.length > 0 && (
        <div className="screenshot-row">
          {app.screenshots.slice(0, 4).map((src, i) => (
            <button key={src} onClick={() => openLightbox(i)} aria-label={`Screenshot ${i + 1}`}>
              <img src={src} alt={`${app.title} screenshot ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <ScreenshotModal images={app.screenshots} open={open} startIndex={startIndex} onClose={() => setOpen(false)} />
    </article>
  );
}

function Apps({ onRequest }) {
  return (
    <section id="apps" className="section" aria-label="Проекты">
      <SectionTitle
        label="Portfolio"
        title="Проекты, которые выглядят как реальные продукты"
        text="Новый дизайн делает упор на крупные карточки, чистый контраст, красивые превью и понятные действия для клиента."
      />
      <div className="projects-grid">
        {appsData.map((app) => <ProjectCard key={app.title} app={app} onRequest={onRequest} />)}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section" aria-label="Услуги">
      <SectionTitle 
        label="Services" 
        title="Что можно заказать" 
        text="Можно собрать проект полностью: от идеи и дизайна до backend, рекламы, аналитики и публикации." 
      />
      <div className="services-grid">
        {services.map(([num, title, text]) => (
          <div className="service-card reveal" key={title}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section" aria-label="Обо мне">
      <SectionTitle label="About" title="Разработка без лишней сложности" />
      <div className="about-panel reveal">
        <div>
          <h3>CodeAFM</h3>
          <p>
            Я делаю мобильные приложения и игры с современным интерфейсом, плавными анимациями, 
            Firebase, push-уведомлениями, рекламой и подготовкой к публикации. Главная цель — 
            чтобы проект выглядел дорого, работал стабильно и был готов к росту.
          </p>
        </div>
        <div className="about-list">
          <span>UI/UX дизайн</span>
          <span>Flutter / Android</span>
          <span>Firebase / Node.js</span>
          <span>RuStore / APK / AAB</span>
        </div>
      </div>
    </section>
  );
}

function Contact({ onRequest }) {
  return (
    <section id="contact" className="section" aria-label="Контакты">
      <div className="contact-card reveal">
        <span className="eyebrow">Contact</span>
        <h2>Есть идея? Сделаем её как premium-продукт.</h2>
        <p>
          Напишите в Telegram или отправьте краткое описание задачи на email. 
          Можно обсудить приложение, игру, backend, рекламу, Firebase или публикацию.
        </p>
        <div className="contact-actions">
          <a className="button button--primary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            📱 Telegram
          </a>
          <a className="button button--glass" href={`mailto:${EMAIL_TO}`}>
            ✉️ Email
          </a>
          <button className="button button--glass" onClick={onRequest}>
            📋 Заявка
          </button>
        </div>
      </div>
    </section>
  );
}

function PhoneSlider({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % images.length), 3800);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="side-phone">
      <div className="side-phone__screen">
        {images.map((src, i) => (
          <img 
            key={src} 
            src={src} 
            alt={`Preview ${i + 1}`} 
            className={i === index ? "active" : ""} 
            loading="lazy" 
          />
        ))}
      </div>
      <div className="side-phone__dots">
        {images.map((_, i) => (
          <span 
            key={i} 
            className={i === index ? "active" : ""} 
            onClick={() => setIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function LeftSidebar() {
  const images = useMemo(() => appsData.map((app) => app.screenshots[0]).filter(Boolean), []);
  return (
    <aside className="sidebar sidebar--left" aria-label="Левая боковая панель">
      <div className="side-card reveal">
        <PhoneSlider images={images} />
      </div>
      <div className="side-card reveal">
        <span className="eyebrow">Updates</span>
        <h3>Новости проектов</h3>
        <ul className="news-list">
          <li>🍬 Sweet Candy Blast — match-3 проект</li>
          <li>🧪 Bottle Sort — головоломка уровней</li>
          <li>🏙 Merge Market — город и экономика</li>
          <li>🚀 PrimeVPN — VPN приложение</li>
          <li>📦 RuStore / APK / Firebase</li>
        </ul>
      </div>
      <div className="side-card side-card--ad reveal">
        <VkAd client="ad-1915617" slot="1915617" width={300} height={250} />
      </div>
      <div className="side-card side-card--ad reveal">
        <VkAd client="ad-1915615" slot="1915615" width={300} height={600} />
      </div>
    </aside>
  );
}

function RightSidebar({ onRequest }) {
  const skills = ["Flutter", "Android", "Node.js", "Firebase", "FCM", "Ads", "Billing", "Git", "Figma", "Release"];
  return (
    <aside className="sidebar sidebar--right" aria-label="Правая боковая панель">
      <div className="developer-card reveal">
        <div className="developer-card__top">
          <img 
            src={asset("icons/avatar.png")} 
            alt="CodeAFM avatar" 
            onError={(e) => (e.currentTarget.style.display = "none")} 
            loading="lazy" 
          />
          <div>
            <h3>CodeAFM</h3>
            <p>Mobile / Game / Backend</p>
          </div>
        </div>
        <div className="developer-card__status">🟢 Принимаю заказы</div>
        <div className="skill-cloud">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
        <button className="button button--primary button--full" onClick={onRequest}>
          Заказать проект
        </button>
      </div>

      <div className="side-card reveal">
        <span className="eyebrow">Workflow</span>
        <h3>Как работаю</h3>
        <ol className="steps">
          <li><b>01</b><span>Идея и структура</span></li>
          <li><b>02</b><span>Дизайн и прототип</span></li>
          <li><b>03</b><span>Код и интеграции</span></li>
          <li><b>04</b><span>Релиз и поддержка</span></li>
        </ol>
      </div>

      <div className="side-card side-card--ad reveal">
        <VkAd client="ad-1915617" slot="1915617" width={300} height={250} />
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div>
        <b>CodeAFM</b>
        <span>© {new Date().getFullYear()} Portfolio</span>
      </div>
      <a href="#top" aria-label="Наверх">↑ Наверх</a>
    </footer>
  );
}

/* ================= ROOT ================= */
export default function App() {
  useScrollReveal();
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <>
      <Nav onRequest={() => setRequestOpen(true)} />
      <main>
        <Hero onRequest={() => setRequestOpen(true)} />
        <div className="layout">
          <LeftSidebar />
          <div className="content-column">
            <Apps onRequest={() => setRequestOpen(true)} />
            <InPageAd client="ad-1916992" slot="1916992" />
            <Services />
            <About />
            <Contact onRequest={() => setRequestOpen(true)} />
          </div>
          <RightSidebar onRequest={() => setRequestOpen(true)} />
        </div>
      </main>
      <Footer />
      <RequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </>
  );
}