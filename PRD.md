# Product Requirements Document
## GestureIQ — Real-Time Hand Gesture Recognition Web App

---

**Document Version:** 2.0  
**Date:** April 2026  
**Status:** Final  
**Author:** Product Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals and Success Metrics](#3-goals-and-success-metrics)
4. [Target Users](#4-target-users)
5. [Tech Stack](#5-tech-stack)
6. [UI Design System](#6-ui-design-system)
7. [Animation and Motion Design](#7-animation-and-motion-design)
8. [Features and Requirements](#8-features-and-requirements)
9. [User Flows](#9-user-flows)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Folder Structure](#11-folder-structure)
12. [Component Architecture](#12-component-architecture)
13. [API and Data Contracts](#13-api-and-data-contracts)
14. [Milestones and Timeline](#14-milestones-and-timeline)
15. [Out of Scope (v1)](#15-out-of-scope-v1)
16. [Open Questions](#16-open-questions)

---

## 1. Executive Summary

**GestureIQ** is a browser-based application that uses the device webcam to detect and classify hand gestures in real time. The app displays the recognized gesture name, confidence score, and an annotated skeleton overlay on the live video feed. All inference runs entirely client-side using MediaPipe Hands — no video data is ever sent to a server.

The UI is designed to be bold, bright, and modern — with fluid animations, neon-accent visual effects, and satisfying micro-interactions that make the experience feel alive and rewarding to use. The interface is built using designs generated with **Google Stitch MCP** and the entire project is developed inside **Google Antigravity** (Google's AI-native cloud IDE).

The primary goal of v1 is to deliver a fast, privacy-preserving, visually stunning gesture recognition experience that works on any modern browser without installation — and looks impressive enough to anchor a developer portfolio.

---

## 2. Problem Statement

Hand gesture recognition has traditionally required specialized hardware, native apps, or server-side processing that introduces latency and privacy concerns. Developers and educators need a lightweight, embeddable reference implementation that runs entirely in the browser, is easy to extend with custom gestures, and delivers real-time feedback.

Beyond the technical gap, existing open-source implementations are visually bland — they feel like demos, not products. GestureIQ closes that gap by pairing solid ML inference with a UI that people actually want to use.

---

## 3. Goals and Success Metrics

### Goals

- Detect and classify at least 10 common hand gestures with ≥ 92% accuracy
- Achieve recognition latency under 100ms on a mid-range laptop
- Deliver a bright, animated, visually modern UI that encourages continued use
- Work without any backend server for core recognition
- Support custom gesture registration by end users (Phase 2)
- Be accessible and functional on both desktop and mobile browsers

### Success Metrics

| Metric | Target |
|--------|--------|
| Gesture classification accuracy | ≥ 92% on built-in gestures |
| Inference latency (P90) | < 100ms |
| Time to first detection after camera grant | < 2 seconds |
| Supported browsers | Chrome 90+, Firefox 88+, Edge 90+, Safari 15+ |
| Lighthouse performance score | ≥ 85 |
| Mobile usability score | ≥ 90 (Google Lighthouse) |
| Average session duration (engagement) | ≥ 3 minutes |
| UI animation frame rate | Consistent 60 FPS |

---

## 4. Target Users

### Primary: Developers and Makers
Developers building interactive interfaces who want a reference implementation or embeddable gesture layer. GestureIQ doubles as a portfolio piece that demonstrates full-stack browser AI skills.

### Secondary: Educators and Students
Computer vision learners who want to see hand landmark detection and gesture classification in action without setting up a Python environment. The visual UI makes learning more engaging.

### Tertiary: Accessibility Researchers
Researchers exploring non-touch input modalities for users with motor impairments.

---

## 5. Tech Stack

### Build Environment

| Tool | Purpose |
|---|---|
| **Google Antigravity** | Primary cloud IDE and AI-native development environment for the entire project |
| GitHub | Version control and source of truth |
| GitHub Actions | CI/CD pipeline (test → build → deploy) |

### UI Design Tooling

| Tool | Purpose |
|---|---|
| **Google Stitch MCP** | AI-powered UI design generation via MCP server; used to produce component designs, layout wireframes, color schemes, and animation specs that are fed directly into the codebase |

### Frontend (Core — required)

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework and component model |
| TypeScript | 5.x | Type safety across the codebase |
| Vite | 5.x | Build tool and dev server |
| MediaPipe Hands | 0.4.x | Real-time 21-point hand landmark detection |
| @mediapipe/camera_utils | latest | Webcam feed management for MediaPipe |
| Canvas API (native) | — | Landmark skeleton overlay drawing |
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 11.x | Declarative animations and transitions |
| Zustand | 4.x | Lightweight global state management |
| React Router | 6.x | Client-side routing |
| clsx + tailwind-merge | latest | Conditional class name management |

### Optional Backend (Phase 2)

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| Fastify | latest | REST API server |
| Python / FastAPI | 3.11 / 0.110 | Custom ML model server (if needed) |
| scikit-learn or PyTorch | latest | Custom gesture model training |
| PostgreSQL | 15.x | Persistent storage for custom gesture labels |
| Redis | 7.x | Session caching |
| WebSocket (ws) | latest | Low-latency landmark streaming to backend |

### Testing

| Tool | Purpose |
|---|---|
| Vitest | Unit and integration tests |
| React Testing Library | Component tests |
| Playwright | End-to-end tests |
| MSW (Mock Service Worker) | API mocking |

### Dev Tooling

| Tool | Purpose |
|---|---|
| ESLint + Prettier | Code quality and formatting |
| Husky + lint-staged | Pre-commit hooks |
| Docker | Containerization for optional backend |

---

## 6. UI Design System

The GestureIQ interface is designed using **Google Stitch MCP** — an AI-powered design tool connected via MCP server that generates component designs, spacing systems, and visual specs consumed during development in Google Antigravity. All design tokens below are outputs of the Stitch design process.

### 6.1 Design Philosophy

**Bright. Modern. Alive.**

GestureIQ's UI should feel like a high-end AI product — not a developer demo. The visual language is inspired by futuristic dashboards and creative tools: high contrast, electric accent colors on a crisp white background, generous use of glassmorphism cards, and motion that feels purposeful and satisfying.

Key principles:
- Light mode is the primary theme (bright, energetic, bold)
- Accent colors are vivid and electric — not pastel
- Every interaction has a micro-animation response
- Empty states and loading states are designed, not forgotten
- Typography is large, confident, and easy to read at a glance

### 6.2 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#F8F9FF` | Page background (near-white with cool blue tint) |
| `--color-bg-surface` | `#FFFFFF` | Cards, panels |
| `--color-bg-glass` | `rgba(255,255,255,0.6)` | Glassmorphism card overlays |
| `--color-accent-primary` | `#4F46E5` | Indigo — primary CTAs, active states |
| `--color-accent-electric` | `#6EE7F7` | Cyan — landmark skeleton, live detection glow |
| `--color-accent-lime` | `#A3E635` | Lime — high-confidence indicator, success states |
| `--color-accent-amber` | `#FBBF24` | Amber — medium confidence |
| `--color-accent-coral` | `#F87171` | Coral — low confidence, errors |
| `--color-accent-violet` | `#8B5CF6` | Violet — secondary highlights |
| `--color-text-primary` | `#0F172A` | Headings, main labels |
| `--color-text-secondary` | `#475569` | Supporting text, timestamps |
| `--color-text-muted` | `#94A3B8` | Placeholder, disabled states |
| `--color-border` | `rgba(15,23,42,0.08)` | Card borders |
| `--color-shadow` | `rgba(79,70,229,0.12)` | Accent-tinted drop shadows |

### 6.3 Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Brand / Logo | `Space Grotesk` | 24px | 700 |
| Page title | `Space Grotesk` | 40px | 700 |
| Gesture name (hero) | `Space Grotesk` | 56px | 800 |
| Section heading | `Space Grotesk` | 22px | 600 |
| Body text | `Inter` | 16px | 400 |
| Label / badge | `Inter` | 13px | 500 |
| Code / data | `JetBrains Mono` | 14px | 400 |

Fonts loaded via Google Fonts. Space Grotesk gives the brand a modern, geometric identity; Inter provides clean readability for body content.

### 6.4 Component Design Language

**Cards** use a white background, `border-radius: 20px`, a 1px `--color-border` border, and a soft `--color-shadow` box shadow. When a gesture is actively detected, the active card glows with a `0 0 0 2px var(--color-accent-primary)` ring.

**Buttons** use solid indigo fill with white text, `border-radius: 12px`, and scale up 2% on hover with a spring transition. Secondary buttons use transparent background with indigo border.

**Badges** for confidence are pill-shaped with color-coded backgrounds: lime for high, amber for medium, coral for low. They animate in with a spring scale on value change.

**Skeleton overlay** on the camera feed uses `--color-accent-electric` (cyan) for connection lines at 60% opacity and bright white dots for landmark points — a clean neon-on-video effect.

**Glassmorphism panels** — the gesture result overlay floats above the video feed using `backdrop-filter: blur(16px)` and `rgba(255,255,255,0.65)` background.

### 6.5 Layout

- Max content width: `1280px`, centered
- Main recognition view: two-column on desktop (camera left, results right), single column on mobile
- Consistent spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`
- Navigation: fixed top bar, `64px` height, glassmorphism background

### 6.6 Google Stitch MCP Workflow

Google Stitch MCP is used as a connected MCP server inside Google Antigravity during the design phase:

1. Describe the component or screen to Stitch via natural language prompt
2. Stitch generates a detailed visual design spec (layout, spacing, colors, variants)
3. The spec is reviewed and approved
4. Implemented as React + Tailwind components in Antigravity
5. Framer Motion animations layered on per Section 7

Stitch-generated designs are stored in `design/stitch-exports/` as JSON specs and reference screenshots.

---

## 7. Animation and Motion Design

GestureIQ uses **Framer Motion** for all animations. Every animation communicates state or guides attention — never purely decorative.

### 7.1 Core Animation Principles

- **Springy and physical** — spring transitions (`stiffness: 300, damping: 25`) for most interactions
- **Fast in, slow out** — elements appear in 150–200ms, exit in 250–300ms
- **Staggered reveals** — lists and grids animate in with a 40ms stagger between children
- **Respect `prefers-reduced-motion`** — all animations disabled or reduced when the media query is active

### 7.2 Page and Route Transitions

Each route change fades out the current page (`opacity: 1→0`, `y: 0→-10px`, 200ms) and the incoming page fades and slides up (`opacity: 0→1`, `y: 20px→0`, 300ms spring).

### 7.3 Landing / Hero Section

- GestureIQ wordmark animates in letter-by-letter on first load with a 30ms stagger and spring scale from `0.8→1`
- Looping animated hand illustration (Lottie) cycles through gesture poses every 2 seconds
- "Start GestureIQ" CTA has a pulsing glow ring keyframe (2s loop) to draw the eye

### 7.4 Gesture Detection Live View

- **Gesture name change** — old name exits (`opacity: 0, scale: 0.85`) and new one enters (`opacity: 1, scale: 1`) via spring. Uses `key={gestureName}` to trigger remount.
- **Confidence bar** — width animates on every frame update (`transition: width 80ms linear`)
- **Confidence badge** — spring bounce (`scale: 1→1.25→1`, 300ms) when crossing a threshold
- **Hand detected** — results panel slides in from right (`x: 40px→0`, spring). Fades out on hand lost.
- **Skeleton overlay** — landmark dots pulse with a subtle breathing animation (`scale: 1→1.2→1`, 1.5s loop)
- **Landmark draw-on** — skeleton draws itself in on first detection by animating `stroke-dashoffset` from full to zero over 400ms

### 7.5 Gesture History Strip

- New gestures enter from the left edge and push existing items right
- Uses Framer Motion `AnimatePresence` with `layout` prop for smooth repositioning
- Items exit to the right when they fall off the end of the strip

### 7.6 Settings Panel

- Slides in from right (`x: 100%→0`, 350ms spring)
- Background overlay fades in (`opacity: 0→0.4`, 300ms)
- Toggle switches animate the thumb position with a spring

### 7.7 Demo / Gesture Cards

- Cards animate in with staggered fade-and-rise on page load (40ms stagger, `y: 20px→0`)
- Hover: subtle lift (`y: -4px`, deeper shadow, 200ms spring)
- Click: card expands into full-screen challenge via shared layout animation (`layoutId`)
- Challenge countdown: SVG circular progress ring animates `stroke-dashoffset` over 2 seconds
- Success: confetti burst (CSS `@keyframes` particles) + gesture name bounces in (`scale: 0→1.1→1`)

### 7.8 Loading States

- **Model loading** — full-page centered loader with GestureIQ logo and animated progress bar
- **Camera initializing** — shimmer placeholder with moving gradient sweep (`@keyframes` shimmer, 1.5s loop)
- **Pre-detection** — ghost skeleton overlay at 20% opacity with breathing animation signals something is coming

### 7.9 Navigation

- Active nav link underline slides horizontally between items using Framer Motion `layoutId="nav-indicator"`
- Top bar blurs its background only after user scrolls past 64px (Intersection Observer)

---

## 8. Features and Requirements

### 8.1 Webcam Access and Video Feed

**Priority: P0 (must have)**

- Request camera access via `getUserMedia` with graceful handling of denial
- Display live 640×480 (or best available) webcam feed
- Allow users to select from available cameras
- Show animated shimmer loading state while camera initializes
- Display a designed error state if camera access is denied
- Mirror video feed horizontally by default (selfie mode)

**Acceptance criteria:**
- Camera feed renders within 2 seconds of permission grant
- Camera selector appears only when multiple cameras are detected
- Denied permission shows a help card with re-enable instructions

---

### 8.2 Hand Landmark Detection

**Priority: P0 (must have)**

- Load and initialize MediaPipe Hands model on app startup with a progress indicator
- Detect up to 2 hands simultaneously
- Extract all 21 3D landmarks per hand on every frame
- Run landmark detection at a minimum of 24 FPS on supported hardware
- Draw animated cyan skeleton overlay on a canvas element layered over the video

**Acceptance criteria:**
- Overlay tracks hand movement with no visible stutter at 24+ FPS
- Detection works in varying indoor lighting conditions
- Overlay animates in on first detection and disappears cleanly on hand exit

---

### 8.3 Gesture Classification

**Priority: P0 (must have)**

Built-in gestures for v1:

| Gesture Name | Emoji | Description |
|---|---|---|
| Open Hand | 🖐️ | All five fingers extended |
| Fist | ✊ | All fingers curled |
| Thumbs Up | 👍 | Thumb extended, others curled |
| Thumbs Down | 👎 | Thumb pointing down, others curled |
| Peace / Victory | ✌️ | Index and middle fingers extended in a V |
| Point | 👆 | Index finger extended, others curled |
| OK Sign | 👌 | Thumb and index form a circle |
| Rock On | 🤘 | Index and pinky extended |
| Call Me | 🤙 | Thumb and pinky extended |
| Three Fingers | 🤟 | Index, middle, ring extended |

Classification approach: Rule-based geometry on normalized landmark coordinates. No external model download required for v1.

**Acceptance criteria:**
- Each gesture classifies correctly ≥ 92% of the time in controlled conditions
- Result updates on every frame with smooth animated transition
- Unknown poses display "Unknown" in a muted style, not as an error

---

### 8.4 Gesture Result Display

**Priority: P0 (must have)**

- Gesture name in hero font (Space Grotesk 56px bold) with spring animation on change
- Animated confidence progress bar and color-coded badge (lime / amber / coral)
- Left / Right hand indicator as an animated pill badge
- Gesture history strip (last 5 gestures) with Framer Motion list animations
- Relevant emoji shown alongside each gesture name

---

### 8.5 Landing / Hero Page

**Priority: P0 (must have)**

- Full-screen hero with GestureIQ brand name, tagline, and animated CTA button
- Looping Lottie hand gesture animation in the hero
- Feature highlights section (3 animated cards: Real-time, Private, Extensible)
- "How it works" section with 3 animated steps
- Footer with GitHub link and tech credits

---

### 8.6 Settings Panel

**Priority: P1 (should have)**

- Slide-in drawer from right edge with Framer Motion animation
- Toggle skeleton overlay on/off
- Toggle gesture label on/off
- Model complexity segmented control (Fast / Balanced / Accurate)
- Detection confidence animated slider
- Max hands toggle (1 or 2)
- All settings persisted to `localStorage`

---

### 8.7 Demo / Gesture Reference Page (`/demo`)

**Priority: P1 (should have)**

- Grid of 10 gesture cards with icon, name, description, staggered animation on load
- Click a card to launch live challenge mode with countdown ring
- Confetti and bounce animation on success

---

### 8.8 Custom Gesture Registration — Phase 2 (`/custom`)

**Priority: P2 (nice to have)**

- Record a new gesture by holding a pose for 3 seconds (countdown shown)
- Capture 30 frames of landmark data per sample
- Store up to 20 samples per label
- Train lightweight k-NN classifier in-browser with TensorFlow.js
- Export / import custom gesture profiles as JSON

---

## 9. User Flows

### 9.1 First-Time User Flow

```
Landing page (hero animation plays)
  → User clicks "Start GestureIQ"
  → Browser prompts for camera permission
    → [Granted] → Camera feed fades in → Model loads (progress bar)
               → Skeleton animates on → Detection begins
               → Results panel slides in on first detection
    → [Denied]  → Designed error screen with step-by-step instructions
```

### 9.2 Gesture Recognition Flow

```
Camera feed active → MediaPipe processes each frame
  → Landmarks detected → Classifier runs on landmark vector
  → Gesture name + confidence computed
  → UI: name springs in, confidence bar animates, badge updates
  → Hand leaves frame → Results panel fades out gracefully
```

### 9.3 Settings Flow

```
Click settings icon (top right) → Panel slides in from right
  → User adjusts controls (changes apply immediately)
  → Saved to localStorage automatically
  → Click outside or X → Panel slides out
```

### 9.4 Demo Challenge Flow

```
Navigate to /demo → Cards stagger-animate in
  → Click a gesture card → Card expands (shared layout animation)
  → Challenge starts → Countdown ring animates for 2 seconds
  → [Success] → Confetti burst + success bounce animation
  → [Timeout] → Gentle shake + "Try again" prompt
```

---

## 10. Non-Functional Requirements

### Performance
- First Contentful Paint: < 1.5s
- Time to interactive: < 3s on fast 3G
- MediaPipe model loads in < 4s on 10 Mbps (cached after first load via service worker)
- UI animation layer must not drop below 60 FPS — gesture inference runs in a separate `requestAnimationFrame` loop, not blocking React renders
- Bundle size (initial JS, gzipped, excluding MediaPipe WASM): < 250KB

### Privacy
- No video frames or landmark data transmitted to any server in v1
- No analytics or telemetry including biometric data
- Camera feed pauses automatically when browser tab loses focus

### Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation for all controls
- Screen reader labels on all interactive elements
- All animated elements respect `prefers-reduced-motion`
- Minimum 4.5:1 color contrast ratio on all text

### Browser and Device Support
- Desktop: Chrome 90+, Firefox 88+, Edge 90+, Safari 15+
- Mobile: Chrome for Android, Safari iOS 15+
- Minimum camera resolution: 480p
- WebGL required (for MediaPipe WASM acceleration)

### Security
- HTTPS required (camera API requires secure context)
- Content Security Policy headers configured
- Subresource Integrity (SRI) on all CDN assets

---

## 11. Folder Structure

```
gestureiq/
│
├── public/                            # Static assets served as-is
│   ├── favicon.ico
│   ├── robots.txt
│   ├── og-image.png                   # Social preview image for LinkedIn / GitHub
│   └── gesture-icons/                 # Reference SVG icons for each gesture
│       ├── open-hand.svg
│       ├── fist.svg
│       ├── thumbs-up.svg
│       └── ...
│
├── design/                            # Design assets and Stitch exports
│   ├── stitch-exports/                # Google Stitch MCP generated design specs
│   │   ├── homepage.json
│   │   ├── recognition-view.json
│   │   ├── demo-page.json
│   │   └── settings-panel.json
│   ├── tokens/
│   │   └── design-tokens.json         # Color, spacing, typography tokens from Stitch
│   └── references/                    # Screenshot references from Stitch
│       └── *.png
│
├── src/
│   ├── main.tsx                       # App entry point
│   ├── App.tsx                        # Root component, router, AnimatePresence
│   ├── vite-env.d.ts
│   │
│   ├── assets/
│   │   ├── logo.svg                   # GestureIQ wordmark
│   │   ├── hero-animation.json        # Lottie file for hero hand animation
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── Camera/
│   │   │   ├── CameraView.tsx         # <video> + <canvas> stacked container
│   │   │   ├── CameraSelector.tsx     # Animated dropdown for device selection
│   │   │   ├── CameraError.tsx        # Designed permission-denied error state
│   │   │   ├── CameraLoader.tsx       # Shimmer placeholder while initializing
│   │   │   └── index.ts
│   │   │
│   │   ├── GestureDisplay/
│   │   │   ├── GestureLabel.tsx       # Animated hero gesture name (56px spring)
│   │   │   ├── ConfidenceBar.tsx      # Animated progress bar + color badge
│   │   │   ├── HandIndicator.tsx      # Left / Right animated pill badge
│   │   │   ├── GestureHistory.tsx     # AnimatePresence list of last 5 gestures
│   │   │   ├── GesturePanel.tsx       # Glassmorphism container for all above
│   │   │   └── index.ts
│   │   │
│   │   ├── LandmarkOverlay/
│   │   │   ├── LandmarkCanvas.tsx     # Canvas for drawing skeleton overlay
│   │   │   ├── drawLandmarks.ts       # Pure fn: draw skeleton on 2D context
│   │   │   └── index.ts
│   │   │
│   │   ├── Settings/
│   │   │   ├── SettingsPanel.tsx      # Framer Motion slide-in drawer
│   │   │   ├── SettingsToggle.tsx     # Animated toggle switch
│   │   │   ├── SettingsSlider.tsx     # Animated range slider
│   │   │   ├── SegmentedControl.tsx   # Fast / Balanced / Accurate picker
│   │   │   └── index.ts
│   │   │
│   │   ├── Demo/
│   │   │   ├── GestureCard.tsx        # Animated gesture reference card
│   │   │   ├── GestureChallenge.tsx   # Expanded challenge (layoutId shared)
│   │   │   ├── CountdownRing.tsx      # SVG circular countdown animation
│   │   │   ├── SuccessConfetti.tsx    # CSS confetti burst on success
│   │   │   └── index.ts
│   │   │
│   │   ├── Navigation/
│   │   │   ├── Navbar.tsx             # Fixed top bar, glassmorphism, nav indicator
│   │   │   └── index.ts
│   │   │
│   │   ├── Landing/
│   │   │   ├── HeroSection.tsx        # Animated hero with Lottie + CTA
│   │   │   ├── FeatureCards.tsx       # 3-card staggered feature highlights
│   │   │   ├── HowItWorks.tsx         # 3-step animated explainer
│   │   │   └── index.ts
│   │   │
│   │   └── ui/                        # Generic design system primitives
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Slider.tsx
│   │       ├── Toggle.tsx
│   │       ├── Card.tsx
│   │       ├── GlassPanel.tsx         # Glassmorphism backdrop-filter panel
│   │       ├── Spinner.tsx
│   │       └── index.ts
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx            # / — Hero, features, how it works
│   │   ├── RecognitionPage.tsx        # /app — Main gesture recognition view
│   │   ├── DemoPage.tsx               # /demo — Gesture reference + challenges
│   │   ├── CustomPage.tsx             # /custom — Custom gesture registration (P2)
│   │   └── NotFoundPage.tsx           # 404
│   │
│   ├── hooks/
│   │   ├── useCamera.ts               # getUserMedia, device enumeration, stream
│   │   ├── useMediaPipe.ts            # MediaPipe Hands init and frame processing
│   │   ├── useGestureClassifier.ts    # Classifier hook, returns GestureResult
│   │   ├── useSettings.ts             # Read/write settings from Zustand + localStorage
│   │   ├── useAnimationFrame.ts       # rAF loop management
│   │   └── useReducedMotion.ts        # prefers-reduced-motion media query hook
│   │
│   ├── lib/
│   │   ├── mediapipe/
│   │   │   ├── initHands.ts
│   │   │   ├── processFrame.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── classifier/
│   │   │   ├── GestureClassifier.ts
│   │   │   ├── rules/
│   │   │   │   ├── openHand.ts
│   │   │   │   ├── fist.ts
│   │   │   │   ├── thumbsUp.ts
│   │   │   │   ├── thumbsDown.ts
│   │   │   │   ├── peace.ts
│   │   │   │   ├── point.ts
│   │   │   │   ├── okSign.ts
│   │   │   │   ├── rockOn.ts
│   │   │   │   ├── callMe.ts
│   │   │   │   └── threeFingers.ts
│   │   │   ├── fingerUtils.ts
│   │   │   └── types.ts
│   │   │
│   │   └── drawing/
│   │       ├── skeleton.ts
│   │       └── constants.ts
│   │
│   ├── store/
│   │   ├── cameraStore.ts
│   │   ├── gestureStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── constants/
│   │   ├── gestures.ts                # Names, emojis, icons, descriptions
│   │   ├── mediapipe.ts               # Default model config values
│   │   └── animations.ts              # Shared Framer Motion variants
│   │
│   ├── types/
│   │   ├── gesture.ts
│   │   ├── camera.ts
│   │   └── settings.ts
│   │
│   └── styles/
│       ├── index.css                  # Tailwind base + CSS custom properties
│       ├── animations.css             # Keyframes: shimmer, confetti, pulse, glow
│       └── fonts.css                  # Google Fonts imports
│
├── tests/
│   ├── unit/
│   │   ├── classifier/
│   │   │   ├── GestureClassifier.test.ts
│   │   │   └── fingerUtils.test.ts
│   │   └── hooks/
│   │       └── useSettings.test.ts
│   │
│   ├── integration/
│   │   ├── RecognitionPage.test.tsx
│   │   └── SettingsPanel.test.tsx
│   │
│   └── e2e/
│       ├── gesture-recognition.spec.ts
│       └── demo-page.spec.ts
│
├── backend/                           # Optional backend (Phase 2)
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── gestures.ts
│   │   │   └── health.ts
│   │   ├── services/
│   │   │   └── gestureService.ts
│   │   ├── models/
│   │   │   └── GestureProfile.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── rateLimit.ts
│   │   └── db/
│   │       ├── connection.ts
│   │       └── migrations/
│   │           └── 001_create_gesture_profiles.sql
│   ├── Dockerfile
│   └── package.json
│
├── ml/                                # Optional ML training scripts (Phase 2)
│   ├── data/
│   │   ├── raw/
│   │   └── processed/
│   ├── notebooks/
│   │   └── gesture_training.ipynb
│   ├── scripts/
│   │   ├── collect_data.py
│   │   ├── train_model.py
│   │   └── export_tfjs.py
│   ├── models/
│   │   └── gesture_model.json
│   └── requirements.txt
│
├── .github/
│   └── workflows/
│       ├── ci.yml                     # Test on every PR
│       └── deploy.yml                 # Deploy to Firebase Hosting on main merge
│
├── docker-compose.yml
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 12. Component Architecture

### Data flow overview

```
Webcam stream (getUserMedia)
    │
    ▼
useCamera hook  ──────────────────────────────────► CameraView
    │                                                 (<video> element)
    ▼
useMediaPipe hook
  (feeds frames to MediaPipe Hands WASM model)
    │
    ├─── Raw landmarks (21 points × 3D) ──────────► LandmarkCanvas
    │                                                 (animated cyan skeleton)
    ▼
useGestureClassifier hook
  (GestureClassifier.classify(landmarks))
    │
    ▼
gestureStore (Zustand)
    │
    ├──► GestureLabel        (spring-animated 56px hero name)
    ├──► ConfidenceBar        (animated progress + color badge)
    ├──► HandIndicator        (Left / Right pill)
    └──► GestureHistory       (AnimatePresence scrolling list)
         all wrapped in GesturePanel (glassmorphism overlay)
```

### Animation coordination

Framer Motion `AnimatePresence` wraps all conditionally-rendered components. Shared `motion` variants are defined in `src/constants/animations.ts` and imported across components for consistency. The `useReducedMotion` hook is checked at root level — all animation durations collapse to `0` when it returns `true`.

### Key component responsibilities

**`GesturePanel`** — the glassmorphism overlay housing all result components. Animates in when hands are detected, out when they leave. Uses `AnimatePresence` with `mode="wait"`.

**`GestureLabel`** — renders gesture name using `motion.div` with `key={gestureName}`. Name change triggers remount → exit/enter spring animation.

**`LandmarkCanvas`** — receives landmark coordinates as props, calls `drawLandmarks()` via `useEffect` on every frame. Stateless, does not trigger React re-renders independently.

**`GestureClassifier`** — plain TypeScript class, no React. Takes `NormalizedLandmarkList`, returns `{ gesture, confidence, hand }`. Each rule is independently testable.

**`CountdownRing`** — SVG circle with animated `stroke-dashoffset` driven by Framer Motion. Accepts `duration` prop and calls `onComplete` when animation finishes.

**`SuccessConfetti`** — pure CSS `@keyframes` burst triggered by toggling a class. Zero JS overhead during the animation.

---

## 13. API and Data Contracts

### Gesture Result (internal)

```typescript
interface GestureResult {
  gesture: string;                  // e.g. "Thumbs Up" | "Unknown"
  confidence: number;               // 0.0 – 1.0
  hand: 'Left' | 'Right';
  landmarks: NormalizedLandmark[];  // 21 points from MediaPipe
  timestamp: number;                // performance.now()
}
```

### Settings Shape

```typescript
interface AppSettings {
  showOverlay: boolean;             // default: true
  showGestureLabel: boolean;        // default: true
  modelComplexity: 0 | 1 | 2;      // default: 1
  minDetectionConfidence: number;   // default: 0.7
  minTrackingConfidence: number;    // default: 0.5
  maxNumHands: 1 | 2;              // default: 1
  cameraDeviceId: string | null;   // default: null
}
```

### Shared Framer Motion Variants (`src/constants/animations.ts`)

```typescript
export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,
             transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export const springScale = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1,
             transition: { type: 'spring', stiffness: 350, damping: 28 } },
  exit:    { opacity: 0, scale: 0.85, transition: { duration: 0.15 } },
};

export const slideInRight = {
  hidden:  { x: '100%' },
  visible: { x: 0,
             transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};
```

### Backend REST Endpoints (Phase 2)

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/gestures` | List all custom gesture profiles |
| POST | `/api/gestures` | Create a new gesture profile |
| PUT | `/api/gestures/:id` | Update a gesture profile |
| DELETE | `/api/gestures/:id` | Delete a gesture profile |
| POST | `/api/gestures/:id/samples` | Add a landmark sample to a gesture |

---

## 14. Milestones and Timeline

| Milestone | Description | Target |
|---|---|---|
| M0 — Setup | Repo in Google Antigravity, Vite + React + TS, Tailwind, Framer Motion | Week 1 |
| M1 — Design | Run Google Stitch MCP to generate all screen designs; export tokens to `design/` | Week 1–2 |
| M2 — Camera | Webcam feed, device selector, shimmer loader, permission error state | Week 2 |
| M3 — Landmarks | MediaPipe Hands integrated, animated cyan skeleton overlay | Week 2–3 |
| M4 — Classifier | 10 built-in gestures, rule engine, confidence score | Week 3–4 |
| M5 — UI Core | GesturePanel, GestureLabel spring animations, ConfidenceBar, history strip | Week 4–5 |
| M6 — Landing Page | Hero with Lottie, feature cards, how-it-works section, Navbar | Week 5 |
| M7 — Demo Page | Gesture cards, challenge mode, countdown ring, confetti success | Week 5–6 |
| M8 — Settings | Slide-in panel, all controls, localStorage persistence | Week 6 |
| M9 — QA + Perf | Lighthouse audit, accessibility pass, reduced-motion check, cross-browser testing | Week 6–7 |
| M10 — v1 Launch | Firebase Hosting deployment, README, og-image, LinkedIn post | Week 7–8 |
| M11 — Phase 2 | Custom gesture registration, optional backend, TF.js k-NN | Week 9–12 |

---

## 15. Out of Scope (v1)

- Two-hand multi-gesture combinations (e.g. both hands forming a heart)
- Sign language alphabet recognition (requires larger model and dataset)
- Gesture-triggered keyboard / hotkey actions
- Recording or saving gesture sessions as video
- Offline PWA mode
- Native mobile app (React Native port)
- User authentication and cloud accounts
- Dark mode (light mode only in v1; dark mode is a v2 enhancement)

---

## 16. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | Which Lottie animation for the hero hand loop — build custom or license from LottieFiles? | Design | Open |
| 2 | Should the skeleton use a single cyan color or color-code each finger (thumb = violet, index = lime, etc.)? | Design | Open |
| 3 | Do we need gesture smoothing (temporal averaging over 3 frames) to reduce label flicker? | Engineering | Open |
| 4 | Should the MediaPipe model lazy-load only after the user clicks "Start" to improve initial page speed? | Engineering | Open |
| 5 | Should the demo challenge mode include a streak / score counter for gamification? | Product | Open |
| 6 | Phase 2: localStorage-only custom gestures, or require Firebase Auth for cloud sync? | Product | Open |
| 7 | What license should exported gesture profiles use? | Legal | Open |
| 8 | Should the OG image and landing page copy be reviewed before the LinkedIn post? | Marketing | Open |

---

*End of document — GestureIQ PRD v2.0*
