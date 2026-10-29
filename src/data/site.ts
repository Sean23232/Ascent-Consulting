/**
 * Central content + theme source for Ascent Consulting.
 * All copy here is intentionally qualified: no fabricated credentials,
 * testimonials, success rates, funding outcomes, or contact details.
 */

export const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const brand = {
  legalName: "Carter Sean Investments",
  dba: "Ascent Consulting",
  tagline: "Idea to Funding",
  positioning:
    "Business formation, strategic planning, and funding preparation — guided as one continuous journey.",
  disclaimer:
    "Ascent Consulting's services and guidance are subject to the agreed scope of engagement. Funding availability, eligibility, and approval depend on the relevant provider and individual circumstances. No funding outcome is guaranteed.",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

export const heroImages = {
  architecture: px(7824271, 900, 1200),
  architectureAlt: px(298616, 900, 1200),
};

/* ---------------------------------- Services --------------------------------- */

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  icon: "formation" | "strategy" | "funding" | "growth";
  image: string;
  imageAlt: string;
  overview: string;
  challenges: string[];
  scope: string[];
  process: { step: string; detail: string }[];
  prepare: string[];
  status: "core" | "proposed";
};

export const services: Service[] = [
  {
    slug: "business-setup-formation",
    index: "01",
    title: "Business Setup & Formation",
    short:
      "Understand and navigate the steps involved in establishing a business — from structure considerations to a practical setup checklist.",
    icon: "formation",
    image: px(4975658, 1100, 850),
    imageAlt: "Business professional writing setup notes beside a laptop at an office desk",
    overview:
      "The earliest decisions shape everything that follows. This service helps you understand the foundational steps involved in moving from an idea toward an organized business, and what to look at first.",
    challenges: [
      "You have an idea but no clear picture of the first practical steps.",
      "Setup tasks are spread across multiple places and it is hard to know what applies to you.",
      "You want a written checklist rather than a list of things to remember.",
    ],
    scope: [
      "Business structure considerations to research and discuss with your advisers",
      "Business registration guidance — what is typically involved and in what order",
      "Foundational setup planning for the first 30–90 days",
      "An initial administrative checklist you can work through",
      "Identifying practical next steps and who may need to be involved",
    ],
    process: [
      { step: "Orientation", detail: "We discuss the idea, your timeline, and where you currently stand." },
      { step: "Mapping", detail: "We outline the setup steps relevant to your situation and flag anything to confirm elsewhere." },
      { step: "Checklist", detail: "You receive a written sequence of tasks with the order and dependencies made clear." },
      { step: "Follow-through", detail: "We revisit the checklist so nothing is left ambiguous before you move to planning." },
    ],
    prepare: [
      "A short description of the business idea and who it serves",
      "Any names, registrations, or accounts you have already opened",
      "Your target start date or launch window",
      "Questions you want answered before committing to a structure",
    ],
    status: "core",
  },
  {
    slug: "business-planning-strategy",
    index: "02",
    title: "Business Planning & Strategy",
    short:
      "Bring objectives, operations, and priorities into one organized direction — a plan you can actually work from.",
    icon: "strategy",
    image: px(5257576, 1100, 850),
    imageAlt: "Team mapping out business strategy together at a whiteboard",
    overview:
      "A plan is only useful if it changes what you do next. This service helps you clarify objectives, describe how the business will operate, and set priorities that hold up when circumstances shift.",
    challenges: [
      "Objectives, pricing, and operations live in your head rather than on paper.",
      "You need a document that can be shared with partners, advisers, or funders.",
      "Priorities compete and it is unclear which one moves the business forward first.",
    ],
    scope: [
      "Business objectives and priority setting",
      "Business model and operational planning",
      "Strategic roadmapping across the next 12 months",
      "Identifying business development priorities",
      "Organizing next steps for implementation",
    ],
    process: [
      { step: "Clarify", detail: "We define what the business is, who it serves, and what success looks like." },
      { step: "Structure", detail: "We organize operations, offer, and priorities into a readable plan." },
      { step: "Sequence", detail: "We turn the plan into a phased roadmap with owners and checkpoints." },
      { step: "Pressure-test", detail: "We review assumptions and adjust where the plan is fragile." },
    ],
    prepare: [
      "Notes on your offer, pricing, and target customer",
      "Any existing plan, deck, or one-page summary",
      "Costs, suppliers, or tools you already rely on",
      "The three decisions you most want clarity on",
    ],
    status: "core",
  },
  {
    slug: "funding-preparation",
    index: "03",
    title: "Funding Preparation",
    short:
      "Understand what preparation may be needed before approaching potential funding sources — and how to present your business clearly.",
    icon: "funding",
    image: px(5668497, 1100, 850),
    imageAlt: "Professional preparing written financial notes ahead of a business conversation",
    overview:
      "Funding conversations go better when the business can explain itself. This service focuses on preparation: organizing information, understanding what different routes typically ask for, and arriving with clear answers.",
    challenges: [
      "You are unsure what information a lender, investor, or grant body will request.",
      "Financial and business information is incomplete or held in different places.",
      "You want to compare funding routes before committing time to applications.",
    ],
    scope: [
      "Funding-readiness discussions and an honest look at your current position",
      "Business plan organization for a funding audience",
      "Financial information preparation guidance — what to gather and how to present it",
      "Identifying potential funding routes worth researching",
      "Preparing questions and materials for funding conversations",
    ],
    process: [
      { step: "Assess", detail: "We review what you have today and what a funding conversation would require." },
      { step: "Organize", detail: "We help structure the business and financial information into a coherent pack." },
      { step: "Route", detail: "We outline funding avenues that may be worth researching for your circumstances." },
      { step: "Rehearse", detail: "We prepare the questions you may be asked and the answers you intend to give." },
    ],
    prepare: [
      "Your current business plan or summary",
      "Any financial records, projections, or statements you already hold",
      "The amount you believe you need and what it would be used for",
      "Existing obligations, assets, or commitments relevant to the business",
    ],
    status: "core",
  },
  {
    slug: "business-growth-development",
    index: "04",
    title: "Business Growth & Development",
    short:
      "For established owners reviewing objectives, growth priorities, expansion considerations, and future funding needs.",
    icon: "growth",
    image: px(20752572, 1100, 850),
    imageAlt: "Group of professionals reviewing growth priorities in a consulting office",
    overview:
      "Growth is a series of choices about where to invest attention next. This service reviews where the business stands, identifies priorities, and plans the next stage — including any future funding conversations.",
    challenges: [
      "The business is operating but direction has not been reviewed recently.",
      "Expansion options exist and it is unclear which deserves attention first.",
      "Future funding needs have not been planned against upcoming milestones.",
    ],
    scope: [
      "Reviewing business objectives against current performance",
      "Identifying growth priorities and the constraints around them",
      "Strategic planning for the next operating period",
      "Exploring expansion considerations and what each would require",
      "Planning future funding needs and readiness timing",
    ],
    process: [
      { step: "Review", detail: "We look at objectives, operations, and what has changed since the last plan." },
      { step: "Prioritize", detail: "We rank growth options by impact, effort, and readiness." },
      { step: "Plan", detail: "We build a next-stage roadmap with checkpoints and resource needs." },
      { step: "Prepare", detail: "We flag what would need to be in place before a future funding conversation." },
    ],
    prepare: [
      "A summary of current operations, customers, and revenue streams",
      "Recent goals and how they performed",
      "Expansion ideas you are weighing",
      "Any upcoming commitments, contracts, or capacity limits",
    ],
    status: "proposed",
  },
];

