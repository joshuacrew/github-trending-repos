import React, { useEffect, useState } from "react";
import { GithubItem, fetchMostFavouritedRepos } from "./api/GithubClient";

export interface TrendingReposProviderProps {
  children: (props: {
    trendingRepos: GithubItem[];
    favouritedRepos: GithubItem[];
    handleFavouriteRepo: (repo: GithubItem) => void;
    handleUnfavouriteRepo: (repo: GithubItem) => void;
  }) => React.ReactNode;
}

const TrendingReposProvider: React.FC<TrendingReposProviderProps> = ({
  children,
}) => {
  const [trendingRepos, setTrendingRepos] = useState<GithubItem[]>([]);
  const [favouritedRepos, setFavouritedRepos] = useState<GithubItem[]>([]);

  useEffect(() => {
    async function fetchTrendingRepos() {
      const response = await fetchMostFavouritedRepos();
      setTrendingRepos(response);
    }

    fetchTrendingRepos();
  }, []);

  useEffect(() => {
    const storedFavouritedRepos = localStorage.getItem("favouritedRepos");
    if (storedFavouritedRepos) {
      setFavouritedRepos(JSON.parse(storedFavouritedRepos));
    }
  }, []);

  const updateLocalStorage = (repos: GithubItem[]) => {
    localStorage.setItem("favouritedRepos", JSON.stringify(repos));
  };

  const handleFavouriteRepo = (repo: GithubItem) => {
    if (!favouritedRepos.find((favourite) => favourite.id === repo.id)) {
      const updatedFavouritedRepos = [...favouritedRepos, repo];
      setFavouritedRepos(updatedFavouritedRepos);
      updateLocalStorage(updatedFavouritedRepos);
    }
  };

  const handleUnfavouriteRepo = (repo: GithubItem) => {
    const updatedFavouritedRepos = favouritedRepos.filter(
      (favourite) => favourite.id !== repo.id
    );
    setFavouritedRepos(updatedFavouritedRepos);
    updateLocalStorage(updatedFavouritedRepos);
  };

  return (
    <div>
      {children({
        trendingRepos,
        favouritedRepos,
        handleFavouriteRepo,
        handleUnfavouriteRepo,
      })}
    </div>
  );
};

export default TrendingReposProvider;
