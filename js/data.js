// All site content and configuration. Edit this file to update the site —
// no other code changes needed for content updates.

export const CONFIG = {
  CALENDLY_URL: 'https://calendly.com/lahiri-coffee-chat/30min',
  RESUME_PATH: 'assets/Viswalahiri_Hejeebu_Resume.pdf',
};

export const CONTACT = {
  name: 'Viz Hejeebu',
  fullName: 'Viswalahiri (Viz) Hejeebu',
  title: 'ML/AI Infrastructure Engineer',
  location: 'Bothell, WA',
  email: 'lhejeebu@gmail.com',
  phone: '(425) 780-6102',
  phoneHref: 'tel:+14257806102',
  linkedin: 'https://linkedin.com/in/lahirihejeebu',
  github: 'https://github.com/Viswalahiri',
  citizenship: 'US Citizen',
};

export const ABOUT = [
  "I'm Viz — a machine learning engineer in Bothell, WA.",
  '',
  '5+ years building and optimizing large-scale ML systems across GPU and TPU',
  'clusters, spanning distributed training, high-throughput inference, and LLM',
  'applications.',
  '',
  'Right now I drive performance engineering for mission-critical on-premise',
  'workloads at Google — accelerator benchmarking and cloud-native ML infra on',
  'GKE for federal defense and high-frequency trading clients.',
  '',
  'Before that: agentic AI systems, RAG, deep learning, and LLM fine-tuning',
  'shipped across AWS, Azure, GCP, and Databricks. I have led engineering teams',
  'of 3–4 and delivered systems with measurable cost and revenue impact at',
  'enterprise scale — ~$280k/month in token spend removed, $4.2M in upsell',
  'opportunity surfaced, $6.7M in at-risk revenue identified.',
  '',
  'Off the clock I contribute to kubernetes-sigs (Kueue, JobSet, LWS) and chase',
  'benchmark numbers that make schedulers and interconnects sweat.',
  '',
  'B.Tech in Computer Science and Engineering, GITAM Deemed to be University.',
  'US Citizen.',
];

