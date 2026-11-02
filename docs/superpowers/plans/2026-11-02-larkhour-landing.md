# Larkhour Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir y desplegar la landing de demostración de Larkhour (lámpara despertador de amanecer) que cubre los 11 requisitos de la oferta freelance.

**Architecture:** Next.js App Router renderiza todo el contenido en servidor desde Sanity (SSG + `revalidateTag` por webhook). Cada sección interactiva es una isla de cliente mínima. `Lamp` (SVG) y el fondo comparten variables CSS `--light` y `--warmth`, controladas por GSAP ScrollTrigger en el hero y por el configurador en la sección 3.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Sanity v3 (`next-sanity`), GSAP + ScrollTrigger + `@gsap/react`, Vitest (lógica pura), Playwright + `@axe-core/playwright` (e2e y accesibilidad), Vercel.

**Spec:** `docs/superpowers/specs/2026-11-02-larkhour-landing-design.md`

## Global Constraints

- Contenido del sitio en inglés. Aviso visible: "Fictional brand, portfolio demo".
- Paleta: night `#14233F`, ember `#C93A1C`, amber `#F5A524`, sky `#DCEEF5`, moon `#FFF3D6`.
- Fuentes: Anybody (variable, `wght`/`wdth`) solo titulares; Atkinson Hyperlegible Next texto/UI; `next/font`, preload solo de display.
- Escala: 14/16/18/22,5/28/35/44 px (ratio 1,25, base 18); display `clamp(3.5rem, 14vw, 13rem)`; interlineado 1,55 texto y 0,95 display; máx. 65 caracteres por línea.
- Espaciado: 4, 8, 12, 16, 24, 32, 48, 72, 112, 176 px. Márgenes laterales 20/32/48/72 px en 375/768/1024/1440.
- Movimiento: respuesta 120 ms `power1.out`; estado 240 ms `power2.inOut`; hero 900 ms `expo.out`; luz `sine.inOut`. Solo `transform`, `opacity` y variables CSS.
- `prefers-reduced-motion`: sin pin ni scrub, hero en estado fijo, fundido corto.
- Sin Lenis. Sin fade-up por sección. Sin eyebrows en mayúsculas. Sin numeración 01/02/03.
- Responsive verificado en 375, 768, 1024 y 1440 px. Teclado completo. Lighthouse ≥ 90 en las 4 categorías (móvil, producción).
- Precio $149; depósito reembolsable $20; 60 noches de prueba; 3 años de garantía. Sin afirmaciones de salud ni métricas de conversión inventadas.
- Formulario no persiste datos ni cobra. Página indexable. JSON-LD sin `Offer`.

## Review Focus

- Medianoche: despertar 00:10 con amanecer de 30 min inicia a 23:40 del día anterior, sin mostrar horas negativas. Test en Task 2.
- Reduced motion: con `prefers-reduced-motion: reduce` el hero no queda pinado ni oculto, y el titular es legible. Test en Task 4.
- Sin JavaScript: todo el texto y los CTA existen en el HTML servido, y no hay contenido oculto hasta que corre GSAP. Test en Task 4.
- Webhook inválido: `/api/revalidate` con firma incorrecta o ausente responde 401 y no revalida. Test en Task 1.
- Contenido de CMS largo o vacío: un titular de 120 caracteres no desborda en 375 px, y una sección sin campos opcionales no rompe la página. Test en Task 3.

---

### Task 1: Scaffold, tokens, Sanity y revalidación

**Files:**
- Create: proyecto Next.js en la raíz (`package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`), `.gitignore`, `.env.example`
- Create: `styles/tokens.css`, `app/layout.tsx`, `app/(site)/page.tsx`, `lib/contrast.ts`, `lib/contrast.test.ts`
- Create: `sanity.config.ts`, `sanity/schemas/` (`siteSettings`, `product`, `page`, objetos de sección), `app/studio/[[...tool]]/page.tsx`
- Create: `lib/sanity/client.ts`, `lib/sanity/queries.ts`, `lib/sanity/types.ts`
- Create: `app/api/revalidate/route.ts`, `app/api/revalidate/route.test.ts`
- Create: `docs/brand-guide.md`, `docs/mockup-basic.png`

