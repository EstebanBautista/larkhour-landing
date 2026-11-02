# Larkhour brand guide

Larkhour is a fictional brand created for this portfolio demo. This guide is the input the build follows, the way a client's guide would be. Tokens live in `styles/tokens.css`.

## Voice

Calm, close and a little witty. Plain verbs and sentence case. No health claims.

## Colour

The page's state is the colour of the light, moving from night to a clear morning sky.

| Token | Hex | Use | Contrast (tested in `lib/contrast.test.ts`) |
|---|---|---|---|
| night | `#14233F` | Starting background, text on light backgrounds | Night on sky at least 7:1 |
| ember | `#C93A1C` | First light | Moon on ember at least 4.5:1 |
| amber | `#F5A524` | Mid light, primary CTA | Night on amber at least 7:1 |
| sky | `#DCEEF5` | Daylight background | Night on sky at least 7:1 |
| moon | `#FFF3D6` | Text on night and ember | Moon on night at least 7:1 |

Text colour switches at fixed points. It never fades through an unreadable mix.

## Type

- Anybody (variable `wght` and `wdth`): headlines only. The hero headline stretches as the page wakes up.
- Atkinson Hyperlegible Next: all body and interface text.
- Scale, ratio 1.25 from an 18 px base: 14, 16, 18, 22.5, 28, 35, 44 px. Display: `clamp(3.5rem, 14vw, 13rem)`.
- Line height: 1.55 for text, 0.95 for display. Maximum 65 characters per line.

## Space

Base 4: 4, 8, 12, 16, 24, 32, 48, 72, 112, 176 px. Side margins: 20, 32, 48, 72 px at 375, 768, 1024, 1440 px.

## Motion

| Kind | Duration | Easing |
|---|---|---|
| Response to hover, focus, press | 120 ms | `power1.out` |
| State change | 240 ms | `power2.inOut` |
| Hero entrance, the only autoplay | 900 ms | `expo.out` |
| Light | Tied to scroll or a control | `sine.inOut` |

Animate the light, responses to an action and one load moment. Do not animate section entrances, text being read, or anything on a loop. With `prefers-reduced-motion`: no pin or scrub, fixed hero, short fades.
