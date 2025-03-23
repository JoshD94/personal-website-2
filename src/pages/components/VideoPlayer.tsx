import { FC } from 'react';

interface VideoPlayerProps {
  src: string;
  caption?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src, caption }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <video 
        src={src} 
        className="w-full h-full object-cover" 
        controls 
        preload="metadata"
        playsInline
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
          {caption}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;