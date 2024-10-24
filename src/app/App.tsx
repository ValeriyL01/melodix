import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Playlist from "./pages/playlist/Playlist";
import styles from "./App.module.scss";

import Callback from "./pages/Callback";
import { useEffect } from "react";
import { getToken } from "./api/getToken";
import { RouterOutlet } from "./routerOutlet/RouterOutlet";
import { Playlists } from "./pages/playlists/Playlists";

function App() {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.appContainer}>
          <Routes>
            <Route path="/" element={<RouterOutlet />}>
              <Route path="/" element={<Playlists />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/callback" element={<Callback />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
