type GsapModule = { gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger };

let loading: Promise<GsapModule> | undefined;

/** Loads GSAP and ScrollTrigger after first paint and registers the plugin once. */
export function loadGsap(): Promise<GsapModule> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return loading;
}