**Interfaces:**
- Produces: `contrastRatio(a: string, b: string): number` en `lib/contrast.ts`.
- Produces: `getPage(slug: string): Promise<PageDoc | null>`, `getSiteSettings(): Promise<SiteSettings>`, `getProduct(): Promise<Product>` en `lib/sanity/queries.ts`, todos con `next: { tags: [...] }`.
- Produces: `PageDoc.sections: Section[]` donde `Section` es unión discriminada por `_type` (`heroSection`, `compareSection`, `configuratorSection`, `anatomySection`, `promisesSection`, `reserveSection`, `faqSection`, `closingSection`).
- Produces: `POST /api/revalidate` valida la firma con `parseBody` de `next-sanity/webhook`, llama `revalidateTag` y responde 200; con firma inválida responde 401.

- [ ] **Step 1: `git init` y `create-next-app`** (TypeScript, Tailwind, App Router, sin `src/`). Commit inicial.
- [ ] **Step 2: Instalar Vitest y escribir `lib/contrast.test.ts`** con aserciones sobre la paleta: `contrastRatio('#FFF3D6', '#14233F') >= 7`, `contrastRatio('#14233F', '#F5A524') >= 7`, `contrastRatio('#FFF3D6', '#C93A1C') >= 4.5`, `contrastRatio('#14233F', '#DCEEF5') >= 7`.
- [ ] **Step 3: Ejecutar `npx vitest run lib/contrast.test.ts`**. Esperado: FAIL, `contrastRatio` no existe.
- [ ] **Step 4: Implementar `contrastRatio`** con la fórmula WCAG de luminancia relativa.
- [ ] **Step 5: Ejecutar la prueba**. Esperado: PASS. Si `moon` sobre `ember` queda por debajo de 4,5, ajustar `ember` en `tokens.css` y en la spec hasta pasar, y registrar el cambio en `docs/brand-guide.md`.
- [ ] **Step 6: Escribir `docs/brand-guide.md`** (paleta, tipografías, escala, movimiento) y generar `docs/mockup-basic.png` (versión plantilla: foto de stock, tres tarjetas iguales, testimonios, precio, FAQ) para el caso de estudio.
- [ ] **Step 7: Definir `styles/tokens.css` y el tema de Tailwind** con los valores de Global Constraints. Cargar Anybody y Atkinson con `next/font/google` en `app/layout.tsx`, subconjunto latino.
- [ ] **Step 8: Crear los esquemas de Sanity** según la spec (`siteSettings`, `product`, `page` con `sections[]`, 8 objetos de sección) y montar `/studio`. Sembrar contenido en inglés para todas las secciones.
- [ ] **Step 9: Escribir `app/api/revalidate/route.test.ts`**: petición sin firma → 401; con firma válida → 200 y `revalidateTag` llamado con el tag del documento.
- [ ] **Step 10: Ejecutar la prueba**. Esperado: FAIL. Implementar la ruta. Ejecutar de nuevo. Esperado: PASS.
- [ ] **Step 11: Desplegar en Vercel** con las variables de `.env.example` y configurar el webhook de Sanity. Esperado: publicar un cambio en Studio actualiza producción sin redeploy.
- [ ] **Step 12: Commit** `feat: scaffold, tokens, sanity schemas, revalidation`.

---

### Task 2: Lógica pura (mañana, luz, validación)

**Files:**
- Create: `lib/morning.ts`, `lib/morning.test.ts`
- Create: `lib/light.ts`, `lib/light.test.ts`
- Create: `lib/reserve-schema.ts`, `lib/reserve-schema.test.ts`
- Create: `app/actions/reserve.ts`, `app/actions/reserve.test.ts`

