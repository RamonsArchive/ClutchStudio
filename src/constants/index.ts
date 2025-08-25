import { ProjectTemplate, ServiceType } from "../types/GlobalTypes";

export const navLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Contact",
        href: "/contact",
    }
]

export const HeroData = {
    HeroVideo: "/Assets/HeroContent/soccerGoal.mp4",
   
}


// projects
export const GoldenEagle: ProjectTemplate = {
    id: "golden-eagle-estates",
    projectType: "WEB_DEVELOPMENT",
    text: {
      name: "Golden Eagle Estates",
      subName: "A do everything construction company",
      title: "Building a complete digital transformation and infrastructure for a do everything construction company, Golden Eagle Estates",
      workDescription: "I built a comprehensive, full-stack business platform for Golden Eagle Construction & Remodeling using Next.js 15, React 19, and TypeScript. The project includes a complete admin dashboard for project management, customer inquiry handling, and content management, all powered by a robust MySQL database with Prisma ORM. I implemented advanced features like AWS S3 integration for media storage, rate limiting with Upstash Redis, JWT authentication for secure admin access, and a sophisticated project ticket system that tracks construction projects from initial inquiry to completion. The site features responsive design with GSAP animations, smooth scrolling with Lenis, and comprehensive SEO optimization. I also built custom server actions for form handling, integrated Sentry for error monitoring, and deployed everything on Vercel with automatic CI/CD.",
      personalDescription: "After seeing a story I posted about another website, a friend from Golden Eagle reached out asking if I could create something similar. Having played soccer with this friend for four years and witnessing the incredible work ethic he brings to the company through the project photos he'd share, I knew I had to deliver something special. Originally, they wanted a simple gallery website to showcase their skills, but I went the extra mile and created a complete backend infrastructure that transformed their entire business operations. I built this massive admin dashboard that handles everything from project tickets and job applications to testimonials and content management - it's basically a full business management system disguised as a website. The most challenging part was designing the database schema to handle all their different services (bathroom remodels, kitchen remodels, custom homes, etc.) and building the admin interface that their team could actually use without getting overwhelmed. I integrated AWS S3 for all their project photos, built a sophisticated project tracking system, and added all these enterprise-level features like rate limiting and error monitoring. It's crazy to think this started as a simple request for a gallery site and turned into a complete digital transformation of their business infrastructure. The best part was seeing how excited they were when I showed them everything it could do - it's one thing to build a website, but building something that actually makes running a business easier is incredibly rewarding.",
    },
    tags: ["Web Design", "Web Development", "Full-Stack Development", "Next.js 15", "React 19", "TypeScript", "MySQL", "Prisma ORM", "AWS S3", "Admin Dashboard", "Business Infrastructure", "Project Management", "JWT Authentication", "Rate Limiting", "GSAP Animations"],
    images: {
      mainImage: "/Projects/GoldenEagle/goldenEagleImage.jpg",
      galleryImages: [
        "/Projects/GoldenEagle/goldenEagleImage1.png",
        "/Projects/GoldenEagle/goldenEagleImage2.png",
        "/Projects/GoldenEagle/goldenEagleImage3.png",
        "/Projects/GoldenEagle/goldenEagleImage4.png",
        "/Projects/GoldenEagle/goldenEagleImage5.png",
      ]
    },
    websiteUrl: "https://goldeneagle.one",
    githubUrl: "", // if website url is not present, use github url
    dateCompleted: "2025-08-12",
    featured: true,
    isClient: true,
    isWebsite: true,
    status: "live" // live, in-progress, archived
  }

