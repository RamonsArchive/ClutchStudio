
export type ActionState = {
  status: "INITIAL" | "PENDING" | "SUCCESS" | "ERROR";
  error: string | null;
  data: unknown | null;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
}
export type SplitTextType = {
    textSelectors: string[];
    type: "char" | "word" | "line";
    scrollTrigger?: {
      trigger: string;
      start: string;
      end: string;
      scrub: boolean;
      markers: boolean;
    };
    settings?: {
      duration: number;
    };
}


export enum ProjectTags {
  // Web Development
  "Web Design" = "Web Design",
  "Web Development" = "Web Development",
  "Web Hosting" = "Web Hosting",
  "Business Infrastructure" = "Business Infrastructure",
  "Project Management" = "Project Management",
  "SEO" = "SEO",
  "Accessibility" = "Accessibility",
  "Performance Optimization" = "Performance Optimization",
  "Responsive Design" = "Responsive Design",
  "User Experience" = "User Experience",
  "User Interface" = "User Interface",
  "Frontend Development" = "Frontend Development",
  "Backend Development" = "Backend Development",
  "Database Management" = "Database Management",
  "API Development" = "API Development",
  "Cloud Services" = "Cloud Services",
  "DevOps" = "DevOps",
  "Testing and QA" = "Testing and QA",
  "Version Control" = "Version Control",
  
  // Data Science
  "Data Analysis" = "Data Analysis",
  "Data Visualization" = "Data Visualization",
  "Statistical Modeling" = "Statistical Modeling",
  "Predictive Analytics" = "Predictive Analytics",
  "Business Intelligence" = "Business Intelligence",
  "ETL Pipelines" = "ETL Pipelines",
  "Data Mining" = "Data Mining",
  "Big Data Processing" = "Big Data Processing",
  "Python" = "Python",
  "R Programming" = "R Programming",
  "SQL" = "SQL",
  "Pandas" = "Pandas",
  "NumPy" = "NumPy",
  "Scikit-learn" = "Scikit-learn",
  "Jupyter Notebooks" = "Jupyter Notebooks",
  "Tableau" = "Tableau",
  "Power BI" = "Power BI",
  "Apache Spark" = "Apache Spark",
  
  // AI/Machine Learning
  "Artificial Intelligence" = "Artificial Intelligence",
  "Machine Learning" = "Machine Learning",
  "Deep Learning" = "Deep Learning",
  "Neural Networks" = "Neural Networks",
  "Computer Vision" = "Computer Vision",
  "Natural Language Processing" = "Natural Language Processing",
  "Image Recognition" = "Image Recognition",
  "Voice Recognition" = "Voice Recognition",
  "Speech Synthesis" = "Speech Synthesis",
  "Chatbots" = "Chatbots",
  "Recommendation Systems" = "Recommendation Systems",
  "Reinforcement Learning" = "Reinforcement Learning",
  "TensorFlow" = "TensorFlow",
  "PyTorch" = "PyTorch",
  "OpenAI API" = "OpenAI API",
  "Hugging Face" = "Hugging Face",
  "LLMs" = "LLMs",
  "Generative AI" = "Generative AI",
  "MLOps" = "MLOps",
  "Model Deployment" = "Model Deployment",
}


// Service category groupings for filtering
export const ServiceCategories = {
  "Web Development": [
    ProjectTags["Web Design"],
    ProjectTags["Web Development"],
    ProjectTags["Frontend Development"],
    ProjectTags["Backend Development"],
    ProjectTags["API Development"],
    ProjectTags["Database Management"],
    ProjectTags["Cloud Services"],
    ProjectTags["DevOps"],
    ProjectTags["SEO"],
    ProjectTags["Performance Optimization"],
    ProjectTags["Responsive Design"],
    ProjectTags["User Experience"],
    ProjectTags["User Interface"],
    ProjectTags["Testing and QA"],
    ProjectTags["Web Hosting"],
    ProjectTags["Business Infrastructure"],
  ],
  "Data Science": [
    ProjectTags["Data Analysis"],
    ProjectTags["Data Visualization"],
    ProjectTags["Statistical Modeling"],
    ProjectTags["Predictive Analytics"],
    ProjectTags["Business Intelligence"],
    ProjectTags["ETL Pipelines"],
    ProjectTags["Data Mining"],
    ProjectTags["Big Data Processing"],
    ProjectTags["Python"],
    ProjectTags["R Programming"],
    ProjectTags["SQL"],
    ProjectTags["Pandas"],
    ProjectTags["NumPy"],
    ProjectTags["Scikit-learn"],
    ProjectTags["Jupyter Notebooks"],
    ProjectTags["Tableau"],
    ProjectTags["Power BI"],
    ProjectTags["Apache Spark"],
  ],
  "AI Solutions": [
    ProjectTags["Artificial Intelligence"],
    ProjectTags["Machine Learning"],
    ProjectTags["Deep Learning"],
    ProjectTags["Neural Networks"],
    ProjectTags["Computer Vision"],
    ProjectTags["Natural Language Processing"],
    ProjectTags["Image Recognition"],
    ProjectTags["Voice Recognition"],
    ProjectTags["Speech Synthesis"],
    ProjectTags["Chatbots"],
    ProjectTags["Recommendation Systems"],
    ProjectTags["Reinforcement Learning"],
    ProjectTags["TensorFlow"],
    ProjectTags["PyTorch"],
    ProjectTags["OpenAI API"],
    ProjectTags["Hugging Face"],
    ProjectTags["LLMs"],
    ProjectTags["Generative AI"],
    ProjectTags["MLOps"],
    ProjectTags["Model Deployment"],
  ]
}


export const ProjectTypes = {
  WEB_DEVELOPMENT: "Web Development",
  DATA_SCIENCE: "Data Science", 
  AI_SOLUTIONS: "AI Solutions"
}

export const ProjectFilters = [
  { label: "All Projects", value: "all" },
  { label: "Web Development", value: ProjectTypes.WEB_DEVELOPMENT },
  { label: "Data Science", value: ProjectTypes.DATA_SCIENCE },
  { label: "AI Solutions", value: ProjectTypes.AI_SOLUTIONS }
]



export type ProjectTemplate = {
  id: string, // kebab-case unique identifier
  projectType: keyof typeof ProjectTypes, // Simple filter category
  text: {
    name: string, // Client/Project name
    subName: string, // Client/Project sub name
    title: string, // One-line description
    workDescription: string, // Technical/business focused description
    personalDescription: string, // Personal story/connection
  },
  tags: string[], // Technologies/services used
  images: {
    mainImage: string, // Hero image for the project
    galleryImages: string[] // Additional screenshots/images
  },
  websiteUrl: string, // Live website URL
  githubUrl: string, // GitHub repository if no live site
  dateCompleted: string, // YYYY-MM-DD format
  featured: boolean, // Show on homepage
  isClient: boolean, // Is the client a real person?
  status: "live" | "in-progress" | "archived" // live, in-progress, archived
}

export const ServiceType ={
  WEB_DEVELOPMENT: "Web Development",
  DATA_SCIENCE: "Data Science",
  AI_SOLUTIONS: "AI Solutions",
  OTHER: "Other",
}

export type ServiceStringType = keyof typeof ServiceType;

export type FromDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  service: string;
  organization: string;
  message: string;
}