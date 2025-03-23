import { FC } from "react";
import { PhotoData } from "./types";
import ImageSlider from "./ImageSlider";

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  bulletPoints: string[];
  images: PhotoData[];
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  title,
  company,
  location,
  period,
  bulletPoints,
  images,
}) => {
  return (
    <div className="flex flex-col bg-card-bg hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full cursor-pointer">
      <div className="flex-none">
        <ImageSlider images={images} />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{period}</p>
          </div>
          <p className="italic text-gray-700 dark:text-gray-300">{company}, {location}</p>
        </div>
        
        <ul className="list-disc list-outside ml-5 mt-2 text-sm flex-grow text-foreground">
          {bulletPoints.map((point, index) => {
            // Replace link tags with spans to make them non-clickable but keep the blue text style
            let updatedPoint = point
              // First ensure color classes are consistent
              .replace(/text-blue-\d{3}/g, 'text-blue-600 dark:text-blue-400')
              .replace(/hover:text-blue-\d{3}/g, 'hover:text-blue-800 dark:hover:text-blue-300')
              // Then replace <a> tags with <span> to make them non-clickable
              .replace(/<a href="[^"]*"([^>]*)>(.*?)<\/a>/g, '<span $1>$2</span>');
              
            return <li key={index} dangerouslySetInnerHTML={{ __html: updatedPoint }} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;