export type NavItem = {
  label: string;
  href: string;
};

export type JourneyItem = {
  title: string;
  description: string;
  stack: string[];
  side: "left" | "right";
};

export type Service = {
  title: string;
  description: string;
  image: string;
  included: string[];
  tools: string[];
  price: string;
  whatsappMessage: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string | null;
  demo?: string | null;
  featured?: boolean;
};

export type Presentation = {
  title: string;
  description: string;
  image: string;
  viewUrl?: string | null;
  watchUrl?: string | null;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const journey: JourneyItem[] = [
  {
    title: "Python Foundations",
    description: "Built a solid base in logic, syntax, and disciplined problem solving.",
    stack: ["Python", "OOP", "Core Logic"],
    side: "left",
  },
  {
    title: "Problem Solving",
    description: "Learned to decompose problems and turn complexity into clear executable steps.",
    stack: ["Algorithms", "Data Structures", "Debugging"],
    side: "right",
  },
  {
    title: "Web Development",
    description: "Transitioned from scripts to practical interfaces and automation-driven workflows.",
    stack: ["HTML", "CSS", "Flask", "JavaScript"],
    side: "left",
  },
  {
    title: "Data & Automation",
    description: "Applied Python to real-world data, cleanup, and repeatable operational tasks.",
    stack: ["Pandas", "Excel", "Automation", "Scraping"],
    side: "right",
  },
  {
    title: "Machine Learning",
    description: "Explored model fundamentals, experimentation, and practical ML workflows.",
    stack: ["Scikit-learn", "NumPy", "Matplotlib", "Evaluation"],
    side: "left",
  },
  {
    title: "Backend + AI Direction",
    description: "Now building toward backend foundations and AI-powered systems with real-world impact.",
    stack: ["C#", "SQL", ".NET", "AI Systems"],
    side: "right",
  },
];

export const services: Service[] = [
  {
    title: "Web Scraping",
    description: "Extract structured data from websites and turn scattered information into organized, usable datasets.",
    image: "/MyPortfolio/images/services/WebScrapping.jpg",
    included: ["Data extraction", "Cleaning", "Duplicate removal", "CSV / Excel export"],
    tools: ["Python", "Pandas", "BeautifulSoup"],
    price: "$10",
    whatsappMessage: "Hi Essam, I’d like to discuss your Web Scraping service.",
  },
  {
    title: "Python Automation",
    description: "Automate repetitive work, remove manual bottlenecks, and improve reliability across business processes.",
    image: "/MyPortfolio/images/services/Automation.jpg",
    included: ["Task automation", "Workflow design", "Script deployment", "Monitoring"],
    tools: ["Python", "Selenium", "Playwright"],
    price: "$5",
    whatsappMessage: "Hi Essam, I’d like to discuss your Python Automation service.",
  },
  {
    title: "Data Cleaning",
    description: "Normalize messy records, remove inconsistencies, and prepare clean data for analysis or systems integration.",
    image: "/MyPortfolio/images/services/DataCleaninng.jpg",
    included: ["Validation", "Standardization", "Deduplication", "Data preparation"],
    tools: ["Python", "Pandas", "Excel", "CSV"],
    price: "$10",
    whatsappMessage: "Hi Essam, I’d like to discuss your Data Cleaning service.",
  },
  {
    title: "Data Processing",
    description: "Transform raw records into structured outputs for reporting, operations, and downstream products.",
    image: "/MyPortfolio/images/services/DataProceessing.jpg",
    included: ["Raw data handling", "Transformation", "Output structuring", "Reporting support"],
    tools: ["Python", "Pandas", "NumPy"],
    price: "$10",
    whatsappMessage: "Hi Essam, I’d like to discuss your Data Processing service.",
  },
  {
    title: "Excel / CSV Data Preparation",
    description: "Clean and format spreadsheets into dependable datasets that are ready for use and sharing.",
    image: "/MyPortfolio/images/services/Data Preparation.jpg",
    included: ["Sheet cleanup", "Formatting", "Table conversion", "Dataset readiness"],
    tools: ["Excel", "CSV", "Python", "Pandas"],
    price: "$10",
    whatsappMessage: "Hi Essam, I’d like to discuss your Excel / CSV Data Preparation service.",
  },
  {
    title: "Scraping → Cleaning → Processing",
    description: "A complete pipeline that turns raw internet data into ready-to-use structured information.",
    image: "/MyPortfolio/images/services/Final.jpg",
    included: ["Extraction", "Cleaning", "Processing", "Final dataset delivery"],
    tools: ["Python", "BeautifulSoup", "Pandas", "Excel"],
    price: "$10",
    whatsappMessage: "Hi Essam, I’d like to discuss your Scraping → Cleaning → Processing service.",
  },
];

export const featuredProject: Project = {
  title: "Yelp Business Data Scraping & Processing Platform",
  description:
    "Built a Streamlit tool that collects Yelp data by search term, city, and pages, then cleans, removes duplicates, sorts by ratings and reviews, and exports the results to Excel.",
  image: "/MyPortfolio/images/projects/Yelp.jpg",
  technologies: ["Python", "Scraping", "Pandas", "Data Cleaning", "Automation"],
  github: "https://github.com/Es5am/Yelp-Leads-Scraper-1",
  demo: "https://es5am.github.io/Yelp-Leads-Scraper-Show/",
  featured: true,
};

export const projectCollection: Project[] = [
  {
    title: "Books Website Scraper",
    description: "Collected structured book information and organized it for easier review and dataset use.",
    image: "/MyPortfolio/images/projects/Books.jpg",
    technologies: ["Python", "BeautifulSoup", "Scraping"],
    github: "https://github.com/Es5am/Problem-Solving/tree/main/Advanced%20Applications/Beautiful_Soup/2",
    demo: "https://youtu.be/0oA5OjNWBRI",
  },
  {
    title: "Jobs Website Scraper",
    description: "A collection of Python scraping projects focused on collecting, cleaning, organizing, and exporting website data.",
    image: "/MyPortfolio/images/projects/Job_Scrapper.png",
    technologies: ["Python", "Selenium", "Automation"],
    github: "https://github.com/Es5am/Problem-Solving/tree/main/Advanced%20Applications/Beautiful_Soup/1",
    demo: "https://youtu.be/8d3NRzr2LBE",
  },
  {
    title: "Web Scraping & Automation Scripts",
    description: "Practical scripts focused on gathering, transforming, and structuring business and web data.",
    image: "/MyPortfolio/images/projects/Other Web Scraping .png",
    technologies: ["Python", "Data Processing", "Automate"],
    github: "https://github.com/Es5am/Problem-Solving/tree/main/Advanced%20Applications/Selenium/Bot_With_OOP",
    demo: "https://youtu.be/Q1XEKvbi8H8",
  },
];

export const flaskProject: Project = {
  title: "Flask Project",
  description: "Built a Flask application connecting Python logic with HTML, CSS, JavaScript, and Jinja to create a dynamic web interface.",
  image: "/MyPortfolio/images/projects/Flask.png",
  technologies: ["Python", "Flask", "Jinja", "HTML", "CSS", "JavaScript"],
  github: "https://github.com/Es5am/Problem-Solving/tree/main/Advanced%20Applications/Flask",
  demo: "https://youtu.be/uGrkI1oevZY",
};

export const mlTopics = [
  "Machine Learning Fundamentals",
  "Supervised Learning",
  "Unsupervised Learning",
  "Linear Regression",
  "Polynomial Regression",
  "Classification",
  "Decision Trees",
  "KNN",
  "SVM",
  "Overfitting",
  "Underfitting",
  "Train/Test Split",
  "Feature Scaling",
  "Model Evaluation",
];

export const problemSolvingLinks = {
  github: null,
  leetcode: null,
};

export const academicProject: Project = {
  title: "Academic Programming Projects",
  description: "Python, Java, OOP, and programming fundamentals projects developed through academic practice.",
  image: "/MyPortfolio/images/projects/automation-scripts.svg",
  technologies: ["Python", "Java", "OOP", "Programming Fundamentals"],
  github: "https://github.com/Es5am/Academic-Programming-Projects",
  demo: "https://es5am.github.io/Academic-Programming-Show/",
};

export const machineLearningProject: Project = {
  title: "Machine Learning — Practical Work",
  description: "Currently applying ML concepts through DEPI assignments and practical implementations.",
  image: "/MyPortfolio/images/ml/malern.jpg",
  technologies: ["Python", "NumPy", "Pandas", "Scikit-learn"],
  github: "https://github.com/Es5am/Machine-Learning/tree/main",
  demo: "https://es5am.github.io/Machine-Learning-Show/",
};

export const leetcodeProject: Project = {
  title: "LeetCode Problem Solving",
  description: "Solved around 25 LeetCode problems with explanations, focusing on algorithms, data structures, and breaking problems into smaller steps.",
  image: "/MyPortfolio/images/projects/automation-scripts.svg",
  technologies: ["Algorithms", "Data Structures", "LeetCode"],
  github: "https://github.com/Es5am/Problem-Solving",
  demo: "https://es5am.github.io/Problem-Solving-Show/",
};

export const academicProjects = [
  "Python projects",
  "Java projects",
  "OOP assignments",
  "Programming fundamentals",
];

export const presentations: Presentation[] = [
  {
    title: "College Presentation",
    description: "A visual college presentation where I focused on organizing information clearly and presenting ideas through a structured and engaging design.",
    image: "/MyPortfolio/images/presentations/collage.jpg",
    viewUrl: "https://drive.google.com/drive/folders/1qUIoBp0YdhArFyYAsp0q7ywM-_4prGVn",
    watchUrl: "https://youtu.be/_rBBqCiaoD4",
  },
  {
    title: "Scholarship Presentation",
    description: "A scholarship presentation where I combined clear content with strong visual design to communicate in an organized and engaging way.",
    image: "/MyPortfolio/images/presentations/Scolar.jpg",
    viewUrl: "https://drive.google.com/drive/folders/1eNuwQ2vkNdCjWr3-6DGbK_pR48IBckMH",
    watchUrl: "https://youtu.be/ej0hjLsC2jM",
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Programming", items: ["Python", "Java", "C# — Learning"] },
  { title: "AI & Machine Learning", items: ["Machine Learning", "Scikit-learn", "Regression", "Classification", "Decision Trees", "KNN", "SVM"] },
  { title: "Data", items: ["Pandas", "NumPy", "Excel", "CSV"] },
  { title: "Data Visualization", items: ["Matplotlib", "Seaborn"] },
  { title: "Web Scraping & Automation", items: ["BeautifulSoup", "Selenium", "Playwright"] },
  { title: "Web Development", items: ["HTML", "CSS", "Bootstrap", "Flask", "Jinja", "Streamlit"] },
  { title: "Development", items: ["Git", "GitHub"] },
  { title: "Software Engineering", items: ["OOP", "Data Structures", "Problem Solving", "Clean Code", "SOLID", "Software Design Principles"] },
  { title: "Databases", items: ["SQLite"] },
];

export const exploredTech = ["Java", "Flask", "HTML", "CSS", "Bootstrap", "SQLite", "Streamlit"];

export const contactLinks = {
  github: "https://github.com/Es5am",
  linkedin: "https://www.linkedin.com/in/essam-mohamed-07b6603b5/",
  email: "mailto:essammohamedam7@gmail.com",
  whatsapp: "https://wa.me/201286335919",
};

export const whatsappNumber = "201286335919";

export const profileImage = "/MyPortfolio/images/profile/1600.jpg";

export const mlImage = "/MyPortfolio/images/ml/malern.jpg";