export const Relay: ProjectTemplate ={
    id: "relay",
    projectType: "WEB_DEVELOPMENT",
    text: {
        name: "Relay",
        subName: "An e-commerce platform for the 21st century",
        title: "Developed a modern full-stack e-commerce platform to meet the evolving needs of contemporary online businesses",
        workDescription: "I expanded my knowledge of e-commerce platforms by creating a modern, scalable solution that prioritizes ease of use and maintainability. I leveraged cutting-edge tools and deepened my understanding of API integration and best practices to implement a robust payment system, accurate shipping estimates, and efficient database storage via Sanity CMS. Additionally, I utilized Next.js, Tailwind CSS, and Shadcn UI to craft a modern, responsive, and intuitive user interface that delivers an exceptional shopping experience.",
        personalDescription: "I wanted to challenge myself with a real-world e-commerce project that would push my full-stack skills to the next level. This wasn't just about building another shopping site - I wanted to tackle the complex challenges of hybrid database architecture, real-time inventory syncing between Sanity CMS and MySQL, and implementing production-ready features like Stripe payments, EasyPost shipping, and Google Maps tax calculations. The project taught me so much about modern web development: from Next.js 15's App Router and React 19's latest features, to the intricacies of OAuth authentication, rate limiting with Upstash Redis, and building a robust promo code system. What started as a learning project became a comprehensive platform that handles everything from product management to order fulfillment. The most rewarding part was seeing how all these pieces came together - the Sanity webhooks syncing with MySQL, the Stripe checkout flow, and the real-time inventory updates. It's amazing how much you can learn when you're not afraid to tackle complex problems head-on!",
    },
    tags: ["Web Design", "Web Development", "Web Hosting", "Business Infrastructure", "Project Management"],
    images: {
        mainImage: "/Projects/Relay/SocialMedia/relaySocialPostImage.jpg",
        galleryImages: [
            "/Projects/Relay/relayImage1.png",
            "/Projects/Relay/relayImage6.png",
            "/Projects/Relay/relayImage7.png",
            "/Projects/Relay/relayImage2.png",
            "/Projects/Relay/relayImage3.png",
            "/Projects/Relay/relayImage4.png",
            "/Projects/Relay/relayImage5.png",
        ]
    },
    websiteUrl: "https://relay-liart.vercel.app",
    githubUrl: "", // if website url is not present, use github url
    dateCompleted: "2025-06-23",
    featured: true,
    isClient: true,
    isWebsite: true,
    status: "live" // live, in-progress, archived
}

export const YoloV8: ProjectTemplate = {
    id: "yolo-v8",
    projectType: "AI_SOLUTIONS",
    text: {
        name: "YoloV8",
        subName: "Custom object detection model for desk objects",
        title: "Trained a custom YOLOv8 model to identify 9 specific desk objects with 80% training accuracy",
        workDescription: "I created a custom YOLOv8 object detection model trained on 351 hand-labeled images across 9 desk object classes. The project involved recording 5 training videos from multiple viewpoints (birds-eye, front, horizontal, left, right), extracting frames every 2 seconds, and manually annotating each image. I implemented a complete pipeline including JSON-to-YOLO format conversion, dataset splitting (80% train, 20% validation), and model training for 84 epochs. The final model achieved a fitness score of 0.7944 and successfully detected all target objects in real-world video scenarios after confidence threshold optimization.",
        personalDescription: "I was genuinely curious about the AI hype and wanted hands-on experience with cutting-edge computer vision. When I tested pre-trained YOLOv8 models on my desk objects, the results were laughably bad - monitors being classified as refrigerators, mechanical pencils as toothbrushes! That's when I decided to build something from the ground up. The project became this fascinating journey of recording 5 training videos from different angles (birds-eye, front, horizontal, left, right), manually labeling 351 images by hand, and implementing a complete pipeline from JSON annotations to YOLO format. Training for 84 epochs over 4.1 hours was like watching my model learn in real-time - seeing the loss curves converge and the fitness score reach 0.7944 was incredibly satisfying. The most exciting moment was when I finally got all 9 objects detected in my test video after tweaking the confidence threshold from 0.3 to 0.1. It's amazing how much you can accomplish with just 351 well-curated images and a systematic approach. This project taught me that domain-specific training isn't just a buzzword - it's the difference between a model that thinks your monitor is a refrigerator and one that can actually find your lost AirPods!"
    },
    tags: ["AI", "Object Detection", "YoloV8", "Python", "OpenCV"],
    images: {
        mainImage: "/Projects/YoloV8/SocialMedia/yoloV8Image2.jpg",
        galleryImages: [
            "/Projects/YoloV8/yoloImage1.png",
            "/Projects/YoloV8/yoloImage2.png",
            "/Projects/YoloV8/yoloImage3.png",
            "/Projects/YoloV8/yoloImage4.png",
        ]
    },
    websiteUrl: "",
    githubUrl: "https://github.com/RamonsArchive/YOLOv8Model", // if website url is not present, use github url
    dateCompleted: "2025-06-10",
    featured: true,
    isClient: false,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}