/* ------------------------------ Journey roadmap ------------------------------ */

export type Stage = {
  n: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
};

export const stages: Stage[] = [
  {
    n: "01",
    title: "Discover",
    summary: "Understand the idea, business objectives, current position, and immediate priorities.",
    detail:
      "Everything starts with an honest picture of where the business stands today. We listen to the idea, the reasons behind it, and the constraints around it — then define what needs attention first.",
    outputs: ["A written summary of the idea and objectives", "Current position and constraints", "Immediate priorities"],
  },
  {
    n: "02",
    title: "Establish",
    summary: "Explore the foundational steps required to set up and organize the business.",
    detail:
      "This stage covers the groundwork: the structure to research, the registrations to look into, and the administrative tasks that make a business real rather than conceptual.",
    outputs: ["Setup sequence and dependencies", "Administrative checklist", "Open questions to confirm with advisers"],
  },
  {
    n: "03",
    title: "Strategize",
    summary: "Clarify the business model, priorities, planning needs, and development roadmap.",
    detail:
      "With foundations in view, we organize the direction: what the business offers, who it serves, how it operates, and which priorities earn attention over the next twelve months.",
    outputs: ["Business model outline", "Phased strategic roadmap", "Prioritized development actions"],
  },
  {
    n: "04",
    title: "Prepare",
    summary: "Organize relevant business information and prepare for conversations about potential funding options.",
    detail:
      "Preparation is the difference between a vague request and a credible conversation. We help gather, structure, and present the information a funding discussion would typically require.",
    outputs: ["Information and document checklist", "Organized business and financial summary", "Questions to ask providers"],
  },
  {
    n: "05",
    title: "Explore Funding",
    summary: "Evaluate suitable next steps and potential funding avenues based on eligibility, circumstances, and available options.",
    detail:
      "The final stage is comparative and realistic. We outline routes that may be worth researching, what each generally involves, and which conversations make sense to pursue first.",
    outputs: ["Funding routes to research", "Readiness assessment against each route", "A sequenced set of next steps"],
  },
];

