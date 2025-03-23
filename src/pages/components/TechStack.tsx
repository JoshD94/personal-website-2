import React, { useState } from "react";
import "devicon/devicon.min.css";
import { Skill, SkillCategories } from "../types";

interface SkillDetailProps {
  skill: Skill | null;
}

const SkillDetail: React.FC<SkillDetailProps> = ({ skill }) => {
  if (!skill) {
    return (
      <div className="h-[250px] sm:h-[210px] flex items-center justify-center text-gray-400 dark:text-gray-500">
        <span className="sm:hidden">Tap on a skill to see details</span>
        <span className="hidden sm:block">Hover over a skill to see details</span>
      </div>
    );
  }

  // Default values if not provided
  const level = skill.level || "Intermediate";
  const levelPercentage = skill.levelPercentage || 60;
  const description = skill.description || 
    `Used ${skill.name} to build multiple projects. This is placeholder text that you'll replace with your actual experience.`;

  // Map level to color
  let levelColor = "bg-blue-600";
  if (level === "Beginner") levelColor = "bg-green-500";
  else if (level === "Intermediate") levelColor = "bg-blue-500";
  else if (level === "Advanced") levelColor = "bg-purple-500";
  else if (level === "Expert") levelColor = "bg-red-500";

  return (
    <div className="h-[250px] sm:h-[210px] py-4 px-4 sm:py-6 sm:px-6 flex flex-col sm:flex-row items-center overflow-hidden">
      {/* Icon and Name - Stacked on mobile, side by side on desktop */}
      <div className="mb-4 sm:mb-0 sm:mr-8 flex-shrink-0 flex flex-col items-center justify-center w-20 sm:w-24">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full mb-2 shadow-md w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <i className={`${skill.iconClass} colored text-4xl sm:text-5xl drop-shadow-md`} style={{ fontSize: "2rem" }} />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-center">{skill.name}</h3>
      </div>
      
      {/* Skill Details */}
      <div className="flex-1 w-full sm:w-auto overflow-hidden">
        {/* Experience Level Bar - Now at the top */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Experience Level:</span>
            <span className="font-medium text-xs sm:text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300">{level}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
            <div 
              className={`${levelColor} h-2 sm:h-3 rounded-full transition-all duration-500 relative`} 
              style={{ width: `${levelPercentage}%` }}
            >
              <span className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-full text-xs font-medium bg-gray-800 text-white px-1 py-0.5 rounded hidden sm:inline-block">
                {levelPercentage}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Experience and Projects - Below the bar */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Experience:</h4>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed h-14 sm:h-10 overflow-y-auto pr-1">
            {description}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 mb-1 mt-2">Projects:</h4>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed h-14 sm:h-10 overflow-y-auto pr-1">
            {skill.projects ? skill.projects.join(", ") : "No projects listed for this skill."}
          </p>
        </div>
      </div>
    </div>
  );
};

const TechStack: React.FC = () => {
  // Initialize with a featured skill to avoid empty state on load
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Set a default featured skill after component mounts
  React.useEffect(() => {
    if (!initialLoadComplete) {
      // Show React as the default featured skill
      const defaultSkill = {
        name: "React",
        iconClass: "devicon-react-plain",
        level: "Expert",
        levelPercentage: 95,
        description: "Primary framework for frontend development. Built multiple web applications including this portfolio, CRM systems, and data dashboards."
      };
      
      setHoveredSkill(defaultSkill);
      setInitialLoadComplete(true);
    }
  }, [initialLoadComplete]);

  const skills: SkillCategories = {
    Languages: [
      { 
        name: "Python", 
        iconClass: "devicon-python-plain",
        level: "Advanced",
        levelPercentage: 95,
        description: "Used Python for data science at GoTo Financial, developed Flask APIs for multiple projects, and automated data processing workflows.",
        projects: ["GoTo Financial", "Vividly", "Nocturne", "Uplift", "Spotipick", "Cornell Vending", "CS 3700"]
      },
      { 
        name: "Java", 
        iconClass: "devicon-java-plain",
        level: "Intermediate",
        levelPercentage: 70,
        description: "Built Android applications and backend services using Java. Used extensively in CS courses for data structures and algorithms.",
        projects: ["All-in", "Edukasih", "Cornell Chairs", "BRB Counter", "CS 2110"]
      },
      { 
        name: "C", 
        iconClass: "devicon-c-plain",
        level: "Beginner",
        levelPercentage: 30,
        description: "Used C in Computer Systems course for low-level programming and understanding memory management. Implemented basic data structures and algorithms.",
        projects: ["CS 3410"]
      },
      { name: "MATLAB",
        iconClass: "devicon-matlab-plain",
        level: "Beginner",
        levelPercentage: 30,
        description: "Used MATLAB for data analysis and visualization to identify stock characteristics using historical index data.",
        projects: ["Trimegah Asset Management"]
      },
      { 
        name: "JavaScript", 
        iconClass: "devicon-javascript-plain",
        level: "Advanced",
        levelPercentage: 90,
        description: "Primary language for web development. Used in all frontend projects, including React applications and Node.js backends.",
        projects: ["Astrodoc", "Vividly", "Nocturne", "CRM Web App", "Spotipick", "BRB Counter", "Personal Website"]
      },
      { 
        name: "TypeScript", 
        iconClass: "devicon-typescript-plain",
        level: "Advanced",
        levelPercentage: 85,
        description: "Used TypeScript for type-safe development in React and Node.js projects. Implemented complex interfaces and type systems.",
        projects: ["Astrodoc", "Vividly", "Nocturne", "CRM Web App", "Spotipick", "Personal Website"]
      },
      {
        name: " OCaml",
        iconClass: "devicon-ocaml-plain",
        level: "Intermediate",
        levelPercentage: 60,
        description: "Used OCaml for functional programming in CS courses. Developed basic algorithms and data structures.",
        projects: ["Dino Jim", "CS 3110"]
      }
    ],
    Frontend: [
      { 
        name: "React", 
        iconClass: "devicon-react-plain",
        level: "Expert",
        levelPercentage: 95,
        description: "Primary framework for frontend development. Built multiple web applications including this portfolio, CRM systems, and data dashboards.",
        projects: ["Astrodoc", "Vividly", "Nocturne", "CRM Web App", "Spotipick", "Personal Website"]
      },
      {name: "ReactNative",
        iconClass: "devicon-react-plain",
        level: "Intermediate",
        levelPercentage: 60,
        description: "Used React Native for mobile app development. Built simple applications and prototypes for iOS and Android.",
        projects: ["Nocturne", "Vividly", "Cornell Chairs", "Astrodoc"]
      },
      { 
        name: "Next.js", 
        iconClass: "devicon-nextjs-plain",
        level: "Intermediate",
        levelPercentage: 60,
        description: "Used Next.js for server-side rendering and static site generation in React applications.",
        projects: ["Astrodoc", "Personal Website", "CRM Web App"]
      },
      { 
        name: "Tailwind CSS", 
        iconClass: "devicon-tailwindcss-plain",
        level: "Intermediate",
        levelPercentage: 75,
        description: "Used Tailwind CSS for utility-first styling in React applications. Improved design consistency and responsiveness.",
        projects: ["Astrodoc", "Vividly", "Personal Website", "CRM Web App"]
      },
      { 
        name: "HTML", 
        iconClass: "devicon-html5-plain",
        level: "Advanced",
        levelPercentage: 80,
        description: "First language learned for web development. Proficient in basic HTML5 structure, used in earlier projects and for building static pages.",
        projects: ["BRB Counter", "Many others"]
      },
      { 
        name: "CSS", 
        iconClass: "devicon-css3-plain",
        level: "Advanced",
        levelPercentage: 80,
        description: "Proficient with CSS3, animations, flexbox, and grid layouts. Experienced with responsive design and mobile optimization.",
        projects: ["Astrodoc", "Vividly", "Nocturne", "CRM Web App", "Spotipick", "Personal Website"]
      },
      { 
        name: "Swift", 
        iconClass: "devicon-swift-plain",
        level: "Beginner",
        levelPercentage: 30,
        description: "iOS development with SwiftUI. Built several mobile applications and games.",
        projects: ["Edukasih", "Bio-Dungeon"]
      },
      { 
        name: "Kotlin", 
        iconClass: "devicon-kotlin-plain",
        level: "Beginner",
        levelPercentage: 30,
        description: "Used Kotlin for Android development. Built simple applications, focusing on UI design and user experience.",
        projects: ["Cornell Chairs", "Edukasih"]
      },
      { name: "PHP", 
        iconClass: "devicon-php-plain",
        level: "Beginner",
        levelPercentage: 30,
        description: "Used PHP for server-side scripting in web applications. Developed simple backend functionalities and database interactions.",
        projects: ["SWA UniApp"]
      }
    ],
    Backend: [
      { 
        name: "Node.js", 
        iconClass: "devicon-nodejs-plain",
        level: "Intermediate",
        levelPercentage: 60,
        description: "Used Node.js for backend development at Astrodoc, creating RESTful APIs and authentication systems.",
        projects: ["Astrodoc"]
      },
      { name: "Express",
        iconClass: "devicon-express-original",
        level: "Beginner",
        levelPercentage: 40,
        description: "Used Express.js for building RESTful APIs and middleware in Node.js applications.",
        projects: ["Astrodoc"]
      },
      { 
        name: "Flask", 
        iconClass: "devicon-flask-original",
        level: "Advanced",
        levelPercentage: 80,
        description: "Developed RESTful APIs for various projects including Vividly, handling authentication, database interactions, and file uploads.",
        projects: ["Vividly", "Nocturne", "Spotipick", "Uplift", "Cornell Vending" ]
      },
      { name: "GraphQL",
        iconClass: "devicon-graphql-plain",
        level: "Intermediate",
        levelPercentage: 65,
        description: "Used GraphQL for building APIs in React and mobile applications. Implemented queries and mutations for data fetching.",
        projects: ["CRM Web App", "Uplift"]
      },
      { 
        name: "PostgreSQL", 
        iconClass: "devicon-postgresql-plain",
        level: "Advanced",
        levelPercentage: 80,
        description: "Primary database for production applications. Designed schemas, wrote complex queries, and deployed databases for multiple projects.",
        projects: ["CRM Web App", "Uplift"]
      },
      { name: "MySQL", iconClass: "devicon-mysql-plain", level: "Beginner", levelPercentage: 40, description: "Used MySQL for data storage in various projects. Experienced with basic queries and database design.", projects: ["SWA UniApp"] },
      { name: "SQLite", iconClass: "devicon-sqlite-plain", level: "Intermediate", levelPercentage: 60, description: "Used SQLite for lightweight database solutions in mobile and web applications.", projects: ["Vividly", "Nocturne", "Uplift", "CRM Web App", "Cornell Vending"] },    ],
    "Cloud & DevOps": [
      { name: "AWS Amplify", iconClass: "devicon-amazonwebservices-plain", level: "Beginner", levelPercentage: 30, description: "Used AWS Amplify for deploying and hosting static applications.", projects: ["BRB Counter"] },
      { name: "AWS Route 53", iconClass: "devicon-amazonwebservices-plain", level: "Beginner", levelPercentage: 30, description: "Used AWS Route 53 for domain management and DNS routing.", projects: ["BRB Counter"] },
      { name: "GCP", iconClass: "devicon-googlecloud-plain", level: "Intermediate", levelPercentage: 50, description: "Used Google Cloud Platform for deploying applications and managing cloud resources.", projects: ["Cornell Vending", "Vividly", "Nocturne"] },
      { name: "DigitalOcean", iconClass: "devicon-digitalocean-plain", level: "Intermediate", levelPercentage: 50, description: "Used DigitalOcean for deploying applications and managing cloud infrastructure.", projects: ["Uplift", "CRM Web App"] },
      { name: "Vercel", iconClass: "devicon-vercel-plain", level: "Intermediate", levelPercentage: 60, description: "Used Vercel for deploying and hosting frontend applications, especially those built with React.", projects: ["CRM Web App", "Spotipick", "Personal Website", "BRB Counter"] },
      { name: "NeonDB", iconClass: "devicon-postgresql-plain", level: "Beginner", levelPercentage: 30, description: "Used NeonDB for serverless PostgreSQL database solutions in web applications.", projects: ["CRM Web App"] },
      { 
        name: "Docker", 
        iconClass: "devicon-docker-plain",
        level: "Intermediate",
        levelPercentage: 80,
        description: "Containerized applications for development and deployment. Used docker-compose for local development environments and production setups.",
        projects: ["Vividly", "Nocturne", "CRM Web App", "Spotipick", "Uplift"]
      },
      { name: "GitHub", iconClass: "devicon-github-original", level: "Advanced", levelPercentage: 90, description: "Version control for all projects. Experienced with branching strategies, pull requests, code reviews, and complex merges.",
        projects: ["All projects"]
       },
    ],
    Tools: [
      { name: "VS Code", iconClass: "devicon-vscode-plain", level: "Advanced", levelPercentage: 90, description: "Primary IDE for all development. Proficient with extensions for formatting and debugging.", projects: ["All projects"] },
      { name: "Command Line", iconClass: "devicon-bash-plain", level: "Advanced", levelPercentage: 80, description: "Used extensively for version control, deployment, and server management.", projects: ["All projects"] },
      { name: "Vim", iconClass: "devicon-vim-plain", level: "Beginner", levelPercentage: 40, description: "Basic proficiency in Vim for quick edits and command line navigation.", projects: ["Uplift", "Other projects involving deployment"] },
      { name: "Postman", iconClass: "devicon-postman-plain", level: "Intermediate", levelPercentage: 60, description: "Used for testing and documenting APIs. Created collections for various projects.", projects: ["All projects involving a backend"] },
      { 
        name: "Jupyter", 
        iconClass: "devicon-jupyter-plain",
        level: "Advanced",
        levelPercentage: 85,
        description: "Used extensively for data analysis at GoTo Financial. Created interactive notebooks for data visualization, model development, and reporting.", 
        projects: ["GoTo Financial", "Spotipick"]
      },
      { name: "Jira", iconClass: "devicon-jira-plain", level: "Beginner", levelPercentage: 30, description: "Used for project management and issue tracking in team projects.", projects: ["GoTo Financial"] },
      { 
        name: "Git", 
        iconClass: "devicon-git-plain",
        level: "Advanced",
        levelPercentage: 90,
        description: "Version control for all projects. Experienced with branching strategies, pull requests, code reviews, and complex merges.",
        projects: ["All projects"]
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Skill Detail Area */}
      <div className="border rounded-lg bg-card-bg shadow-md transition-all h-[250px] sm:h-[210px] mb-8 overflow-hidden">
        <SkillDetail skill={hoveredSkill} />
      </div>

      {/* Skill Categories in Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 justify-left items-center">
              {skillsList.map((skill, index) => (
                <div 
                  key={`${skill.name}-${index}`}
                  className="relative group mb-2"
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)} // For mobile touch
                >
                  <div className={`
                    w-12 h-12 
                    sm:w-14 sm:h-14 
                    bg-card-bg 
                    rounded-lg 
                    shadow-md 
                    p-2 
                    flex 
                    items-center 
                    justify-center 
                    transition-all 
                    duration-200 
                    hover:shadow-lg 
                    hover:scale-110
                    ${hoveredSkill?.name === skill.name ? 'ring-2 ring-blue-500 scale-110 shadow-lg' : ''}
                  `}>
                    <i 
                      className={`${skill.iconClass} colored drop-shadow-md`}
                      style={{ fontSize: "1.25rem" }}
                      aria-label={skill.name}
                    />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 sm:hidden">
        Tap on an icon to see details
      </div>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 hidden sm:block">
        Hover over an icon to see details
      </div>
    </div>
  );
};

export default TechStack;