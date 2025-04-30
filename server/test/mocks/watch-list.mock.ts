export const movieByIdObjects = [
  {
    id: 'tt1234567',
    title: 'The Last Horizon',
    overview:
      'A team of astronauts discovers a mysterious signal at the edge of our solar system, leading them on a journey that challenges their understanding of space and time.',
    release_date: '2023-08-15',
    vote_average: 8.4,
    poster_path: '/path/to/last-horizon-poster.jpg',
    backdrop_path: '/path/to/last-horizon-backdrop.jpg',
    genre_ids: [878, 12, 28], // Sci-fi, Adventure, Action
    original_language: 'en',
    original_title: 'The Last Horizon',
  },
  {
    id: 'tt2345678',
    title: 'Midnight in Tokyo',
    overview:
      "A young photographer gets lost in Tokyo's neon-lit streets, where she encounters a cast of eccentric characters who help her discover herself.",
    release_date: '2023-06-22',
    vote_average: 7.9,
    poster_path: '/path/to/midnight-tokyo-poster.jpg',
    backdrop_path: '/path/to/midnight-tokyo-backdrop.jpg',
    genre_ids: [18, 10749, 35], // Drama, Romance, Comedy
    original_language: 'ja',
    original_title: '東京の真夜中',
  },
  {
    id: 'tt3456789',
    title: 'Desert Storm',
    overview:
      'During a massive sandstorm, a group of archaeologists uncovers an ancient city with dark secrets that should have remained buried.',
    release_date: '2023-09-30',
    vote_average: 7.2,
    poster_path: '/path/to/desert-storm-poster.jpg',
    backdrop_path: '/path/to/desert-storm-backdrop.jpg',
    genre_ids: [12, 27, 9648], // Adventure, Horror, Mystery
    original_language: 'en',
    original_title: 'Desert Storm',
  },
  {
    id: 'tt4567890',
    title: "The Chef's Letter",
    overview:
      "A renowned chef receives a mysterious letter that leads her on a culinary journey through her grandmother's past in post-war France.",
    release_date: '2023-07-08',
    vote_average: 8.1,
    poster_path: '/path/to/chefs-letter-poster.jpg',
    backdrop_path: '/path/to/chefs-letter-backdrop.jpg',
    genre_ids: [18, 36, 10749], // Drama, History, Romance
    original_language: 'fr',
    original_title: 'La Lettre du Chef',
  },
  {
    id: 'tt5678901',
    title: 'Digital Dreams',
    overview:
      'A brilliant programmer creates an AI that begins to blur the line between virtual and reality, forcing her to question what consciousness really means.',
    release_date: '2023-10-12',
    vote_average: 7.8,
    poster_path: '/path/to/digital-dreams-poster.jpg',
    backdrop_path: '/path/to/digital-dreams-backdrop.jpg',
    genre_ids: [878, 53, 9648], // Sci-fi, Thriller, Mystery
    original_language: 'en',
    original_title: 'Digital Dreams',
  },
];

export const movieServiceMock = {
  searchMovieById: jest.fn(),
};

export const watchListItems = {
  movie1: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    movieId: crypto.randomUUID(),
    createdAt: Date.now(),
  },
  movie2: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    movieId: crypto.randomUUID(),
    createdAt: Date.now(),
  },
};

export const watchListServiceMock = {
  getWatchList: jest.fn(),
  addToWatchList: jest.fn(),
  removeFromWatchList: jest.fn(),
};
