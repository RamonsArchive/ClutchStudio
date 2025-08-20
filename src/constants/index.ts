import { ProjectTemplate, ProjectTypes } from "../types/GlobalTypes";

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
      title: "Building a complete digital transformation and infrastructure for a do everything construction company, Golden Eagle Estates",
      workDescription: "Rebranded Golden Eagle Estates and shipped a responsive site with project management, simple hiring, and live testimonials—powered by a robust backend that delivers the scalability their momentum demands.",
      personalDescription: "After seeing a story I posted about another website, a friend from Golden Eagle reached out asking if I could create something similar. Having played soccer with this friend for four years and witnessing the incredible work ethic he brings to the company through the project photos he'd share, I knew I had to deliver something special. Originally, they wanted a simple gallery website to showcase their skills, but I went the extra mile and created a complete backend infrastructure to handle project tickets, job applications, and testimonials—an unexpected bonus and my way of showing gratitude for the opportunity to work with such dedicated craftsmen.",
    },
    tags: ["Web Design", "Web Development", "Web Hosting", "Business Infrastructure", "Project Management"],
    images: {
      mainImage: "/goldeEagleSocialImageHD_1.1.2.jpg",
      galleryImages: [
        "/overlay1.png",
        "/overlay2.png",
        "/goldenEagleImage4.png",
      ]
    },
    websiteUrl: "https://goldeneagle.one",
    githubUrl: "", // if website url is not present, use github url
    dateCompleted: "2025-08-12",
    featured: true,
    status: "live" // live, in-progress, archived
  }


export const RecentProjects = [
    GoldenEagle,
]

export const Projects = [
    GoldenEagle,
]