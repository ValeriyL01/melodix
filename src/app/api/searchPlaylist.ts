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
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=playlist&limit=20`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return data.playlists;
}