**Interfaces:**
- Produces: `type Duration = 10 | 20 | 30 | 45`.
- Produces: `computeMorning(wakeTime: string, durationMin: Duration): { lightStart: string; fullBrightness: string }`. Formato `H:MM` 24 h, sin cero inicial en la hora; resuelve medianoche.
- Produces: `formatMorning(m: { lightStart: string; fullBrightness: string }): string` → `"Light starts at 6:00. Full brightness at 6:30."`
- Produces: `lightAt(progress: number): { light: number; warmth: number }` con `progress` acotado a `[0, 1]`; `light` y `warmth` en `[0, 1]`.
- Produces: `validateReservation(input: ReservationInput): { ok: true } | { ok: false; errors: Partial<Record<'email'|'finish'|'wakeTime'|'durationMin'|'sound', string>> }`.
- Produces: `reserve(prev: ReserveState, formData: FormData): Promise<ReserveState>` con `ReserveState = { status: 'idle'|'error'|'success'; errors?: Record<string,string>; message?: string }`.

- [ ] **Step 1: Escribir `lib/morning.test.ts`**: `computeMorning('06:30', 30)` → `{ lightStart: '6:00', fullBrightness: '6:30' }`; `computeMorning('00:10', 30)` → `{ lightStart: '23:40', fullBrightness: '0:10' }`; `formatMorning(...)` devuelve exactamente `"Light starts at 6:00. Full brightness at 6:30."`.
- [ ] **Step 2: Ejecutar `npx vitest run lib/morning.test.ts`**. Esperado: FAIL.
- [ ] **Step 3: Implementar `computeMorning` y `formatMorning`** con aritmética en minutos módulo 1440.
- [ ] **Step 4: Ejecutar la prueba**. Esperado: PASS.
- [ ] **Step 5: Escribir `lib/light.test.ts`**: `lightAt(-1)` y `lightAt(0)` iguales; `lightAt(2)` igual a `lightAt(1)`; `lightAt(0.5).light` está entre `lightAt(0).light` y `lightAt(1).light` (monótona).
- [ ] **Step 6: Ejecutar, implementar `lightAt`** con interpolación `sine.inOut` y volver a ejecutar. Esperado: FAIL y luego PASS.
- [ ] **Step 7: Escribir `lib/reserve-schema.test.ts`**: correo sin `@` → error en `email`; acabado fuera de las opciones → error en `finish`; `durationMin: 25` → error; campo `company` (honeypot) con texto → `ok: false`; entrada completa válida → `{ ok: true }`.
- [ ] **Step 8: Ejecutar, implementar `validateReservation`** con Zod y volver a ejecutar. Esperado: FAIL y luego PASS.
- [ ] **Step 9: Escribir `app/actions/reserve.test.ts`**: entrada inválida → `status: 'error'` con `errors`; entrada válida → `status: 'success'` y `message` que contiene "demo"; ningún acceso a almacenamiento externo (comprobar que no se llama a `fetch`).
- [ ] **Step 10: Ejecutar, implementar `reserve`** con `'use server'` y volver a ejecutar. Esperado: FAIL y luego PASS.
- [ ] **Step 11: Commit** `feat: morning, light and reservation logic`.

---

### Task 3: Secciones estáticas responsive y renderizador

**Files:**
- Create: `components/SectionRenderer.tsx`
- Create: `components/ui/Button.tsx`, `components/ui/Field.tsx`, `components/ui/Switch.tsx`, `components/ui/RadioGroup.tsx`
- Create: `components/sections/{Hero,Compare,Configurator,Anatomy,Promises,Reserve,Faq,Closing}.tsx` (versión estática)
- Create: `components/lamp/Lamp.tsx`
- Create: `components/Header.tsx`, `components/SkipLink.tsx`, `components/StickyCta.tsx`
- Create: `e2e/layout.spec.ts`, `playwright.config.ts`
- Modify: `app/(site)/page.tsx`

