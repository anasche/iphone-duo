 "use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Aperture, Shield, Sparkles, Cpu, BatteryCharging, Monitor, Zap, CircleDot, Smartphone, Gauge } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PhoneScene = dynamic(() => import("./PhoneScene"), { ssr: false, loading: () => <div className="phone-canvas" /> });

const sections = [
  { id: "overview", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "camera", label: "Camera" },
  { id: "display", label: "Display" },
  { id: "performance", label: "Performance" },
  { id: "battery", label: "Battery" },
  { id: "specifications", label: "Specs" }
];

function Features({ items }: { items: { icon: React.ReactNode; title: string; sub?: string }[] }) {
  return <div className="feature-list">{items.map((item) => <div className="feature-item" key={item.title}><span className="feature-icon">{item.icon}</span><span>{item.title}{item.sub && <><br/><span style={{ color: "#85858f" }}>{item.sub}</span></>}</span></div>)}</div>;
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" }
        });
      });
      sections.forEach((section, i) => {
        const element = document.getElementById(section.id);
        if (!element) return;
        ScrollTrigger.create({
          trigger: element, start: "top 50%", end: "bottom 50%",
          onEnter: () => setActive(i), onEnterBack: () => setActive(i)
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main ref={root}>
      <div className="page-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="iPhone Duo home"><span className="brand-mark">●</span><span>iPhone Duo</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          {sections.map((s) => <a href={`#${s.id}`} key={s.id}>{s.label}</a>)}
        </nav>
        <a className="pill-button" href="#specifications">Get Yours</a>
      </header>

      <nav className="side-dots" aria-label="Section navigation">
        <span>{String(active + 1).padStart(2, "0")}</span>
        {sections.map((s, i) => <button key={s.id} aria-label={`Go to ${s.label}`} title={s.label} className={active === i ? "active" : ""} onClick={() => scrollTo(s.id)} />)}
      </nav>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="eyebrow reveal">Two iPhones. One experience.</div>
          <h1 className="reveal">iPhone<br/>Duo</h1>
          <div className="hero-sub reveal">More power. More possibilities. Together.</div>
          <div className="hero-actions reveal">
            <a className="pill-button" href="#design">Explore</a>
            <a className="pill-button filled" href="#specifications">Discover Duo</a>
          </div>
        </div>
        <div className="hero-stage"><PhoneScene /></div>
        <a className="scroll-cue" href="#design"><span className="scroll-icon" />Scroll to explore <ArrowDown size={12} /></a>
      </section>

      <section className="section" id="design">
        <div className="section-copy reveal">
          <div className="section-index">01 — Design</div>
          <h2>Refined.<br/>Stronger.<br/>More beautiful.</h2>
          <p>Crafted around aerospace-grade titanium and sculpted glass. Every curve is considered, every edge catches the light. Two distinct perspectives, one unmistakable design language.</p>
          <Features items={[
            { icon: <Shield size={13}/>, title: "Titanium frame" },
            { icon: <Sparkles size={13}/>, title: "Ceramic glass" },
            { icon: <CircleDot size={13}/>, title: "Balanced design" }
          ]}/>
        </div>
        <div className="section-art reveal">
          <div className="art-glow"/>
          <div className="art-phone"/>
          <div className="art-phone front"/>
          <span className="art-label">Precision in every detail</span>
        </div>
      </section>

      <section className="section reverse" id="camera">
        <div className="section-copy reveal">
          <div className="section-index">02 — Camera</div>
          <h2>Capture more<br/>than just photos.</h2>
          <p>A concept dual-camera system designed for vivid detail, richer color and beautifully balanced low-light moments. From the little things to the once-in-a-lifetime, keep more of what matters.</p>
          <Features items={[
            { icon: <Aperture size={13}/>, title: "48 MP", sub: "Main camera" },
            { icon: <Gauge size={13}/>, title: "5×", sub: "Optical zoom" },
            { icon: <Sparkles size={13}/>, title: "Night mode", sub: "Next gen" }
          ]}/>
        </div>
        <div className="section-art reveal">
          <div className="art-glow"/>
          <div className="camera-art"><div className="lens one"/><div className="lens two"/><div className="lens three"/></div>
        </div>
      </section>

      <section className="section" id="display">
        <div className="section-copy reveal">
          <div className="section-index">03 — Display</div>
          <h2>A canvas<br/>that comes to life.</h2>
          <p>Deep blacks, luminous highlights and fluid motion make every frame feel immersive. A display experience imagined for creators, dreamers and everything in between.</p>
          <Features items={[
            { icon: <Monitor size={13}/>, title: "Super Retina XDR", sub: "OLED display" },
            { icon: <Gauge size={13}/>, title: "120 Hz", sub: "ProMotion" },
            { icon: <Sparkles size={13}/>, title: "Always-On", sub: "Display" }
          ]}/>
        </div>
        <div className="section-art reveal">
          <div className="art-glow"/>
          <div className="display-art"><div className="display-slab"/></div>
        </div>
      </section>

      <section className="section reverse" id="performance">
        <div className="section-copy reveal">
          <div className="section-index">04 — Performance</div>
          <h2>Built for<br/>what’s next.</h2>
          <p>Power that feels effortless. A next-generation chip concept brings speed, smarter on-device experiences and efficiency to demanding creative work, gaming and everything you do every day.</p>
          <Features items={[
            { icon: <Cpu size={13}/>, title: "Duo silicon", sub: "Next gen" },
            { icon: <Sparkles size={13}/>, title: "Neural engine", sub: "AI ready" },
            { icon: <Smartphone size={13}/>, title: "Up to 2 TB", sub: "Concept storage" }
          ]}/>
        </div>
        <div className="section-art reveal">
          <div className="art-glow"/>
          <div className="chip-art"><div className="chip-core">DUO<br/>SILICON</div></div>
        </div>
      </section>

      <section className="section" id="battery">
        <div className="section-copy reveal">
          <div className="section-index">05 — Battery</div>
          <h2>More power<br/>for your day.</h2>
          <p>Designed to keep pace from early starts to late-night ideas. Intelligent power management and fast charging help you spend less time plugged in and more time doing what you love.</p>
          <Features items={[
            { icon: <BatteryCharging size={13}/>, title: "All-day", sub: "Battery life" },
            { icon: <Zap size={13}/>, title: "Fast charging", sub: "Wired + wireless" },
            { icon: <CircleDot size={13}/>, title: "MagSafe", sub: "Wireless charging" }
          ]}/>
        </div>
        <div className="section-art reveal">
          <div className="art-glow"/>
          <div className="battery-art"><div className="battery-ring">ϟ</div></div>
        </div>
      </section>

      <section className="final-cta" id="specifications">
        <div className="eyebrow reveal">The next chapter</div>
        <h2 className="reveal">iPhone Duo.<br/><span style={{ color: "#aaaab2" }}>Yours to discover.</span></h2>
        <p className="reveal">Two perspectives. One extraordinary concept.</p>
        <div className="hero-actions reveal">
          <a className="pill-button filled" href="#overview">Back to top</a>
          <a className="pill-button" href="mailto:hello@example.com?subject=iPhone%20Duo%20concept">Get in touch</a>
        </div>
        <p className="reveal" style={{ fontSize: 10, marginTop: 34, maxWidth: 480 }}>iPhone Duo is a fictional product concept created for a design experience. Specifications and features shown are illustrative, not official Apple product claims.</p>
      </section>

      <footer className="footer">
        <a className="brand" href="#overview"><span className="brand-mark">●</span><span>iPhone Duo</span></a>
        <span>Designed as a concept. Made for what’s next.</span>
        <div className="footer-links"><a href="#specifications">Concept details</a><a href="mailto:hello@example.com">Contact</a></div>
      </footer>
    </main>
  );
}