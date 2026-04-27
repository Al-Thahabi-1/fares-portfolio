const { useState, useEffect, useRef, useCallback, useMemo } = React;
const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS;

/* ─── Translations ─── */
const T = {
  en: {
    hello: "Hello, I'm", name: 'Fares Awarik', role: 'Laravel Developer',
    heroDesc: 'I build practical websites and business systems with clear structure, simple user experience, and real business value.',
    viewProjects: 'View Projects', contactMe: 'Contact Me',
    serviceTags: ['Business Websites','Web Applications','Admin Panels','Booking Systems','WhatsApp Solutions'],
    aboutLabel: 'About Me', aboutTitle: 'Building practical solutions\nfor real business needs',
    aboutP1: 'I am a Laravel developer focused on building practical digital solutions for real business needs. My work includes business websites, admin panels, booking systems, and simple web applications designed to be clear, useful, and easy to manage.',
    aboutP2: 'I care about structure, usability, and building projects that solve real problems — not just look good. Every line of code serves a purpose, and every interface is designed with the end user in mind.',
    servicesLabel: 'What I Build', servicesTitle: 'Services',
    servicesDesc: 'End-to-end web solutions built with Laravel, designed to work for your business from day one.',
    serviceCards: [
      { title: 'Business Websites', desc: 'Professional websites that present your business clearly and build trust with potential clients.' },
      { title: 'Web Applications', desc: 'Custom web apps tailored to your workflow — from internal tools to client-facing platforms.' },
      { title: 'Admin Panels', desc: 'Clean, intuitive dashboards to manage your content, users, and business operations.' },
      { title: 'Booking & Clinic Systems', desc: 'Appointment scheduling and patient management systems built for daily workflow.' },
      { title: 'WhatsApp-Based Solutions', desc: 'Integrations that connect your website to WhatsApp for direct customer communication.' },
      { title: 'Custom Business Systems', desc: 'Tailored systems designed around your specific business logic and processes.' },
    ],
    projectsLabel: 'Featured Projects', projectsTitle: 'Recent Work',
    projectsDesc: 'A selection of projects built for real clients and real business needs.',
    projects: [
      { title: 'Prego Education', desc: 'Educational website built with Laravel to present services, universities, and the student application journey in a clear and structured way.', tags: ['Laravel','Blade','MySQL'] },
      { title: 'Gümüşhane Yayla Bal', desc: 'Business website built to present honey products professionally, improve trust, and support WhatsApp-based sales.', tags: ['Laravel','WhatsApp','Bootstrap'] },
      { title: 'Al Mustafa Legal Consultancy', desc: 'Professional legal consultancy website focused on clarity, trust, and structured presentation of services.', tags: ['Laravel','PHP','Blade'] },
      { title: 'Clinic System', desc: 'Laravel-based clinic management system for appointments, patients, and daily workflow.', tags: ['Laravel','MySQL','Admin'], status: 'In Progress' },
      { title: 'Multi-Tenant System', desc: 'Laravel-based scalable system structure designed to support multiple business accounts within one platform.', tags: ['Laravel','Multi-Tenant','SaaS'], status: 'In Progress' },
    ],
    stackLabel: 'Tech Stack', stackTitle: 'Tools I Work With',
    contactLabel: 'Get in Touch', contactTitle: "Let's Work Together",
    contactDesc: 'If you need a business website, admin panel, booking system, or a practical web solution, feel free to get in touch.',
    footer: '© 2026 Fares Awarik — Built with Laravel & care.',
    navItems: ['About','Services','Projects','Contact'],
  },
  ar: {
    hello: 'مرحباً، أنا', name: 'فارس عواريك', role: 'مطوّر Laravel',
    heroDesc: 'أبني مواقع ويب وأنظمة أعمال عملية بهيكلة واضحة، وتجربة مستخدم بسيطة، وقيمة حقيقية للأعمال.',
    viewProjects: 'عرض المشاريع', contactMe: 'تواصل معي',
    serviceTags: ['مواقع الأعمال','تطبيقات الويب','لوحات التحكم','أنظمة الحجز','حلول واتساب'],
    aboutLabel: 'عنّي', aboutTitle: 'بناء حلول عملية\nلاحتياجات الأعمال الحقيقية',
    aboutP1: 'أنا مطوّر Laravel أركّز على بناء حلول رقمية عملية لاحتياجات الأعمال الحقيقية. تشمل أعمالي مواقع الأعمال، لوحات التحكم، أنظمة الحجز، وتطبيقات ويب بسيطة مصممة لتكون واضحة ومفيدة وسهلة الإدارة.',
    aboutP2: 'أهتم بالهيكلة وسهولة الاستخدام وبناء مشاريع تحل مشاكل حقيقية — ليس فقط مظهراً جميلاً. كل سطر كود يخدم هدفاً، وكل واجهة مصممة مع وضع المستخدم النهائي في الاعتبار.',
    servicesLabel: 'ما أبنيه', servicesTitle: 'الخدمات',
    servicesDesc: 'حلول ويب شاملة مبنية بـ Laravel، مصممة لتعمل لصالح عملك من اليوم الأول.',
    serviceCards: [
      { title: 'مواقع الأعمال', desc: 'مواقع احترافية تعرض عملك بوضوح وتبني الثقة مع العملاء المحتملين.' },
      { title: 'تطبيقات الويب', desc: 'تطبيقات ويب مخصصة لسير عملك — من الأدوات الداخلية إلى المنصات الموجهة للعملاء.' },
      { title: 'لوحات التحكم', desc: 'لوحات تحكم نظيفة وبديهية لإدارة المحتوى والمستخدمين وعمليات الأعمال.' },
      { title: 'أنظمة الحجز والعيادات', desc: 'أنظمة جدولة المواعيد وإدارة المرضى مبنية لسير العمل اليومي.' },
      { title: 'حلول واتساب', desc: 'تكاملات تربط موقعك بواتساب للتواصل المباشر مع العملاء.' },
      { title: 'أنظمة أعمال مخصصة', desc: 'أنظمة مصممة حول منطق وعمليات عملك المحددة.' },
    ],
    projectsLabel: 'مشاريع مميزة', projectsTitle: 'أعمال حديثة',
    projectsDesc: 'مجموعة من المشاريع المبنية لعملاء حقيقيين واحتياجات أعمال حقيقية.',
    projects: [
      { title: 'Prego Education', desc: 'موقع تعليمي مبني بـ Laravel لعرض الخدمات والجامعات ورحلة تقديم الطلاب بطريقة واضحة ومنظمة.', tags: ['Laravel','Blade','MySQL'] },
      { title: 'Gümüşhane Yayla Bal', desc: 'موقع أعمال لعرض منتجات العسل باحترافية وتعزيز الثقة ودعم المبيعات عبر واتساب.', tags: ['Laravel','WhatsApp','Bootstrap'] },
      { title: 'المصطفى للاستشارات القانونية', desc: 'موقع استشارات قانونية احترافي يركز على الوضوح والثقة والعرض المنظم للخدمات.', tags: ['Laravel','PHP','Blade'] },
      { title: 'نظام العيادة', desc: 'نظام إدارة عيادات مبني بـ Laravel للمواعيد والمرضى وسير العمل اليومي.', tags: ['Laravel','MySQL','Admin'], status: 'قيد التطوير' },
      { title: 'نظام متعدد المستأجرين', desc: 'هيكل نظام قابل للتوسع مبني بـ Laravel مصمم لدعم حسابات أعمال متعددة ضمن منصة واحدة.', tags: ['Laravel','Multi-Tenant','SaaS'], status: 'قيد التطوير' },
    ],
    stackLabel: 'الأدوات', stackTitle: 'الأدوات التي أستخدمها',
    contactLabel: 'تواصل', contactTitle: 'لنعمل معاً',
    contactDesc: 'إذا كنت تحتاج موقع أعمال، لوحة تحكم، نظام حجز، أو حل ويب عملي، لا تتردد في التواصل.',
    footer: '© 2026 فارس عواريك — مبني بـ Laravel وعناية.',
    navItems: ['عنّي','الخدمات','المشاريع','تواصل'],
  },
  tr: {
    hello: 'Merhaba, ben', name: 'Fares Awarik', role: 'Laravel Geliştirici',
    heroDesc: 'Net yapı, basit kullanıcı deneyimi ve gerçek iş değeri ile pratik web siteleri ve iş sistemleri geliştiriyorum.',
    viewProjects: 'Projeleri Gör', contactMe: 'İletişime Geç',
    serviceTags: ['İş Web Siteleri','Web Uygulamaları','Yönetim Panelleri','Randevu Sistemleri','WhatsApp Çözümleri'],
    aboutLabel: 'Hakkımda', aboutTitle: 'Gerçek iş ihtiyaçları için\npratik çözümler geliştiriyorum',
    aboutP1: 'Gerçek iş ihtiyaçları için pratik dijital çözümler geliştirmeye odaklanan bir Laravel geliştiricisiyim. Çalışmalarım iş web siteleri, yönetim panelleri, randevu sistemleri ve net, kullanışlı ve yönetimi kolay basit web uygulamalarını kapsar.',
    aboutP2: 'Yapı, kullanılabilirlik ve gerçek sorunları çözen projeler inşa etmeyi önemsiyorum — sadece iyi görünmek değil. Her kod satırı bir amaca hizmet eder ve her arayüz son kullanıcı düşünülerek tasarlanır.',
    servicesLabel: 'Ne Geliştiriyorum', servicesTitle: 'Hizmetler',
    servicesDesc: 'Laravel ile geliştirilen, ilk günden işletmeniz için çalışmak üzere tasarlanmış uçtan uca web çözümleri.',
    serviceCards: [
      { title: 'İş Web Siteleri', desc: 'İşletmenizi net bir şekilde sunan ve potansiyel müşterilerle güven inşa eden profesyonel web siteleri.' },
      { title: 'Web Uygulamaları', desc: 'İş akışınıza özel web uygulamaları — dahili araçlardan müşteri odaklı platformlara.' },
      { title: 'Yönetim Panelleri', desc: 'İçerik, kullanıcı ve iş operasyonlarını yönetmek için temiz, sezgisel paneller.' },
      { title: 'Randevu ve Klinik Sistemleri', desc: 'Günlük iş akışı için tasarlanmış randevu planlama ve hasta yönetim sistemleri.' },
      { title: 'WhatsApp Tabanlı Çözümler', desc: "Web sitenizi doğrudan müşteri iletişimi için WhatsApp'a bağlayan entegrasyonlar." },
      { title: 'Özel İş Sistemleri', desc: 'Belirli iş mantığınız ve süreçlerinize göre tasarlanmış özel sistemler.' },
    ],
    projectsLabel: 'Öne Çıkan Projeler', projectsTitle: 'Son Çalışmalar',
    projectsDesc: 'Gerçek müşteriler ve gerçek iş ihtiyaçları için geliştirilen projelerden bir seçki.',
    projects: [
      { title: 'Prego Education', desc: 'Hizmetleri, üniversiteleri ve öğrenci başvuru sürecini net ve yapılandırılmış bir şekilde sunmak için Laravel ile geliştirilen eğitim web sitesi.', tags: ['Laravel','Blade','MySQL'] },
      { title: 'Gümüşhane Yayla Bal', desc: 'Bal ürünlerini profesyonelce sunmak, güveni artırmak ve WhatsApp tabanlı satışları desteklemek için geliştirilen iş web sitesi.', tags: ['Laravel','WhatsApp','Bootstrap'] },
      { title: 'Al Mustafa Hukuk Danışmanlığı', desc: 'Netlik, güven ve hizmetlerin yapılandırılmış sunumuna odaklanan profesyonel hukuk danışmanlığı web sitesi.', tags: ['Laravel','PHP','Blade'] },
      { title: 'Klinik Sistemi', desc: 'Randevular, hastalar ve günlük iş akışı için Laravel tabanlı klinik yönetim sistemi.', tags: ['Laravel','MySQL','Admin'], status: 'Devam Ediyor' },
      { title: 'Çok Kiracılı Sistem', desc: 'Tek bir platform içinde birden fazla iş hesabını desteklemek için tasarlanmış Laravel tabanlı ölçeklenebilir sistem yapısı.', tags: ['Laravel','Multi-Tenant','SaaS'], status: 'Devam Ediyor' },
    ],
    stackLabel: 'Teknoloji', stackTitle: 'Kullandığım Araçlar',
    contactLabel: 'İletişim', contactTitle: 'Birlikte Çalışalım',
    contactDesc: 'Bir iş web sitesi, yönetim paneli, randevu sistemi veya pratik bir web çözümüne ihtiyacınız varsa, iletişime geçmekten çekinmeyin.',
    footer: '© 2026 Fares Awarik — Laravel ve özenle geliştirildi.',
    navItems: ['Hakkımda','Hizmetler','Projeler','İletişim'],
  }
};

