# GestureIQ 🖐️

**Real-time hand gesture recognition in your browser.**

Powered by MediaPipe Hands, built with React 18 + TypeScript + Vite + Framer Motion. All inference runs client-side — zero data ever leaves your device.

![GestureIQ Screenshot](public/og-image.png)

## ✨ Features

- **10 Built-in Gestures** — Open Hand, Fist, Thumbs Up/Down, Peace, Point, OK Sign, Rock On, Call Me, Three Fingers
- **Real-time Detection** — Sub-100ms latency at 24+ FPS
- **Animated UI** — Spring animations, glassmorphism, staggered reveals via Framer Motion
- **100% Private** — All processing in-browser, no backend required
- **Configurable** — Model complexity, confidence thresholds, overlay toggle
- **Demo Mode** — Practice gestures with timed challenges and confetti

## 🚀 Quickstart

```bash
# Clone
git clone https://github.com/GairikBaidya/GestureIQ.git
cd GestureIQ

# Install
npm install

# Dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and allow camera access.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| ML | MediaPipe Hands (WASM) |
| Animations | Framer Motion 11 |
| Styling | Tailwind CSS 3 |
| State | Zustand 4 |
| Routing | React Router 6 |
| Testing | Vitest + Playwright |
| Design | Google Stitch MCP |
| IDE | Google Antigravity |

## 📁 Project Structure

```
src/
├── components/     # Camera, GestureDisplay, Demo, Settings, Landing, Navigation, ui
├── hooks/          # useCamera, useMediaPipe, useGestureClassifier, useSettings
├── lib/            # classifier (10 rules), mediapipe init, drawing utils
├── store/          # Zustand stores (camera, gesture, settings)
├── pages/          # LandingPage, RecognitionPage, DemoPage, NotFoundPage
├── constants/      # animations, gestures, mediapipe config
├── types/          # gesture, camera, settings interfaces
└── styles/         # Tailwind base, animations, fonts
```

## 🧪 Testing

```bash
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright e2e tests
npm run typecheck   # TypeScript check
npm run lint        # ESLint
```

## 📄 Routes

| Path | Description |
|------|-------------|
| `/` | Landing page with hero animation |
| `/app` | Main gesture recognition view |
| `/demo` | Gesture library with practice challenges |

## 🛠️ Built With

- [Google Antigravity](https://antigravity.dev) — AI-native cloud IDE
- [Google Stitch MCP](https://stitch.dev) — AI-powered UI design
- [MediaPipe Hands](https://mediapipe.dev) — Hand landmark detection
- [Framer Motion](https://framer.com/motion) — Declarative animations
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Zustand](https://zustand-demo.pmnd.rs/) — Lightweight state management

## 📝 License

MIT
