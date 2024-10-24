import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../../stores/searchStore";
import styles from "./Search.module.scss";
import { useEffect } from "react";

export const Search: React.FC = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [query]);

  return (
    <div className={styles.playlistSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter playlist name"
        className={styles.searchInput}
      />
    </div>
  );
};
