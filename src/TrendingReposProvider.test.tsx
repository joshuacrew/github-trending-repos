import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TrendingReposProvider from "./TrendingReposProvider";
import { GithubItem } from "./api/GithubClient";

const sampleRepo1: GithubItem = {
  id: 1,
  name: "Sample Repo 1",
  description: "A sample repository 1",
  html_url: "https://github.com/sample-repo-1",
  stargazers_count: 100,
  language: "Python",
  created_at: "2023-10-31",
};

const sampleRepo2: GithubItem = {
  id: 2,
  name: "Sample Repo 2",
  description: "A sample repository 2",
  html_url: "https://github.com/sample-repo-2",
  stargazers_count: 200,
  language: "Python",
  created_at: "2023-10-31",
};

type TestComponentProps = {
  trendingRepos: GithubItem[];
  favoritedRepos: GithubItem[];
  handleFavoriteRepo: (repo: GithubItem) => void;
  handleUnfavoriteRepo: (repo: GithubItem) => void;
};

const TestComponent: React.FC<TestComponentProps> = ({
  trendingRepos,
  favoritedRepos,
  handleFavoriteRepo,
  handleUnfavoriteRepo,
}) => {
  return (
    <div>
      <h1>Trending Repositories</h1>
      <ul>
        {trendingRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <h1>Favorited Repositories</h1>
      <ul>
        {favoritedRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      {trendingRepos.map((repo) => (
        <button key={repo.id} onClick={() => handleFavoriteRepo(repo)}>
          Favorite {repo.name}
        </button>
      ))}
      {favoritedRepos.map((repo) => (
        <button key={repo.id} onClick={() => handleUnfavoriteRepo(repo)}>
          Unfavorite {repo.name}
        </button>
      ))}
    </div>
  );
};

describe("TrendingReposProvider", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear local storage before each test
  });
  it("should render without errors and include child components", () => {
    render(
      <TrendingReposProvider>
        {({ favoritedRepos, handleFavoriteRepo, handleUnfavoriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favoritedRepos={[sampleRepo1]}
            handleFavoriteRepo={handleFavoriteRepo}
            handleUnfavoriteRepo={handleUnfavoriteRepo}
          />
        )}
      </TrendingReposProvider>
    );

    // Check if the elements are present in the rendered content
    expect(screen.getByText("Trending Repositories")).toBeInTheDocument();
    expect(screen.getByText("Favorited Repositories")).toBeInTheDocument();
    expect(screen.getByText("Favorite Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Unfavorite Sample Repo 1")).toBeInTheDocument();
  });
  it("should store favorited repositories in local storage", () => {
    render(
      <TrendingReposProvider>
        {({ favoritedRepos, handleFavoriteRepo, handleUnfavoriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favoritedRepos={favoritedRepos}
            handleFavoriteRepo={handleFavoriteRepo}
            handleUnfavoriteRepo={handleUnfavoriteRepo}
          />
        )}
      </TrendingReposProvider>
    );

    // Click the "Favorite Sample Repo 1" button
    fireEvent.click(screen.getByText("Favorite Sample Repo 1"));

    // Check if the repository is favorited
    expect(screen.getByText("Favorited Repositories")).toBeInTheDocument();

    // Ensure there are two elements with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(2);

    // Check if the favorited repository is stored in local storage
    const storedRepos = JSON.parse(
      localStorage.getItem("favoritedRepos") || "[]"
    );
    expect(storedRepos).toContainEqual(sampleRepo1);
  });

  it("should allow unfavoriting repositories and update local storage", () => {
    render(
      <TrendingReposProvider>
        {({ favoritedRepos, handleFavoriteRepo, handleUnfavoriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favoritedRepos={favoritedRepos}
            handleFavoriteRepo={handleFavoriteRepo}
            handleUnfavoriteRepo={handleUnfavoriteRepo}
          />
        )}
      </TrendingReposProvider>
    );
    // Click the "Favorite Sample Repo 1" button
    fireEvent.click(screen.getByText("Favorite Sample Repo 1"));

    // Ensure there are two elements with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(2);

    // Click the "Unfavorite Sample Repo 1" button
    fireEvent.click(screen.getByText("Unfavorite Sample Repo 1"));

    // Ensure there is now one element with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(1);

    // Check if the repository is removed from local storage
    const storedRepos = JSON.parse(
      localStorage.getItem("favoritedRepos") || "[]"
    );
    expect(storedRepos).not.toContainEqual(sampleRepo1);
  });
});
