import { useEffect } from "react";
import styles from "./App.module.scss";

import { getToken } from "./api/getToken";
import Playlist from "./components/playlist/Playlist";

function App() {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>Melodix</h1>
      <Playlist></Playlist>
    </div>
  );
}

export default App;