const LangContext = React.createContext('en');
function useT() { return T[React.useContext(LangContext)]; }

/* ─── Mouse tracker ─── */
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return pos;
}

/* ─── Scroll reveal ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style
    }} className={className}>{children}</div>
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, style = {}, className = '' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0) rotateY(0)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const handleMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(800px) rotateX(${(0.5-y)*12}deg) rotateY(${(x-0.5)*12}deg) scale3d(1.02,1.02,1.02)`);
    setGlare({ x: x*100, y: y*100, opacity: 0.12 });
  }, []);
  const handleLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);
  return (
    <div ref={cardRef} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}
      style={{ transform, transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`, transition: 'opacity 0.3s' }}></div>
    </div>
  );
}

/* ─── Floating Particles ─── */
function Particles({ count = 30 }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100, size: 2+Math.random()*3,
    dur: 15+Math.random()*25, delay: Math.random()*-20, opacity: 0.15+Math.random()*0.25
  })), [count]);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%',
          background: 'var(--accent)', opacity: p.opacity, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite` }}></div>
      ))}
    </div>
  );
}

/* ─── 3D Wireframe Geometry ─── */
function WireframeShape({ mouse }) {
  const rx = (mouse.y - 0.5) * 30, ry = (mouse.x - 0.5) * 30;
  return (
    <div style={{ width: 320, height: 320, position: 'relative', transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}>
      {[{ rX:0,rY:0,tZ:100 },{ rX:0,rY:180,tZ:100 },{ rX:0,rY:90,tZ:100 },{ rX:0,rY:-90,tZ:100 },{ rX:90,rY:0,tZ:100 },{ rX:-90,rY:0,tZ:100 }].map((f,i) => (
        <div key={i} style={{ position:'absolute',width:200,height:200,left:60,top:60,border:'1px solid oklch(0.75 0.15 70 / 0.2)',borderRadius:4,
          transform:`rotateX(${f.rX}deg) rotateY(${f.rY}deg) translateZ(${f.tZ}px)`, transformStyle:'preserve-3d', backfaceVisibility:'visible' }}></div>
      ))}
      <div style={{ position:'absolute',width:80,height:80,left:120,top:120, animation:'spin-slow 20s linear infinite', transformStyle:'preserve-3d' }}>
        {[0,60,120,180,240,300].map((rot,i) => (
          <div key={i} style={{ position:'absolute',width:80,height:80,left:0,top:0, border:'1px solid var(--accent)', borderRadius:2, opacity:0.5,
            transform:`rotateY(${rot}deg) rotateX(45deg)`, transformStyle:'preserve-3d' }}></div>
        ))}
      </div>
      {[[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1]].map((c,i) => (
        <div key={`d${i}`} style={{ position:'absolute',width:6,height:6,borderRadius:'50%', background:'var(--accent)',
          left:157+c[0]*100, top:157+c[1]*100, transform:`translateZ(${c[2]*100}px)`, animation:`pulse-glow 3s ease-in-out ${i*0.3}s infinite` }}></div>
      ))}
    </div>
  );
}

/* ─── Lang Switcher ─── */
function LangSwitcher({ lang, setLang }) {
  const langs = ['en','ar','tr'];
  const labels = { en: 'EN', ar: 'ع', tr: 'TR' };
  return (
    <div style={{ display:'flex', gap:3, background:'var(--bg-elevated)', borderRadius:8, padding:3, border:'1px solid var(--border)' }}>
      {langs.map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          background: lang===l ? 'var(--accent)' : 'transparent', color: lang===l ? '#08080a' : 'var(--text-secondary)',
          border:'none', borderRadius:6, padding:'4px 10px', cursor:'pointer',
          fontFamily: l==='ar' ? 'var(--body)' : 'var(--mono)', fontSize:12, fontWeight:600, transition:'all 0.2s'
        }}>{labels[l]}</button>
      ))}
    </div>
  );
}

/* ─── NAV ─── */
function Nav({ lang, setLang }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const navIds = ['about','services','projects','contact'];
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      for (let i = navIds.length-1; i >= 0; i--) {
        const el = document.getElementById(navIds[i]);
        if (el && el.getBoundingClientRect().top <= 200) { setActive(navIds[i]); break; }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,
      background: scrolled ? 'rgba(8,8,10,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)', padding:'0 24px' }}>
      <div style={{ maxWidth:1120,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',height:64 }}>
        <a href="#hero" style={{ fontFamily:'var(--heading)',fontWeight:700,fontSize:18 }}>
          fares<span style={{ color:'var(--accent)' }}>.</span>awarik
        </a>
        <div style={{ display:'flex',gap:24,fontSize:14,fontWeight:500,fontFamily:'var(--body)',alignItems:'center' }}>
          {navIds.map((id,i) => (
            <a key={id} href={`#${id}`} style={{ color: active===id ? 'var(--accent)' : 'var(--text-secondary)', transition:'color 0.3s', position:'relative', padding:'4px 0' }}>
              {t.navItems[i]}
              {active===id && <span style={{ position:'absolute',bottom:-2,left:0,right:0,height:2,background:'var(--accent)',borderRadius:1, animation:'text-reveal 0.3s ease forwards' }}></span>}
            </a>
          ))}
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const mouse = useMousePosition();
  const t = useT();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const anim = (d) => ({ opacity: loaded?1:0, transform: loaded?'translateY(0)':`translateY(30px)`, transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s` });
  return (
    <section id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',paddingTop:80,overflow:'hidden' }}>
      <div className="container" style={{ display:'grid',gridTemplateColumns:'1fr auto',alignItems:'center',gap:40 }}>
        <div>
          <div style={anim(0.1)}>
            <p style={{ fontFamily:'var(--mono)',fontSize:14,color:'var(--accent)',marginBottom:20,letterSpacing:'0.06em' }}>
              <span style={{ display:'inline-block',width:32,height:1,background:'var(--accent)',verticalAlign:'middle',marginRight:12 }}></span>
              {t.hello}
            </p>
          </div>
          <div style={anim(0.2)}>
            <h1 style={{ fontFamily:'var(--heading)',fontSize:'clamp(44px,7vw,76px)',fontWeight:700,lineHeight:1.05,marginBottom:12,
              background:'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>{t.name}</h1>
          </div>
          <div style={anim(0.35)}>
            <p style={{ fontFamily:'var(--heading)',fontSize:'clamp(20px,3vw,28px)',fontWeight:500,color:'var(--accent)',marginBottom:28,display:'flex',alignItems:'center',gap:12 }}>
              <span style={{ display:'inline-block',width:8,height:8,borderRadius:'50%',background:'var(--accent)',animation:'pulse-glow 2s ease-in-out infinite' }}></span>
              {t.role}
            </p>
          </div>
          <div style={anim(0.5)}>
            <p style={{ maxWidth:500,color:'var(--text-secondary)',fontSize:17,fontWeight:300,lineHeight:1.75,marginBottom:40 }}>{t.heroDesc}</p>
          </div>
          <div style={{ display:'flex',gap:16,flexWrap:'wrap',marginBottom:48,...anim(0.6) }}>
            <a href="#projects" className="hero-btn-primary" style={{
              background:'var(--accent)',color:'#08080a',padding:'14px 32px',borderRadius:10,fontWeight:600,fontSize:15,fontFamily:'var(--heading)',
              boxShadow:'0 0 30px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.3)',transition:'all 0.3s ease',position:'relative',overflow:'hidden'
            }}>{t.viewProjects}</a>
            <a href="#contact" style={{ border:'1px solid var(--border)',color:'var(--text)',padding:'14px 32px',borderRadius:10,fontWeight:500,fontSize:15,
              fontFamily:'var(--heading)',transition:'all 0.3s ease',background:'rgba(255,255,255,0.02)' }}
              onMouseEnter={e=>{e.target.style.borderColor='var(--accent)';e.target.style.boxShadow='0 0 20px var(--accent-glow)'}}
              onMouseLeave={e=>{e.target.style.borderColor='var(--border)';e.target.style.boxShadow='none'}}
            >{t.contactMe}</a>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'8px 20px',fontFamily:'var(--mono)',fontSize:12,color:'var(--text-secondary)', ...anim(0.75) }}>
            {t.serviceTags.map((s,i) => (
              <span key={i} style={{ display:'flex',alignItems:'center',gap:8 }}>
                {i>0 && <span style={{ color:'var(--accent)',opacity:0.4 }}>◆</span>}{s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ perspective:800,display:'flex',alignItems:'center',justifyContent:'center' }} className="hero-3d">
          <WireframeShape mouse={mouse} />
        </div>
      </div>
      <style>{`@media(max-width:900px){.hero-3d{display:none!important}}.hero-btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 40px var(--accent-glow),0 8px 24px rgba(0,0,0,0.4)!important}`}</style>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const t = useT();
  return (
    <section id="about" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <Reveal><p className="section-label">{t.aboutLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.aboutTitle.split('\n').map((l,i)=><React.Fragment key={i}>{i>0&&<br/>}{l}</React.Fragment>)}</h2></Reveal>
        <Reveal delay={160}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:32,marginTop:32 }}>
            <div style={{ padding:28,borderRadius:12,border:'1px solid var(--border)',background:'rgba(255,255,255,0.02)',backdropFilter:'blur(8px)' }}>
              <p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP1}</p>
            </div>
            <div style={{ padding:28,borderRadius:12,border:'1px solid var(--border)',background:'rgba(255,255,255,0.02)',backdropFilter:'blur(8px)' }}>
              <p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8 }}>{t.aboutP2}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function ServiceCard({ title, desc, index }) {
  return (
    <Reveal delay={index*80}>
      <TiltCard style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,padding:32,height:'100%',cursor:'default' }}>
        <div style={{ width:48,height:48,borderRadius:12,background:'linear-gradient(135deg, var(--accent-glow), transparent)',
          border:'1px solid oklch(0.75 0.15 70 / 0.2)',display:'flex',alignItems:'center',justifyContent:'center',
          marginBottom:20,fontFamily:'var(--mono)',fontSize:16,color:'var(--accent)',fontWeight:500 }}>
          {String(index+1).padStart(2,'0')}
        </div>
        <h3 style={{ fontFamily:'var(--heading)',fontWeight:600,fontSize:18,marginBottom:10 }}>{title}</h3>
        <p style={{ color:'var(--text-secondary)',fontSize:14,fontWeight:300,lineHeight:1.7 }}>{desc}</p>
      </TiltCard>
    </Reveal>
  );
}

function Services() {
  const t = useT();
  return (
    <section id="services">
      <div className="container">
        <Reveal><p className="section-label">{t.servicesLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.servicesTitle}</h2></Reveal>
        <Reveal delay={120}><p style={{ color:'var(--text-secondary)',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7,marginBottom:48 }}>{t.servicesDesc}</p></Reveal>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:20 }}>
          {t.serviceCards.map((s,i) => <ServiceCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function ProjectCard({ title, desc, tags, status, index }) {
  return (
    <Reveal delay={index*100}>
      <TiltCard style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
        <div style={{ height:180,background:'var(--bg-elevated)',display:'flex',alignItems:'center',justifyContent:'center',
          borderBottom:'1px solid var(--border)',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',inset:-50,opacity:0.04,
            backgroundImage:'repeating-linear-gradient(45deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 20px)',
            animation:'float 20s ease-in-out infinite' }}></div>
          <span style={{ fontFamily:'var(--mono)',fontSize:12,color:'var(--text-secondary)',opacity:0.4,zIndex:1 }}>project screenshot</span>
          {status && <span style={{ position:'absolute',top:12,right:12,zIndex:2,background:'var(--accent)',color:'#08080a',
            fontFamily:'var(--mono)',fontSize:11,fontWeight:500,padding:'5px 12px',borderRadius:6,letterSpacing:'0.04em',
            boxShadow:'0 0 20px var(--accent-glow)' }}>{status}</span>}
        </div>
        <div style={{ padding:'24px 28px 28px' }}>
          <h3 style={{ fontFamily:'var(--heading)',fontWeight:600,fontSize:18,marginBottom:10 }}>{title}</h3>
          <p style={{ color:'var(--text-secondary)',fontSize:14,fontWeight:300,lineHeight:1.7,marginBottom:16 }}>{desc}</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
            {tags.map(tag => (
              <span key={tag} style={{ fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',background:'var(--accent-glow)',
                padding:'5px 12px',borderRadius:6,border:'1px solid oklch(0.75 0.15 70 / 0.1)',letterSpacing:'0.02em' }}>{tag}</span>
            ))}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Projects() {
  const t = useT();
  return (
    <section id="projects" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <Reveal><p className="section-label">{t.projectsLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.projectsTitle}</h2></Reveal>
        <Reveal delay={120}><p style={{ color:'var(--text-secondary)',maxWidth:560,fontSize:15,fontWeight:300,lineHeight:1.7,marginBottom:48 }}>{t.projectsDesc}</p></Reveal>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',gap:24 }}>
          {t.projects.map((p,i) => <ProjectCard key={i} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── TECH STACK ─── */
const techStack = ['Laravel','PHP','MySQL','Blade','Bootstrap','JavaScript','Git','GitHub'];

function TechStack() {
  const t = useT();
  return (
    <section id="stack">
      <div className="container">
        <Reveal><p className="section-label">{t.stackLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title">{t.stackTitle}</h2></Reveal>
        <Reveal delay={160}>
          <div style={{ display:'flex',flexWrap:'wrap',gap:14,marginTop:36 }}>
            {techStack.map((tech,i) => (
              <Reveal key={tech} delay={200+i*60}>
                <TiltCard style={{ fontFamily:'var(--mono)',fontSize:14,fontWeight:500,color:'var(--text)',background:'var(--bg-card)',
                  border:'1px solid var(--border)',padding:'12px 24px',borderRadius:10,cursor:'default',display:'inline-flex',alignItems:'center',gap:10 }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--accent)',opacity:0.6 }}></span>
                  {tech}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
const contactLinks = [
  { label:'Email', href:'mailto:hello@faresawarik.com', mono:'✉' },
  { label:'GitHub', href:'#', mono:'GH' },
  { label:'LinkedIn', href:'#', mono:'in' },
  { label:'Instagram', href:'#', mono:'IG' },
];

function Contact() {
  const t = useT();
  return (
    <section id="contact" style={{ background:'linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)' }}>
      <div className="container" style={{ textAlign:'center',maxWidth:640 }}>
        <Reveal><p className="section-label" style={{ justifyContent:'center' }}>{t.contactLabel}</p></Reveal>
        <Reveal delay={80}><h2 className="section-title" style={{ textAlign:'center' }}>{t.contactTitle}</h2></Reveal>
        <Reveal delay={160}><p style={{ color:'var(--text-secondary)',fontSize:15,fontWeight:300,lineHeight:1.8,marginBottom:44 }}>{t.contactDesc}</p></Reveal>
        <Reveal delay={240}>
          <div style={{ display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' }}>
            {contactLinks.map(l => (
              <TiltCard key={l.label} style={{ background:'var(--bg-elevated)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden' }}>
                <a href={l.href} target="_blank" rel="noopener" style={{ display:'flex',alignItems:'center',gap:10,padding:'14px 24px',fontFamily:'var(--heading)',fontSize:14,fontWeight:500 }}>
                  <span style={{ fontFamily:'var(--mono)',fontSize:12,color:'var(--accent)',width:24,textAlign:'center' }}>{l.mono}</span>
                  {l.label}
                </a>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const t = useT();
  return (
    <footer style={{ padding:'40px 24px',borderTop:'1px solid var(--border)',textAlign:'center' }}>
      <p style={{ fontFamily:'var(--mono)',fontSize:12,color:'var(--text-secondary)' }}>{t.footer}</p>
    </footer>
  );
}

/* ─── APP ─── */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = tweaks.lang || 'en';
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', `oklch(0.75 0.15 ${tweaks.accentHue})`);
    document.documentElement.style.setProperty('--accent-dim', `oklch(0.55 0.10 ${tweaks.accentHue})`);
    document.documentElement.style.setProperty('--accent-glow', `oklch(0.75 0.15 ${tweaks.accentHue} / 0.15)`);
  }, [tweaks.accentHue]);

  return (
    <LangContext.Provider value={lang}>
      {tweaks.showParticles && <Particles count={25} />}
      <Nav lang={lang} setLang={v => setTweak('lang', v)} />
      <Hero />
      <About />
      <Services />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakSlider label="Accent Hue" value={tweaks.accentHue} onChange={v => setTweak('accentHue', v)} min={0} max={360} step={1} />
          <TweakToggle label="Particles" value={tweaks.showParticles} onChange={v => setTweak('showParticles', v)} />
        </TweakSection>
        <TweakSection title="Language">
          <TweakRadio label="Language" value={lang} onChange={v => setTweak('lang', v)} options={['en','ar','tr']} />
        </TweakSection>
      </TweaksPanel>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
