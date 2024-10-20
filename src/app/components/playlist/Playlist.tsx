import styles from "./Playlist.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAccessTokenFromStorage } from "../../api/auth";

import { useEffect } from "react";

import Track from "../track/track";
import { fetchPlaylist } from "../../api/fetchPlaylist";

const Playlist: React.FC = () => {
  const token = getAccessTokenFromStorage();
  const id = "3wm6WBu58NZN1dlH9lnBsa";
  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist", token, id],
    queryFn: () => fetchPlaylist(token ?? "", id),
  });

  useEffect(() => {
    console.log("playlist", Array.isArray(playlist));
    console.log("playlist", playlist);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.playlist}>
      <h2 className={styles.playlistTitle}>Playlist</h2>
      <div className={styles.playlistHeader}>
        <img src={playlist?.images[1].url}></img>{" "}
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
