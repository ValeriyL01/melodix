import styles from "./track.module.scss";

import { useTrackStore } from "../../../stores/useTrackIdStore";

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
  const addTrackId = useTrackStore((state) => state.addTrackId);

  const handleTrackClick = () => {
    addTrackId(id);
  };
  return (
    <div onClick={handleTrackClick} className={styles.track}>
      <img className={styles.trackImage} src={albumImageUrl} alt={trackName} />
      <p className={styles.trackName}>{trackName}</p>
      <p className={styles.trackBand}>{artistName}</p>
    </div>
  );
};

export default Track;
