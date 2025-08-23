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
    HeroVideo: "/HeroContent/soccerGoal.mp4",
   
}

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
      mainImage: "/GoldenEagle/goldeEagleSocialImageHD.jpg",
      galleryImages: [
        "/GoldenEagle/overlay1.png",
        "/GoldenEagle/overlay2.png",
        "/GoldenEagle/goldenEagleImage4.png",
      ]
    },
    websiteUrl: "https://goldeneagle.one",
    githubUrl: "", // if website url is not present, use github url
    dateCompleted: "2025-08-12",
    featured: true,
    isClient: true,
    status: "live" // live, in-progress, archived
  }


export const RecentProjects = [
    GoldenEagle,
]

export const Projects = [
    GoldenEagle,
]


export const ProjectPageMap = {
    "golden-eagle-estates": GoldenEagle,
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
    images: ["/About/personalImage5.jpg", "/About/prettyMe.png", "/About/family.png", "/About/whisper.png"]
    
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
        path: "/Icons/instagram.svg",
        href: "https://www.instagram.com/ramon.mnm/",
        ariaLabel: "Follow us on Instagram",
        title: "Instagram",
    },
    
    {
        id: "facebook",
        path: "/Icons/facebook.svg",
        href: "https://www.facebook.com/profile.php?id=61569189908839",
        ariaLabel: "Follow us on Facebook",
        title: "Facebook",
    },
    
    {
        id: "linkedin",
        path: "/Icons/LI-In-Bug.png",
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