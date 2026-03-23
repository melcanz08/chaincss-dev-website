interface Stats {
  version: string;
  npmDownloads: number;
  githubStars: number;
  lastUpdated: string;
}

export async function fetchStats(): Promise<Stats> {
  try {
    // Fetch version from npm
    const npmResponse = await fetch('https://registry.npmjs.org/@melcanz85/chaincss/latest');
    const npmData = await npmResponse.json();
    const version = npmData.version;
    
    // Fetch download count from npm (last 30 days)
    const downloadsResponse = await fetch('https://api.npmjs.org/downloads/point/last-month/@melcanz85/chaincss');
    const downloadsData = await downloadsResponse.json();
    const npmDownloads = downloadsData.downloads || 0;
    
    // Fetch GitHub stars
    const githubResponse = await fetch('https://api.github.com/repos/melcanz08/chaincss');
    const githubData = await githubResponse.json();
    const githubStars = githubData.stargazers_count || 0;
    
    return {
      version,
      npmDownloads,
      githubStars,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    // Return fallback data if API fails
    return {
      version: '1.12.5',
      npmDownloads: 0,
      githubStars: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}