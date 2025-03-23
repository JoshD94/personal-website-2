import { FC } from "react";
import { PhotoData } from "../types";
import ImageSlider from "./ImageSlider";

interface HobbyCardProps {
  title: string;
  description: string;
  images: PhotoData[];
}

const HobbyCard: FC<HobbyCardProps> = ({
  title,
  description,
  images,
}) => {
  // Process text by handling indentation and multi-line examples
  const processDescription = (text: string) => {
    // First, split by quad space indentation to get main paragraphs
    const paragraphs = text.trim().split('    ');
    const formattedParagraphs = paragraphs.filter(p => p.trim().length > 0);
    
    return formattedParagraphs.map((paragraph, i) => {
      const trimmedPara = paragraph.trim();
      
      // Look for language examples (short lines without periods)
      if (trimmedPara.split('\n').length > 1) {
        // This paragraph has line breaks, likely language examples
        const lines = trimmedPara.split('\n');
        
        // Get the main paragraph text (if any) before the examples
        const mainText = lines[0].endsWith('.') ? lines[0] : '';
        
        // Get the language examples (usually short phrases)
        const examples = lines.filter(line => 
          line.trim().length > 0 && 
          (line !== mainText) && 
          !line.startsWith('   ')
        );
        
        return (
          <div key={i} className="space-y-2">
            {mainText && <p>{mainText}</p>}
            {examples.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-md my-2 space-y-1.5 font-medium">
                {examples.map((example, j) => (
                  <p key={j} className="text-sm">{example}</p>
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Regular paragraph
      return <p key={i}>{trimmedPara}</p>;
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden h-full">
      <div className="flex-none">
        <ImageSlider images={images} />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        
        <div className="mt-2 text-sm flex-grow space-y-4">
          {processDescription(description)}
        </div>
      </div>
    </div>
  );
};

export default HobbyCard;