export const CorporateVsPodcast: ProjectTemplate = { 
    id: "corporate-vs-podcast",
    projectType: "DATA_SCIENCE",
    text: {
        name: "Corporate vs Podcast Viewership Analysis",
        subName: "Comparing corporate vs podcast viewership from 2020 to 2024",
        title: "Analyzed corporate vs podcast viewership from 2020 to 2024 to determine whether a decrease in corporate viewership coincides with an increase in podcast viewership",
        workDescription: "As part of a group project for my Data Science class at UCSD, I led the development of a comprehensive data pipeline to analyze corporate media vs. political podcast viewership from 2020-2024. I built three main systems: 1) A Selenium-based web scraper for Variety.com to extract corporate media viewership data, 2) A Wayback Machine API integration to gather Spotify podcast rankings from 2021-2024, and 3) A YouTube Data API pipeline with intelligent caching to fetch podcast viewership metrics. The project involved processing 1,040 observations across multiple data treatments, implementing outlier detection using IQR, Modified Z-Score, and Z-Score methods, and conducting comprehensive statistical analysis including ANOVA, Kruskal-Wallis tests, and effect size calculations. I handled significant technical challenges including API rate limiting, data standardization, and creating algorithms to filter valid podcasts with consistent yearly data.",
        personalDescription: "For my Data Science group project at UCSD, I wanted to explore a question that had always fascinated me: in our increasingly polarized political climate where distrust in traditional media is growing, does corporate media viewership decline coincide with political podcast growth? While some group members proposed using existing Kaggle datasets, I was excited by the challenge of investigative data science - building everything from scratch. The project became this fascinating journey of web scraping with Selenium, integrating with the Wayback Machine API, and building a sophisticated YouTube Data API pipeline with intelligent caching to stay within Google's rate limits. We faced significant hurdles: much of the podcast data didn't exist on YouTube, requiring us to create algorithms to filter valid channels, and we had to rotate API keys and implement extensive caching of channel IDs and playlist IDs. The statistical analysis revealed some fascinating insights - when we removed outliers (17% of data), podcasts showed 11.6% average growth versus corporate media's -15.8% decline, with highly significant year × type interactions (p < 0.001). It was incredibly rewarding to see our hypothesis confirmed through rigorous statistical testing, and the project taught me that sometimes the most interesting insights come from building the data pipeline yourself rather than relying on pre-existing datasets.",
    },
    tags: ["Data Science", "Statistical Analysis", "Python", "Pandas", "Matplotlib", "Seaborn"],
    images: {
        mainImage: "/Projects/CorporateVsPodcasts/SocialMedia/cvpImage.jpg",
        galleryImages: [
            "/Projects/CorporateVsPodcasts/cvpImage1.png",
            "/Projects/CorporateVsPodcasts/cvpImage2.png",
            "/Projects/CorporateVsPodcasts/cvpImage3.png",
            "/Projects/CorporateVsPodcasts/cvpImage4.png",
            "/Projects/CorporateVsPodcasts/cvpImage5.png",
        ]
    },
    websiteUrl: "",
    githubUrl: "https://github.com/COGS108/Group030_SP25", // if website url is not present, use github url
    dateCompleted: "2025-06-14",
    featured: true,
    isClient: true,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}

