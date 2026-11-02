import type { PageDoc, Product, Section, SiteSettings } from "../../lib/sanity/types";

const block = (key: string, text: string) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

export const seedSite: SiteSettings = {
  siteName: "Larkhour",
  seoTitle: "Larkhour: wake up to light, not an alarm",
  seoDescription:
    "A screenless bedside lamp that brightens slowly before you need to be up. Reserve the first batch with a refundable $20 deposit.",
  disclaimer: "Fictional brand, portfolio demo",
  repoUrl: "https://github.com/EstebanBautista/larkhour-landing",
  videoUrl: "https://youtu.be/zJhk7mnq--8",
};

export const seedProduct: Product = {
  name: "Larkhour",
  price: 149,
  deposit: 20,
  shipDate: "Ships March 2027",
  finishes: [
    { key: "a", name: "Chalk", color: "#E9E2D0" },
    { key: "b", name: "Slate", color: "#4A5568" },
  ],
};

const sections: Section[] = [
  {
    _type: "heroSection",
    _key: "hero",
    headline: "Wake up to light, not an alarm.",
    subhead: "Larkhour is a bedside lamp that brightens slowly before you need to be up, so your phone can sleep in another room.",
    ctaLabel: "Reserve yours",
  },
  {
    _type: "compareSection",
    _key: "compare",
    heading: "Two ways to wake up",
    body: "Same 30 minutes before you get up. Switch between them to see what happens in the room.",
    alarmLabel: "Phone alarm",
    larkhourLabel: "Larkhour",
    alarmCaption: "Dark and silent, then everything at once.",
    larkhourCaption: "Light rises for 30 minutes. A soft sound comes in only at the end.",
  },
  {
    _type: "configuratorSection",
    _key: "configurator",
    heading: "Set your morning",
    body: "Pick when you want to be up and how long the sunrise lasts. The lamp shows you what that looks like.",
    defaultWakeTime: "06:30",
    defaultDuration: 30,
    sounds: ["Birdsong", "Soft bell", "No sound"],
  },
  {
    _type: "anatomySection",
    _key: "anatomy",
    heading: "Three buttons. No app.",
    body: "Everything you need is on the lamp, and you can find it in the dark.",
    points: [
      { _key: "p1", title: "Glass diffuser", body: "Spreads the light evenly across the room, with no visible LEDs.", x: 50, y: 30 },
      { _key: "p2", title: "Set", body: "Hold and turn to choose your wake time. The ring shows the hour.", x: 35, y: 75 },
      { _key: "p3", title: "Snooze", body: "Dims the light for ten minutes, then starts rising again.", x: 50, y: 75 },
      { _key: "p4", title: "Off", body: "One press and the morning is yours.", x: 65, y: 75 },
      { _key: "p5", title: "Speaker", body: "Small and quiet, tuned for the sound at the end of your sunrise.", x: 50, y: 84 },
    ],
  },
  {
    _type: "promisesSection",
    _key: "promises",
    heading: "Try it for 60 mornings.",
    promises: [
      { _key: "a", title: "60-night trial", body: "Send it back within 60 nights for a full refund. We pay for shipping." },
      { _key: "b", title: "3-year warranty", body: "If it stops working, we repair or replace it." },
      { _key: "c", title: "Built to be repaired", body: "The LED board and power supply unscrew and can be replaced." },
    ],
    quotes: [
      { _key: "q1", text: "I stopped taking my phone to bed the first week. I didn't expect that.", attribution: "Fictional tester, night-shift nurse" },
      { _key: "q2", text: "My partner gets up an hour later and sleeps through it. That alone sold me.", attribution: "Fictional tester, early riser" },
    ],
  },
  {
    _type: "reserveSection",
    _key: "reserve",
    heading: "Reserve your Larkhour",
    body: "A refundable deposit holds your place in the first batch. You pay the rest when it ships.",
    ctaLabel: "Reserve yours",
    demoNote: "This is a portfolio demo. No payment is taken and your email is not stored.",
    successMessage: "Reserved. This is a demo, so no payment was taken and your email was not stored.",
  },
  {
    _type: "faqSection",
    _key: "faq",
    heading: "Questions",
    items: [
      { _key: "f1", question: "Does it need an app or Wi-Fi?", answer: [block("f1a", "No. Everything is set with the buttons on the lamp, and it keeps time on its own.")] },
      { _key: "f2", question: "What if the power goes out?", answer: [block("f2a", "A backup battery keeps your settings and wakes you with sound for up to 24 hours.")] },
      { _key: "f3", question: "Will it wake the person next to me?", answer: [block("f3a", "It might. Most of the light goes up and out, so try it during the 60-night trial.")] },
      { _key: "f4", question: "Is the deposit refundable?", answer: [block("f4a", "Yes, in full, at any time before your lamp ships.")] },
      { _key: "f5", question: "Can I use it as a reading lamp?", answer: [block("f5a", "Yes. Press Set once for warm reading light, and press it again to turn it off.")] },
      { _key: "f6", question: "Where do you ship?", answer: [block("f6a", "The first batch ships to the US, Canada and the EU.")] },
    ],
  },
  {
    _type: "closingSection",
    _key: "closing",
    headline: "Sleep on it. Literally.",
    body: "Your deposit is refundable until the day your lamp ships.",
    ctaLabel: "Reserve yours",
  },
];

export const seedPage: PageDoc = { title: "Home", slug: "home", sections };

/** Served only with CONTENT_SOURCE=local. They pin behaviour for extreme CMS content. */
export const fixturePages: PageDoc[] = [
  {
    title: "Long",
    slug: "fixture-long",
    sections: [
      {
        _type: "heroSection",
        _key: "h",
        ctaLabel: "Reserve yours",
        headline: "Wake up to light instead of an alarm every single morning of the year, with a lamp that needs no app or screen at all.",
      },
    ],
  },
  {
    title: "Sparse",
    slug: "fixture-sparse",
    sections: [
      { _type: "heroSection", _key: "h", headline: "Sparse", ctaLabel: "Reserve yours" },
      { _type: "anatomySection", _key: "a", heading: "No points" },
      { _type: "promisesSection", _key: "p", heading: "No promises" },
      { _type: "faqSection", _key: "f", heading: "No questions" },
      { _type: "closingSection", _key: "c", headline: "Bye", ctaLabel: "Reserve yours" },
    ],
  },
  {
    title: "Custom copy",
    slug: "fixture-custom",
    seoTitle: "Custom SEO title",
    sections: [
      {
        _type: "reserveSection",
        _key: "r",
        heading: "Reserve",
        body: "Body",
        ctaLabel: "Reserve yours",
        demoNote: "Demo note",
        successMessage: "Custom success copy from the CMS.",
      },
    ],
  },
];
