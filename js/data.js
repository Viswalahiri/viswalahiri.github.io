// All site content and configuration. Edit this file to update the site —
// no other code changes needed for content updates.

export const CONFIG = {
  // Paste your Calendly event link here (e.g. "https://calendly.com/your-handle/30min").
  // While empty, the `book` command shows an email fallback instead.
  CALENDLY_URL: '',
  RESUME_PATH: 'assets/Viswalahiri_Hejeebu_Resume.pdf',
};

export const CONTACT = {
  name: 'Viz Hejeebu',
  title: 'ML/AI Infrastructure Engineer',
  location: 'Bothell, WA',
  email: 'lhejeebu@gmail.com',
  linkedin: 'https://linkedin.com/in/lahirihejeebu',
  github: 'https://github.com/Viswalahiri',
};

export const ABOUT = [
  "I'm Viz — an ML/AI infrastructure engineer in Bothell, WA.",
  '',
  'For 5+ years I\'ve built and optimized large-scale ML systems across GPU and',
  'TPU clusters: distributed training, high-throughput inference, and LLM',
  'applications. US Citizen.',
  '',
  'Currently at Google (via Quadrant Technologies) doing TPU/GPU inference and',
  'HPC work — accelerator performance engineering and cloud-native ML infra on',
  'GKE for demanding federal defense and high-frequency trading workloads.',
  '',
  'Off the clock I contribute to kubernetes-sigs (Kueue, JobSet, LWS) and chase',
  'benchmark numbers that make schedulers and interconnects sweat.',
  '',
  'B.Tech in Computer Science and Engineering, GITAM Deemed to be University (2017–2021).',
];

