import React from "react";

interface TrackPlayerProps {
  trackId: string;
}

export const TrackPlayer: React.FC<TrackPlayerProps> = ({ trackId }) => {
  return (
    <div>
      <iframe
        title="Spotify Track Player"
        src={`https://open.spotify.com/embed/track/${trackId}`}
        height="100"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};
