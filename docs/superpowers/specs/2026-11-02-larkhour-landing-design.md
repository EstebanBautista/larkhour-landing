# Larkhour: diseño de la landing de demostración

Fecha: 2026-11-02. Estado: aprobado por el usuario en el chat.

## Intención

Demo de portafolio para aplicar a una oferta freelance de desarrollador-diseñador de landing pages con contrato de retención (2–3 landings al mes, a partir de diseños y guías de marca, responsive, CMS headless + JavaScript, movimiento, acabado impecable, ideas de diseño, interacciones significativas). Cada sección, animación e interacción debe justificarse por un requisito de la oferta o por conversión. Nada de efectos de relleno.

## Metas, no metas, antimetas

- Metas: demostrar los 11 requisitos de la oferta; Lighthouse ≥ 90 en las 4 categorías; responsive en 375/768/1024/1440; `prefers-reduced-motion`; navegación completa con teclado; contenido editable en Sanity.
- No metas: backend real, cobro, almacenamiento de correos, segunda landing (opcional si sobra tiempo), contenido en otro idioma que no sea inglés.
- Antimetas: look de plantilla (gradiente morado, tarjetas idénticas, eyebrows en mayúsculas, numeración 01/02/03 sin secuencia real, fade-up por sección); métricas de conversión inventadas; afirmaciones de salud.

## Restricciones

- Marca ficticia (Larkhour), contenido del sitio en inglés, aviso "Fictional brand, portfolio demo".
- Stack: Next.js App Router + TypeScript + Tailwind, Sanity, GSAP + ScrollTrigger (+ `@gsap/react`, `gsap.matchMedia`), Vercel. Sin Lenis.
- Tiempo: 12–16 h (plan de 15 h).

## Producto

Larkhour: lámpara despertador de amanecer, sin pantalla ni app. Público: adultos 25–45 que quieren sacar el móvil del dormitorio. Tono: calmado, cercano, algo ingenioso. Precio $149, depósito reembolsable $20, 60 noches de prueba, 3 años de garantía.

## Identidad visual

Paleta: night `#14233F`, ember `#C93A1C`, amber `#F5A524`, sky `#DCEEF5`, moon `#FFF3D6`. Medir contraste de cada par en el hito 1 (moon sobre ember ≈ 4,6:1, justo).
Tipografías: Anybody (variable, `wght`/`wdth`) solo titulares; Atkinson Hyperlegible Next para texto/UI.
Escala ratio 1,25 base 18 px: 14/16/18/22,5/28/35/44; display `clamp(3.5rem, 14vw, 13rem)`. Interlineado 1,55 texto, 0,95 display. Máx. 65 caracteres por línea.
Espaciado base 4: 4, 8, 12, 16, 24, 32, 48, 72, 112, 176. Márgenes laterales 20/32/48/72 px (375/768/1024/1440).
Movimiento: respuesta 120 ms `power1.out`; cambio de estado 240 ms `power2.inOut`; entrada del hero 900 ms `expo.out` (única autoplay); luz ligada a scroll/control con `sine.inOut`. Se anima solo luz, respuesta a acciones y un momento de carga. Con reduced motion: sin pin ni scrub, hero en estado fijo, fundido corto.

## Secciones

1. Hero "The long dawn": pin 150vh, fondo night→sky, lámpara se enciende, titular se estira. Demuestra movimiento/estilo/acabado.
2. Comparación "Two ways to wake up": interruptor que redibuja curva SVG alarma vs. rampa de 30 min. Demuestra JS y aporte de diseño.
3. Configurador "Set your morning" (pieza firma): hora, duración (10/20/30/45), sonido; `input range` y radios nativos; lámpara previsualiza; `aria-live`; pasa la configuración a la reserva.
4. Anatomía "Three buttons. No app.": puntos sobre la lámpara; lista etiquetada en 375, diagrama lateral desde 1024. Demuestra responsive real.
5. Garantías y voces: sin interacción a propósito; citas marcadas como ficticias.
6. Reserva: acabado (2 opciones), resumen de configuración, validación en línea, estados de carga/error/éxito. Server Action con honeypot; no guarda datos; éxito indica que es demo.
7. FAQ: 6 preguntas desde CMS, `details/summary` con altura animada.
8. Cierre y footer: "Sleep on it. Literally.", la página vuelve a night, aviso de demo, enlaces a caso de estudio y repositorio.
Global: skip link, cabecera adaptativa, CTA fijo en móvil tras el hero.

