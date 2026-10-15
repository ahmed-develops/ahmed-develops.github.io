export interface MonnetCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  type: string;
  stack: string[];
  liveDemoUrl?: string;
  articleUrl?: string;
  githubUrl?: string;
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
      componentType: "finscore" | "scale" | "topology" | "tokens" | "canvas";
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
          details:
            "Continuous byte stream parsing weight offsets and stable tare signals without blocking the main UI thread.",
        },
        {
          id: "worker-filter",
          label: "Tare Worker Thread",
          role: "Kalman Filter & Stability Lock",
          tech: "Off-screen Web Worker",
          latency: "4ms",
          details:
            "Applies a low-pass Kalman filter to ignore ambient kitchen vibrations (footsteps, blender hum) and lock weight within 0.1g.",
        },
        {
          id: "station-heuristics",
          label: "Station Context Engine",
          role: "Predictive SKU Filtering",
          tech: "Local Heuristics Cache",
          latency: "1ms",
          details:
            "Filters 1,400 raw ingredients down to the 4 items relevant to Station 02 (Cold Prep) at 11:30 AM.",
        },
        {
          id: "thermal-dispatch",
          label: "ESC/POS Thermal Dispatch",
          role: "Immediate Batch Label Print",
          tech: "Raw Socket Stream",
          latency: "80ms",
          details:
            "Fires thermal batch barcode label to kitchen station printer and syncs record to offline IndexedDB.",
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
          failureProof:
            "100% rejection rate during lunch service. Cooks demanded a physical scale with real buttons.",
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
          craftPrinciple:
            "The best interface in high-stress physical environments is often the one that does the least.",
        },
      },
      surfaces: [
        {
          id: "scale-surface",
          label: "Live Scale Appliance",
          description:
            "Real-time tablet interface with live tare lock, unit toggle, and instant batch logger.",
          componentType: "scale",
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
    slug: "fin-score",
    title: "Spending Behaviour Analysis & Financial Scoring",
    tagline:
      "Open Banking machine learning pipeline pairing Basiq API 3.0 (CDR) financial data with scikit-learn models for transaction categorisation, anomaly detection, cash-flow forecasting, behavioural segmentation, and calibrated wellbeing scoring.",
    year: "2025–2026",
    type: "Lead AI & Fintech Engineer",
    stack: [
      "Python 3.13",
      "Basiq API 3.0 (CDR)",
      "Scikit-Learn",
      "FastAPI",
      "Isolation Forest",
      "Gradient Boosting",
      "Holt-Winters ETS",
    ],
    articleUrl: "https://medium.com/@ma675967/building-an-open-banking-backend-which-reads-your-transaction-and-suggests-what-to-fix-65b026f9887e",
    githubUrl: "https://github.com/ahmed-develops/financial-data-analysis",
    narrative: {
      problemContext:
        "Traditional personal finance management (PFM) apps fail because raw bank transaction feeds are notoriously truncated, cryptic, and noisy (e.g. 'SQ *CAFE SURRY HILLS AUS'). Consumers receive backwards-looking pie charts instead of actionable forward-looking insights or explainable financial health scoring. Furthermore, under Australia's Consumer Data Right (CDR), handling Open Banking financial data demands strict, auditable consent management without compromising user trust or privacy.",
      chaosQuote:
        "Raw bank feed strings look like corrupted serial numbers. Character n-grams survive the truncation bank feeds inflict on descriptions. Calibrated probabilities let low-confidence predictions fall back to deterministic rules.",
      chaosAnalysis:
        "We paired financial data from Open Banking/Consumer Data Rights platform basiq.io (of Cuscal Limited) with machine learning algorithms for financial data analysis and analytical insight extraction. Bank feeds arrive with aggressive string truncations, missing merchant taxonomies, and high noise. Naive LLM prompting introduces prohibitive latency, recurring API costs, non-deterministic hallucinations, and serious privacy/compliance risks when handling CDR bank data. In contrast, confirmed fraud labels are scarce and late, making unsupervised anomaly detection essential.",
      architectureOverview:
        "Built on Basiq API 3.0, the consent-first architecture extracts bank accounts and transactions under an auditable CDR consent ledger. The backend streams raw transactions through a five-stage machine learning engine: TF-IDF + Logistic Regression with character n-grams for categorization, dual-layer Isolation Forest and MAD z-scores for anomaly detection, Holt-Winters ETS for household cash-flow forecasting, silhouette-tuned K-Means for behavioral segmentation, and isotonic-calibrated Gradient Boosting for explainable financial wellbeing scoring with transparent contributing factors.",
      pipelineNodes: [
        {
          id: "cdr-consent",
          label: "Basiq CDR Consent & Sync",
          role: "Consent-Gated Extraction",
          tech: "Basiq API 3.0 / FastAPI",
          latency: "Async Polling",
          details:
            "Local mirror of Basiq CDR consent with scopes, purpose, and expiry. Token management (SERVER & CLIENT_ACCESS) and cursor pagination with retry backoff.",
        },
        {
          id: "ngram-categorisation",
          label: "Categorisation Engine",
          role: "NLP Classification",
          tech: "TF-IDF (word 1–2, char_wb 3–5) → Logistic Regression",
          latency: "2.8ms / batch",
          details:
            "Character n-grams survive the truncation bank feeds inflict on descriptions. Calibrated probabilities let low-confidence predictions fall back to rules.",
        },
        {
          id: "anomaly-detection",
          label: "Anomaly Detection",
          role: "Unsupervised Outliers",
          tech: "Isolation Forest + Robust MAD z-score",
          latency: "6.2ms",
          details:
            "Unsupervised — confirmed fraud labels are scarce and late. Isolation Forest finds globally odd points; MAD z-scores catch what is odd for this user.",
        },
        {
          id: "cashflow-forecast",
          label: "Forecasting Engine",
          role: "Liquidity Projection",
          tech: "Holt-Winters ETS (Additive Trend + Seasonality)",
          latency: "11.4ms",
          details:
            "Household cash flow is short, seasonal and noisy. ETS produces stable intervals from few points, with automatic fallback to Holt linear or damped drift.",
        },
        {
          id: "segmentation-scoring",
          label: "Segmentation & Wellbeing Score",
          role: "Profiling & Health Score",
          tech: "K-Means (k by silhouette) + Gradient Boosting (Isotonic)",
          latency: "14.1ms",
          details:
            "Centroids are directly interpretable, driving tailored advice. Gradient Boosting handles non-linear interactions, returning contributing factors with every score alongside a transparent five-pillar model.",
        },
      ],
      whatIKilled: {
        aiSlopIteration: {
          title: "Iteration 1: Black-Box LLM Prompts & Naive Word Tokenization",
          description:
            "Early explorations tested cloud LLM completions for categorization and advice, alongside simple whitespace word tokenizers.",
          symptoms: [
            "API latency exceeded 3.2s per sync with recurring per-token cloud costs across high-volume transaction feeds",
            "Word-level tokenizers failed completely on truncated bank descriptions (e.g., 'WOOLW 3192' vs 'WOOLWORTHS')",
            "LLM hallucinations produced inconsistent financial advice and uncalibrated health ratings",
            "Privacy & CDR compliance complications sending raw financial account streams to third-party endpoints",
          ],
          failureProof:
            "14% categorization failure rate on real Australian bank strings and complete lack of explainable audit trails for credit scoring.",
        },
        shippedCraft: {
          title: "Shipped Version: Deterministic Scikit-Learn Pipeline + Transparent Five Pillars",
          description:
            "We threw away cloud LLM prompts and deployed a lightweight, 100% offline-capable scikit-learn stack. Character n-grams, Isolation Forests, Holt-Winters ETS, and isotonically calibrated Gradient Boosting with full feature attribution.",
          improvements: [
            "Sub-20ms total pipeline inference latency with zero API per-token operational costs",
            "Character n-grams achieve >96% categorization accuracy even on severely clipped merchant strings",
            "Transparent five-pillar scoring (savings rate, emergency buffer, debt servicing, credit utilisation, spending stability)",
            "Runs completely offline against bundled mock Basiq server or live Basiq API 3.0 via a single configuration toggle",
          ],
          craftPrinciple:
            "In financial engineering, interpretability, determinism, and mathematical calibration trump black-box novelty every single time.",
        },
      },
      surfaces: [
        {
          id: "fin-score-surface",
          label: "Financial Telemetry & ML Scoring",
          description:
            "Interactive Open Banking telemetry showing character n-gram extraction, dual anomaly scores, 30-day Holt-Winters ETS forecast, and five-pillar health scoring.",
          componentType: "finscore",
        },
      ],
      takeaways: [
        "Character n-grams survive bank feed truncation: bank feeds routinely chop merchant strings mid-word, rendering dictionary tokenizers useless.",
        "Anomaly detection in personal finance requires dual granularity: Isolation Forest finds globally odd transactions, while MAD z-scores catch what is odd for that specific user's historical cadence.",
        "Interpretable segmentation matters: when user clusters drive financial recommendations, advisors and auditors must be able to inspect centroid coordinates directly.",
        "Financial wellbeing scores require feature attribution: returning exact contributing factor deltas empowers users to know precisely how to improve their score.",
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