export const EXPERIENCE = [
  {
    key: 'google',
    aliases: ['quadrant'],
    company: 'Google (via Quadrant Technologies)',
    location: 'Kirkland, WA',
    title: 'Senior Software Engineer — TPU/GPU Inference & HPC',
    dates: 'Apr 2026 – Present',
    summary:
      'Accelerator performance engineering and mission-critical on-prem ML infrastructure for federal defense and high-frequency trading clients.',
    bullets: [
      'Leading cloud-native ML infra on GKE for distributed training and inference of LLM workloads on GPUs and TPUs.',
      'Owns GPU/TPU performance benchmarking — Ubench, Nsight Systems/Compute, DCGM, XLA profiling — and multi-node tuning (batch size, parallelism, NCCL params).',
      'Built reproducible benchmarking pipelines for consistent performance validation across clusters.',
    ],
  },
  {
    key: 'microsoft',
    aliases: ['ag'],
    company: 'Microsoft (via AG Consulting Partners)',
    location: 'Redmond, WA',
    title: 'Senior Software Engineer — AI/ML Engineering',
    dates: 'Jun 2025 – Jan 2026',
    summary:
      "Led a team of 4 on a fixed-term engagement within Microsoft's Commerce Platforms team, delivering agentic AI and fraud-prevention systems.",
    bullets: [
      'Built a scraping pipeline processing 9k+ forum posts/day, disabling 600+ fraudulent accounts (~$4,200 recovered each).',
      'Co-led migration of an agentic chatbot (CAIN) from Copilot Studio to Semantic Kernel, improving CSAT from 52 to 74 (+42%).',
      'Architected 16 agentic MCP tools automating fraud-analyst workflows, cutting review time by ~6 min/case across thousands of daily transactions.',
    ],
  },
  {
    key: 'att',
    aliases: ['apex', 'at&t'],
    company: 'Apex Systems (client: AT&T)',
    location: 'Bothell, WA',
    title: 'Senior Machine Learning Engineer',
    dates: 'Mar 2024 – Dec 2025',
    summary:
      'Led a 3-engineer team driving cost-optimization and revenue-intelligence ML systems on AWS.',
    bullets: [
      'Replaced GPT-4 with open-source models (LLaMA, DeBERTa, TinyBERT) on Databricks/Snowflake pipelines, cutting costs ~$280k/month.',
      'Built a tiered upsell-detection pipeline surfacing $4.2M in potential sales opportunity.',
      'Fine-tuned LLaMA 2 70B with QLoRA (92% memory reduction), deployed on SageMaker for 2.1x faster TTFT vs HF Transformers.',
      'Led a cross-functional team building a docs automation platform (AWS Textract, Bedrock, SageMaker) saving 800+ hours/month across 7 internal teams.',
    ],
  },
  {
    key: 'duke',
    aliases: ['duke-energy', 'meridian'],
    company: 'Duke Energy (via Meridian Staffing)',
    location: 'Fort Lauderdale, FL',
    title: 'Senior Machine Learning Engineer',
    dates: 'Jul 2023 – Feb 2024',
    summary: 'Enterprise conversational AI and GenAI initiatives on AWS.',
    bullets: [
      'Led enterprise chatbot development on AWS Lex + Terraform — 25+ intents, Node.js Lambda, CloudWatch monitoring.',
      'Directed a GenAI email-generation initiative (Python, Streamlit, LangChain, AWS Bedrock/Claude/GPT) with prompt engineering to cut hallucinations.',
      'Built a RAG-based GenAI NLP chatbot with vector embeddings, semantic chunking, and reranking.',
    ],
  },
  {
    key: 'breezeline',
    aliases: ['atlantic', 'cogeco'],
    company: 'Breezeline (formerly Atlantic Broadband, a Cogeco company)',
    location: 'Fort Lauderdale, FL',
    title: 'Machine Learning Engineer',
    dates: 'Nov 2021 – Jun 2023',
    summary:
      'ML infrastructure, NLP pipelines, and churn prediction for a major broadband provider.',
    bullets: [
      'Built ML infra with vector DBs (Weaviate, Pinecone, pgvector), cutting inference latency 65% and supporting 800k+ queries at <100ms p95.',
      'Built an NLP topic-modeling pipeline on GCP (Vertex AI, GKE, BigQuery, CCAI) handling 4,000+ daily calls.',
      'Built churn-prediction systems (fine-tuned BERT + GBDT) identifying 17,000+ at-risk accounts worth $6.7M annually.',
      'Built a POC RAG system with PaLM-2 and Falcon LLMs on Vertex AI.',
    ],
  },
  {
    key: 'inception',
    aliases: [],
    company: 'Inception Research & Development Operations',
    location: 'Hyderabad, India',
    title: 'Software Engineering Intern',
    dates: 'Jun 2020 – Mar 2021',
    summary: 'Forecasting systems for logistics and mobility clients.',
    bullets: [
      'Optimized geospatial surge-pricing demand forecasts (SageMaker, Forecast, H3 clustering), cutting RMSE by 16%.',
      'Built a time-series forecasting model (custom Java fork of FB Prophet) for a UAE logistics startup.',
    ],
  },
  {
    key: 'exponentia',
    aliases: ['datalabs'],
    company: 'Exponentia Datalabs',
    location: 'Mumbai, India',
    title: 'Machine Learning Intern',
    dates: 'May 2019 – Feb 2020',
    summary: 'Voice analytics and API engineering for BFSI clients.',
    bullets: [
      'Built Alexa-integrated analytics serving 700+ BFSI executives via AWS Lambda/IAM/Lex.',
      'Built RESTful APIs with FastAPI, cutting response time 22%.',
    ],
  },
];

// GitHub username used for the live contribution lookups in js/github.js.
export const GITHUB_USER = 'Viswalahiri';

// Each project is drillable via `projects <key>`. PR lists are fetched live
// from the GitHub API; `fallback` is a baked snapshot (see `snapshotDate`)
// shown when the API is unreachable or rate-limited.
export const PROJECTS_SNAPSHOT_DATE = '2026-08-30';

