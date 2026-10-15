export interface MonnetCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  type: string;
  stack: string[];
  liveDemoUrl?: string;
  narrative: {
    problemContext: string;
    chaosQuote: string;
    chaosAnalysis: string;
    architectureOverview: string;
    pipelineNodes: {
      id: string;
      label: string;
      role: string;
      tech: string;
      latency: string;
      details: string;
    }[];
    whatIKilled: {
      aiSlopIteration: {
        title: string;
        description: string;
        symptoms: string[];
        failureProof: string;
      };
      shippedCraft: {
        title: string;
        description: string;
        improvements: string[];
        craftPrinciple: string;
      };
    };
    surfaces: {
      id: string;
      label: string;
      description: string;
      componentType: "scale" | "topology" | "tokens" | "canvas";
    }[];
    takeaways: string[];
  };
}

export const MONNET_CASE_STUDIES: MonnetCaseStudy[] = [
  {
    slug: "faware-os",
    title: "FawareOS",
    tagline: "Agentic AI operating system to auto-pilot culinary workflows.",
    year: "2026–Present",
    type: "Staff Designer & AI Engineer",
    stack: ["Next.js App Router", "Agentic Pipelines", "Web Bluetooth API", "Web Workers", "Tailwind CSS"],
    narrative: {
      problemContext:
        "Every hospitality SaaS claims to solve inventory, yet line cooks routinely ignore them. In commercial kitchens, grease coats every surface, the ambient noise hits 110dB during dinner service, and chefs have about 3 seconds to log trimmings before their pans catch fire. Traditional enterprise software built with 5-step dropdown modal wizards simply dies here.",
      chaosQuote:
        "I’ve got 14 orders on the pass and hot clarified butter boiling over. If your tablet makes me choose between 'Spanish Onion (Rough)' and 'Spanish Onion (Fine)' from a dropdown, that tablet is getting tossed in the compactor.",
      chaosAnalysis:
        "We spent two weeks on the line at commercial prep commissaries in Sydney. We watched prep cooks take off vinyl gloves just to fight a capacitive touchscreen, mistype weights, and eventually give up. That failure cost restaurant groups over $220,000 in unlogged protein and produce spoilage every year.",
      architectureOverview:
        "Instead of asking cooks to type, we turned the tablet into a quiet companion appliance. We tethered industrial digital scales via Bluetooth Low Energy (BLE) running on dedicated Web Workers. When a cook drops a prep container onto the scale, the weight locks automatically in 120ms. The tablet contextually detects the station and suggests the 3 most likely trimmings with massive 84px hit targets.",
      pipelineNodes: [
        {
          id: "ble-scale",
          label: "BLE Hardware Scale",
          role: "Hardware Tare & Ingress",
          tech: "Web Bluetooth API (100Hz)",
          latency: "12ms",
          details: "Continuous byte stream parsing weight offsets and stable tare signals without blocking the main UI thread.",
        },
        {
          id: "worker-filter",
          label: "Tare Worker Thread",
          role: "Kalman Filter & Stability Lock",
          tech: "Off-screen Web Worker",
          latency: "4ms",
          details: "Applies a low-pass Kalman filter to ignore ambient kitchen vibrations (footsteps, blender hum) and lock weight within 0.1g.",
        },
        {
          id: "station-heuristics",
          label: "Station Context Engine",
          role: "Predictive SKU Filtering",
          tech: "Local Heuristics Cache",
          latency: "1ms",
          details: "Filters 1,400 raw ingredients down to the 4 items relevant to Station 02 (Cold Prep) at 11:30 AM.",
        },
        {
          id: "thermal-dispatch",
          label: "ESC/POS Thermal Dispatch",
          role: "Immediate Batch Label Print",
          tech: "Raw Socket Stream",
          latency: "80ms",
          details: "Fires thermal batch barcode label to kitchen station printer and syncs record to offline IndexedDB.",
        },
      ],
      whatIKilled: {
        aiSlopIteration: {
          title: "Iteration 1: The 'AI Camera Multi-Modal' Illusion",
          description:
            "Earlier in the project, leadership wanted an AI vision camera that would 'automatically classify vegetables on the cutting board using vision models'. It sounded futuristic in a slide deck, but in reality it was catastrophic AI slop.",
          symptoms: [
            "Overheated iPads under hot kitchen pass lamps within 25 minutes",
            "Mistook diced turnip for diced potato 41% of the time, corrupting recipe cost models",
            "Introduced 2.4-second inference latency, completely destroying kitchen tempo",
            "Cooks taped over the camera lens on Day 2 because it felt like surveillance",
          ],
          failureProof: "100% rejection rate during lunch service. Cooks demanded a physical scale with real buttons.",
        },
        shippedCraft: {
          title: "Shipped Version: Tactile Physical Scale + Deterministic Touch",
          description:
            "We threw away the camera entirely. We built a rock-solid, zero-inference physical integration: Bluetooth tare scale + giant 84px station preset pads + immediate thermal ticket printing. No LLM hallucinations, zero latency.",
          improvements: [
            "Average batch logging time dropped from 45.2s down to 3.8s (-91%)",
            "98.4% continuous shift compliance across all 12 pilot restaurant clusters",
            "Cooks can log batches with greasy vinyl gloves or the back of their wrist",
            "Zero cloud roundtrips required for critical operational path",
          ],
          craftPrinciple: "The best interface in high-stress physical environments is often the one that does the least.",
        },
      },
      surfaces: [
        {
          id: "scale-surface",
          label: "Live Scale Appliance",
          description: "Real-time tablet interface with live tare lock, unit toggle, and instant batch logger.",
          componentType: "scale",
        },
        {
          id: "station-surface",
          label: "Station Heuristics",
          description: "Contextual preset matrix filtering SKUs by kitchen section.",
          componentType: "tokens",
        },
      ],
      takeaways: [
        "In physical production environments, 100ms of latency feels like a broken machine.",
        "Killing an 'AI feature' in favor of a mechanical zero-latency heuristic is often the highest-leverage design decision you can make.",
        "Designers who don't spend time standing in the physical environment where their software runs will inevitably design useless software.",
      ],
    },
  },
  {
    slug: "relay-mesh",
    title: "Relay Mesh",
    tagline: "Orthographic microservice telemetry and semantic causal graphs for high-scale distributed systems.",
    year: "2024–2025",
    type: "Principal Design Engineer",
    stack: ["React 19", "WebGL Canvas", "R-Tree Spatial Index", "Protocol Buffers", "Tailwind CSS"],
    narrative: {
      problemContext:
        "When an outage storm hits a fintech with 400 microservices, the incident channel explodes. 50 engineers open 12 tabs each: Datadog for APM charts, Jaeger for flame graphs, Grafana for latency curves, and Kubernetes pod logs. The biggest bottleneck during an outage isn't database IO—it's human visual triage under intense cortisol load.",
      chaosQuote:
        "I don't need another flame graph with 50,000 rows. When checkout fails, I need to know which upstream service broke the circuit in under 30 seconds.",
      chaosAnalysis:
        "Traditional observability dashboards present data in disjointed silos. Engineers spend 8 to 14 minutes just cross-referencing trace timestamps. Meanwhile, standard DOM-based SVG graphs freeze the browser when rendering >2,000 trace spans, inducing lag precisely when engineers are under extreme pressure.",
      architectureOverview:
        "Relay Mesh unifies topological dependency graphs and span latency waterfalls onto a single 60fps WebGL canvas. Using custom R-tree spatial indexing, we perform raycast hover detection on 25,000 nodes in sub-1ms. When an alert fires, a causal cone algorithm automatically highlights the root anomaly and dims nominal downstream noise.",
      pipelineNodes: [
        {
          id: "trace-stream",
          label: "OTLP Protocol Stream",
          role: "Binary Ingestion",
          tech: "Protobuf over WebSocket",
          latency: "8ms",
          details: "Decompresses binary OpenTelemetry spans in a Web Worker, batching updates every 16ms.",
        },
        {
          id: "rtree-index",
          label: "R-Tree Spatial Partition",
          role: "Spatial Hit Testing",
          tech: "2D Bounding-Box Tree",
          latency: "0.2ms",
          details: "Indexes 25,000 node coordinates for instant logarithmic viewport raycasting without iterating the dataset.",
        },
        {
          id: "causal-cluster",
          label: "Causal Cone Engine",
          role: "Anomaly Clustering",
          tech: "Directed Acyclic Graph Traversal",
          latency: "1.2ms",
          details: "Traces p99 tail latency breaches backwards along the dependency tree to isolate the root failure node.",
        },
        {
          id: "webgl-render",
          label: "WebGL Render Pass",
          role: "Orthographic Viewport",
          tech: "Hardware Accelerated Shaders",
          latency: "16.6ms (60fps)",
          details: "Renders nodes, bezier edge pulses, and health glow states with zero DOM layout recalculation.",
        },
      ],
      whatIKilled: {
        aiSlopIteration: {
          title: "Iteration 1: Force-Directed Physics Hairball",
          description:
            "Our initial exploration used dynamic D3 force-directed graph physics. When nodes spun up, the whole graph wiggled and repositioned itself dynamically.",
          symptoms: [
            "Nodes drifted across the screen mid-incident, disorienting engineers trying to click them",
            "Burned 85% CPU on physics calculations instead of rendering telemetry data",
            "Engineers suffered visual fatigue from chaotic spring oscillations during traffic spikes",
          ],
          failureProof: "Senior SREs refused to use it in war rooms, citing motion sickness and lack of spatial memory.",
        },
        shippedCraft: {
          title: "Shipped Version: Deterministic Orthographic Columns",
          description:
            "We locked service ingress to rigid columns and rendered dependencies strictly as a left-to-right causal cone. No wandering nodes, no spring wobble. Absolute spatial permanence.",
          improvements: [
            "Mean Time to Detect (MTTD) dropped from 14.2 minutes down to 3.8 minutes (-73%)",
            "Silky smooth 60fps canvas panning at 25,000 active spans",
            "Engineers build permanent spatial memory of their cluster architecture",
          ],
          craftPrinciple: "In high-severity monitoring, predictability beats novelty every single time.",
        },
      },
      surfaces: [
        {
          id: "topology-surface",
          label: "Topology & Span Inspector",
          description: "Interactive service graph with real-time anomaly simulation and waterfall inspector.",
          componentType: "topology",
        },
      ],
      takeaways: [
        "The DOM is not built for high-density data visualizations. Move to Canvas/WebGL early when rendering >1,000 elements.",
        "Spatial stability is paramount. An interface whose layout shifts when data changes will destroy an operator's muscle memory.",
      ],
    },
  },
  {
    slug: "kernel-ds",
    title: "Kernel Design System",
    tagline: "A headless token engine and AST compiler unifying 14 fragmented multi-tenant web and mobile apps.",
    year: "2024",
    type: "Design Systems Lead & Engineer",
    stack: ["Design Tokens (W3C)", "TypeScript AST", "Tailwind CSS", "Swift Package Manager", "Figma API"],
    narrative: {
      problemContext:
        "When an enterprise company grows through acquisitions, it inherits a zoo of front-end tech stacks. We had 4 distinct product brands, 14 disconnected component libraries, and 44 slightly different hex codes for 'brand blue'. Designers spent 30% of their sprints redrawing button variations, while engineering teams wrestled with 1.8MB duplicate CSS stylesheets.",
      chaosQuote:
        "Every time I need a secondary button with an icon on the right, the core design system component doesn't support the prop. So I just write ad-hoc CSS classes and ignore the design library.",
      chaosAnalysis:
        "The root cause was monolithic component architecture. The core team tried to anticipate every permutation by adding boolean props (`isLoading`, `hasLeftIcon`, `hasBadge`, `isCompact`). That resulted in 38 props per button, brittle conditional rendering, and total developer abandonment.",
      architectureOverview:
        "We killed monolithic master components and replaced them with headless, composable primitives powered by a deterministic token compiler. Designers edit tokens in Figma; an automated GitHub Action compiles the JSON into zero-runtime CSS variables, TypeScript types, and Swift structs in under 45 seconds.",
      pipelineNodes: [
        {
          id: "figma-tokens",
          label: "Figma Token Studio",
          role: "Design Token Authoring",
          tech: "W3C Token JSON",
          latency: "Sync",
          details: "Designers manage semantic colors, spacing scales, and radii with automated WCAG contrast validation.",
        },
        {
          id: "ast-compiler",
          label: "Kernel AST Engine",
          role: "Cross-Platform Compiler",
          tech: "TypeScript Compiler API",
          latency: "3.2s",
          details: "Extracts token definitions into deterministic CSS custom properties and typed Swift structures.",
        },
        {
          id: "headless-primitives",
          label: "Headless Slot Primitives",
          role: "Composable Component Primitives",
          tech: "React 19 compound components",
          latency: "0-runtime",
          details: "Unstyled accessible compound slots styled strictly via CSS custom properties and data-attributes.",
        },
        {
          id: "registry-dist",
          label: "Zero-Runtime Distribution",
          role: "Automated Package Releases",
          tech: "NPM & Swift Package Manager",
          latency: "Instant",
          details: "Publishes tree-shakable packages with zero runtime CSS-in-JS overhead.",
        },
      ],
      whatIKilled: {
        aiSlopIteration: {
          title: "Iteration 1: The '38-Prop Mega-Button'",
          description:
            "Earlier versions attempted to satisfy every designer's request with a single omnipotent `<Button />` component containing 38 optional props.",
          symptoms: [
            "42KB gzipped bundle size for a single button component",
            "Adding a badge broke alignment with right-aligned icons in 6 views",
            "Impossible combinatorial state matrix that caused frequent regressions",
          ],
          failureProof: "Developers bypassed the component in over 400 pull requests.",
        },
        shippedCraft: {
          title: "Shipped Version: Composable Compound Slots",
          description:
            "We rewrote everything into composable primitives (`Button.Root`, `Button.Icon`, `Button.Spinner`). Developers compose any arrangement naturally without filing feature requests.",
          improvements: [
            "Shared CSS bundle bloat dropped by 64% (1.8MB -> 640KB)",
            "Cross-platform design token drift dropped to zero",
            "Feature release velocity doubled across 4 multi-tenant squads",
          ],
          craftPrinciple: "Build primitives, not templates. Composition always scales better than configuration.",
        },
      },
      surfaces: [
        {
          id: "token-surface",
          label: "Token Inspector & State Matrix",
          description: "Interactive corner radius, brand accent, and density matrix.",
          componentType: "tokens",
        },
      ],
      takeaways: [
        "Design systems succeed or fail based on how easy they make it for engineers to do the right thing by default.",
        "Zero-runtime CSS custom properties are vastly superior to CSS-in-JS runtime libraries in large-scale multi-tenant apps.",
      ],
    },
  },
];
