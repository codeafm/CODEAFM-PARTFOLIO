import React, { useEffect, useState, useRef } from "react";
import AnimatedLogo from "./components/AnimatedLogo.jsx";

/* ===== КОНТАКТЫ / НАСТРОЙКИ ===== */
const TELEGRAM_URL = "https://t.me/fizbit00";
const EMAIL_TO = "codeafm@gmail.com";
const FORMSPREE_ID = "your_form_id"; // если нет формы — будет mailto

/* helper для путей в /public */
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

/* ===== SCROLL REVEAL ===== */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-fade");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===== VK Ads (myTarget) — внутри рамки .ad-frame =====
   Требуется: <script async src="https://ad.mail.ru/static/ads-async.js"></script> в index.html
*/
function VkAd({
  client = "ad-1915617",
  slot = "1915617",
  width = 300,
  height = 250,
}) {
  const insRef = useRef(null);

  useEffect(() => {
    // Ленивая и безопасная инициализация
    const push = () => {
      try { (window.MRGtag = window.MRGtag || []).push({}); } catch {}
    };

    // несколько «пинков», если SDK/markup грузится не сразу
    push();
    const t1 = setTimeout(push, 600);
    const t2 = setTimeout(push, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="ad-frame" style={{ width, height }}>
      <ins
        ref={insRef}
        className="mrg-tag"
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
}

/* ================= MODAL: Оставить заявку ================= */
function RequestModal({ open, onClose }) {
  const [step, setStep] = useState("choice");
  useEffect(() => { if (open) setStep("choice"); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <h3 className="text-lg font-semibold">Оставить заявку</h3>
          <button onClick={onClose} className="rounded-xl px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700">✕</button>
        </div>

        <div className="p-6">
          {step === "choice" && (
            <>
              <p className="text-neutral-300">Выберите удобный способ связи:</p>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                   className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-emerald-500/60 transition flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-90">
                    <path fill="currentColor" d="M9.04 15.314L8.86 19.27c.36 0 .52-.154.708-.34l1.7-1.63 3.52 2.58c.647.357 1.112.17 1.29-.6l2.34-10.98c.24-1.08-.39-1.5-1.02-1.24L4.44 10.2c-1.05.42-1.03 1.02-.18 1.29l4.22 1.32 9.81-6.18c.46-.28.87-.12.53.16z"/>
                  </svg>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-sm text-neutral-400">Откроется чат</div>
                  </div>
                </a>

                <button onClick={() => setStep("email")}
                        className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-emerald-500/60 transition flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-90">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v1.2l10 5.8 10-5.8V6c0-1.1-.9-2-2-2Zm0 4.7l-8.65 5.01a1 1 0 0 1-1.7 0L1.99 8.71V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V8.7Z"/>
                  </svg>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-neutral-400">Короткая форма</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === "email" && (
            <>
              <p className="text-neutral-300">Заполните форму — отвечу на почту.</p>
              {FORMSPREE_ID !== "your_form_id" ? (
                <form className="mt-5 grid gap-4" action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST">
                  <input className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3" name="name" placeholder="Ваше имя" required/>
                  <input className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3" name="email" type="email" placeholder="Email" required/>
                  <textarea className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 min-h-[120px]" name="message" placeholder="Опишите задачу, сроки, бюджет…" required/>
                  <button className="btn w-fit" type="submit">Отправить</button>
                </form>
              ) : (
                <EmailMailtoForm onDone={onClose} />
              )}

              <div className="mt-5 text-sm text-neutral-500">
                Или сразу напишите на <a className="underline hover:text-emerald-400" href={`mailto:${EMAIL_TO}`}>{EMAIL_TO}</a>.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailMailtoForm({ onDone }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Заявка с сайта CodeAFM");
    const body = encodeURIComponent(`Имя: ${form.name}\nEmail: ${form.email}\n\nСообщение:\n${form.message}`);
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    onDone?.();
  };
  return (
    <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
      <input className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3"
             placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required/>
      <input className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3"
             type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
      <textarea className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 min-h-[120px]"
                placeholder="Опишите задачу, сроки, бюджет…" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} required/>
      <button className="btn w-fit" type="submit">Отправить</button>
    </form>
  );
}

/* ===== Лайтбокс со скриншотами ===== */
function ScreenshotModal({ images = [], open, onClose, startIndex = 0 }) {
  const [i, setI] = useState(startIndex);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);
  if (!open || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-[95vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img src={images[i]} alt={`s${i+1}`} className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl ring-1 ring-neutral-700/60"/>
        <div className="absolute -top-10 left-0 text-sm text-neutral-300">{i + 1} / {images.length}</div>
        <button onClick={onClose} className="absolute -top-12 right-0 rounded-lg px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700" aria-label="Закрыть">✕</button>
        {images.length > 1 && (
          <>
            <button onClick={() => setI((v) => (v - 1 + images.length) % images.length)} className="absolute left-[-48px] top-1/2 -translate-y-1/2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 p-3" aria-label="Prev">‹</button>
            <button onClick={() => setI((v) => (v + 1) % images.length)} className="absolute right-[-48px] top-1/2 -translate-y-1/2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 p-3" aria-label="Next">›</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= NAV / HERO ================= */
const Nav = ({ onRequest }) => (
  <header className="sticky top-0 z-50 border-b border-neutral-800 backdrop-blur bg-neutral-950/70">
    <nav className="container h-16 flex items-center justify-between">
      <a href="#" className="font-semibold tracking-wide">
        CODEAFM <span className="text-emerald-400">Developer</span>
      </a>
      <ul className="hidden md:flex gap-6 text-sm">
        <li><a href="#apps" className="hover:text-emerald-400">Приложения</a></li>
        <li><a href="#services" className="hover:text-emerald-400">Услуги</a></li>
        <li><a href="#about" className="hover:text-emerald-400">Обо мне</a></li>
        <li><a href="#contact" className="hover:text-emerald-400">Контакты</a></li>
      </ul>
      <button onClick={onRequest} className="btn">Заказать</button>
    </nav>
  </header>
);

const Hero = ({ onRequest }) => (
  <section className="relative overflow-hidden glow hero hero-premium">
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.40), transparent 70%)" }}/>
      <div className="absolute right-[-120px] bottom-[-160px] w-[560px] h-[560px] rounded-full blur-3xl opacity-25"
           style={{ background: "radial-gradient(closest-side, rgba(59,130,246,.38), transparent 70%)" }}/>
      <div className="absolute left-[-160px] bottom-[10%] w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
           style={{ background: "radial-gradient(closest-side, rgba(168,85,247,.34), transparent 70%)" }}/>
    </div>

    <div className="container py-14 md:py-20 lg:py-24 text-center">
      <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 scroll-fade show">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        CODEAFM • Mobile Apps • Games • Backend • Release
      </div>

      <AnimatedLogo />

      <p className="mx-auto mt-6 max-w-3xl text-base md:text-xl leading-8 text-neutral-300 scroll-fade" style={{ transitionDelay: ".18s" }}>
        Создаю современные мобильные приложения, игры и backend-системы: premium UI, плавная анимация, Firebase, реклама, уведомления, аналитика и публикация в сторах.
      </p>

      <div className="hero-stats scroll-fade" style={{ transitionDelay: ".25s" }}>
        <div><b>{appsData.length}</b><span>проектов и услуг</span></div>
        <div><b>Full</b><span>цикл разработки</span></div>
        <div><b>APK/AAB</b><span>релиз и публикация</span></div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 scroll-fade" style={{ transitionDelay: ".3s" }}>
        <a href="#apps" className="btn btn-main">Смотреть проекты</a>
        <button onClick={onRequest} className="btn btn-ghost">Обсудить проект</button>
      </div>
    </div>
  </section>
);

/* ================= APP CARD ================= */
const AppCard = ({
  title, desc, tags = [], links = [],
  icon = asset("icons/app.png"),
  screenshots = [],
  accent = "emerald",
  status = "Live",
  featured = false,
  onRequest
}) => {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const openLb = (idx = 0) => { setLbIndex(idx); setLbOpen(true); };

  return (
    <article className={`project-card card scroll-fade p-0 overflow-hidden group ${featured ? "project-featured" : ""}`} data-accent={accent}>
      <div className="project-shine" />
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="flex-1 px-6 py-6 md:px-7 md:py-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="project-status">{status}</span>
            {featured && <span className="project-featured-badge">Featured</span>}
          </div>

          <h3 className="mt-3 text-xl md:text-2xl font-bold tracking-tight group-hover:text-emerald-200 transition">{title}</h3>
          <p className="mt-2 text-[14px] leading-6 text-neutral-300">{desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {links.map(({ label, href, download, action }) =>
              action ? (
                <button key={label} className="btn" onClick={onRequest}>{label}</button>
              ) : (
                <a key={label} className="btn" href={href}
                   {...(download ? { download: true } : {})}
                   target={download ? undefined : "_blank"} rel={download ? undefined : "noreferrer"}>
                  {label}
                </a>
              )
            )}
          </div>

          {screenshots.length > 0 && (
            <div className="mt-5">
              <div className="flex gap-2 overflow-x-auto pb-2 screenshots-strip">
                {screenshots.slice(0, 6).map((src, i) => (
                  <button key={i} onClick={() => openLb(i)} className="screenshot-thumb group/thumb relative">
                    <img src={src} alt={`s${i+1}`}
                         onError={(e) => (e.currentTarget.style.display = "none")}
                         className="h-24 w-40 md:h-32 md:w-52 object-cover rounded-xl ring-1 ring-neutral-700/70 group-hover/thumb:ring-emerald-500/70 transition"
                         loading="lazy"/>
                    <span className="thumb-overlay">Открыть</span>
                  </button>
                ))}
              </div>
              <button onClick={() => openLb(0)} className="mt-2 text-sm underline decoration-dotted hover:text-emerald-400">
                Смотреть скриншоты ({screenshots.length})
              </button>
            </div>
          )}
        </div>

        <div className="project-icon-panel relative w-full md:w-32 shrink-0 border-t md:border-t-0 md:border-l border-neutral-800 grid place-items-center py-5 md:py-0">
          <span className="icon-glow w-16 h-16 rounded-2xl"></span>
          <div className="relative z-10 w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-neutral-700/70 bg-neutral-950/50 grid place-items-center">
            <img src={icon} alt={`${title} icon`} className="w-full h-full object-contain" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
          </div>
        </div>
      </div>

      <ScreenshotModal images={screenshots} open={lbOpen} onClose={() => setLbOpen(false)} startIndex={lbIndex} />
    </article>
  );
};

/* ================= ДАННЫЕ ПРИЛОЖЕНИЙ ================= */
const appsData = [
  {
    title: "Sweet Candy Blast",
    desc: "Яркая match-3 игра с уровнями, бустерами, картой прогресса, анимациями, звуками, Firebase, пушами и рекламной монетизацией.",
    tags: ["Flutter", "Game", "Firebase", "Ads", "RuStore"],
    icon: asset("icons/sweetcandy.png"),
    links: [{ label: "О проекте", action: true }],
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
    links: [{ label: "О проекте", action: true }],
    screenshots: [
      asset("screenshots/bottlesort/1.jpg"),
      asset("screenshots/bottlesort/2.jpg"),
      asset("screenshots/bottlesort/3.jpg"),
      asset("screenshots/bottlesort/4.jpg"),
    ],
    accent: "blue",
    status: "Game / Puzzle",
    featured: true,
  },
  {
    title: "Merge Market",
    desc: "Мобильная merge-игра с городом, магазинами, прогрессом зданий, подарками первого запуска, рекламой и экономикой монет/алмазов.",
    tags: ["Flutter", "Merge", "Economy", "Firebase"],
    icon: asset("icons/mergemarket.png"),
    links: [{ label: "О проекте", action: true }],
    screenshots: [
      asset("screenshots/mergemarket/1.jpg"),
      asset("screenshots/mergemarket/2.jpg"),
      asset("screenshots/mergemarket/3.jpg"),
      asset("screenshots/mergemarket/4.jpg"),
    ],
    accent: "amber",
    status: "Game / Merge",
    featured: true,
  },
  {
    title: "PrimeVPN",
    desc: "VPN-приложение с бесплатными и премиум-локациями, OpenVPN, подписками, биллингом и удобным Android-интерфейсом.",
    tags: ["Android", "OpenVPN", "Billing", "Premium"],
    icon: asset("icons/primevpn.png"),
    links: [{ label: "Скачать APK", href: asset("downloads/PrimeVPN_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/primevpn/1.jpg"),
      asset("screenshots/primevpn/2.jpg"),
      asset("screenshots/primevpn/3.jpg"),
      asset("screenshots/primevpn/4.jpg"),
    ],
    accent: "cyan",
    status: "Android App",
  },
  {
    title: "Bubble Pop",
    desc: "Казуальная аркада с плавной анимацией, быстрым игровым циклом и лёгкой механикой для коротких игровых сессий.",
    tags: ["Game", "Android", "Arcade"],
    icon: asset("icons/bubblepop.png"),
    links: [{ label: "Скачать APK", href: asset("downloads/BubblePop_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/bubblepop/1.png"),
      asset("screenshots/bubblepop/2.png"),
      asset("screenshots/bubblepop/3.png"),
      asset("screenshots/bubblepop/4.png"),
    ],
    accent: "purple",
    status: "Game / Arcade",
  },
  {
    title: "2048 Game",
    desc: "Классическая головоломка 2048 с плавной анимацией, таблицей рекордов, аккуратным UI и удобным управлением.",
    tags: ["Game", "Android", "Puzzle"],
    icon: asset("icons/2048.png"),
    links: [{ label: "Скачать APK", href: asset("downloads/2048_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/2048/1.jpg"),
      asset("screenshots/2048/2.jpg"),
      asset("screenshots/2048/3.jpg"),
      asset("screenshots/2048/4.jpg"),
    ],
    accent: "amber",
    status: "Game / Puzzle",
  },
  {
    title: "Dot Is Dead",
    desc: "Ритм-аркада с динамичной анимацией, уровнями, таблицей рекордов и быстрым визуальным стилем.",
    tags: ["Game", "Android", "Rhythm"],
    icon: asset("icons/dotisdead.png"),
    links: [{ label: "Скачать APK", href: asset("downloads/DotisDead_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/dotisdead/1.jpg"),
      asset("screenshots/dotisdead/2.jpg"),
      asset("screenshots/dotisdead/3.jpg"),
      asset("screenshots/dotisdead/4.jpg"),
    ],
    accent: "rose",
    status: "Game / Rhythm",
  },
  {
    title: "Geometry Rush Dash",
    desc: "Неоновый раннер-платформер: прыжки, монеты, ловушки, ритм, скорость и яркая аркадная подача.",
    tags: ["Game", "Android", "Runner", "Neon"],
    icon: asset("icons/georush.jpg"),
    links: [{ label: "Скачать APK", href: asset("downloads/RushGeo_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/georush/scr1.jpg"),
      asset("screenshots/georush/scr2.jpg"),
      asset("screenshots/georush/scr3.jpg"),
      asset("screenshots/georush/scr4.jpg"),
    ],
    accent: "lime",
    status: "Game / Runner",
  },
  {
    title: "Интеграции и backend",
    desc: "Telegram/FCM, платежи, аналитика, реклама, CRM, webhooks, Node.js API, Firebase/Firestore и админ-панели.",
    tags: ["Node.js", "Express", "Firestore", "FCM", "API"],
    icon: asset("icons/integrations.png"),
    links: [{ label: "Оставить заявку", action: true }],
    screenshots: [],
    accent: "cyan",
    status: "Service",
  },
  {
    title: "Кастом под ключ",
    desc: "Полный цикл: идея → дизайн → код → backend → тестирование → сборка APK/AAB → публикация → обновления и поддержка.",
    tags: ["Design", "Android", "Backend", "Release", "Support"],
    icon: asset("icons/custom.png"),
    links: [{ label: "Оставить заявку", action: true }],
    screenshots: [],
    accent: "purple",
    status: "Full Cycle",
  },
];

/* ================= БОКОВЫЕ КОМПОНЕНТЫ ================= */
const SideCard = ({ title, children }) => (
  <div className="card p-5">
    <h4 className="font-semibold">{title}</h4>
    <div className="mt-3 text-sm text-neutral-300">{children}</div>
  </div>
);

/* Слайдер слева (опционально можно вернуть изображения баннера) */
const BannerSlider = ({ images = [] }) => {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);
  if (!images.length) return null;

  return (
    <>
      <div className="relative h-[600px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60">
        {images.map((src, idx) => (
          <img key={src} src={src} alt={`banner ${idx + 1}`}
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-xs tracking-widest text-neutral-300/80">Портфолио</div>
          <div className="text-lg font-semibold">Скриншоты проектов</div>
          <div className="mt-3 flex gap-1.5">
            {images.map((_, idx) => (
              <span key={idx} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-emerald-400" : "w-2 bg-neutral-600"}`} />
            ))}
          </div>
        </div>
      </div>

      <ScreenshotModal images={images} open={open} onClose={() => setOpen(false)} startIndex={i} />
    </>
  );
};
/* === PHONE SLIDER (экран смартфона) === */
const PhoneSlider = ({ images = [] }) => {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="relative group mx-auto w-[240px] sm:w-[250px] md:w-[260px]">
        {/* Внешняя тень телефона */}
        <div className="absolute inset-0 blur-xl opacity-60 rounded-[2.4rem] bg-gradient-to-br from-emerald-500/15 via-neutral-700/20 to-transparent -z-10" />

        {/* Корпус/базель */}
        <div className="relative rounded-[2.4rem] bg-neutral-900 border border-neutral-800 shadow-2xl p-2">
          {/* Боковые кнопки (слева) */}
          <div className="absolute -left-1 top-16 h-10 w-1.5 rounded-r bg-neutral-700/70" />
          <div className="absolute -left-1 top-32 h-7 w-1.5 rounded-r bg-neutral-700/70" />
          {/* Питание (справа) */}
          <div className="absolute -right-1 top-24 h-12 w-1.5 rounded-l bg-neutral-700/70" />

          {/* НОТЧ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-1 h-5 w-24 rounded-b-2xl bg-black/90 border-x border-b border-neutral-800 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] rounded bg-neutral-600/80" /> {/* speaker */}
            <span className="w-2 h-2 rounded-full bg-neutral-700/90" />   {/* camera */}
          </div>

          {/* Экран (сам слайдер) */}
          <div
            className="relative overflow-hidden rounded-[1.6rem] bg-black"
            style={{ aspectRatio: "9 / 19.5" }}
      
           
          >
            {/* Слайды */}
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`slide ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading="eager"
              />
            ))}

            {/* Лёгкое отражение/глянец */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,.06),transparent_40%)]" />

            {/* Низ: подпись + индикаторы */}
            <div className="absolute inset-x-0 bottom-0 p-2.5">
              <div className="flex items-center justify-between text-[11px] text-neutral-300/90">
                <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur border border-white/5">
                  Портфолио
                </span>
                <div className="flex gap-1.5">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-emerald-400" : "w-2 bg-neutral-600"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ховер-подсказка */}
          
          </div>
        </div>
      </div>

      {/* Лайтбокс */}
      <ScreenshotModal images={images} open={open} onClose={() => setOpen(false)} startIndex={i} />
    </>
  );
};

/* Левая колонка: новости + реклама 300x250 и 300x600 */
const SideLeft = ({ onRequest }) => (
  <div className="space-y-5">
    {/* Слайдер в виде телефона */}
    <div className="card p-4">
      <PhoneSlider
        images={[
          asset("screenshots/sweetcandy/1.jpg"),
          asset("screenshots/bottlesort/1.jpg"),
          asset("screenshots/mergemarket/1.jpg"),
          asset("screenshots/primevpn/1.jpg"),
          asset("screenshots/bubblepop/1.png"),
          asset("screenshots/2048/1.jpg"),
          asset("screenshots/dotisdead/1.jpg"),
          asset("screenshots/georush/scr1.jpg"),
        ]}
      />
    </div>

    {/* Новости */}
    <SideCard title="Новости">
      <ul className="space-y-2 text-sm scroll-fade show">
        <li className="hover:text-emerald-400 transition">🍬 Sweet Candy Blast — match-3 проект</li>
        <li className="hover:text-emerald-400 transition">🧪 Bottle Sort — головоломка уровней</li>
        <li className="hover:text-emerald-400 transition">🏙 Merge Market — город и экономика</li>
        <li className="hover:text-emerald-400 transition">🚀 PrimeVPN — VPN приложение</li>
        <li className="hover:text-emerald-400 transition">📦 RuStore / APK / Firebase</li>
      </ul>
    </SideCard>

    {/* Реклама 300x250 */}
    <div className="card p-3 flex items-center justify-center hover:shadow-emerald-500/20 transition duration-300">
      <VkAd client="ad-1915617" slot="1915617" width={300} height={250} />
    </div>

    {/* Реклама 300x600 */}
    <div className="card p-3 flex items-center justify-center hover:shadow-emerald-500/20 transition duration-300">
      <VkAd client="ad-1915615" slot="1915615" width={300} height={600} />
    </div>
  </div>
);


/* Правая колонка: карточка разработчика + реклама 300x250 */
const DeveloperCard = ({ onRequest }) => {
  const skills = ["Android (Kotlin/Java)", "Node.js", "Express", "Firestore/FCM", "OpenVPN", "Billing", "Yandex/VK Ads", "Git", "Docker", "Figma"];
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <img src={asset("icons/avatar.png")} onError={(e) => (e.currentTarget.style.display = "none")}
             alt="avatar" className="w-12 h-12 rounded-full ring-1 ring-neutral-700/60 object-cover" />
        <div>
          <div className="font-semibold">CodeAFM</div>
          <div className="text-sm text-neutral-400">Android / Бэкенд</div>
        </div>
        <span className="ml-auto text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-600/30">
          Принимаю заказы
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-neutral-400">Стаж:</span> 4+ лет</div>
        <div><span className="text-neutral-400">Зона:</span> Remote/Worldwide</div>
        <div><span className="text-neutral-400">Ответ:</span> в течение дня</div>
        <div><span className="text-neutral-400">Языки:</span> RU/EN</div>
      </div>

      <div className="mt-5">
        <div className="text-sm text-neutral-400 mb-2">Навыки</div>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s} className="text-xs px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram</a>
        <a className="btn" href={`mailto:${EMAIL_TO}`}>Email</a>
        <button className="btn" onClick={onRequest}>Оставить заявку</button>
      </div>
    </div>
  );
};

const SideRight = ({ onRequest }) => (
  <div className="space-y-4">
    <DeveloperCard onRequest={onRequest} />

    {/* Реклама 300x250 справа */}
    <div className="card p-4 flex items-center justify-center">
      <VkAd client="ad-1916990" slot="1916990" width={300} height={250} />
    </div>
  </div>
);

/* ================= ЦЕНТРАЛЬНЫЕ СЕКЦИИ ================= */
const Apps = ({ onRequest }) => (
  <section id="apps" className="py-16">
    <div className="section-head scroll-fade">
      <span className="section-kicker">Portfolio</span>
      <h2>Мои проекты</h2>
      <p>
        Основные проекты CodeAFM: мобильные игры, Android-приложения, backend и полный цикл разработки.
      </p>
    </div>
    <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-1 gap-7">
      {appsData.map((app) => <AppCard key={app.title} {...app} onRequest={onRequest} />)}
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-16">
    <div className="section-head scroll-fade">
      <span className="section-kicker">Services</span>
      <h2>Что могу сделать</h2>
      <p>От маленького MVP до полноценного продукта с backend, рекламой, уведомлениями и публикацией.</p>
    </div>
    <div className="mt-8 grid md:grid-cols-3 gap-7">
      {[
        { t: "Android / Flutter", d: "Приложения, личные кабинеты, VPN, платежи, уведомления, Firebase и красивый UI." },
        { t: "Mobile Games", d: "2D/3D casual-игры, match-3, puzzle, runner, уровни, бустеры, магазин и монетизация." },
        { t: "Backend / Release", d: "Node.js, Express, Firestore, FCM, API, аналитика, реклама, APK/AAB и публикация в сторах." },
      ].map((s, i) => (
        <div key={s.t} className="service-card card scroll-fade" style={{ transitionDelay: `${i * 120}ms` }}>
          <div className="service-icon">{i + 1}</div>
          <h3 className="font-semibold text-lg">{s.t}</h3>
          <p className="text-sm text-neutral-300 mt-2 leading-6">{s.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-16">
    <div className="section-head scroll-fade">
      <span className="section-kicker">About</span>
      <h2>Обо мне</h2>
      <p>CODEAFM / FizBit — разработчик мобильных приложений, мобильных игр, VPN-сервисов и backend-интеграций.</p>
    </div>

    <div className="about-grid mt-8 scroll-fade" style={{ transitionDelay: ".15s" }}>
      <div className="about-card card">
        <h3>Мой подход</h3>
        <p>
          Делаю продукт не только “чтобы работал”, а чтобы выглядел современно, быстро открывался, был понятным пользователю и готовым к публикации.
        </p>
      </div>
      <div className="about-card card">
        <h3>Технологии</h3>
        <p>
          Flutter, Android, Unity, Java/Kotlin, Node.js, Express, Firebase, Firestore, FCM, Yandex/VK Ads, Billing, Git, Docker.
        </p>
      </div>
      <div className="about-card card">
        <h3>Результат</h3>
        <p>
          Дизайн, код, сборка APK/AAB, подключение рекламы и уведомлений, публикация, обновления и дальнейшая поддержка проекта.
        </p>
      </div>
    </div>
  </section>
);

const Contact = ({ onRequest }) => (
  <section id="contact" className="py-16">
    <h2 className="scroll-fade">Контакты</h2>
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Открыть Telegram</a>
      <a className="btn" href={`mailto:${EMAIL_TO}`}>Написать на Email</a>
      <button className="btn" onClick={onRequest}>Оставить заявку</button>
    </div>
    <p className="mt-4 text-neutral-400 text-sm">
      Нажмите «Оставить заявку», чтобы выбрать способ связи и, при необходимости, заполнить короткую форму.
    </p>
  </section>
);

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="border-t border-neutral-800">
    <div className="container h-16 flex items-center justify-between text-sm text-neutral-400">
      <span>© {new Date().getFullYear()} CodeAFM</span>
      <a className="hover:text-emerald-400" href="#">Наверх ↑</a>
    </div>
  </footer>
);

function InPageAd({
  client = "ad-1916992",
  slot = "1916992",
  className = "",
  hint = "Реклама скрыта блокировщиком. Отключите AdBlock для этого сайта.",
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);

  React.useEffect(() => {
    let stopped = false, io;

    const waitForSDK = () =>
      new Promise((resolve) => {
        const tick = () => {
          if (stopped) return;
          if (window.MRGtag && typeof window.MRGtag.push === "function") resolve();
          else setTimeout(tick, 80);
        };
        tick();
      });

    const tryRender = async () => {
      await waitForSDK();

      // Несколько пушей на всякий случай
      [0, 600, 1500].forEach((d) =>
        setTimeout(() => {
          try { (window.MRGtag = window.MRGtag || []).push({}); } catch {}
        }, d)
      );

      // Проверка — появился ли iframe
      setTimeout(() => {
        if (stopped) return;
        const el = ref.current;
        if (!el) return;
        const hasIframe = !!el.querySelector("iframe");
        const hasNodes = el.childNodes && el.childNodes.length > 0;
        setShown(hasIframe || hasNodes);
        setBlocked(!(hasIframe || hasNodes));
      }, 2400);
    };

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (ents) => ents.forEach((e) => {
          if (e.isIntersecting) {
            tryRender();
            io && io.unobserve(e.target);
          }
        }),
        { threshold: 0.05 }
      );
      if (ref.current) io.observe(ref.current);
    } else {
      tryRender();
    }

    return () => { stopped = true; io && io.disconnect(); };
  }, []);

  return (
    <div
      className={
        "inpage-shell rounded-2xl border border-neutral-800 bg-neutral-950/70 " +
        "shadow-[0_10px_30px_-12px_rgba(0,0,0,.45)] " + className
      }
      style={{
        maxWidth: 980,       // ширина контента, как у «описаний» на маркетплейсах
        marginInline: "auto",
        padding: 0,
      }}
    >
      <ins
        ref={ref}
        className="mrg-tag"
        style={{
          display: "block",
          textDecoration: "none",
          width: "100%",
          minHeight: 90,     // пока грузится
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        /* для некоторых шаблонов VK Ads можно добавить:
           data-ad-format="inpage"
        */
      ></ins>

      {!shown && blocked && (
        <div
          style={{
            width: "100%",
            padding: "16px",
            textAlign: "center",
            color: "#a8a8a8",
            fontSize: 13,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

/* ================= ROOT ================= */
export default function App() {
  useScrollReveal();
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <>
      <Nav onRequest={() => setRequestOpen(true)} />
      <main className="bg-animated">
        <Hero onRequest={() => setRequestOpen(true)} />

        {/* Трёхколоночная раскладка: ширина и отступы управляются в index.css (под 1440px) */}
        <div className="three-cols">
          <aside className="sidebar sidebar-left">
            <SideLeft onRequest={() => setRequestOpen(true)} />
          </aside>

          <div className="min-w-0">
            <Apps onRequest={() => setRequestOpen(true)} />
                 {/* Нативная реклама inPage */}
      <div className="mt-8 mb-10 px-4">
        <InPageAd client="ad-1916992" slot="1916992" />
      </div>
            <Services />
            <About />
            <Contact onRequest={() => setRequestOpen(true)} />
          </div>

          <aside className="sidebar sidebar-right">
            <SideRight onRequest={() => setRequestOpen(true)} />
          </aside>
        </div>
      </main>

      <Footer />
      <RequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </>
  );
}
