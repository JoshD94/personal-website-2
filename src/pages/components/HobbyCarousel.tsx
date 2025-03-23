import { FC, useState, useRef, useEffect } from 'react';
import { PhotoData } from '../types';
import VideoPlayer from './VideoPlayer';
import { X } from 'lucide-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface HobbyMedia {
  type: 'image' | 'video';
  src: string;
  caption: string;
}

interface HobbyItem {
  title: string;
  description: string;
  media: HobbyMedia[];
}

interface HobbyCarouselProps {
  hobbies: HobbyItem[];
}

const HobbyCarousel: FC<HobbyCarouselProps> = ({ hobbies }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 639px)');

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
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md my-2 space-y-1.5 font-medium">
                {examples.map((example, j) => (
                  <p key={j} className="text-sm">{example}</p>
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Regular paragraph
      return <p key={i} className="mb-3">{trimmedPara}</p>;
    });
  };

  // Simplified, smoother expanding and centering approach
  const expandAndCenter = (index: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cards = Array.from(container.querySelectorAll('.hobby-card'));
    if (index >= cards.length) return;
    
    const card = cards[index] as HTMLElement;
    if (!card) return;
    
    // First update state to trigger expansion
    setSelectedIndex(index);
    setIsExpanded(true);
    
    // Calculate the final position in a single step
    // Wait for expansion to complete
    setTimeout(() => {
      if (!carouselRef.current) return;
      
      const updatedContainer = carouselRef.current;
      const updatedCards = Array.from(updatedContainer.querySelectorAll('.hobby-card'));
      if (index >= updatedCards.length) return;
      
      const expandedCard = updatedCards[index] as HTMLElement;
      if (!expandedCard) return;
      
      // Get measurements
      const containerWidth = updatedContainer.offsetWidth;
      const cardWidth = expandedCard.offsetWidth;
      const cardLeft = expandedCard.offsetLeft;
      const maxScrollLeft = updatedContainer.scrollWidth - containerWidth;
      
      // Calculate centered position
      let scrollPosition = Math.max(0, cardLeft - (containerWidth - cardWidth) / 2);
      
      // For edge cases, ensure we don't scroll beyond boundaries
      scrollPosition = Math.min(scrollPosition, maxScrollLeft);
      
      // Smooth scroll to position in a single movement
      updatedContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }, 50); // Short delay to ensure DOM updates with the expanded state
  };

  // Toggle expanded state - only works on desktop
  const toggleExpand = (index: number) => {
    // Don't expand on mobile
    if (isMobile) return;
    
    if (selectedIndex === index && isExpanded) {
      // Collapse if clicking the same card that's already expanded
      setIsExpanded(false);
    } else {
      // Expand and center simultaneously
      expandAndCenter(index);
    }
  };
  
  // Function to either scroll or navigate to next/previous card
  const handleNavigation = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    // If a card is expanded, navigate to next/previous card
    if (isExpanded && selectedIndex !== null) {
      let newIndex;
      
      if (direction === 'left') {
        // Go to previous card or wrap to end
        newIndex = selectedIndex > 0 ? selectedIndex - 1 : hobbies.length - 1;
      } else {
        // Go to next card or wrap to beginning
        newIndex = selectedIndex < hobbies.length - 1 ? selectedIndex + 1 : 0;
      }
      
      // Expand the new card
      expandAndCenter(newIndex);
    } 
    // Otherwise scroll the carousel
    else {
      const container = carouselRef.current;
      
      // On mobile, scroll to next/previous complete card
      if (isMobile) {
        const cardWidth = container.querySelector('.hobby-card')?.clientWidth || 0;
        const scrollAmount = cardWidth + 24; // Card width + gap
        
        if (direction === 'left') {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      } 
      // On desktop, just scroll by fixed amount
      else {
        const scrollAmount = 300;
        
        if (direction === 'left') {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <div className="w-full">
      {/* Carousel container */}
      <div className="relative">
        {/* Different instructions for mobile and desktop */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="sm:hidden">Scroll sideways to view all hobbies</span>
          <span className="hidden sm:inline">{isExpanded ? 'Tap the X to close' : 'Tap a card to expand'}</span>
        </div>

        {/* Carousel with navigation buttons */}
        <div className="relative">
          {/* Navigation buttons - positioned beside the image instead of center */}
          <div className="absolute left-2 top-[15%] sm:top-1/2 transform sm:-translate-y-1/2 z-20">
            <button 
              onClick={() => handleNavigation('left')}
              className="rounded-full bg-card-bg shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none text-foreground"
              aria-label={isExpanded ? "Previous card" : "Scroll left"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="absolute right-2 top-[15%] sm:top-1/2 transform sm:-translate-y-1/2 z-20">
            <button 
              onClick={() => handleNavigation('right')}
              className="rounded-full bg-card-bg shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none text-foreground"
              aria-label={isExpanded ? "Next card" : "Scroll right"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          {/* The actual carousel - now with visible scrollbar for mouse users */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 gap-6 scroll-smooth px-12 carousel snap-x snap-mandatory sm:snap-none"
          >
          {hobbies.map((hobby, index) => (
            <div 
              key={index}
              className={`
                hobby-card
                flex-none rounded-lg shadow-md overflow-hidden cursor-pointer 
                transform transition-all duration-500 ease-in-out
                hover:shadow-lg snap-center
                ${selectedIndex === index && isExpanded 
                  ? 'w-[500px] h-[500px] max-w-[80vw] max-h-[80vw]' // Square expanded state on desktop
                  : 'w-[calc(85vw)] md:w-[calc(20vw)] sm:w-[calc(65vw)] h-[calc(140vw)] md:h-[calc(20vw)] sm:h-[calc(80vw)]'} // Much taller on mobile for text
                ${selectedIndex !== index && isExpanded ? 'opacity-50 sm:opacity-50' : 'opacity-100'}
              `}
              onClick={() => toggleExpand(index)}
            >
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col overflow-hidden">
                {/* Image/Video container */}
                <div 
                  className={`
                    relative 
                    ${selectedIndex === index && isExpanded 
                      ? 'w-full h-[50%] flex-shrink-0' // Take up top half of square card for desktop expanded state
                      : 'w-full h-[30%] sm:h-full flex-shrink-0'} // Even smaller height on mobile to make room for more description
                  `}
                >
                  {/* Thumbnail - display first media item */}
                  {hobby.media.length > 0 && (
                    <>
                      {hobby.media[0].type === 'image' ? (
                        <img 
                          src={hobby.media[0].src} 
                          alt={hobby.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 bg-black opacity-60"></div>
                          <div className="z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80">
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-blue-600 ml-1"></div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                
                  {/* Title overlay for desktop non-expanded state only */}
                  {(!isExpanded || selectedIndex !== index) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent items-end p-4 hidden sm:flex">
                      <h3 className="text-white font-semibold text-xl">{hobby.title}</h3>
                    </div>
                  )}
                
                  {/* Media count indicator */}
                  {hobby.media.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                      {hobby.media.length} {hobby.media.length === 1 ? 'media' : 'media'}
                    </div>
                  )}

                  {/* View details text - desktop only */}
                  {(!isExpanded || selectedIndex !== index) && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full hidden sm:block">
                      View details
                    </div>
                  )}
                </div>

                {/* Description area - always visible on mobile, only when expanded on desktop */}
                {(selectedIndex === index && isExpanded) || isMobile ? (
                  <div className="flex-grow overflow-y-auto p-4 h-[70%] sm:h-[50%] bg-card-bg hobby-content flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{hobby.title}</h3>
                      {selectedIndex === index && isExpanded && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                          }}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground hidden sm:block"
                          aria-label="Close"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                    <div className="prose text-sm pr-2 text-foreground">
                      {/* On mobile, show full description without truncation */}
                      {processDescription(hobby.description)}
                    </div>
                    
                    {/* Media gallery - only shown when expanded on desktop */}
                    {hobby.media.length > 1 && selectedIndex === index && isExpanded && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Gallery</h4>
                        <div className="flex overflow-x-auto gap-2 pb-2">
                          {hobby.media.map((media, mediaIndex) => (
                            <div key={mediaIndex} className="flex-none w-20 h-20 rounded-md overflow-hidden">
                              {media.type === 'image' ? (
                                <img 
                                  src={media.src} 
                                  alt={media.caption} 
                                  className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                                />
                              ) : (
                                <div className="w-full h-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80">
                                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-2 space-x-2">
          {hobbies.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${selectedIndex === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              onClick={() => toggleExpand(index)}
            />
          ))}
        </div>
        </div>
      </div>

      {/* Hide horizontal scrollbar but keep scrolling functionality */}
      <style jsx global>{`
        /* Hide scrollbar but keep functionality */
        .carousel {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .carousel::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        /* Style for the content scrollbar inside expanded cards */
        .hobby-content::-webkit-scrollbar {
          width: 6px;
        }
        .hobby-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .hobby-content::-webkit-scrollbar-thumb {
          background: #cdcdcd;
          border-radius: 3px;
        }
        .hobby-content::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
};

export default HobbyCarousel;