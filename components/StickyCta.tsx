"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

/** Mobile-only reserve bar. It appears once the hero has scrolled out of view. */
export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const reserve = document.getElementById("reserve");
    if (!hero) return;
    let heroGone = false;
    let atReserve = false;
    const update = () => setVisible(heroGone && !atReserve);
    const heroObserver = new IntersectionObserver(([e]) => {
      heroGone = !e.isIntersecting;
      update();
    });
    const reserveObserver = new IntersectionObserver(([e]) => {
      atReserve = e.isIntersecting;
      update();
    });
    heroObserver.observe(hero);
    if (reserve) reserveObserver.observe(reserve);
    return () => {
      heroObserver.disconnect();
      reserveObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 bg-night/95 p-3 transition-opacity duration-[120ms] lg:hidden ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!visible}
    >
      <Button href="#reserve" className="w-full" tabIndex={visible ? 0 : -1}>
        {label}
      </Button>
    </div>
  );
}
