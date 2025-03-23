import React from "react";
import { ProjectData } from "./types";
import "devicon/devicon.min.css";

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-card-bg rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Image container with vignette effect */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {project.imageSrc ? (
          <div className="relative w-full h-full">
            {/* The actual image */}
            <img 
              src={project.imageSrc} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Vignette overlay - adds dark edges on all sides */}
            <div className="absolute inset-0 pointer-events-none box-border"
              style={{
                boxShadow: 'inset 0 0 20px 10px rgba(0, 0, 0, 0.25)'
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">Screenshot coming soon</div>
        )}
      </div>
      
      <div className="p-5 space-y-3 flex-grow">
        {/* Title with optional link */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Visit
            </a>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
        
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1"
                title={tech.name}
              >
                {tech.iconClass && (
                  <i className={`${tech.iconClass} colored mr-1 text-sm`} />
                )}
                <span className="text-xs">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;