**Interfaces:**
- Consumes: `getPage`, `getSiteSettings`, `getProduct` (Task 1).
- Produces: `SectionRenderer({ sections }: { sections: Section[] }): JSX.Element`, que ignora con un `console.warn` los `_type` desconocidos.
- Produces: `Lamp({ finish }: { finish: 'a' | 'b' }): JSX.Element`, SVG en línea cuyo brillo lee `--light` y `--warmth`.
- Produces: `Faq` con `details/summary` nativos; `RadioGroup` con `role="radiogroup"` y flechas de teclado nativas.

- [ ] **Step 1: Escribir `e2e/layout.spec.ts`** para cada ancho (375, 768, 1024, 1440): sin scroll horizontal (`scrollWidth <= clientWidth`) y el `h1` visible. Añadir un caso con un titular de 120 caracteres sembrado en Sanity: sin desbordamiento a 375. Añadir un caso con la sección `anatomy` sin puntos opcionales: la página renderiza sin error.
- [ ] **Step 2: Ejecutar `npx playwright test e2e/layout.spec.ts`**. Esperado: FAIL.
- [ ] **Step 3: Implementar los componentes `ui/`** con foco visible (`:focus-visible` con contraste en cada fondo) y estados hover de 120 ms.
- [ ] **Step 4: Implementar las 8 secciones estáticas** con el contenido de Sanity. Sección 4: lista etiquetada en 375/768 y diagrama lateral desde 1024. Sección 5 sin interacción, composición asimétrica. Sin tarjetas iguales.
- [ ] **Step 5: Implementar `Lamp`, `Header`, `SkipLink` y `StickyCta`** (CTA fijo en móvil tras el hero, oculto en `lg`).
- [ ] **Step 6: Ejecutar la prueba**. Esperado: PASS en los 4 anchos.
- [ ] **Step 7: Commit** `feat: static responsive sections`.

---

### Task 4: Hero con amanecer y cierre

**Files:**
- Create: `lib/motion/tokens.ts`, `lib/motion/gsap.ts`, `lib/motion/useLightStage.ts`
- Modify: `components/sections/Hero.tsx`, `components/sections/Closing.tsx`
- Create: `e2e/hero.spec.ts`

**Interfaces:**
- Produces: `DURATION = { response: 0.12, state: 0.24, hero: 0.9 }` y `EASE = { response: 'power1.out', state: 'power2.inOut', hero: 'expo.out', light: 'sine.inOut' }`.
- Produces: `loadGsap(): Promise<{ gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }>`, import dinámico que registra el plugin una sola vez.
- Produces: `useLightStage(ref: RefObject<HTMLElement>, opts: { pin: boolean }): void`, que escribe `--light` y `--warmth` (de `lightAt`) en el elemento y usa `gsap.matchMedia` con `(prefers-reduced-motion: no-preference)`.

- [ ] **Step 1: Escribir `e2e/hero.spec.ts`**: (a) con JavaScript desactivado, el HTML contiene el titular "Wake up to light, not an alarm." y el CTA "Reserve yours"; (b) con `reducedMotion: 'reduce'`, la sección no está pinada (posición no `fixed`), el `h1` es visible y `--light` tiene un valor final fijo; (c) en movimiento normal, tras desplazar 75 % del recorrido, `--light` es mayor que en el scroll 0.
- [ ] **Step 2: Ejecutar `npx playwright test e2e/hero.spec.ts`**. Esperado: FAIL en (b) y (c).
- [ ] **Step 3: Implementar `tokens.ts`, `gsap.ts` y `useLightStage`**. El hook anima solo variables CSS; el pin dura 150vh; el titular anima `font-variation-settings` en una caja de altura fija.
- [ ] **Step 4: Conectar el hero**. Una única animación de carga de 900 ms con `expo.out`. El HTML inicial ya muestra el contenido, nunca `opacity: 0` hasta que corra GSAP.
- [ ] **Step 5: Conectar el cierre** para que `--light` vuelva a night al final de la página (mismo hook, `pin: false`).
- [ ] **Step 6: Ejecutar la prueba**. Esperado: PASS.
- [ ] **Step 7: Probar en un teléfono real.** Si el pin falla tras 1 h, usar la variante móvil sin pin con la luz ligada al scroll normal (`pin: false` bajo 768 px).
- [ ] **Step 8: Commit** `feat: dawn hero and closing`.

