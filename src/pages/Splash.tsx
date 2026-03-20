import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [hideLoader, setHideLoader] = useState(false);

  const curRef = useRef<HTMLDivElement | null>(null);
  const curOuterRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const s1Ref = useRef<HTMLDivElement | null>(null);
  const s2Ref = useRef<HTMLDivElement | null>(null);
  const s3Ref = useRef<HTMLDivElement | null>(null);
  const s4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let ox = 0;
    let oy = 0;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = `${mx}px`;
        curRef.current.style.top = `${my}px`;
      }
    };

    const tick = () => {
      ox += (mx - ox) * 0.1;
      oy += (my - oy) * 0.1;
      if (curOuterRef.current) {
        curOuterRef.current.style.left = `${ox}px`;
        curOuterRef.current.style.top = `${oy}px`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", handleMouseMove);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHideLoader(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const count = (el: HTMLDivElement | null, to: number, suffix: string, duration: number) => {
      if (!el) return;
      let start: number | null = null;

      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        el.textContent = `${Math.round(progress * to)}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            count(s1Ref.current, 97, "%", 1600);
            count(s2Ref.current, 42, "ms", 1400);
            count(s3Ref.current, 256, "+", 1800);
            count(s4Ref.current, 12847, "", 2000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const goToConnect = () => navigate("/connect");

  return (
    <div className="splash-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --bg: #03080d;
          --accent: #00e5ff;
          --accent2: #ff3b3b;
          --accent3: #00ff9f;
          --dim: rgba(0,229,255,0.08);
          --border: rgba(0,229,255,0.15);
          --text: #d0eaf8;
          --muted: #3d6b82;
        }

        html, body { width:100%; height:100%; overflow-x:hidden; }
        body { background: var(--bg); color: var(--text); font-family: 'Rajdhani', sans-serif; cursor: none; min-height: 100vh; }
        .splash-page { min-height: 100vh; position: relative; background: var(--bg); color: var(--text); }
        #cur { position:fixed; width:10px; height:10px; border-radius:50%; background:var(--accent); pointer-events:none; z-index:9999; transform:translate(-50%,-50%); box-shadow:0 0 14px var(--accent); transition:transform .1s; }
        #cur-o { position:fixed; width:32px; height:32px; border:1px solid rgba(0,229,255,0.4); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:left .07s,top .07s; }
        .splash-page::after {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:9990;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);
        }
        .splash-page::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0; opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        .grid { position:fixed; inset:0; z-index:0; pointer-events:none; background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        #loader { position:fixed; inset:0; background:#000; z-index:9995; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; transition:opacity .6s; }
        #loader.out { opacity:0; pointer-events:none; }
        .l-eye { width:72px; height:72px; }
        .l-bar { width:240px; height:1px; background:rgba(0,229,255,0.1); overflow:hidden; position:relative; }
        .l-bar::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,var(--accent),transparent); animation: sweep 1s linear infinite; }
        @keyframes sweep { from{transform:translateX(-100%)} to{transform:translateX(200%)} }
        .l-txt { font-family:'Orbitron',monospace; font-size:32px; font-weight:900; color:var(--accent); letter-spacing:6px; text-shadow:0 0 24px rgba(0,229,255,0.7); animation:blink 1s step-end infinite; }
        @keyframes blink { 50%{opacity:0} }
        nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:0 56px; height:64px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); background:linear-gradient(180deg,rgba(3,8,13,0.97),transparent); backdrop-filter: blur(8px); }
        .nav-brand { display:flex; align-items:center; gap:10px; }
        .nav-brand svg { width:32px; height:32px; }
        .brand-name { font-family:'Orbitron',monospace; font-size:22px; font-weight:900; color:#fff; letter-spacing:3px; }
        .brand-name em { color:var(--accent); font-style:normal; }
        .live-pill { font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:2px; color:var(--accent3); border:1px solid rgba(0,255,159,0.35); padding:3px 8px; animation:pill-pulse 2s ease-in-out infinite; }
        @keyframes pill-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .nav-links { display:flex; gap:32px; list-style:none; }
        .nav-links a { font-family:'Share Tech Mono',monospace; font-size:13px; letter-spacing:2px; color:var(--muted); text-decoration:none; text-transform:uppercase; transition:color .2s; }
        .nav-links a:hover { color:var(--accent); }
        .nav-btn, .cta-a, .cta-b { cursor:none; }
        .nav-btn { font-family:'Share Tech Mono',monospace; font-size:13px; letter-spacing:2px; background:var(--accent); color:#000; border:none; padding:10px 26px; clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); transition:box-shadow .2s; }
        .nav-btn:hover { box-shadow:0 0 24px rgba(0,229,255,0.5); }
        #hero { position:relative; min-height:100vh; display:grid; place-items:center; z-index:1; padding:80px 24px 60px; overflow:hidden; }
        .hero-glow { position:absolute; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .eye-bg { position:absolute; width:min(75vw, 680px); height:min(75vw, 680px); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; opacity:0; animation:eyeIn 1.4s .4s forwards; }
        @keyframes eyeIn { to{opacity:1} }
        .hero-inner { position:relative; z-index:2; text-align:center; max-width:820px; }
        .pre-tag { display:inline-flex; align-items:center; gap:8px; font-family:'Share Tech Mono',monospace; font-size:14px; letter-spacing:4px; color:var(--accent); margin-bottom:24px; opacity:0; animation:up .6s .6s forwards; }
        .pre-tag::before, .pre-tag::after { content:''; width:32px; height:1px; background:var(--accent); opacity:0.5; }
        h1 { font-family:'Orbitron',monospace; font-weight:900; font-size:clamp(70px, 14vw, 160px); line-height:0.88; letter-spacing:-3px; opacity:0; animation:up .7s .8s forwards; }
        h1 .r1 { display:block; color:#fff; }
        h1 .r2 { display:block; color:transparent; -webkit-text-stroke:1.5px var(--accent); }
        .tagline { font-size:clamp(17px,2.5vw,21px); color:var(--muted); font-weight:400; line-height:1.8; max-width:500px; margin:28px auto 0; opacity:0; animation:up .7s 1s forwards; }
        .cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:44px; opacity:0; animation:up .7s 1.2s forwards; }
        .cta-a { font-family:'Share Tech Mono',monospace; font-size:18px; letter-spacing:2px; background:var(--accent); color:#000; border:none; padding:22px 56px; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); transition:box-shadow .2s, transform .2s; }
        .cta-a:hover { box-shadow:0 0 32px rgba(0,229,255,0.55); transform:translateY(-2px); }
        .cta-b { font-family:'Share Tech Mono',monospace; font-size:18px; letter-spacing:2px; background:transparent; color:var(--accent); border:1px solid rgba(0,229,255,0.4); padding:22px 56px; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); transition:background .2s, transform .2s; }
        .cta-b:hover { background:rgba(0,229,255,0.08); transform:translateY(-2px); }
        .stats { display:flex; flex-wrap:wrap; justify-content:center; margin-top:64px; border:1px solid var(--border); max-width:720px; margin-left:auto; margin-right:auto; opacity:0; animation:up .7s 1.4s forwards; }
        .stat { flex:1; min-width:150px; padding:22px 28px; text-align:center; border-right:1px solid var(--border); }
        .stat:last-child { border-right:none; }
        .sv { font-family:'Orbitron',monospace; font-size:clamp(30px,4vw,42px); font-weight:800; color:var(--accent); }
        .sl { font-family:'Share Tech Mono',monospace; font-size:12px; letter-spacing:2px; color:var(--muted); margin-top:4px; }
        .corner { position:absolute; width:20px; height:20px; }
        .corner.tl { top:12px; left:12px; border-top:1.5px solid var(--accent); border-left:1.5px solid var(--accent); }
        .corner.tr { top:12px; right:12px; border-top:1.5px solid var(--accent); border-right:1.5px solid var(--accent); }
        .corner.bl { bottom:12px; left:12px; border-bottom:1.5px solid var(--accent); border-left:1.5px solid var(--accent); }
        .corner.br { bottom:12px; right:12px; border-bottom:1.5px solid var(--accent); border-right:1.5px solid var(--accent); }
        .float-card { position:absolute; background:rgba(5,15,22,0.92); border:1px solid var(--border); padding:12px 16px; font-family:'Share Tech Mono',monospace; font-size:13px; backdrop-filter:blur(8px); pointer-events:none; }
        .fc1 { left:3%; top:28%; border-left:3px solid var(--accent2); opacity:0; animation:float 7s 1.8s ease-in-out infinite, fadeIn .5s 1.8s forwards; }
        .fc2 { right:3%; top:36%; border-left:3px solid var(--accent3); opacity:0; animation:float 8s 2.2s ease-in-out infinite, fadeIn .5s 2.2s forwards; }
        .fc3 { left:5%; bottom:20%; border-left:3px solid var(--accent); opacity:0; animation:float 6s 2.5s ease-in-out infinite, fadeIn .5s 2.5s forwards; }
        .fc4 { right:4%; top:16%; border-left:3px solid var(--accent2); opacity:0; animation:float 9s 2.8s ease-in-out infinite, fadeIn .5s 2.8s forwards; }
        .fc5 { right:3%; bottom:18%; border-left:3px solid #ffaa00; opacity:0; animation:float 7s 3.1s ease-in-out infinite, fadeIn .5s 3.1s forwards; }
        .fc6 { left:4%; top:12%; border-left:3px solid var(--accent3); opacity:0; animation:float 8s 3.4s ease-in-out infinite, fadeIn .5s 3.4s forwards; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn { to{opacity:1} }
        .fc-label { color:var(--muted); letter-spacing:2px; font-size:11px; margin-bottom:4px; }
        .fc-val { color:#fff; font-size:16px; font-weight:bold; margin-bottom:2px; }
        .fc-sub { color:var(--muted); font-size:11px; }
        .dot-red, .dot-grn, .dot-yel, .dot-cyn { display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:5px; }
        .dot-red { background:var(--accent2); box-shadow:0 0 6px var(--accent2); animation:blink .8s step-end infinite; }
        .dot-grn { background:var(--accent3); box-shadow:0 0 6px var(--accent3); animation:blink 1.4s step-end infinite; }
        .dot-yel { background:#ffaa00; box-shadow:0 0 6px #ffaa00; animation:blink 1.1s step-end infinite; }
        .dot-cyn { background:var(--accent); box-shadow:0 0 6px var(--accent); animation:blink 1.6s step-end infinite; }
        .ticker-bar { position:absolute; bottom:0; left:0; right:0; height:36px; background:rgba(3,8,13,0.95); border-top:1px solid var(--border); display:flex; align-items:center; overflow:hidden; z-index:10; opacity:0; animation:fadeIn .5s 3.8s forwards; }
        .ticker-label { font-family:'Share Tech Mono',monospace; font-size:12px; letter-spacing:3px; color:#000; background:var(--accent2); padding:0 14px; height:100%; display:flex; align-items:center; white-space:nowrap; flex-shrink:0; }
        .ticker-track { display:flex; align-items:center; animation:tickerScroll 28s linear infinite; white-space:nowrap; }
        @keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-item { font-family:'Share Tech Mono',monospace; font-size:12px; letter-spacing:1px; color:var(--muted); padding:0 28px; border-right:1px solid var(--border); display:flex; align-items:center; gap:7px; height:36px; }
        .ticker-item .t-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
        .t-red { background:var(--accent2); box-shadow:0 0 5px var(--accent2); animation:blink .9s step-end infinite; }
        .t-yel { background:#ffaa00; box-shadow:0 0 5px #ffaa00; animation:blink 1.2s step-end infinite; }
        .t-grn { background:var(--accent3); box-shadow:0 0 5px var(--accent3); animation:blink 1.5s step-end infinite; }
        .t-lvl { font-size:11px; padding:1px 5px; border:1px solid; }
        .t-lvl.high { color:var(--accent2); border-color:rgba(255,59,59,0.4); }
        .t-lvl.med { color:#ffaa00; border-color:rgba(255,170,0,0.4); }
        .t-lvl.low { color:var(--accent3); border-color:rgba(0,255,159,0.4); }
        @keyframes up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @media(max-width:700px) {
          nav { padding:0 20px; }
          .nav-links { display:none; }
          .fc1,.fc2,.fc3,.fc4,.fc5,.fc6 { display:none; }
          .eye-bg { opacity:0.25 !important; }
        }
      `}</style>

      <div id="cur" ref={curRef} />
      <div id="cur-o" ref={curOuterRef} />
      <div className="grid" />

      <div id="loader" className={hideLoader ? "out" : ""}>
        <svg className="l-eye" viewBox="0 0 72 72" fill="none">
          <ellipse cx="36" cy="36" rx="34" ry="21" stroke="#0a2f42" strokeWidth="1.5" />
          <ellipse cx="36" cy="36" rx="34" ry="21" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="220" strokeDashoffset="220">
            <animate attributeName="stroke-dashoffset" from="220" to="0" dur="1.2s" fill="freeze" />
          </ellipse>
          <circle cx="36" cy="36" r="13" fill="#020a10" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="36" cy="36" r="7" fill="#00e5ff" opacity="0.9">
            <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="36" cy="36" r="3" fill="#fff" />
          <line x1="2" y1="36" x2="21" y2="36" stroke="#00e5ff" strokeWidth="0.5" opacity="0.6" />
          <line x1="51" y1="36" x2="70" y2="36" stroke="#00e5ff" strokeWidth="0.5" opacity="0.6" />
        </svg>
        <div className="l-bar" />
        <div className="l-txt">RAKSHA NETRA</div>
      </div>

      <nav>
        <div className="nav-brand">
          <svg viewBox="0 0 32 32" fill="none">
            <ellipse cx="16" cy="16" rx="14" ry="9" stroke="#00e5ff" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="5" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="2" fill="#00e5ff" />
            <line x1="2" y1="16" x2="9" y2="16" stroke="#00e5ff" strokeWidth="1" />
            <line x1="23" y1="16" x2="30" y2="16" stroke="#00e5ff" strokeWidth="1" />
          </svg>
          <span className="brand-name">
            RAKSHA<em>NETRA</em>
          </span>
          <span className="live-pill">LIVE</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pipeline</a></li>
          <li><a href="#">Alerts</a></li>
          <li><a href="#">Deploy</a></li>
        </ul>
        <button className="nav-btn" onClick={goToConnect}>ACCESS SYSTEM</button>
      </nav>

      <section id="hero">
        <div className="hero-glow" />
        <svg className="eye-bg" viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="340" cy="340" r="336" stroke="rgba(0,229,255,0.04)" strokeWidth="1" />
          <circle cx="340" cy="340" r="300" stroke="rgba(0,229,255,0.04)" strokeWidth="1" />
          <circle cx="340" cy="340" r="275" stroke="rgba(0,229,255,0.09)" strokeWidth="1" strokeDasharray="8 16">
            <animateTransform attributeName="transform" type="rotate" from="0 340 340" to="360 340 340" dur="40s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="340" r="248" stroke="rgba(0,229,255,0.06)" strokeWidth="1" strokeDasharray="4 24">
            <animateTransform attributeName="transform" type="rotate" from="360 340 340" to="0 340 340" dur="28s" repeatCount="indefinite" />
          </circle>
          <ellipse cx="340" cy="340" rx="220" ry="132" stroke="rgba(0,229,255,0.22)" strokeWidth="1.5" />
          <ellipse cx="340" cy="340" rx="220" ry="132" stroke="rgba(0,229,255,0.18)" strokeWidth="1.5" strokeDasharray="1400" strokeDashoffset="1400">
            <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="2.5s" fill="freeze" />
          </ellipse>
          <path d="M120 340 Q340 200 560 340" stroke="rgba(0,229,255,0.06)" strokeWidth="1" fill="none" />
          <path d="M120 340 Q340 480 560 340" stroke="rgba(0,229,255,0.06)" strokeWidth="1" fill="none" />
          <circle cx="340" cy="340" r="90" fill="rgba(0,229,255,0.03)" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
          <circle cx="340" cy="340" r="68" fill="rgba(0,229,255,0.05)" stroke="rgba(0,229,255,0.25)" strokeWidth="1" />
          <circle cx="340" cy="340" r="55" stroke="rgba(0,229,255,0.08)" strokeWidth="0.5" strokeDasharray="2 8">
            <animateTransform attributeName="transform" type="rotate" from="0 340 340" to="360 340 340" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="340" r="30" fill="rgba(0,229,255,0.1)" stroke="#00e5ff" strokeWidth="1.5">
            <animate attributeName="r" values="30;35;30" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="340" r="12" fill="#00e5ff" opacity="0.85">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="340" r="4" fill="#fff" />
        </svg>

        <div className="float-card fc1"><div className="fc-label">THREAT DETECTED</div><div className="fc-val"><span className="dot-red" />INTRUSION - ZONE B</div><div className="fc-sub">CAM-04 - CONFIDENCE 97.3%</div></div>
        <div className="float-card fc2"><div className="fc-label">SYSTEM STATUS</div><div className="fc-val"><span className="dot-grn" />ALL FEEDS ACTIVE</div><div className="fc-sub">256 CAMERAS - 12 ZONES</div></div>
        <div className="float-card fc3"><div className="fc-label">MODEL INFERENCE</div><div className="fc-val"><span className="dot-cyn" />42ms LATENCY</div><div className="fc-sub">YOLOv8 + CNN-LSTM ACTIVE</div></div>
        <div className="float-card fc4"><div className="fc-label">VIOLENCE ALERT</div><div className="fc-val"><span className="dot-red" />ALTERCATION - ZONE D</div><div className="fc-sub">CAM-11 - CONF 91.7% - 00:03:12</div></div>
        <div className="float-card fc5"><div className="fc-label">PERIMETER BREACH</div><div className="fc-val"><span className="dot-yel" />FENCE TAMPERING</div><div className="fc-sub">CAM-15 - ZONE-E - MED RISK</div></div>
        <div className="float-card fc6"><div className="fc-label">FACE SCAN</div><div className="fc-val"><span className="dot-grn" />WATCHLIST CLEAR</div><div className="fc-sub">ZONE-A - 14 SUBJECTS SCANNED</div></div>

        <div className="ticker-bar">
          <div className="ticker-label">LIVE ALERTS</div>
          <div style={{ overflow: "hidden", flex: 1, display: "flex" }}>
            <div className="ticker-track">
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Unauthorized intrusion detected - CAM-04 - Zone B</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Loitering behavior &gt;10min - CAM-09 - Zone A</div>
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Physical altercation identified - CAM-11 - Zone D</div>
              <div className="ticker-item"><span className="t-dot t-grn" /><span className="t-lvl low">LOW</span>Abandoned object flagged - CAM-02 - Zone A</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Perimeter fence tampering - CAM-15 - Zone E</div>
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Weapon-like object detected - CAM-07 - Zone C</div>
              <div className="ticker-item"><span className="t-dot t-grn" /><span className="t-lvl low">LOW</span>Crowd density threshold reached - CAM-03 - Zone F</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Suspicious concealment act - CAM-01 - Zone B</div>
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Unauthorized intrusion detected - CAM-04 - Zone B</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Loitering behavior &gt;10min - CAM-09 - Zone A</div>
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Physical altercation identified - CAM-11 - Zone D</div>
              <div className="ticker-item"><span className="t-dot t-grn" /><span className="t-lvl low">LOW</span>Abandoned object flagged - CAM-02 - Zone A</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Perimeter fence tampering - CAM-15 - Zone E</div>
              <div className="ticker-item"><span className="t-dot t-red" /><span className="t-lvl high">HIGH</span>Weapon-like object detected - CAM-07 - Zone C</div>
              <div className="ticker-item"><span className="t-dot t-grn" /><span className="t-lvl low">LOW</span>Crowd density threshold reached - CAM-03 - Zone F</div>
              <div className="ticker-item"><span className="t-dot t-yel" /><span className="t-lvl med">MED</span>Suspicious concealment act - CAM-01 - Zone B</div>
            </div>
          </div>
        </div>

        <div className="hero-inner">
          <div className="pre-tag">AI-POWERED SURVEILLANCE INTELLIGENCE</div>
          <h1>
            <span className="r1">RAKSHA</span>
            <span className="r2">NETRA</span>
          </h1>
          <p className="tagline">
            Real-Time Suspicious Activity Detection in Video Surveillance using Deep Learning.
            An AI-enabled smart system - omniscient, instantaneous, unblinking.
          </p>
          <div className="cta-row">
            <button className="cta-a" onClick={goToConnect}>DEPLOY SYSTEM</button>
            <button className="cta-b" type="button">WATCH DEMO</button>
          </div>
          <div className="stats" ref={statsRef}>
            <div className="stat"><div className="sv" ref={s1Ref}>0%</div><div className="sl">ACCURACY</div></div>
            <div className="stat"><div className="sv" ref={s2Ref}>0ms</div><div className="sl">LATENCY</div></div>
            <div className="stat"><div className="sv" ref={s3Ref}>0+</div><div className="sl">CAMERAS</div></div>
            <div className="stat"><div className="sv" ref={s4Ref}>0</div><div className="sl">INCIDENTS FLAGGED</div></div>
          </div>
        </div>

        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
      </section>
    </div>
  );
};

export default Splash;