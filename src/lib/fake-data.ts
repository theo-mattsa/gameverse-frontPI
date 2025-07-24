import {
  Game,
  User,
  Activity,
  GameList,
  UserReview,
  UserGameEntry,
} from "./api/types";
import { GENRES } from "./constants/genres";
import { PLATFORMS } from "./constants/platform";

export const fakeUsers: User[] = [
  {
    id: "user1",
    username: "GamerPro123",
    email: "gamerpro@example.com",
    foto: "#s",
    role: "CLIENT",
  },
  {
    id: "user2",
    username: "IndieExplorer",
    email: "indie@example.com",
    foto: "#",
    role: "CLIENT",
  },
  {
    id: "user3",
    username: "RetroQueen",
    email: "retro@example.com",
    foto: "#",
    role: "CLIENT",
  },
];

export const fakeGames: Game[] = [
  {
    id: "game1",
    title: "Odisseia Cibernética",
    coverImageUrl: "#",
    description:
      "Embarque em uma jornada emocionante por um futuro distópico. Explore vastas cidades, melhore suas habilidades e descubra segredos sombrios.",
    genres: [GENRES[1], GENRES[0]], // RPG, Ação
    platforms: [PLATFORMS[0], PLATFORMS[1]], // PC, PS5
    releaseDate: "2024-03-15",
    averageRating: 4.5,
    developer: "A tropa Games",
  },
  {
    id: "game2",
    title: "Guardião da Floresta",
    coverImageUrl: "https://placehold.co/300x400.png?text=Forest+Guardian",
    description:
      "Proteja a floresta antiga de uma corrupção crescente. Domine a magia elemental e faça amizade com criaturas da floresta nesta aventura encantadora.",
    genres: [GENRES[3], GENRES[7]], // Aventura, Indie
    platforms: [PLATFORMS[0], PLATFORMS[5]], // PC, Switch
    releaseDate: "2023-11-01",
    averageRating: 4.2,
  },
  {
    id: "game3",
    title: "Comandante Estelar",
    coverImageUrl: "https://placehold.co/300x400.png?text=Starship+Cmd",
    description:
      "Lidere sua frota à vitória em batalhas espaciais épicas. Gerencie recursos, pesquise novas tecnologias e supere seus inimigos neste grande jogo de estratégia.",
    genres: [GENRES[2], GENRES[4]], // Estratégia, Simulação
    platforms: [PLATFORMS[0]], // PC
    releaseDate: "2024-01-20",
    averageRating: 4.8,
  },
  {
    id: "game4",
    title: "Pixel Puzzler Pro",
    coverImageUrl: "https://placehold.co/300x400.png?text=Pixel+Puzzler",
    description:
      "Desafie sua mente com centenas de quebra-cabeças de pixel art intricados. Uma experiência relaxante e ao mesmo tempo estimulante para os amantes de puzzles.",
    genres: [GENRES[6], GENRES[7]],
    platforms: [PLATFORMS[0], PLATFORMS[6]],
    releaseDate: "2023-09-10",
    averageRating: 4.0,
  },
];

export const fakeUserGameEntries: UserGameEntry[] = [
  {
    id: "entry1",
    userId: fakeUsers[0].id,
    game: fakeGames[0],
    status: "playing",
    rating: 5,
    addedDate: "2024-05-01",
  },
  {
    id: "entry2",
    userId: fakeUsers[0].id,
    game: fakeGames[1],
    status: "completed",
    rating: 4,
    addedDate: "2024-02-10",
    review: {
      id: "review1",
      user: fakeUsers[0],
      game: fakeGames[1],
      rating: 4,
      title: "Aventura Encantadora!",
      text: "Adorei o estilo artístico e a história. Um pouco curto, mas muito doce.",
      createdAt: "2024-02-20",
    },
  },
  {
    id: "entry3",
    userId: fakeUsers[1].id,
    game: fakeGames[2],
    status: "backlog",
    addedDate: "2024-04-20",
  },
  {
    id: "entry4",
    userId: fakeUsers[0].id,
    game: fakeGames[3],
    status: "dropped",
    rating: 2,
    addedDate: "2023-12-01",
  },
];