export const EXPERIENCE = [
  {
    key: 'google',
    aliases: ['quadrant'],
    company: 'Google',
    via: 'via Quadrant Technologies',
    location: 'Kirkland, WA',
    title: 'Senior Software Engineer — TPU/GPU Inference & HPC',
    dates: 'Apr 2026 – Present',
    summary:
      'Mission-critical, on-premise ML infrastructure and accelerator performance engineering for federal defense and high-frequency trading clients, supporting distributed training and inference for massive-scale workloads on GPU and TPU clusters.',
    bullets: [
      'Led design and operation of cloud-native ML infrastructure on Kubernetes (GKE) supporting distributed training and inference on GPUs and TPUs for LLM workloads.',
      'Owned GPU and TPU performance benchmarking — profiling compute utilization, memory bandwidth, and accelerator interconnect communication using Ubench, Nsight Systems/Compute, DCGM, and XLA profiling tools.',
      'Optimized multi-node accelerator training performance by tuning batch size, data/model parallelism, NCCL parameters (GPU), and accelerator resource allocation.',
      'Built reproducible benchmarking pipelines using standardized recipes and runfiles, enabling consistent performance validation across GPU and TPU clusters.',
      'Improved ML platform reliability through regression testing, log-based root cause analysis, and cross-team collaboration.',
    ],
  },
  {
    key: 'microsoft',
    aliases: ['ag', 'cain'],
    company: 'Microsoft',
    via: 'via AG Consulting Partners',
    location: 'Redmond, WA',
    title: 'Senior Software Engineer, AI/ML Engineering',
    dates: 'Jun 2025 – Feb 2026',
    summary:
      'Led a team of 4 consultants on a 6-month fixed-term engagement within the Commerce Platforms team in Microsoft Azure, delivering agentic AI and fraud-prevention systems at enterprise scale.',
    bullets: [
      'Engineered a scraping pipeline on VMSS processing 9k+ forum posts/day to detect credit abuse, disabling 600+ accounts (~$4,200 recovered each). Normalized data into Azure SQL via Flask, deployed on Web Apps.',
      'Co-led migration of CAIN (Commerce AI Nexus), an agentic chatbot, from Copilot Studio to Semantic Kernel orchestration — redesigning multi-step task and MCP reasoning loops and improving CSAT from 52 to 74 (+42%).',
      'Architected 16 agentic MCP tools within CAIN, automating context-gathering (history, Risk API, AI-content and site checks) for fraud analysts, cutting review time by ~6 min/case across thousands of daily transactions.',
      'Built a modular AI data pipeline with Azure AI Foundry, Cognitive Search, and modular RAG, enabling multi-agent OKR scenarios for ADO-based planning and scenario analysis.',
    ],
  },
  {
    key: 'apex',
    aliases: ['att', 'at&t', 'scriptsage'],
    company: 'Apex Systems',
    via: "client: AT&T — ScriptSage team",
    location: 'Bothell, WA',
    title: 'Senior Machine Learning Engineer',
    dates: 'Mar 2024 – Jun 2025',
    summary:
      "Drove cost-optimization and revenue-intelligence systems on AWS within AT&T's ScriptSage team, architecting ML systems that cut costs and increased upsell revenue while leading a 3-engineer team.",
    bullets: [
      'Architected Databricks ML pipelines and workflows leveraging Snowflake, replacing GPT-4 with open-source models like LLaMA, DeBERTa, and TinyBERT — reducing costs by ~$280k monthly in token spend.',
      'Spearheaded a tiered detection pipeline on AWS Databricks flagging high-intent upsell signals across 6 product categories from transcripts using transformer models with LLM escalation, surfacing $4.2M in potential sales opportunity.',
      'Fine-tuned LLaMA 2 70B using PEFT with QLoRA, slashing memory usage by 92%. Deployed on SageMaker for 2.1x faster TTFT over HF Transformers. Integrated LangChain RouterChain for downstream consumption.',
      'Led a cross-functional team of 3 engineers building a documentation automation platform leveraging AWS Textract, Bedrock, and SageMaker — used by 7 internal teams, slashing drafting time by 800+ hours/month.',
    ],
  },
  {
    key: 'duke',
    aliases: ['duke-energy', 'meridian'],
    company: 'Duke Energy',
    via: 'via Meridian Staffing (contract)',
    location: 'Fort Lauderdale, FL',
    title: 'Senior Machine Learning Engineer',
    dates: 'Jul 2023 – Feb 2024',
    summary:
      'Directed enterprise conversational AI and generative AI initiatives on AWS as part of a 6-month fixed engagement, spanning chatbot deployment, an email-generation initiative, and RAG-based NLP systems.',
    bullets: [
      'Led development of an enterprise chatbot using AWS Lex with Terraform IaC. Deployed 25+ intents integrating Node.js Lambda functions and CloudWatch for monitoring.',
      'Directed a generative AI email-generation initiative using Python, Streamlit, LangChain, and AWS Bedrock LLMs (Claude, GPT). Applied metadata tagging, few-shot learning, and prompt engineering to cut hallucinations.',
      'Developed a GenAI NLP chatbot with AWS Bedrock, Lex, and RAG — vector embeddings, semantic chunking, and reranking.',
    ],
  },
  {
    key: 'breezeline',
    aliases: ['atlantic', 'cogeco'],
    company: 'Breezeline',
    via: 'formerly Atlantic Broadband, a Cogeco company',
    location: 'Fort Lauderdale, FL',
    title: 'Machine Learning Engineer',
    dates: 'Nov 2021 – Jun 2023',
    summary:
      "Delivered ML systems supporting customer retention and contact-center intelligence at a regional broadband provider — full lifecycle data pipelines, model training, and deployment on GCP. Prototyped the company's first LLM-based retrieval alongside NLP and churn models.",
    bullets: [
      'Engineered ML infrastructure with vector databases (Weaviate, Pinecone, pgvector) reducing inference latency by 65%, supporting 800k+ total queries at <100ms p95 response times.',
      'Implemented an NLP topic-modeling pipeline leveraging GCP Vertex AI, GCS, BigQuery, and Google CCAI on GKE and App Engine with Terraform IaC, handling 4,000+ daily calls.',
      'Created state-of-the-art churn prediction systems with fine-tuned BERT transformers and a GBDT from data in Snowflake/ADLS — identifying 17,000+ accounts worth $6.7M annually.',
      'Built a POC RAG system with PaLM-2 and Falcon LLMs on GCP Vertex AI.',
    ],
  },
  {
    key: 'inception',
    aliases: [],
    company: 'Inception Research & Development Operations',
    via: '',
    location: 'Hyderabad, TG',
    title: 'Software Engineering Intern',
    dates: 'Jun 2020 – Mar 2021',
    summary: 'Forecasting systems for mobility and logistics clients.',
    bullets: [
      'Optimized geospatial surge-pricing demand forecasts with AWS SageMaker, Forecast, and H3 grid clustering — cutting RMSE by 16% and enabling more accurate location-based pricing decisions.',
      'Developed a time-series forecasting model using a custom Java fork of FB Prophet, increasing order fulfillment for a UAE logistics startup and reducing delivery delays by ~4 minutes on average. Handled pre-processing, transformation, training, and testing.',
    ],
  },
  {
    key: 'exponentia',
    aliases: ['datalabs'],
    company: 'Exponentia Datalabs',
    via: '',
    location: 'Mumbai, MH',
    title: 'Machine Learning Intern',
    dates: 'May 2019 – Feb 2020',
    summary: 'Voice analytics and API engineering for BFSI clients.',
    bullets: [
      'Leveraged AWS Lambda, IAM, and Lex with Alexa to serve analytics to 700+ BFSI executives, improving decision-making by decreasing time to value.',
      'Implemented workflows with Pandas, SQL, and Redshift. Composed RESTful APIs with FastAPI, reducing response time by 22%.',
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

// A group is either { category, items } or { category, groups: [{ name, items }] }.
export const SKILLS = [
  { category: 'Programming Languages', items: 'Python, C++, Java, R, SQL' },
  {
    category: 'LLMs & Generative AI',
    items:
      'Prompt Engineering, RAG Architecture, Vector Databases, vLLM, NeMo, TensorRT-LLM, LLMOps, Agentic AI, LangChain, LangSmith, LangGraph, AutoGen, Semantic Kernel',
  },
  {
    category: 'GPU / TPU Hardware',
    items:
      'NVIDIA H100, Blackwell GPUs, Google TPU v5, TPU v6e (Trillium), TPU7x (Ironwood)',
  },
  {
    category: 'Cloud & AI Platforms',
    groups: [
      { name: 'AWS', items: 'SageMaker, Bedrock, Textract, OpenSearch, Lex, Lambda, S3, EKS, RDS' },
      { name: 'Azure', items: 'AI Foundry, OpenAI, Document Intelligence, AI Search, Cosmos DB, ML Studio, Blob Storage, Web Apps, VMSS, AKS, App Service, SQL' },
      { name: 'GCP', items: 'Vertex AI, GKE, Artifact Registry, Compute Engine, BigQuery, Pub/Sub, CCAI, App Engine, GCS, DialogFlow' },
      { name: 'Databricks', items: 'Azure Databricks, AWS Databricks, Feature Store, MLflow, Unity Catalog, Genie' },
    ],
  },
  {
    category: 'ML, Deep Learning & Data Science',
    items:
      'NLP, TensorFlow, Transformers, BERT, Neural Networks, PyTorch, JAX, Keras, LightGBM, XGBoost, NumPy, Pandas, PySpark, Matplotlib, Scikit-learn',
  },
  { category: 'Databases', items: 'MySQL, PostgreSQL, Snowflake, Azure SQL' },
];

export const CERTS = {
  certifications: [
    'Claude Certified Architect – Foundations (CCA-F)',
    'Databricks Certified Gen AI Engineer',
    'Databricks Certified ML',
    'Databricks Academy Accreditation – Gen AI Fundamentals',
  ],
  awards: [
    "Top 500 of 120,000+ competitors (99.5th percentile) in HackWithInfy, Infosys' national-level coding contest (2020)",
    '#3 at hub level and #279 nationally in Google Hash Code (2020)',
  ],
};

export const EDUCATION = {
  school: 'GITAM Deemed to be University',
  location: 'Visakhapatnam, AP',
  degree: 'Bachelor of Technology, Computer Science and Engineering',
  years: '2017 – 2021',
};