---

### Task 5: Configurador y reserva

**Files:**
- Modify: `components/sections/Configurator.tsx`, `components/sections/Reserve.tsx`
- Create: `components/MorningProvider.tsx`
- Create: `e2e/configurator.spec.ts`, `e2e/reserve.spec.ts`

**Interfaces:**
- Consumes: `computeMorning`, `formatMorning`, `lightAt` (Task 2); `reserve` y `validateReservation` (Task 2); `Lamp` (Task 3).
- Produces: `MorningProvider` y `useMorning(): { wakeTime: string; durationMin: Duration; sound: string; finish: 'a'|'b'; set(patch: Partial<MorningState>): void }`, con valores por defecto desde Sanity (`configuratorSection`).

- [ ] **Step 1: Escribir `e2e/configurator.spec.ts`**: con teclado, cambiar la hora a 06:30 y la duración a 30 → región `aria-live` contiene exactamente "Light starts at 6:00. Full brightness at 6:30."; con 00:10 y 30 → "Light starts at 23:40. Full brightness at 0:10."; mover el `range` cambia `--light` de la lámpara.
- [ ] **Step 2: Escribir `e2e/reserve.spec.ts`**: enviar con correo `foo` → mensaje de error asociado por `aria-describedby` y foco en el primer campo con error; enviar con datos válidos → estado de carga y luego éxito con la palabra "demo"; resumen del formulario refleja la configuración elegida; cambiar el acabado cambia la lámpara.
- [ ] **Step 3: Ejecutar `npx playwright test e2e/configurator.spec.ts e2e/reserve.spec.ts`**. Esperado: FAIL.
- [ ] **Step 4: Implementar `MorningProvider` y el configurador** con `input range` y radios nativos; la lámpara previsualiza con transición de 240 ms `power2.inOut`.
- [ ] **Step 5: Implementar la reserva** con `useActionState(reserve, ...)`, validación en línea, honeypot oculto con `tabindex="-1"` y `aria-hidden`.
- [ ] **Step 6: Ejecutar las pruebas**. Esperado: PASS.
- [ ] **Step 7: Commit** `feat: configurator and reservation flow`.

---

### Task 6: Comparación, anatomía y FAQ interactivas

**Files:**
- Modify: `components/sections/Compare.tsx`, `components/sections/Anatomy.tsx`, `components/sections/Faq.tsx`
- Create: `e2e/interactions.spec.ts`

**Interfaces:**
- Consumes: `Switch` y `DURATION`/`EASE` (Tasks 3 y 4).

- [ ] **Step 1: Escribir `e2e/interactions.spec.ts`**: pulsar el `Switch` con teclado cambia `aria-checked` y el atributo `d` del trazo de la curva; en anatomía, `Tab` recorre los puntos en orden y el texto asociado es visible; en FAQ, `Enter` abre un `details`, el contenido es visible y con reduced motion el cambio no usa transición.
- [ ] **Step 2: Ejecutar la prueba**. Esperado: FAIL.
- [ ] **Step 3: Implementar la curva SVG** con dos trazos (alarma: salto; Larkhour: rampa de 30 min) que cambian con 240 ms `power2.inOut`.
- [ ] **Step 4: Implementar los puntos de anatomía** como botones con una línea conectora; en `< 1024 px` se muestran como lista.
- [ ] **Step 5: Animar la altura de `details`** con GSAP en 240 ms; respetar reduced motion.
- [ ] **Step 6: Ejecutar la prueba**. Esperado: PASS.
- [ ] **Step 7: Commit** `feat: compare, anatomy and faq interactions`.

---