## Cobertura de requisitos

Diseños existentes y guías de marca: `docs/brand-guide.md` + mockup base, tokens trazados a la guía. Landings mensuales: secciones reutilizables desde Sanity. Responsive: sección 4 y QA en 4 anchos. CMS: todo el contenido en Sanity + vídeo de 60 s. JS: secciones 2, 3, 6. Movimiento: hero y cierre. Estilo: paleta de luz y titular variable. Acabado: foco, error, estados de reserva. Ideas de diseño: caso de estudio, secciones 2 y 3. Interacciones: secciones 2, 3, 4.

## Sanity

Documentos: `siteSettings`, `product`, `page` (con `sections[]` ordenable). Objetos: hero, compare, configurator, anatomy, promises, reserve, faq, closing. No editable: paleta, tipografías, curvas, duraciones. Webhook firmado a `/api/revalidate` con `revalidateTag`. Studio en `/studio`.

## Estructura

```text
app/ (site)/page.tsx, [slug]/page.tsx, case-study/page.tsx, layout.tsx
     studio/[[...tool]]/page.tsx, api/revalidate/route.ts, actions/reserve.ts
     opengraph-image.tsx, sitemap.ts, robots.ts
components/ sections/, lamp/Lamp.tsx, ui/, SectionRenderer.tsx
lib/ sanity/, motion/ (tokens.ts, useLightStage.ts, gsap.ts), morning.ts
sanity/schemas/  styles/tokens.css  docs/  README.md
```

Servidor por defecto; islas de cliente mínimas. `Lamp` y fondo comparten variables CSS `--light`, `--warmth`.

## Rendimiento, accesibilidad, SEO

SSG + revalidación. GSAP y ScrollTrigger dinámicos tras primera pintura. LCP = titular de texto. Solo `transform`, `opacity`, variables CSS; eje `wdth` limitado al titular en caja de altura fija (en móvil, solo `transform` si hay jank). `next/font` autoalojado, preload solo de display. Lámpara SVG en línea; `next/image` AVIF/WebP. Controles nativos, `:focus-visible`, `aria-live`, `aria-describedby`, página legible sin JS; QA con axe, teclado, lector de pantalla; Lighthouse móvil en producción. Metadatos desde Sanity, canonical, sitemap, robots, OG 1200×630 con `next/og`, JSON-LD Organization y Product sin Offer. Indexable, con aviso de marca ficticia.

## README / caso de estudio

Resumen con enlaces y métricas reales de Lighthouse; brief; mockup básico (foto de stock, tres tarjetas iguales, testimonios, precio, FAQ); tabla de mejoras (foto estática → página que amanece; tarjetas → curva alarma vs. amanecer; lista de funciones → configurador; formulario aislado → reserva con configuración; apilado móvil → anatomía recompuesta); lo descartado; notas técnicas y cómo crear otra landing. Sin mejoras de conversión inventadas.

## Hitos (15 h)

1. Guía de marca, mockup base, tokens, deploy inicial, contraste: 1,5 h
2. Esquemas Sanity, Studio, contenido, SectionRenderer, revalidación: 2 h
3. Secciones estáticas responsive: 3 h
4. Lámpara SVG y hero con scroll: 2,5 h
5. Configurador y reserva: 2 h
6. Comparación, anatomía, cierre, CTA móvil: 1 h
7. QA Lighthouse/axe/teclado/navegadores: 1,5 h
8. OG, README, caso de estudio, vídeo: 1,5 h

Recortes en orden: segunda landing (fuera del plan), ruta `/case-study`, selector de acabados, citas, anatomía interactiva → estática, interruptor de comparación → estático, estiramiento del titular. Mínimo 12,75 h. No se recorta: hero con amanecer, configurador, Sanity, formulario, QA.

Mayor riesgo: hero con pin en móvil. Probar en teléfono real en el hito 4; si falla tras 1 h, versión sin pin en móvil.

## Decisiones del asistente (marcadas como suyas)

Nombre Larkhour sin comprobación legal de marca; sin Lenis; formulario sin persistencia; página indexable; ruta `/case-study` opcional.