/* -------------------------------- Principles -------------------------------- */

export const principles = [
  { title: "Business Formation", icon: "formation" as const, note: "Foundational setup steps" },
  { title: "Strategic Planning", icon: "strategy" as const, note: "Direction you can work from" },
  { title: "Funding Preparation", icon: "funding" as const, note: "Organized before you ask" },
  { title: "Guided Next Steps", icon: "compass" as const, note: "Clarity on what comes next" },
];

export const challenges = [
  {
    n: "01",
    title: "Getting Started",
    body: "Understand the key steps involved in moving from an idea toward a structured business.",
  },
  {
    n: "02",
    title: "Building a Plan",
    body: "Bring business objectives, operational considerations, and strategic priorities into a more organized direction.",
  },
  {
    n: "03",
    title: "Preparing for Funding",
    body: "Explore the preparation, documentation, and planning that may help support funding discussions, depending on the business and funding route.",
  },
];

export const values = [
  {
    icon: "grid" as const,
    title: "A More Organized Starting Point",
    body: "Understand the steps involved in moving from a business idea toward a structured operation.",
  },
  {
    icon: "layers" as const,
    title: "Support Across Multiple Stages",
    body: "Explore the relationship between business setup, strategic planning, and funding preparation.",
  },
  {
    icon: "target" as const,
    title: "Practical Next Steps",
    body: "Focus on identifying the actions most relevant to the business's current position.",
  },
  {
    icon: "compass" as const,
    title: "A Journey Built Around Your Goals",
    body: "Start with a discussion about what you want to achieve and which areas may require attention.",
  },
];

export const audiences = [
  {
    title: "Aspiring Entrepreneurs",
    body: "People exploring how to turn an idea into a structured business.",
    image: px(4173288, 900, 1100),
    imageAlt: "Entrepreneur thinking through a new business concept at a workbench",
    serviceSlug: "business-setup-formation",
    linkLabel: "Start with formation",
    note: "Proposed audience segment — pending confirmation",
  },
  {
    title: "New Business Owners",
    body: "Founders who need clarity around foundational setup and early planning.",
    image: px(3822844, 900, 1100),
    imageAlt: "New business owner working at a bench in an early-stage operation",
    serviceSlug: "business-planning-strategy",
    linkLabel: "Build the plan",
    note: "Proposed audience segment — pending confirmation",
  },
  {
    title: "Growing Businesses",
    body: "Established owners exploring their next stage of development or potential funding needs.",
    image: px(36765732, 900, 1100),
    imageAlt: "Established business owners meeting to review growth priorities",
    serviceSlug: "business-growth-development",
    linkLabel: "Plan the next stage",
    note: "Proposed audience segment — pending confirmation",
  },
];

