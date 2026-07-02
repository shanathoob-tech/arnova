export interface ModuleData {
  name: string;
  abbreviation?: string;
  semester: string;
  description: string;
  details: string[];
  priceRange: string;
}

export const moduleMap: Record<string, ModuleData> = {
  "programming": {
    name: "Programming",
    semester: "1st Semester",
    description: "Get original solutions for HND Programming assignments. We provide clean, commented code in Java, C#, or Python, along with comprehensive design, implementation, and testing documentation.",
    details: ["Algorithms and flowcharts", "Procedural and Object-Oriented Programming", "IDE implementation and debugging", "Unit testing and test-case reports"],
    priceRange: "Rs. 6,000 - Rs. 10,000"
  },
  "database-design-development": {
    name: "Database Design & Development",
    abbreviation: "DDD",
    semester: "1st Semester",
    description: "Professional database assignment support. Our team helps construct fully normalized ERDs, schema designs, and complex SQL scripts for Pearson BTEC HND Database Design & Development.",
    details: ["Entity Relationship Diagrams (ERDs)", "1NF, 2NF, and 3NF normalization", "SQL DDL and DML query scripts", "Database administration and testing reports"],
    priceRange: "Rs. 6,000 - Rs. 10,000"
  },
  "professional-practice": {
    name: "Professional Practice",
    abbreviation: "PP",
    semester: "1st Semester",
    description: "Score a Distinction in your Professional Practice assignment. We provide customized CPD plans, training event outlines, and structured reports reflecting BTEC rubrics.",
    details: ["Continuous Professional Development (CPD) plans", "WBS (Work Breakdown Structure) & Gantt charts", "Communication and interpersonal skills audits", "Training event planning and execution reports"],
    priceRange: "Rs. 5,000 - Rs. 9,000"
  },
  "networking": {
    name: "Networking",
    semester: "1st Semester",
    description: "Clear BTEC HND Networking assignments with ease. We design network topologies, construct Cisco Packet Tracer mockups, and write extensive structural reports.",
    details: ["Network topologies and architectures", "IP addressing schemas (IPv4 & IPv6 subnets)", "Cisco Packet Tracer simulation files", "Network security and device configurations"],
    priceRange: "Rs. 6,000 - Rs. 10,000"
  },
  "planning-computer-project": {
    name: "Planning A Computer Project",
    abbreviation: "PACP",
    semester: "2nd Semester",
    description: "Comprehensive support for Planning A Computer Project assignments. We develop detailed project scopes, feasibility studies, risk matrices, and resource allocation plans.",
    details: ["Project scope statement & feasibility studies", "Gantt charts & Critical Path Method (CPM)", "Risk management plans & impact matrices", "Resource allocation & cost estimates"],
    priceRange: "Rs. 6,500 - Rs. 10,500"
  },
  "security": {
    name: "Security",
    semester: "2nd Semester",
    description: "Solid security reports and vulnerability scans. Our tutors guide you through security policy audits, risk assessments, and firewall/encryption designs.",
    details: ["Risk assessment methodologies", "Vulnerability scans & threat modeling", "Security policy drafts & disaster recovery plans", "Encryption mechanisms (symmetric & asymmetric)"],
    priceRange: "Rs. 4,000 - Rs. 8,000"
  },
  "software-development-lifecycle": {
    name: "Software Development Lifecycle",
    abbreviation: "SDLC",
    semester: "2nd Semester",
    description: "Expert software lifecycle assignments. We structure comparative studies between Agile, Waterfall, and Spiral, and map UML design specifications.",
    details: ["SDLC model comparisons (Agile, Scrum, Waterfall)", "Feasibility studies & requirements gathering (SRS)", "UML Use Cases, Class & Sequence diagrams", "Quality assurance (QA) and testing methods"],
    priceRange: "Rs. 7,000 - Rs. 11,000"
  },
  "web-development-designing": {
    name: "Web Development & Designing",
    abbreviation: "WDD",
    semester: "2nd Semester",
    description: "Premium Web Development & Designing support. Get custom, responsive website files using modern HTML, CSS, JavaScript, and frameworks alongside thorough design documentation.",
    details: ["UI/UX wireframes & Figma prototypes", "HTML5, CSS3, & responsive layouts", "Client-side & server-side JavaScript", "Web hosting, optimization, & accessibility audits"],
    priceRange: "Rs. 8,000 - Rs. 12,000"
  },
  "business-process-support": {
    name: "Business Process Support",
    abbreviation: "BPS",
    semester: "3rd Semester",
    description: "BTEC BPS assignment help. We analyze how technology integrates with business strategies, design data flows (DFDs), and compile strategic process improvement plans.",
    details: ["Business process modeling (BPMN)", "Data Flow Diagrams (DFD) & system mockups", "ERP and CRM integration studies", "Business intelligence and strategy audits"],
    priceRange: "Rs. 6,500 - Rs. 10,500"
  },
  "computing-research-project-1": {
    name: "Computing Research Project (Part 1)",
    abbreviation: "CRP 1",
    semester: "3rd Semester",
    description: "Expert assistance for Computing Research Project Part 1. We help you draft proposals, choose methodologies, design questionnaires, and execute preliminary research.",
    details: ["Literature reviews & academic citation", "Quantitative & qualitative research methodologies", "Questionnaire & interview questionnaire design", "Research project proposal & timeline drafts"],
    priceRange: "Rs. 6,000 - Rs. 10,000"
  },
  "user-experience-interface-design": {
    name: "User Experience & Interface Design",
    abbreviation: "UEID",
    semester: "3rd Semester",
    description: "Get high-end UX/UI designs for your assignment. We create personas, empathy maps, wireframes, high-fidelity prototypes in Figma, and usability test reports.",
    details: ["User research & empathy mapping", "Information architecture & wireframing", "Figma interactive prototyping", "Heuristic evaluations & usability testing"],
    priceRange: "Rs. 6,000 - Rs. 11,000"
  },
  "systems-analysis-design": {
    name: "Systems Analysis & Design",
    abbreviation: "SAD",
    semester: "3rd Semester",
    description: "Pearson BTEC HND SAD assignment support. We construct data flow diagrams, system requirements specifications (SRS), use cases, and transition designs.",
    details: ["Requirements engineering & specifications (SRS)", "Structured Systems Analysis Method (SSADM)", "System flowcharts & Data Flow Diagrams (DFDs)", "Input/output screen designs & data dictionary"],
    priceRange: "Rs. 7,000 - Rs. 11,000"
  },
  "data-structures-algorithms": {
    name: "Data Structures & Algorithms",
    abbreviation: "DSA",
    semester: "4th Semester",
    description: "Get distinction-grade help with DSA. We implement standard algorithms, measure Big-O time complexity, and construct comparative graphs of structures in Java or C++.",
    details: ["Arrays, Lists, Stacks, Queues, Trees, and Graphs", "Sorting & searching algorithm implementations", "Big-O space & time complexity analysis", "Comparative analysis reports & code optimization"],
    priceRange: "Rs. 8,000 - Rs. 12,000"
  },
  "computing-research-project-2": {
    name: "Computing Research Project (Part 2)",
    abbreviation: "CRP 2",
    semester: "4th Semester",
    description: "Excel in your CRP 2 final paper. We write extensive research reports, analyze collected data, create charts/visualizations, and validate hypotheses.",
    details: ["SPSS & qualitative data analysis", "Research findings, discussions & conclusions", "Proper Harvard/APA citation & bibliography", "Academic poster & presentation slides"],
    priceRange: "Rs. 8,000 - Rs. 12,000"
  },
  "discrete-maths": {
    name: "Discrete Maths",
    abbreviation: "DM",
    semester: "4th Semester",
    description: "Guaranteed support for HND Discrete Mathematics. We help solve set theory proofs, logic gates, graph theory problems, and probability equations with clear step-by-step math.",
    details: ["Set theory, relations, and functions", "Propositional logic & truth tables", "Graph theory, paths, and trees", "Combinatorics and probability calculations"],
    priceRange: "Rs. 12,000 - Rs. 16,000"
  },
  "applied-programming-design-principles": {
    name: "Applied Programming & Design Principles",
    abbreviation: "APDP",
    semester: "4th Semester",
    description: "Expert solutions for APDP. We implement design patterns (Singleton, Factory, MVC, etc.), write clean modular code, and document structural design practices.",
    details: ["Creational, Structural, & Behavioral design patterns", "SOLID programming principles", "MVC/MVVM architectural design", "Refactoring reports & clean code audits"],
    priceRange: "Rs. 8,000 - Rs. 12,000"
  }
};