export const Whisper: ProjectTemplate = {
    id: "whisper",
    projectType: "AI_SOLUTIONS",
    text: {
        name: "Whisper",
        subName: "A voice assistant that can transcribe audio to text",
        title: "Trained a custom Whisper model to transcribe audio to text",
        workDescription: "I implemented a streamlined audio transcription system using OpenAI's open-source Whisper model, building a complete pipeline that processes audio files and generates both full text transcripts and timestamped CSV outputs. The project uses the 'turbo' model for optimal speed and accuracy, automatically handles audio format detection, and creates structured CSV outputs with start/end times and transcribed text for easy data manipulation. I built the system with clean, modular functions for storing full transcripts and segment data, implemented proper file path handling for cross-platform compatibility, and created a simple but effective workflow that takes audio input and produces both human-readable transcripts and machine-processable CSV data.",
        personalDescription: "I wanted to jumpstart my AI journey with a practical project that would teach me about audio processing and natural language understanding. Rather than just using pre-built tools, I decided to build a complete transcription pipeline from the ground up using OpenAI's Whisper model. The project became this fascinating exploration of audio processing, where I learned about the 'turbo' model's capabilities and built a clean, modular system for handling audio files. What I found most rewarding was creating the timestamped CSV output system - it wasn't just about transcribing audio to text, but about making that data useful for further analysis, subtitle generation, and research purposes. I focused on building clean, maintainable code with proper file path handling and modular functions, which taught me that even with powerful pre-trained models like Whisper, there's still so much value in building the infrastructure around them to make them truly useful for real-world applications.",
    },
    tags: ["AI", "Audio Processing", "Natural Language Processing", "Python", "OpenAI Whisper", "Data Analysis", "CSV Processing"],
    images: {
        mainImage: "/Projects/Whisper/SocialMedia/whisperImage.jpg",
        galleryImages: ["/Projects/Whisper/whisperImage1.png", "/Projects/Whisper/whisperImage2.png" ]
    },
    websiteUrl: "",
    githubUrl: "https://github.com/RamonsArchive/Whisper", // if website url is not present, use github url
    dateCompleted: "2025-06-10",
    featured: true,
    isClient: false,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}

export const NBA_Analysis_Hackathon: ProjectTemplate = {
    id: "nba-analysis-hackathon",
    projectType: "DATA_SCIENCE",
    text: {
        name: "NBA Analysis Hackathon",
        subName: "Analyzing NBA player performance data",
        title: "Built a comprehensive NBA player recommendation system and interactive guessing game with 99% accuracy",
        workDescription: "I developed a full-stack Next.js web application that combines NBA player data analysis with interactive gaming features. The project includes a smart player recommendation system that filters players by budget, height, age, and position using weighted scoring algorithms, and an AI-powered guessing game that asks intelligent questions to identify players with high accuracy. I integrated multiple data sources including NBA API for player statistics and salary databases, implemented real-time data processing with CSV parsing and validation, and built a modern UI with Tailwind CSS featuring responsive design, interactive elements, and beautiful data visualizations.",
        personalDescription: "My first hackathon experience was incredibly exciting! When we found out the theme was popular culture, my team immediately knew we wanted to do something with the NBA. What started as a simple data analysis project quickly evolved into a comprehensive web application that I'm really proud of. I handled the web development side while my teammates focused on Python data processing, and we just clicked really well - each of us brought something different to the table and we learned a ton from each other. The most rewarding part was building the guessing game algorithm - seeing it correctly identify players with 99% accuracy after just a few strategic questions was incredibly satisfying. We worked through the night for 24 hours straight, combining NBA API data with salary information, implementing smart filtering algorithms, and creating a beautiful, responsive interface. It was a perfect example of how different technical backgrounds can come together to create something really special in a short timeframe.",
    },
    tags: ["Full-Stack Development", "Next.js", "React", "TypeScript", "Data Science", "NBA Analytics", "Interactive Gaming", "Tailwind CSS"],
    images: {
        mainImage: "/Projects/NBA_Analysis_Hackathon/SocialMedia/hackathon1Image.jpg",
        galleryImages: ["/Projects/NBA_Analysis_Hackathon/hackathon1Image1.png", "/Projects/NBA_Analysis_Hackathon/hackathon1Image2.png", "/Projects/NBA_Analysis_Hackathon/hackathon1Image3.png", "/Projects/NBA_Analysis_Hackathon/hackathon1Image4.png"]
    },
    websiteUrl: "",
    githubUrl: "https://github.com/YihsuanKuo/DSC-Wizzrad", // if website url is not present, use github url
    dateCompleted: "2025-06-10",
    featured: true,
    isClient: false,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}