/* ----------------------------------- FAQ ------------------------------------ */

export const faqs = [
  {
    q: "What does Ascent Consulting help with?",
    a: "Ascent Consulting focuses on supporting the business journey from setup through to funding preparation. The specific services available can be discussed based on your needs.",
  },
  {
    q: "Can you help me if I only have a business idea?",
    a: "Yes. The first step can be a discussion about your idea, goals, and the foundational steps you may need to explore before moving forward.",
  },
  {
    q: "Do you help with funding?",
    a: "The focus includes helping clients understand funding preparation and explore potential funding routes. Availability, eligibility, approval, and outcomes depend on individual circumstances and the relevant funding provider.",
  },
  {
    q: "Do I need an established business before reaching out?",
    a: "Not necessarily. You can start by discussing your current stage and the type of support you are looking for.",
  },
  {
    q: "What happens during an initial consultation?",
    a: "An initial conversation can help clarify your goals, current position, and potential next steps. Specific consultation arrangements should be confirmed with the team.",
  },
  {
    q: "How do I get started?",
    a: "Use the contact form or consultation request to share a little about your business and what you would like help with.",
  },
];

/* --------------------------------- Process ---------------------------------- */

export const processSteps = [
  {
    n: "01",
    title: "Initial Conversation",
    body: "Discuss the business, goals, and current situation. No preparation is required before this first conversation.",
  },
  {
    n: "02",
    title: "Understand Your Needs",
    body: "Identify priorities and areas that may require support — setup, planning, preparation, or growth.",
  },
  {
    n: "03",
    title: "Outline the Next Steps",
    body: "Develop a proposed direction based on your objectives, with the sequence of work made explicit.",
  },
  {
    n: "04",
    title: "Work Through the Priorities",
    body: "Address agreed-upon business setup, planning, or preparation tasks according to the actual engagement scope.",
  },
  {
    n: "05",
    title: "Review and Refine",
    body: "Revisit priorities as the business progresses and circumstances change, rather than following a fixed script.",
  },
];

/* --------------------------------- Resources -------------------------------- */

export type Article = {
  slug: string;
  title: string;
  category: "Starting a Business" | "Business Planning" | "Funding Preparation" | "Business Growth";
  excerpt: string;
  body: { heading?: string; text: string }[];
  image: string;
  imageAlt: string;
  draft: boolean;
};

const minutes = (a: Article) => Math.max(2, Math.round(a.body.reduce((s, b) => s + b.text.split(/\s+/).length, 0) / 210));
export const readingTime = minutes;

