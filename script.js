const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const navLinks = document.querySelectorAll(".desktop-nav a");
const sections = document.querySelectorAll("main section[id]");

const savedTheme = localStorage.getItem("zohaib-theme");
if (savedTheme === "dark") root.dataset.theme = "dark";

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("zohaib-theme", nextTheme);
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`);
});

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  if (mobileMenu) mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  if (mobileMenu) mobileMenu.hidden = open;
  document.body.classList.toggle("menu-open", !open);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -58% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".timeline-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".timeline-item");
    const wasOpen = item?.classList.contains("is-open");

    document.querySelectorAll(".timeline-item").forEach((timelineItem) => {
      timelineItem.classList.remove("is-open");
      timelineItem.querySelector(".timeline-trigger")?.setAttribute("aria-expanded", "false");
    });

    if (!wasOpen && item) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const publications = [...document.querySelectorAll(".publication")];
const publicationSearch = document.querySelector("[data-publication-search]");
const noResults = document.querySelector("[data-no-results]");
let activeFilter = "all";

const filterPublications = () => {
  const query = publicationSearch?.value.trim().toLowerCase() || "";
  let visible = 0;

  publications.forEach((publication) => {
    const matchesCategory = activeFilter === "all" || publication.dataset.category === activeFilter;
    const matchesQuery = !query || publication.dataset.search?.includes(query) || publication.textContent.toLowerCase().includes(query);
    publication.hidden = !(matchesCategory && matchesQuery);
    if (!publication.hidden) visible += 1;
  });

  if (noResults) noResults.hidden = visible !== 0;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
    filterPublications();
  });
});

publicationSearch?.addEventListener("input", filterPublications);

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const chatLauncher = document.querySelector("[data-chat-launcher]");
const chatAssistant = document.querySelector("[data-chat-assistant]");
const chatClose = document.querySelector("[data-chat-close]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatSuggestions = document.querySelector("[data-chat-suggestions]");

const chatKnowledge = [
  {
    id: "overview",
    keywords: ["who", "about", "overview", "profile", "background", "bio", "biography", "zohaib", "jan"],
    answer: "Dr. Muhammad Zohaib Jan is a PhD-qualified Enterprise AI and Data Executive with more than 15 years of experience across consulting, financial services, government, defence, higher education and research. He connects executive priorities with enterprise architecture, governance, capable teams and technically sound delivery.",
    links: [{ label: "Executive profile", href: "#about" }]
  },
  {
    id: "differentiator",
    keywords: ["different", "differentiator", "unique", "strength", "technical", "hands-on", "leader", "leadership", "executive", "strategy", "engineering"],
    answer: "Zohaib’s differentiator is that he has retained deep technical credibility while progressing into enterprise leadership. He can advise executives on strategy, governance and investment, then work constructively with architects and engineers on AI, data platforms, Python, SQL and solution design. His brand is: “Bridging Executive Strategy with Technical Excellence.”",
    links: [{ label: "Leadership approach", href: "#about" }]
  },
  {
    id: "current",
    keywords: ["current", "now", "ey", "ernst", "young", "consulting", "senior", "manager", "architect", "financial", "bank", "banking", "divestment"],
    answer: "Zohaib is currently a Senior Manager and AI Architect at EY Australia. He leads a distributed AI and Data pod supporting a major financial-services transformation, with responsibilities spanning data assurance, information governance, privacy, enterprise architecture and people leadership. Public descriptions are intentionally high-level to respect client confidentiality.",
    links: [{ label: "Experience", href: "#experience" }]
  },
  {
    id: "ai-data",
    keywords: ["ai", "artificial", "intelligence", "data", "architecture", "platform", "generative", "genai", "llm", "machine", "learning", "computer", "vision", "snowflake", "cloud"],
    answer: "His experience spans enterprise AI strategy, Generative AI and language models, machine learning, computer vision, data platforms, cloud architecture, intelligent document processing and production AI delivery. He combines this technical foundation with governance, stakeholder leadership, vendor management and transformation delivery.",
    links: [
      { label: "Selected impact", href: "#impact" },
      { label: "Research", href: "#research" }
    ]
  },
  {
    id: "qbcc",
    keywords: ["qbcc", "government", "regulation", "regulatory", "inspection", "licence", "license", "savings", "responsible", "governance", "vendor", "hiring"],
    answer: "At QBCC, Zohaib led enterprise data, AI, analytics, architecture and governance work in a regulated environment. He led internal staff and contractors, governed delivery partners, managed strategic relationships with Snowflake, Salesforce, Microsoft and AWS, and improved technical recruitment. A public inspection-transformation case reduced processing time from about four hours to one, with estimated annual operational savings of A$540,000.",
    links: [
      { label: "Leadership experience", href: "#experience" },
      { label: "Measured impact", href: "#impact" }
    ]
  },
  {
    id: "boeing",
    keywords: ["boeing", "defence", "defense", "edge", "synthetic", "computer", "vision", "research", "engineer", "engineering"],
    answer: "At Boeing Defence Australia, Zohaib provided technical leadership on high-assurance AI research and development involving computer vision, edge AI and synthetic data. He guided delivery, supported technical risk and hiring, and mentored graduate and intermediate engineers across multidisciplinary teams.",
    links: [{ label: "Career journey", href: "#experience" }]
  },
  {
    id: "outcomes",
    keywords: ["impact", "outcome", "result", "achievement", "saving", "value", "benefit", "prototype", "40", "540", "75"],
    answer: "Publicly shareable outcomes include reducing an inspection and reporting process from about four hours to one, with estimated annual savings of A$540,000; helping reduce incomplete licence-review submissions by approximately 40%; and establishing reusable AI capability that shortened prototype cycles to roughly two to three days.",
    links: [{ label: "See selected impact", href: "#impact" }]
  },
  {
    id: "research",
    keywords: ["research", "publication", "publications", "paper", "papers", "phd", "scholar", "academic", "ensemble", "explainable", "industry", "journal", "conference"],
    answer: "Zohaib holds a PhD in Artificial Intelligence and Image Processing and has authored or co-authored more than 30 peer-reviewed publications. His research spans ensemble learning, optimisation, deep learning, computer vision, explainable AI, Industry 4.0 and applied enterprise AI.",
    links: [
      { label: "Selected publications", href: "#research" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=_gj3lH3YUVoC&hl=en", external: true }
    ]
  },
  {
    id: "speaking",
    keywords: ["speak", "speaker", "speaking", "keynote", "lecture", "university", "topic", "conference", "panel", "guest"],
    answer: "Zohaib is regularly invited by universities as a guest speaker. Suitable topics include enterprise AI strategy, responsible AI in regulated environments, leading technical teams at scale, and turning research insight into operational value.",
    links: [
      { label: "Speaking topics", href: "#speaking" },
      { label: "Discuss an invitation", href: "#contact" }
    ]
  },
  {
    id: "industries",
    keywords: ["industry", "industries", "sector", "sectors", "consulting", "banking", "financial", "government", "defence", "defense", "education", "academic"],
    answer: "His career spans consulting, financial services and banking, government and regulation, defence, higher education and applied research. That breadth supports a pragmatic enterprise perspective across strategy, risk, technology and operations.",
    links: [{ label: "Explore experience", href: "#experience" }]
  },
  {
    id: "governance",
    keywords: ["governance", "responsible", "risk", "privacy", "security", "assurance", "regulation", "regulated", "nda", "confidential"],
    answer: "Governance is central to Zohaib’s work. His experience includes Responsible AI, privacy, information governance, data assurance, architecture controls and high-assurance delivery in regulated financial-services, government and defence environments. Confidential client details are deliberately excluded from this assistant.",
    links: [{ label: "NDA-safe impact", href: "#impact" }]
  },
  {
    id: "teams",
    keywords: ["team", "teams", "people", "manage", "management", "mentor", "mentoring", "hire", "hiring", "recruit", "offshore", "onshore"],
    answer: "Zohaib has led multidisciplinary teams across onshore and offshore locations, including work allocation, mentoring, recruitment, performance development and delivery oversight. He has also designed structured technical-assessment practices and mentored engineers at different career stages.",
    links: [{ label: "Leadership experience", href: "#experience" }]
  },
  {
    id: "contact",
    keywords: ["contact", "connect", "email", "linkedin", "reach", "hire", "opportunity", "recruiter", "advisory", "collaboration"],
    answer: "The best way to start a professional conversation is through Zohaib’s LinkedIn profile. He welcomes relevant executive opportunities, advisory discussions, research collaboration and speaking enquiries.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zohaibjan/", external: true },
      { label: "Contact options", href: "#contact" }
    ]
  },
  {
    id: "cdaio",
    keywords: ["cdaio", "cdao", "chief", "future", "career", "goal", "director", "head", "executive"],
    answer: "Zohaib’s career is positioned toward enterprise-wide Data and AI leadership, including Director, Head of Data and AI, and future Chief Data & AI Officer responsibilities. The emphasis is on capable teams, strong governance, sound technology decisions and sustainable organisational value—not title alone.",
    links: [{ label: "Executive profile", href: "#about" }]
  }
];

const privateQuestionPattern = /\b(client name|bank name|unisys|internal platform|dap\b|free text scanning|salary|compensation|home address|phone number|security clearance|classified|confidential|nda details?|private data|personal data)\b/i;
const stopWords = new Set(["a", "an", "and", "are", "about", "can", "could", "do", "does", "for", "he", "his", "how", "i", "in", "is", "me", "of", "on", "the", "tell", "to", "what", "where", "who", "with", "you"]);

const normaliseQuestion = (value) => value
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\s-]/gu, " ")
  .split(/\s+/)
  .filter((token) => token && !stopWords.has(token));

const findChatAnswer = (question) => {
  if (privateQuestionPattern.test(question)) {
    return {
      answer: "I can’t provide private, confidential or NDA-protected information. I can share Zohaib’s approved public experience, research, leadership approach and contact options instead.",
      links: [{ label: "View public profile", href: "#about" }]
    };
  }

  const tokens = normaliseQuestion(question);
  const scored = chatKnowledge
    .map((entry) => {
      const keywordMatches = tokens.filter((token) =>
        entry.keywords.some((keyword) => keyword === token || keyword.startsWith(token) || token.startsWith(keyword))
      ).length;
      const phraseBoost = entry.keywords.some((keyword) => question.toLowerCase().includes(keyword)) ? 1 : 0;
      return { entry, score: keywordMatches * 2 + phraseBoost };
    })
    .sort((a, b) => b.score - a.score);

  if (!scored[0] || scored[0].score < 2) {
    return {
      answer: "I don’t have enough verified public information to answer that confidently. Try asking about Zohaib’s leadership experience, AI and data work, research, speaking topics or professional contact options.",
      links: [
        { label: "Executive profile", href: "#about" },
        { label: "Contact", href: "#contact" }
      ]
    };
  }

  return scored[0].entry;
};

const appendChatMessage = (text, sender, links = []) => {
  if (!chatMessages) return;
  const article = document.createElement("article");
  article.className = `chat-message is-${sender}`;

  if (sender === "assistant") {
    const avatar = document.createElement("span");
    avatar.className = "chat-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "ZJ";
    article.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);

  if (links.length) {
    const linkGroup = document.createElement("div");
    linkGroup.className = "chat-answer-links";
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.external) {
        anchor.target = "_blank";
        anchor.rel = "noopener";
      } else {
        anchor.addEventListener("click", closeChat);
      }
      linkGroup.appendChild(anchor);
    });
    bubble.appendChild(linkGroup);
  }

  article.appendChild(bubble);
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

function openChat() {
  if (!chatAssistant || !chatLauncher) return;
  chatAssistant.hidden = false;
  chatLauncher.hidden = true;
  chatLauncher.setAttribute("aria-expanded", "true");
  window.setTimeout(() => chatInput?.focus(), 80);
}

function closeChat() {
  if (!chatAssistant || !chatLauncher) return;
  chatAssistant.hidden = true;
  chatLauncher.hidden = false;
  chatLauncher.setAttribute("aria-expanded", "false");
  chatLauncher.focus();
}

const askChatQuestion = (question) => {
  const cleanedQuestion = question.trim();
  if (!cleanedQuestion) return;
  appendChatMessage(cleanedQuestion, "user");
  const response = findChatAnswer(cleanedQuestion);
  window.setTimeout(() => appendChatMessage(response.answer, "assistant", response.links || []), 180);
};

chatLauncher?.addEventListener("click", openChat);
chatClose?.addEventListener("click", closeChat);
chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!chatInput) return;
  askChatQuestion(chatInput.value);
  chatInput.value = "";
});

chatSuggestions?.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => askChatQuestion(button.textContent || ""));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatAssistant && !chatAssistant.hidden) closeChat();
});