export const DSGN1_Text_Analysis: ProjectTemplate = {
    id: "dsgn1-text-analysis",
    projectType: "DATA_SCIENCE",
    text: {
        name: "DSGN1 Text Analysis",
        subName: "Analyzing survey data using text analysis",
        title: "Analyzing survey data about bathroom stall doors from the DSGN1 course at UCSD",
        workDescription: "I built a comprehensive text analysis pipeline to analyze survey responses about bathroom stall door experiences. Using Python, Pandas, and advanced regex pattern matching, I processed raw survey data to extract insights about privacy concerns, door swing preferences, lock security issues, and gender-based emotional responses. The analysis included sentiment analysis, keyword frequency counting, and pattern recognition to identify common design problems. I created interactive visualizations using Matplotlib and Seaborn to present findings about gap-related privacy issues, door swing direction preferences, and security concerns in an easily digestible format.",
        personalDescription: "This was part of a group project for my DSGN1 course at UCSD where we wanted to understand how people actually experience bathroom stall doors - whether they're intuitive, offer enough privacy, and are easy to use. The goal was to analyze bathroom stall doors using design principles like signifiers, affordances, gulf of execution, gulf of evaluation, feedback, mental models, and mapping. But to really understand people's opinions and identify the deficits in these design principles, we needed to analyze the survey text and create visualizations so the findings could be easily understood and applied. I handled all the data processing and analysis side, building this comprehensive pipeline that could handle messy survey responses and extract meaningful insights. The most interesting part was developing the regex patterns to detect door swing preferences and sentiment - seeing how people actually feel about these everyday design elements was really eye-opening. To see the full report with all the visualizations and detailed findings, just message me. You can also check out the code and see the raw survey data for yourself.",
    },
    tags: ["Data Science", "Text Analysis", "Python", "Pandas", "Regex", "Sentiment Analysis", "Data Visualization", "Survey Analysis", "Design Research"],
    images: {
        mainImage: "/Projects/DSGN1TextAnalysis/SocialMedia/DSGN1TAImage.jpg",
        galleryImages: ["/Projects/DSGN1TextAnalysis/DSGN1TAImage1.png", "/Projects/DSGN1TextAnalysis/DSGN1TAImage2.png", "/Projects/DSGN1TextAnalysis/DSGN1TAImage3.png"]
    },
    websiteUrl: "",
    githubUrl: "https://github.com/RamonsArchive/DSGN1_Text_Analysis", // if website url is not present, use github url
    dateCompleted: "2025-06-10",
    featured: true,
    isClient: false,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}

export const TheStu: ProjectTemplate = {
    id: "the-stu",
    projectType: "WEB_DEVELOPMENT",
    text: {
        name: "The Stu",
        subName: "Building a music player with an aesthetic UI",
        title: "Building a music player with an aesthetic UI using just JavaScript, HTML, and CSS",
        workDescription: "I built a fully functional music player with a clean, aesthetic UI as my very first web development project. Using vanilla JavaScript, HTML, and CSS, I created a complete audio streaming platform with play/pause controls, volume management, playlist navigation, and a dynamic song library system. The project features a responsive design with album artwork display, progress bars, and an intuitive user interface that demonstrates early web development skills and understanding of DOM manipulation.",
        personalDescription: "Right after high school graduation, I wanted to learn how to code websites knowing I would take multiple computer science courses during my college years. To prepare myself, I dove into the foundational basics of CSS, HTML, and JavaScript to build my very first website. Although it's not perfect and features a sample playlist of New York Drill artists that I'm not necessarily a fan of looking back at, it does demonstrate how far I've come and reminds me that Stack Overflow is a programmer's best friend. This project taught me so much about web development fundamentals - from DOM manipulation and event handling to audio API integration and responsive design. It's amazing to see how much I've grown since then, and it's a perfect reminder that everyone starts somewhere. The most rewarding part was getting the audio controls working properly and seeing my first website actually function as intended!",
    },
    tags: ["Web Development", "JavaScript", "HTML", "CSS", "Audio API", "DOM Manipulation", "Music Player", "First Project"],
    images: {
        mainImage: "/Projects/TheStu/SocialMedia/theStuImage.jpg",
        galleryImages: ["/Projects/TheStu/theStuImage1.png", "/Projects/TheStu/theStuImage2.png", "/Projects/TheStu/theStuImage3.png"]
    },
    websiteUrl: "https://thestu.one",
    githubUrl: "", // if website url is not present, use github url
    dateCompleted: "2025-06-10",
    featured: true,
    isClient: false,
    isWebsite: false,
    status: "live" // live, in-progress, archived
}


