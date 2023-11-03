import React, { useEffect, useState } from "react";
import { GithubItem, fetchMostFavoritedRepos } from "./api/GithubClient";

export interface TrendingReposProviderProps {
  children: (props: {
    trendingRepos: GithubItem[];
    favoritedRepos: GithubItem[];
    handleFavoriteRepo: (repo: GithubItem) => void;
    handleUnfavoriteRepo: (repo: GithubItem) => void;
  }) => React.ReactNode;
}

const TrendingReposProvider: React.FC<TrendingReposProviderProps> = ({
  children,
}) => {
  const [trendingRepos, setTrendingRepos] = useState<GithubItem[]>([]);
  const [favoritedRepos, setFavoritedRepos] = useState<GithubItem[]>([]);

  useEffect(() => {
    async function fetchTrendingRepos() {
      const response = await fetchMostFavoritedRepos();
      setTrendingRepos(response);
    }

    fetchTrendingRepos();
  }, []);

  useEffect(() => {
    const storedFavoritedRepos = localStorage.getItem("favoritedRepos");
    if (storedFavoritedRepos) {
      setFavoritedRepos(JSON.parse(storedFavoritedRepos));
    }
  }, []);

  const updateLocalStorage = (repos: GithubItem[]) => {
    localStorage.setItem("favoritedRepos", JSON.stringify(repos));
  };

  const handleFavoriteRepo = (repo: GithubItem) => {
    if (!favoritedRepos.find((favorite) => favorite.id === repo.id)) {
      const updatedFavoritedRepos = [...favoritedRepos, repo];
      setFavoritedRepos(updatedFavoritedRepos);
      updateLocalStorage(updatedFavoritedRepos);
    }
  };

  const handleUnfavoriteRepo = (repo: GithubItem) => {
    const updatedFavoritedRepos = favoritedRepos.filter(
      (favorite) => favorite.id !== repo.id
    );
    setFavoritedRepos(updatedFavoritedRepos);
    updateLocalStorage(updatedFavoritedRepos);
  };

  return (
    <div>
      {children({
        trendingRepos,
        favoritedRepos,
        handleFavoriteRepo,
        handleUnfavoriteRepo,
      })}
    </div>
  );
};

export default TrendingReposProvider;
