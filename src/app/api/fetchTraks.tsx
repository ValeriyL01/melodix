interface Album {
  album_type: string; // Тип альбома (например, "compilation", "single", "album")
  total_tracks: number; // Общее количество треков в альбоме
  available_markets: string[]; // Массив стран (код стран по ISO 3166-1 alpha-2)
  external_urls: { spotify: string }; // Ссылки на альбом (например, на Spotify)
  href: string; // Ссылка на альбом в Spotify API
  id: string; // Идентификатор альбома
  images: Image[]; // Изображения альбома (обычно cover)
  name: string; // Название альбома
  release_date: string; // Дата релиза
  release_date_precision: string; // Точность даты ("year", "month", "day")
  restrictions: { reason: string }; // Причина ограничения (например, "market")
  type: string; // Тип объекта (должен быть "album")
  uri: string; // URI альбома в Spotify
  artists: Artist[]; // Список артистов, которые участвуют в альбоме
}

// Тип для трека
export interface Track {
  album: Album; // Альбом, к которому принадлежит трек
  artists: Artist[]; // Артисты, которые исполнили трек
  available_markets: string[]; // Страны, в которых доступна песня
  disc_number: number; // Номер диска
  duration_ms: number; // Продолжительность трека в миллисекундах
  explicit: boolean; // Является ли трек эксплицитным (цензурированным)
  external_ids: { isrc: string; ean: string; upc: string }; // Внешние идентификаторы
  external_urls: { spotify: string }; // Ссылки на трек (например, на Spotify)
  href: string; // Ссылка на трек в Spotify API
  id: string; // Идентификатор трека
  is_playable: boolean; // Можно ли воспроизвести трек
  linked_from: object; // Может содержать связанные данные (например, копия трека)
  restrictions: { reason: string }; // Причина ограничения (например, "market")
  name: string; // Название трека
  popularity: number; // Популярность трека (от 0 до 100)
  preview_url: string; // Ссылка на превью трека (обычно короткий клип)
  track_number: number; // Номер трека в альбоме
  type: string; // Тип объекта (должен быть "track")
  uri: string; // URI трека в Spotify
  is_local: boolean; // Локальная песня (если доступна локально)
}

// Тип для артиста
interface Artist {
  external_urls: { spotify: string }; // Ссылки на артиста (например, на Spotify)
  href: string; // Ссылка на артиста в Spotify API
  id: string; // Идентификатор артиста
  name: string; // Имя артиста
  type: string; // Тип объекта (должен быть "artist")
  uri: string; // URI артиста в Spotify
}

// Тип для изображения
interface Image {
  url: string; // URL изображения
  height: number; // Высота изображения
  width: number; // Ширина изображения
}

export async function fetchTraks(token: string): Promise<Track[]> {
  const result = await fetch(
    "https://api.spotify.com/v1/tracks?ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await result.json();
  return data.tracks || [];
}
