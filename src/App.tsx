import { useEffect, useState } from 'react';
import { GithubItem, fetchMostFavoritedRepos } from './api/GithubClient';

const App: React.FC = () => {
  const [trendingRepos, setTrendingRepos] = useState<GithubItem[]>([]);

  useEffect(() => {
    async function fetchTrendingRepos() {
      const response = await fetchMostFavoritedRepos();
      setTrendingRepos(response);
    }

    fetchTrendingRepos();
  }, []);

  return (
    <div>
      <h1>Trending GitHub Repositories</h1>
      <ul>
        {trendingRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
            <p>{repo.description}</p>
            <span>{repo.stargazers_count} stars</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
