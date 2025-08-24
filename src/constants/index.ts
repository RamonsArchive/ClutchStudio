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
        personalDescription: "As a personal project, I set out to create a modern e-commerce platform that would be both user-friendly and maintainable, while pushing me to explore and master new technologies, frameworks, and libraries. My goal was to build something that not only met current industry standards but also incorporated innovative approaches that would set it apart. This project became a journey of continuous learning and technical growth, allowing me to experiment with emerging web technologies and best practices in modern web development.",
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
    status: "live" // live, in-progress, archived
}


// recent projects in hero section
export const RecentProjects = [
    GoldenEagle,
    Relay,
]

// all projects
export const Projects = [
    GoldenEagle,
    Relay,
]


// project page map
export const ProjectPageMap = {
    "golden-eagle-estates": GoldenEagle,
    "relay": Relay,
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