export const articles: Article[] = [
  {
    slug: "first-90-days-of-a-new-business",
    title: "The First 90 Days: Sequencing a New Business Without Overcommitting",
    category: "Starting a Business",
    excerpt:
      "A practical way to order early setup decisions so that structure, registration, and operations do not compete for the same week.",
    image: px(5951736, 1100, 750),
    imageAlt: "Owner working through early setup tasks at a desk with laptop and notebook",
    draft: true,
    body: [
      {
        heading: "Why sequencing matters",
        text: "Most early-stage confusion is not a shortage of information. It is a shortage of order. Structure decisions, registration steps, banking arrangements, and first-customer activity all feel urgent at once, and each one changes what the others require. Sequencing them removes most of the noise.",
      },
      {
        heading: "Days 1–30: define before you register",
        text: "Spend the first month writing down what the business actually is. Who it serves, what it sells, how revenue arrives, and which decisions depend on a structure choice. This short document becomes the reference point for every later conversation, including any funding discussion.",
      },
      {
        heading: "Days 31–60: complete the foundations",
        text: "With the definition in hand, work through the setup checklist in dependency order. Confirm requirements with the relevant authorities or advisers rather than assuming one route applies. Record what you completed and what remains open — the open items are usually the ones that block later progress.",
      },
      {
        heading: "Days 61–90: operate and observe",
        text: "Begin trading or delivering, even at small scale, and collect real information: what customers ask, what costs appear, where time goes. Ninety days of observed reality is a stronger base for a plan than ninety days of assumptions.",
      },
      {
        text: "This article is draft guidance for review. It does not constitute legal, tax, or regulated financial advice — confirm requirements applicable to your jurisdiction and circumstances with a qualified professional.",
      },
    ],
  },
  {
    slug: "business-plan-that-survives-contact",
    title: "Writing a Business Plan That Survives Contact With Reality",
    category: "Business Planning",
    excerpt:
      "Plans fail when they describe an ideal business. A useful plan describes the one you are running and the next three decisions you need to make.",
    image: px(6803532, 1100, 750),
    imageAlt: "Colleagues reviewing a business plan together during a working session",
    draft: true,
    body: [
      {
        heading: "Write for a reader who is skeptical",
        text: "Whether the reader is a partner, an adviser, or a funding provider, assume they will test every claim. A plan that explains its own assumptions is far more persuasive than one that presents conclusions without reasoning.",
      },
      {
        heading: "The six sections that carry the weight",
        text: "What you sell, to whom, how you reach them, what it costs to deliver, how revenue is recognized, and what you need next. Everything else is supporting detail. If those six are unclear, length will not help.",
      },
      {
        heading: "Attach numbers you can defend",
        text: "Use figures you can trace to a source: a quote, an invoice, a comparable listing, or an actual first sale. Where you are estimating, label it as an estimate and state the basis. This habit alone changes how a plan is received in a funding conversation.",
      },
      {
        heading: "End with a sequenced roadmap",
        text: "Close the plan with the next twelve months in phases, each with an outcome and a checkpoint. Readers want to see that the plan converts into action rather than stopping at ambition.",
      },
      {
        text: "Draft content for review. Figures, structures, and requirements vary by business and jurisdiction — validate before relying on them.",
      },
    ],
  },
  {
    slug: "funding-readiness-checklist",
    title: "The Funding Readiness Checklist: What to Organize Before You Ask",
    category: "Funding Preparation",
    excerpt:
      "A preparation checklist covering documentation, financial information, and the questions providers commonly explore — before any application begins.",
    image: px(5668489, 1100, 750),
    imageAlt: "Professional organizing written preparation notes ahead of a funding conversation",
    draft: true,
    body: [
      {
        heading: "Readiness is about organization, not optimism",
        text: "Providers differ widely in what they ask for. What they share is an expectation that the business can explain itself consistently across documents. Readiness means the story in your plan, your numbers, and your answers all agree.",
      },
      {
        heading: "Documents to gather early",
        text: "Registration or formation records, identification for owners, any existing agreements or contracts, financial records you hold, and a current summary of the business. Gathering these first prevents a stalled conversation later.",
      },
      {
        heading: "Know the amount and the use",
        text: "Be able to state how much you believe you need, what each part would be used for, and over what period. A specific, itemized answer reads as prepared; a round number with no breakdown reads as a guess.",
      },
      {
        heading: "Research routes before you commit time",
        text: "Lending, investment, and grant routes each carry different eligibility, documentation, and timelines. Comparing them on paper first means you spend application effort only where the fit is plausible.",
      },
      {
        text: "Informational draft content only. This checklist does not assess creditworthiness, confirm eligibility, or guarantee any funding outcome. Requirements are set by each provider.",
      },
    ],
  },
  {
    slug: "choosing-a-growth-priority",
    title: "Choosing One Growth Priority When Several Look Attractive",
    category: "Business Growth",
    excerpt:
      "A simple framework for ranking expansion options by impact, effort, and readiness — so the next stage is chosen deliberately, not reactively.",
    image: px(39205092, 1100, 750),
    imageAlt: "Team evaluating growth options together in a modern office",
    draft: true,
    body: [
      {
        heading: "List the options before ranking them",
        text: "New customers, new offers, new channels, new capacity, new geography. Write them down without judgment first. Most businesses are choosing between four or five real options and never articulate them side by side.",
      },
      {
        heading: "Score on three axes",
        text: "Impact if it works, effort and cost to attempt it, and readiness — whether the foundations required are already in place. Readiness is the axis most often skipped, and it is the one that quietly kills execution.",
      },
      {
        heading: "Pick one and set a checkpoint",
        text: "A single priority with a defined review date outperforms three priorities with none. Write the checkpoint into the calendar before starting, and decide in advance what evidence would tell you to continue or change course.",
      },
      {
        heading: "Connect the priority to funding timing",
        text: "If the chosen priority requires capital, work backward from the point where funds would be needed and identify what preparation must exist by then. Preparation started early is far less disruptive than preparation started late.",
      },
      {
        text: "Draft framework for review. Adapt scoring and checkpoints to your own operating context.",
      },
    ],
  },
];