export const fakeReviews: UserReview[] = [
  {
    id: "review1",
    user: fakeUsers[0],
    game: fakeGames[1],
    rating: 4,
    title: "Aventura Encantadora!",
    text: "Adorei o estilo artístico e a história de Guardião da Floresta. Foi um pouco curto para o meu gosto, mas o mundo era lindo e os personagens memoráveis. Um ótimo título indie!",
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "review2",
    user: fakeUsers[1],
    game: fakeGames[0],
    rating: 5,
    title: "Mundo Cyberpunk Incrível",
    text: "Odisseia Cibernética é tudo que eu queria em um RPG cyberpunk. A personalização é profunda, a história é envolvente e a cidade parece viva. Altamente recomendado!",
    createdAt: "2024-04-05T14:30:00Z",
  },
  {
    id: "review3",
    user: fakeUsers[2],
    game: fakeGames[3],
    rating: 4,
    title: "Ótimo para uma dose rápida de quebra-cabeças",
    text: "Pixel Puzzler Pro tem muito conteúdo e os quebra-cabeças são realmente desafiadores. Perfeito para jogar em pequenas sessões. Os controles no celular também são muito bons.",
    createdAt: "2023-10-01T09:15:00Z",
  },
  {
    id: "review4",
    user: fakeUsers[0],
    game: fakeGames[0],
    rating: 5,
    title: "Uma Obra-Prima!",
    text: "Odisseia Cibernética me surpreendeu. A construção de mundo é fenomenal.",
    createdAt: "2024-05-10T11:00:00Z",
  },
];

export const fakeGameLists: GameList[] = [
  {
    id: "list1",
    userId: fakeUsers[0].id,
    name: "Top 10 RPGs de 2024 (Até Agora)",
    description:
      "Meus jogos de RPG favoritos lançados ou jogados extensivamente em 2024.",
    games: [fakeGames[0]],
    createdAt: "2024-05-01T12:00:00Z",
    isPublic: true,
  },
  {
    id: "list2",
    userId: fakeUsers[1].id,
    name: "Indies Imperdíveis",
    description:
      "Uma coleção de jogos independentes que todos deveriam experimentar.",
    games: [fakeGames[1], fakeGames[3]],
    createdAt: "2024-03-10T16:45:00Z",
    isPublic: true,
  },
  {
    id: "list3",
    userId: fakeUsers[0].id,
    name: "Favoritos Cyberpunk",
    description: "Todos os jogos com estética neon que eu adoro.",
    games: [fakeGames[0]],
    createdAt: "2024-05-11T10:00:00Z",
    isPublic: true,
  },
];

export const placeholderActivities: Activity[] = [
  {
    id: "activity1",
    user: fakeUsers[1],
    type: "new_review",
    targetGame: fakeGames[0],
    contentSnippet: `escreveu uma avaliação para Odisseia Cibernética: "Mundo Cyberpunk Incrível..."`,
    createdAt: "2024-04-05T14:30:00Z",
  },
  {
    id: "activity2",
    user: fakeUsers[0],
    type: "new_list",
    targetList: fakeGameLists[0],
    contentSnippet: `criou uma nova lista: "Top 10 RPGs de 2024 (Até Agora)"`,
    createdAt: "2024-05-01T12:00:00Z",
  },
  {
    id: "activity3",
    user: fakeUsers[2],
    type: "game_status_update",
    targetGame: fakeGames[3],
    contentSnippet: `Concluído`,
    createdAt: "2023-11-15T08:00:00Z",
  },
  {
    id: "activity4",
    user: fakeUsers[0],
    type: "new_rating",
    targetGame: fakeGames[1],
    contentSnippet: `4`,
    createdAt: "2024-02-19T10:00:00Z",
  },
];
