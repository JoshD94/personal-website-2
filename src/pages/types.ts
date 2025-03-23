export interface PhotoData {
  src: string;
  caption: string;
}

export interface Skill {
  name: string;
  iconClass: string;
  level?: string;  // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
  levelPercentage?: number;  // 0-100
  description?: string;  // Description of experience with this skill
  projects?: string[];
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface SkillCategories {
  [key: string]: Skill[];
  Languages: Skill[];
  Frontend: Skill[];
  Backend: Skill[];
  "Cloud & DevOps": Skill[];
  Tools: Skill[];
}

export interface ProjectData {
  title: string;
  description: string;
  techStack: Skill[];
  imageSrc?: string;
  link?: string;
}

export interface HobbyMedia {
  type: 'image' | 'video';
  src: string;
  caption: string;
}

export interface HobbyItem {
  title: string;
  description: string;
  media: HobbyMedia[];
}