import styles from "./Playlists.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAccessTokenFromStorage } from "../../api/auth";
import { searchPlaylists } from "../../api/searchPlaylist";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../../stores/searchStore";
import Loading from "../../components/loading/Loading";

export const Playlists: React.FC = () => {
  const query = useSearchStore((state) => state.query);
  const token = getAccessTokenFromStorage();
  const navigate = useNavigate();

  const { data: playlists, isLoading } = useQuery({
    queryKey: ["searchPlaylists", token, query],
    queryFn: () => searchPlaylists(token ?? "", query),
  });

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };
  if (!query || !playlists) {
    return null;
  }
  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className={styles.playlists}>
      <h2 className={styles.playlistsTitle}>Playlists</h2>
      <div className={styles.playlistsContainer}>
        {playlists.items.map((playlist) => (
          <div
            key={playlist.id}
            className={styles.playlistItem}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <img
              className={styles.playlistImage}
              src={playlist.images[0]?.url}
              alt={playlist.name}
            />
            <div className={styles.playlistInfo}>
              <h3 className={styles.playlistName}>{playlist.name}</h3>
              <p className={styles.playlistOwner}>
                {playlist.owner?.display_name &&
                  `by ${playlist.owner.display_name}`}
              </p>
              <p className={styles.playlistTotalTracks}>
                {playlist.tracks.total} tracks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
