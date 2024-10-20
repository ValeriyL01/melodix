import { useState } from "react";
import styles from "./track.module.scss";
import { TrackPlayer } from "../TrackPlayer";

interface TrackProps {
  id: string;
  trackName: string;
  artistName: string;
  albumImageUrl: string;
}

const Track: React.FC<TrackProps> = ({
  id,
  trackName,
  artistName,
  albumImageUrl,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  return (
    <div onClick={() => setSelectedTrackId(id)} className={styles.track}>
      <img className={styles.trackImage} src={albumImageUrl} alt={trackName} />
      <p className={styles.trackName}>{trackName}</p>
      <p className={styles.trackBand}>{artistName}</p>
      {selectedTrackId && <TrackPlayer trackId={selectedTrackId} />}
    </div>
  );
};

export default Track;