export const PROJECTS = [
  {
    key: 'kueue',
    aliases: [],
    name: 'Kueue',
    org: 'kubernetes-sigs',
    repo: 'kueue',
    tagline: 'Kubernetes-native job queueing',
    blurb:
      'Quota management, fair sharing, and preemption for batch and ML workloads on Kubernetes — the scheduler layer that decides which training jobs run, wait, or get preempted.',
    focus:
      'Fair-sharing & preemption internals (DRS) and topology-aware scheduling (TAS)',
    fallback: {
      merged: [
        { number: 14765, title: 'Reuse DRS zero-weight-borrows check in fair sharing preemption', date: '2026-08-24' },
        { number: 14762, title: 'Drop EquateEmpty from TAS net usage test', date: '2026-08-24' },
        { number: 14754, title: 'Test TAS net usage for domain count that is shrinking', date: '2026-08-23' },
      ],
      open: [
        { number: 14775, title: 'Fix Scheduling Equivalence Hashing under UsageBasedAdmissionFairSharing', date: '2026-08-29' },
      ],
    },
  },
  {
    key: 'jobset',
    aliases: [],
    name: 'JobSet',
    org: 'kubernetes-sigs',
    repo: 'jobset',
    tagline: 'Kubernetes-native API for distributed ML training & HPC',
    blurb:
      'Manages groups of Jobs as a single unit — the standard way to run multi-node distributed training and HPC workloads on Kubernetes.',
    focus: 'Lifecycle correctness: volume-claim retention, admission edge cases',
    fallback: {
      merged: [
        { number: 1305, title: 'Fix nil deref of whenDeleted in volume claim retention checks', date: '2026-08-28' },
      ],
      open: [
        { number: 1308, title: 'Fix admission rejecting JobSets that reuse a retained PVC', date: '2026-08-30' },
      ],
    },
  },
  {
    key: 'lws',
    aliases: ['leaderworkerset'],
    name: 'LWS (LeaderWorkerSet)',
    org: 'kubernetes-sigs',
    repo: 'lws',
    tagline: 'Multi-host LLM inference on Kubernetes',
    blurb:
      'An API for deploying groups of pods as one replicated unit — built for serving models that span nodes (vLLM/SGLang multi-host inference, disaggregated prefill/decode).',
    focus: 'DisaggregatedSet API framing and CRD upgrade docs',
    fallback: {
      merged: [],
      open: [
        { number: 1010, title: '[docs] Fix DisaggregatedSet version framing and CRD upgrade steps', date: '2026-08-30' },
      ],
    },
  },
];

export const SKILLS = [
  ['Languages', 'Python, C++, Java, R, SQL'],
  [
    'LLMs & GenAI',
    'Prompt Engineering, RAG Architecture, Vector Databases, vLLM, NeMo, TensorRT-LLM, LLMOps, Agentic AI, LangChain, LangSmith, LangGraph, AutoGen, Semantic Kernel',
  ],
  [
    'GPU/TPU Hardware',
    'NVIDIA H100, Blackwell GPUs, Google TPU v5, TPU v6e (Trillium), TPU7x (Ironwood)',
  ],
  [
    'Cloud & AI Platforms',
    'AWS (SageMaker, Bedrock, Textract, OpenSearch, Lex, Lambda, S3, EKS, RDS), Azure (AI Foundry, OpenAI, Document Intelligence, AI Search, Cosmos DB, ML Studio, AKS, VMSS), GCP (Vertex AI, GKE, BigQuery, Pub/Sub, CCAI, DialogFlow), Databricks (Feature Store, MLflow, Unity Catalog, Genie)',
  ],
  [
    'ML/DL',
    'TensorFlow, PyTorch, JAX, Keras, Transformers, BERT, LightGBM, XGBoost, Scikit-learn, PySpark',
  ],
  ['Databases', 'MySQL, PostgreSQL, Snowflake, Azure SQL'],
];

export const CERTS = {
  certifications: [
    'Claude Certified Architect – Foundations (CCA-F)',
    'Databricks Certified Gen AI Engineer',
    'Databricks Certified ML',
    'Databricks Academy Accreditation – Gen AI Fundamentals',
  ],
  awards: [
    'Top 500 of 120,000+ in HackWithInfy (Infosys, 99.5th percentile), 2020',
    '#3 regionally / #279 nationally in Google Hash Code, 2020',
  ],
};

export const EDUCATION = {
  school: 'GITAM Deemed to be University',
  degree: 'B.Tech, Computer Science and Engineering',
  years: '2017 – 2021',
};
