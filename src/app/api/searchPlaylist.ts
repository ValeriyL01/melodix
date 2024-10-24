import { Playlist } from "./fetchPlaylist";
interface PlaylistResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
}
export async function searchPlaylists(
  token: string,
  query: string
): Promise<PlaylistResponse> {
  try {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=playlist&limit=40`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(`Error ${result.status}: ${errorData.error.message}`);
    }

    const data = await result.json();
    return data.playlists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
}