export const resourceCategories = [
  "All",
  "Starting a Business",
  "Business Planning",
  "Funding Preparation",
  "Business Growth",
] as const;

/* --------------------------------- Quiz data -------------------------------- */

export type QuizOption = { value: string; label: string; detail?: string };
export type QuizStep = { id: string; label: string; hint: string; multi?: boolean; options: QuizOption[] };

export const quizSteps: QuizStep[] = [
  {
    id: "stage",
    label: "Where are you today?",
    hint: "Choose the option closest to your current position. You can refine this later.",
    options: [
      { value: "idea", label: "I have an idea", detail: "The business exists mostly as a concept so far." },
      { value: "setting-up", label: "I'm setting up my business", detail: "Foundational steps are in progress." },
      { value: "operating", label: "I already operate a business", detail: "You are trading or delivering today." },
      { value: "growing", label: "I'm looking to grow", detail: "The next stage is expansion or development." },
    ],
  },
  {
    id: "help",
    label: "What would you like help with?",
    hint: "Select every area that applies — up to three.",
    multi: true,
    options: [
      { value: "setup", label: "Understanding business setup" },
      { value: "plan", label: "Creating a clearer business plan" },
      { value: "organize", label: "Organizing information for funding discussions" },
      { value: "explore", label: "Exploring potential funding options" },
      { value: "next", label: "Identifying my next steps" },
    ],
  },
  {
    id: "priority",
    label: "What is your immediate priority?",
    hint: "Choose the goal you would want to reach first, then add any context.",
    options: [
      { value: "clarity", label: "Clarity on what to do first" },
      { value: "structure", label: "A structured, written plan" },
      { value: "readiness", label: "Being ready for a funding conversation" },
      { value: "momentum", label: "Momentum on an established business" },
    ],
  },
];

export const quizResults = {
  starting: {
    key: "starting",
    stage: "Starting Point",
    headline: "Review foundational business setup steps.",
    body: "Your answers point to the earliest stage of the journey. The most useful next work is defining the business clearly, then sequencing the setup steps that depend on those definitions.",
    focus: ["Business definition and objectives", "Setup sequence and checklist", "Open questions to confirm with advisers"],
    serviceSlug: "business-setup-formation",
  },
  planning: {
    key: "planning",
    stage: "Planning Stage",
    headline: "Clarify business objectives and organize a practical roadmap.",
    body: "You are past the concept and need direction you can work from. The next useful work is turning objectives, operations, and priorities into a phased plan with checkpoints.",
    focus: ["Business model and offer", "Phased 12-month roadmap", "Prioritized development actions"],
    serviceSlug: "business-planning-strategy",
  },
  preparation: {
    key: "preparation",
    stage: "Preparation Stage",
    headline: "Identify the information that may be needed for funding discussions.",
    body: "Your priority is a funding conversation. The next useful work is organizing business and financial information, and understanding what different routes typically ask for.",
    focus: ["Document and information checklist", "Organized business and financial summary", "Funding routes worth researching"],
    serviceSlug: "funding-preparation",
  },
  growth: {
    key: "growth",
    stage: "Growth Stage",
    headline: "Explore development priorities and potential next steps.",
    body: "The business is established. The next useful work is reviewing objectives against performance and ranking growth options by impact, effort, and readiness.",
    focus: ["Objectives review", "Ranked growth priorities", "Future funding timing"],
    serviceSlug: "business-growth-development",
  },
} as const;
