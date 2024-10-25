import styles from "./Playlist.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAccessTokenFromStorage } from "../../api/auth";
import { useParams } from "react-router-dom";
import { fetchPlaylist } from "../../api/fetchPlaylist";
import Track from "../../components/track/Track";

import Loading from "../../components/loading/Loading";
const Playlist: React.FC = () => {
  const token = getAccessTokenFromStorage();
  const { id } = useParams();

  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist", token, id],
    queryFn: () => fetchPlaylist(token ?? "", id ?? ""),
  });

  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className={styles.playlist}>
      <h2 className={styles.playlistTitle}>Songs</h2>
      <div className={styles.playlistHeader}>
        <img
          className={styles.playlistImage}
          src={playlist?.images[0].url}
          alt={playlist?.name}
        />
        <div>
          <h3 className={styles.playlistName}>{playlist?.name}</h3>
          <p className={styles.playlistTotal}>{playlist?.tracks.total} songs</p>
        </div>
      </div>
      <div className={styles.playlistContainer}>
        {playlist?.tracks.items.map((trackData) => (
          <Track
            key={trackData.track.id}
            id={trackData.track.id}
            trackName={trackData.track.name}
            artistName={trackData.track.album.artists[0].name}
            albumImageUrl={trackData.track.album.images[1].url}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
