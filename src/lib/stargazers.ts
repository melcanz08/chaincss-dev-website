export interface Stargazer {
  login: string;
  avatar_url: string;
  html_url: string;
  starred_at: string;
}

export async function fetchStargazers(): Promise<Stargazer[]> {
  try {
    const response = await fetch('https://api.github.com/repos/melcanz08/chaincss/stargazers');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch stargazers:', error);
    return [];
  }
}