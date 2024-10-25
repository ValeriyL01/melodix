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
  const downloadLink = `https://sefon.pro/search/?q=${encodeURIComponent(
    artistName + " " + trackName
  )}`;
  return (
    <div className={styles.trackContainer}>
      <div onClick={handleTrackClick} className={styles.track}>
        <img
          className={styles.trackImage}
          src={albumImageUrl}
          alt={trackName}
        />
        <p className={styles.trackName}>{trackName}</p>
        <p className={styles.trackBand}>{artistName}</p>
      </div>
      <a
        href={downloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.trackDownloadLink}
      >
        Скачать
      </a>
    </div>
  );
};

export default Track;
