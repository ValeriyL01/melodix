import { Search } from "../search/Search";
import { TrackPlayer } from "../trackPlayer/TrackPlayer";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}></div>
      <Search />
      <TrackPlayer />
    </div>
  );
};
