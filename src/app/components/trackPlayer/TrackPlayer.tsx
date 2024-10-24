import React from "react";
import { useTrackStore } from "../../../stores/useTrackIdStore";

export const TrackPlayer: React.FC = () => {
  const trackId = useTrackStore((state) => state.trackId);
  console.log(trackId);
  return (
    <iframe
      title="Spotify Track Player"
      src={`https://open.spotify.com/embed/track/${trackId}?view=coverart`}
      height="80"
      width="300"
      allow="encrypted-media"
      loading="lazy"
    ></iframe>
  );
};