// recent projects in hero section
export const RecentProjects = [
    GoldenEagle,
    YoloV8,
    Relay,
]

// all projects
export const Projects = [
    GoldenEagle,
    YoloV8,
    Relay,
    CorporateVsPodcast,
    Whisper,
    NBA_Analysis_Hackathon,
    DSGN1_Text_Analysis,
    TheStu,
]


// project page map
export const ProjectPageMap = {
    "golden-eagle-estates": GoldenEagle,
    "relay": Relay,
    "yolo-v8": YoloV8,
    "corporate-vs-podcast": CorporateVsPodcast,
    "whisper": Whisper,
    "nba-analysis-hackathon": NBA_Analysis_Hackathon,
    "dsgn1-text-analysis": DSGN1_Text_Analysis,
    "the-stu": TheStu,
}


export const AboutData = {
    id: "about",
    text: {
        title: "About",
        subtitle: "Hi, my name is Ramon",
        introduction: "I am a cat lover, gym goer, soccer player, and a software engineer. I've lived in Long Beach CA during my early childhood, until I moved to Irvine CA, before moving to Placerville CA for my high school years, and then finally moving to San Diego CA for my college years. Every city has its own unique charm, and I've been fortunate to experience them all.",
        education: "I am a third year student at UC San Diego studying Cognitive Science with a specialization in Machine Learning and Neural Computation, minoring in Computer Science. Expected graduation: June 2027.",
        technical_skills: {
            frontend: "Next.js, React, TypeScript, Tailwind CSS",
            backend: "Node.js, MySQL, Prisma, Sanity CMS",
            cloud_and_apis: "Vercel, Oracle Cloud, Stripe, Google Maps, EasyPost, Amazon S3",
            ml_ai: "YOLOv8, siklearn, OpenCV, Whisper, Python, Statistical Analysis",
            tools: "Git, Auth.js, Redis, Webhook Integration",
        }, 
    }, 
    images: ["/Assets/About/PersonalImage5.JPG", "/Assets/About/prettyMe.png", "/Assets/About/family.png", "/Assets/About/whisper.png"]
    
}

export const ContactData = {
    id: "contact",
    text: {
        title: "Contact",
        subtitle: "It's Fourth Quarter. Crunch Time.",
        subsubtitle: "Call a timeout—let's draw up your winning play",
    },

    services: [
        ServiceType.WEB_DEVELOPMENT,
        ServiceType.DATA_SCIENCE,
        ServiceType.AI_SOLUTIONS,
        ServiceType.OTHER,
    ]
}

export const footerQuickLinks = [
    {
        id: "github",
        href: "https://github.com/RamonsArchive",
        title: "GitHub",
        target: "_blank",
        rel: "noopener noreferrer",
    },
    {
      id: "terms",
      href: "/terms",
      title: "Terms of Service",
      target: undefined,
      rel: undefined,
    },
    {
      id: "privacy",
      href: "/privacy",
      title: "Privacy Policy",
      target: undefined,
      rel: undefined,
    },  
    {
      id: "admin_login",
      href: "/admin/login",
      title: "Admin Login",
      target: undefined,
      rel: undefined,
    },
  ];

export const footerSocials = [
    {
        id: "instagram",
        path: "/Assets/Icons/instagram.svg",
        href: "https://www.instagram.com/clutchdev_studio",
        ariaLabel: "Follow us on Instagram",
        title: "Instagram",
    },
    
    {
        id: "facebook",
        path: "/Assets/Icons/facebook.svg",
        href: "https://www.facebook.com/profile.php?id=61569189908839",
        ariaLabel: "Follow us on Facebook",
        title: "Facebook",
    },
    
    {
        id: "linkedin",
        path: "/Assets/Icons/LI-In-Bug.png",
        href: "https://www.linkedin.com/in/ramonmnm100",
        ariaLabel: "Connect with us on LinkedIn",
        title: "LinkedIn",
    },
]


export const footerContact = [
    {
        id: "email",
        value: "clutchdev.apps@gmail.com",
        title: "Email",
    },
    
    {
        id: "phone",
        value: "949-910-7879",
        title: "Phone",
    },
]

export const AdminLoginData = {
    title: "Admin Login",
}


