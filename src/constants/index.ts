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
      workDescription: "Rebranded Golden Eagle Estates and shipped a responsive site with project management, simple hiring, and live testimonials—powered by a robust backend that delivers the scalability their momentum demands.",
      personalDescription: "After seeing a story I posted about another website, a friend from Golden Eagle reached out asking if I could create something similar. Having played soccer with this friend for four years and witnessing the incredible work ethic he brings to the company through the project photos he'd share, I knew I had to deliver something special. Originally, they wanted a simple gallery website to showcase their skills, but I went the extra mile and created a complete backend infrastructure to handle project tickets, job applications, and testimonials—an unexpected bonus and my way of showing gratitude for the opportunity to work with such dedicated craftsmen.",
    },
    tags: ["Web Design", "Web Development", "Web Hosting", "Business Infrastructure", "Project Management"],
    images: {
      mainImage: "/Projects/GoldenEagle/goldeEagleSocialImageHD.jpg",
      galleryImages: [
        "/Projects/GoldenEagle/overlay1.png",
        "/Projects/GoldenEagle/overlay2.png",
        "/Projects/GoldenEagle/goldenEagleImage4.png",
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
        mainImage: "/Projects/YoloV8/SocialMedia/yoloV8Image.jpg",
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


// recent projects in hero section
export const RecentProjects = [
    GoldenEagle,
    YoloV8,
    CorporateVsPodcast,
    Relay,
]

// all projects
export const Projects = [
    GoldenEagle,
    YoloV8,
    CorporateVsPodcast,
    Relay,
]


// project page map
export const ProjectPageMap = {
    "golden-eagle-estates": GoldenEagle,
    "relay": Relay,
    "yolo-v8": YoloV8,
    "corporate-vs-podcast": CorporateVsPodcast,
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
    images: ["/Assets/About/personalImage5.jpg", "/Assets/About/prettyMe.png", "/Assets/About/family.png", "/Assets/About/whisper.png"]
    
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
      id: "terms",
      href: "/terms",
      title: "Terms of Service",
    },
    {
      id: "privacy",
      href: "/privacy",
      title: "Privacy Policy",
    },
    {
      id: "admin_login",
      href: "/admin/login",
      title: "Admin Login",
    },
  ];

export const footerSocials = [
    {
        id: "instagram",
        path: "/Assets/Icons/instagram.svg",
        href: "https://www.instagram.com/ramon.mnm/",
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