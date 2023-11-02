export type GitHubApiResponse = {
  items: GithubItem[];
};

export type GithubItem = {
  id: number;
  name: string;
  stargazers_count: number;
  description: string;
  html_url: string;
  language: string;
  created_at: string;
};

async function fetchMostFavoritedRepos(): Promise<GithubItem[]> {
  const currentDate = new Date(); // Get the current date and time
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7); // Subtract 7 days

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:${oneWeekAgo.toISOString()}..${currentDate.toISOString()}&sort=stars&order=desc`,
    );
    const json = await response.json();
    return json.items as GithubItem[];
  } catch (error) {
    console.error('Error fetching most favorited repositories:', error);
    throw error;
  }
}

export { fetchMostFavoritedRepos };