### Task 7: SEO, Open Graph y accesibilidad

**Files:**
- Create: `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `components/JsonLd.tsx`
- Modify: `app/layout.tsx` (metadatos desde `siteSettings`)
- Create: `e2e/a11y.spec.ts`, `e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `getSiteSettings`, `getProduct` (Task 1).

- [ ] **Step 1: Escribir `e2e/a11y.spec.ts`**: `@axe-core/playwright` no reporta violaciones `serious` ni `critical` en 375 y 1440; el skip link recibe el primer `Tab` y lleva a `main`; el recorrido completo con teclado llega a CTA, configurador, reserva y FAQ sin trampas de foco.
- [ ] **Step 2: Escribir `e2e/seo.spec.ts`**: existen `title`, `meta[name=description]`, `link[rel=canonical]`, `og:image` (responde 200 con tipo `image/png` y 1200×630); el JSON-LD contiene `Organization` y `Product` y no contiene `Offer`; no hay `noindex`.
- [ ] **Step 3: Ejecutar ambas pruebas**. Esperado: FAIL.
- [ ] **Step 4: Implementar** metadatos, OG con `next/og` (lámpara encendida y titular), sitemap, robots y JSON-LD.
- [ ] **Step 5: Corregir las violaciones de axe** que aparezcan (contraste, nombres accesibles, foco).
- [ ] **Step 6: Ejecutar las pruebas**. Esperado: PASS.
- [ ] **Step 7: Commit** `feat: seo, og image and accessibility fixes`.

---

### Task 8: Rendimiento, README y entrega

**Files:**
- Create: `README.md`, `app/(site)/case-study/page.tsx` (opcional, recortable), `docs/before-after/`, `docs/lighthouse/` (informes reales)
- Modify: lo necesario para alcanzar los objetivos de Lighthouse

- [ ] **Step 1: Ejecutar Lighthouse móvil sobre la URL de producción** (`npx lighthouse <url> --form-factor=mobile --output=json --output-path=docs/lighthouse/mobile.json`). Esperado: ≥ 90 en Performance, Accessibility, Best Practices y SEO. Si no, aplicar en orden: mover ScrollTrigger a import dinámico tras la primera pintura, reducir fuentes variables, simplificar el eje `wdth` en móvil, y repetir.
- [ ] **Step 2: Comprobar CLS < 0,1 y LCP como texto** en el informe. Repetir ajustes si hace falta.
- [ ] **Step 3: Verificar a mano** 375, 768, 1024 y 1440 px, reduced motion activado y recorrido solo con teclado.
- [ ] **Step 4: Escribir `README.md`** con las 6 partes de la spec: resumen con enlaces y métricas reales, brief, mockup básico, tabla de mejoras, lo descartado, notas técnicas y cómo crear otra landing. Incluir capturas antes/después en `docs/before-after/`.
- [ ] **Step 5: Grabar el vídeo de 60 s** de edición y publicación en Sanity Studio y enlazarlo desde el README.
- [ ] **Step 6: Ejecutar la suite completa** (`npx vitest run && npx playwright test`). Esperado: todo PASS.
- [ ] **Step 7: Commit** `docs: readme and case study`.

---

## Autorrevisión

- **Cobertura de la spec:** secciones 1–8 → Tasks 3, 4, 5, 6; Sanity y revalidación → Task 1; SEO/OG/a11y → Task 7; rendimiento, README y vídeo → Task 8; caso de estudio y mockup base → Tasks 1 y 8.
- **Consistencia de tipos:** `computeMorning`, `formatMorning`, `lightAt`, `validateReservation`, `reserve`, `useMorning`, `useLightStage`, `Lamp` y `Section` se usan con las mismas firmas en todas las tareas.
- **Recortes** (en este orden, de la spec): ruta `/case-study`, selector de acabados, citas, anatomía interactiva, interruptor de comparación, estiramiento del titular.
- **Riesgo principal:** pin del hero en móvil (Task 4, Step 7).
