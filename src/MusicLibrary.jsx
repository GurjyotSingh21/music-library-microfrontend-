import React, { useState, useEffect } from "react";

const MusicLibrary = ({ role }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const savedSongs = localStorage.getItem('songs');
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    } else {
      // Default songs
      setSongs([
        { id:1, title: "Clash", artist: "Diljit Dosanjh", album: "Punjabi" },
        { id:2, title: "O Sanam", artist: "Lucky Ali", album: "Happy vibes" },
        { id:3, title: "Muskurane ki wajah", artist: "Arijit Singh", album: "Lo-fi sad" },
        { id:4, title: "295", artist: "Siddhu Moosewala", album: "Punjabi" },
        { id:5, title: "5 Taara", artist: "Diljit Dosanjh", album: "Party" },
        { id:6, title: "Mere liye tum", artist: "Ayushman Khurana", album: "Happy vibes" },
        { id:7, title: "Rashke Qamar", artist: "RFAK", album: "Lo-fi sad" },
        { id:8, title: "I guess", artist: "Kr$na", album: "Rap" },
        { id:9, title: "Lungi Dance", artist: "Yo Yo Honey Singh", album: "Party" },
        { id:10, title: "Jind Maahi", artist: "Diljit Dosanjh", album: "Happy vibes" },
        { id:11, title: "Hamari adhuri kahani", artist: "Arijit Singh", album: "Lo-fi sad" },
        { id:12, title: "Dollar", artist: "Siddhu Moosewala", album: "Punjabi" },
        { id:13, title: "Breathless", artist: "S. Mahadevan", album: "Patriotic" },
        { id:14, title: "Softly", artist: "Karan Aujla", album: "Punjabi" },
        { id:15, title: "Namastute", artist: "Seedhe Maut", album: "Rap" },
      ]);
    }
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  }, [songs]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("");

  let filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase()) ||
      song.album.toLowerCase().includes(search.toLowerCase())
  );

  filteredSongs.sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy], undefined, { sensitivity: "base" })
  );

  let groupedSongs = {};
  if (groupBy) {
    groupedSongs = filteredSongs.reduce((acc, song) => {
      const key = song[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(song);
      return acc;
    }, {});
  }

  const addSong = () => {
    const title = window.prompt("Enter song title:");
    if (!title) return; 
    const artist = window.prompt("Enter artist name:");
    if (!artist) return;
    const album = window.prompt("Enter album name:");
    if (!album) return;

    const newSong = {
      id: Date.now(),
      title,
      artist,
      album,
    };
    setSongs([...songs, newSong]);
  };

  const deleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div className="items-center min-height-screen justify-center bg-black text-white">
    <div className="bg-neutral-900 min-w-3xl rounded-2xl shadow-2xl p-10 w-full max-w-md border border-green-500">
    <div className="max-w-3xl mx-auto p-4 bg-grey-800 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-green-400 mb-4">Music Library</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title, artist, or album"
          aria-label="Search songs"
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          aria-label="Sort songs"
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="title" className="text-black">Sort by Title</option>
          <option value="artist" className="text-black">Sort by Artist</option>
          <option value="album" className="text-black">Sort by Album</option>
        </select>

        <select
          onChange={(e) => setGroupBy(e.target.value)}
          value={groupBy}
          aria-label="Group songs"
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="text-black">No Grouping</option>
          <option value="artist" className="text-black">Group by Artist</option>
          <option value="album" className="text-black">Group by Album</option>
        </select>
      </div>

      {groupBy ? (
        Object.keys(groupedSongs).map((key) => (
          <div key={key} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {groupBy}: {key}
            </h3>
            <ul className="space-y-2">
              {groupedSongs[key].map((song) => (
                <li
                  key={song.id}
                  className="flex justify-between items-center text-black p-2 bg-gray-100 rounded-md"
                >
                  <span>
                    {song.title} - {song.artist} ({song.album})
                  </span>
                  {role === "admin" && (
                    <button
                      onClick={() => deleteSong(song.id)}
                      className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      ❌ Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="space-y-2">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center p-2 text-black bg-gray-100 rounded-md"
            >
              <span>
                {song.title} - {song.artist} ({song.album})
              </span>
              {role === "admin" && (
                <button
                  onClick={() => deleteSong(song.id)}
                  className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ❌ Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {role === "admin" && (
        <button
          onClick={addSong}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Song
        </button>
      )}
    </div>
    </div>
    </div>
  );
};

export default MusicLibrary;