import React, { useEffect, useState } from "react";
import { GithubItem, fetchMostFavoritedRepos } from "./api/GithubClient";
import { render } from "react-dom";
import App from "./App";

function Root() {
  const [trendingRepos, setTrendingRepos] = useState<GithubItem[]>([]);
  const [favoritedRepos, setFavoritedRepos] = useState<GithubItem[]>([]);

  useEffect(() => {
    async function fetchTrendingRepos() {
      const response = await fetchMostFavoritedRepos();
      setTrendingRepos(response);
    }

    fetchTrendingRepos();
  }, []);

  const handleFavoriteRepo = (repo: GithubItem) => {
    if (!favoritedRepos.find((favorite) => favorite.id === repo.id)) {
      setFavoritedRepos([...favoritedRepos, repo]);
    }
  };

  const handleUnfavoriteRepo = (repo: GithubItem) => {
    setFavoritedRepos(
      favoritedRepos.filter((favorite) => favorite.id !== repo.id)
    );
  };

  return (
    <App
      trendingReposProps={trendingRepos}
      favoritedReposProps={favoritedRepos}
      handleFavoriteRepoProps={handleFavoriteRepo}
      handleUnfavoriteRepoProps={handleUnfavoriteRepo}
    />
  );
}

render(<Root />, document.getElementById("root"));
