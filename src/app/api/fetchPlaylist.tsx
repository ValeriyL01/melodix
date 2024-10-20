import { Track } from "./fetchTraks";

// Define the structure for the external URLs
interface ExternalUrls {
  spotify: string;
}

// Define the structure for a user (playlist owner or user who added a track)
interface User {
  external_urls: ExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  type: "user"; // Spotify type for users
  uri: string;
  display_name: string;
}

// Define the structure for a playlist track item
interface PlaylistItem {
  added_at: string;
  added_by: User;
  is_local: boolean;
  track: Track;
}

// Define the structure for the playlist
export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: PlaylistItem[];
  };
  type: "playlist"; // Playlist type
  uri: string;
}

export async function fetchPlaylist(
  token: string,
  playlistId: string
): Promise<Playlist> {
  const url = new URL(`https://api.spotify.com/v1/playlists/${playlistId}`);

  const market = "BY";

  const additionalTypes = "track";

  url.searchParams.append("market", market);

  url.searchParams.append("additional_types", additionalTypes);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch playlist: ${response.statusText}`);
  }

  const data: Playlist = await response.json();

  return data;
}