export const TermsOfService = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content: "By accessing or using this portfolio website, you agree to these Terms of Service. If you don't agree, please don't use the site."
  },
  {
    id: 2,
    title: "What This Site Is",
    content: "This is my personal portfolio website showcasing my software development, web development, data science, and AI projects. It's designed to help potential clients and employers learn about my work and get in touch."
  },
  {
    id: 3,
    title: "Contacting Me",
    content: "You can reach out through the contact form for project inquiries, collaboration opportunities, or just to say hello. I'll do my best to respond to all messages within a reasonable time."
  },
  {
    id: 4,
    title: "Portfolio Content",
    content: "All projects, code samples, and work examples shown here are my own creations unless otherwise noted. Feel free to explore and get inspired, but please respect my intellectual property."
  },
  {
    id: 5,
    title: "What You Can't Do",
    content: "Please don't try to hack the site, send spam, upload malicious files, or use the contact form for inappropriate purposes. Just be respectful and professional."
  },
  {
    id: 6,
    title: "Privacy",
    content: "I only collect the information you choose to share when contacting me. I won't sell your data or use it for anything other than responding to your message. Your privacy matters to me."
  },
  {
    id: 7,
    title: "No Guarantees",
    content: "While I'm passionate about delivering quality work, contacting me doesn't guarantee I'll take on your project. I'll evaluate each opportunity based on my availability, skills, and interest."
  },
  {
    id: 8,
    title: "My Liability",
    content: "I'm not liable for any damages or issues that might arise from using this website. This site is provided as-is for informational and contact purposes only. Any actual work would be covered by separate agreements."
  },
  {
    id: 9,
    title: "Site Availability",
    content: "I try to keep the site running smoothly, but sometimes things break or I need to update it. I can't guarantee it'll always be available 24/7."
  },
  {
    id: 10,
    title: "Changes to Terms",
    content: "I might update these terms occasionally. If I make significant changes, I'll try to let you know. Using the site after changes means you accept the new terms."
  },
  {
    id: 11,
    title: "Contact Me",
    content: "Questions about these terms? Just reach out at clutchdev.apps@gmail.com. I'm happy to clarify anything!"
  }
];

export const PrivacyPolicy = [
  {
    id: 1,
    title: "Information I Collect",
    content: "I only collect the information you choose to share when contacting me through the contact form. This typically includes your name, email address, and any project details or messages you send. I don't collect any information automatically or track your browsing behavior."
  },
  {
    id: 2,
    title: "How I Use Your Information",
    content: "I use your contact information solely to respond to your inquiries about potential projects, collaboration opportunities, or general questions. I don't use it for marketing, selling, or sharing with third parties. Your information is only used to communicate back with you."
  },
  {
    id: 3,
    title: "Information Sharing",
    content: "I don't sell, trade, or share your personal information with anyone. Your contact details stay private and are only used for our direct communication. I don't have any third-party services that would access your information."
  },
  {
    id: 4,
    title: "Data Protection",
    content: "I take your privacy seriously and implement basic security measures to protect your information. However, since this is a portfolio site, I recommend not sharing sensitive or confidential information through the contact form."
  },
  {
    id: 5,
    title: "Your Privacy Rights",
    content: "You can ask me to delete any information you've shared, or request to see what I have stored. Since I only keep basic contact details, there's not much to manage, but I'm happy to help with any privacy concerns."
  },
  {
    id: 6,
    title: "Data Retention",
    content: "I keep your contact information only as long as needed to respond to your inquiry and follow up if necessary. If you don't hear back from me or the conversation ends, I'll delete your information within a reasonable time."
  },
  {
    id: 7,
    title: "Cookies and Tracking",
    content: "This site doesn't use cookies or tracking technologies. I don't monitor your visits or collect analytics data. It's a simple portfolio site designed to showcase my work and provide a way for you to get in touch."
  },
  {
    id: 8,
    title: "Policy Updates",
    content: "If I make any changes to this privacy policy, I'll update the date at the top. Since this is a personal portfolio site, changes are unlikely, but I'll keep you informed if anything important changes."
  },
  {
    id: 9,
    title: "Contact Me",
    content: "Questions about your privacy or this policy? Just reach out at clutchdev.apps@gmail.com. I'm committed to being transparent about how I handle your information."
  }
];