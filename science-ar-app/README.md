# ScienceAR Lab 🔬

An interactive AR web application for learning Physics, Chemistry, and Biology through immersive 2D and 3D visualizations.

## Features

### 🌟 Three Subject Modules

- **Physics Lab** - Interactive simulations including:
  - Pendulum motion and harmonic oscillation
  - Wave mechanics visualization
  - Magnetic field demonstrations
  - Electric circuit simulations

- **Chemistry Lab** - Molecular visualizations featuring:
  - Water molecule (H₂O) structure
  - Chemical reaction animations
  - Crystal lattice structures
  - Interactive periodic table

- **Biology Lab** - Life science explorations with:
  - DNA double helix structure
  - Cell organelle visualization
  - Human heart anatomy
  - Photosynthesis process

### ✨ Key Technologies

- **Next.js 15** - React framework with App Router
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - Useful helpers for 3D scenes
- **TailwindCSS** - Modern styling
- **TypeScript** - Type-safe development

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
science-ar-app/
├── app/
│   ├── page.tsx              # Home page with subject cards
│   ├── physics/
│   │   ├── page.tsx          # Physics module
│   │   └── demos/            # Physics demonstrations
│   ├── chemistry/
│   │   ├── page.tsx          # Chemistry module
│   │   └── demos/            # Chemistry demonstrations
│   └── biology/
│       ├── page.tsx          # Biology module
│       └── demos/            # Biology demonstrations
├── components/
│   ├── Scene3D.tsx           # 3D canvas wrapper
│   ├── ModuleLayout.tsx      # Shared module layout
│   └── InteractiveCard.tsx   # Interactive UI cards
└── public/                   # Static assets
```

## URL-Based Routing

The app uses Next.js App Router for modular navigation:

- `/` - Home page
- `/physics` - Physics experiments
- `/chemistry` - Chemistry visualizations
- `/biology` - Biology explorations

## Controls

- **Rotate**: Left-click and drag
- **Pan**: Right-click and drag
- **Zoom**: Scroll wheel

## Future Enhancements

- WebXR support for true AR experiences
- More interactive experiments
- Quiz and assessment features
- Save/share functionality
- Multi-language support

## License

MIT
