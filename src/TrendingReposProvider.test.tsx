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
  favouritedRepos: GithubItem[];
  handleFavouriteRepo: (repo: GithubItem) => void;
  handleUnfavouriteRepo: (repo: GithubItem) => void;
};

const TestComponent: React.FC<TestComponentProps> = ({
  trendingRepos,
  favouritedRepos,
  handleFavouriteRepo,
  handleUnfavouriteRepo,
}) => {
  return (
    <div>
      <h1>Trending Repositories</h1>
      <ul>
        {trendingRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <h1>Favourited Repositories</h1>
      <ul>
        {favouritedRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      {trendingRepos.map((repo) => (
        <button key={repo.id} onClick={() => handleFavouriteRepo(repo)}>
          Favourite {repo.name}
        </button>
      ))}
      {favouritedRepos.map((repo) => (
        <button key={repo.id} onClick={() => handleUnfavouriteRepo(repo)}>
          Unfavourite {repo.name}
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
        {({ favouritedRepos, handleFavouriteRepo, handleUnfavouriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favouritedRepos={[sampleRepo1]}
            handleFavouriteRepo={handleFavouriteRepo}
            handleUnfavouriteRepo={handleUnfavouriteRepo}
          />
        )}
      </TrendingReposProvider>
    );

    // Check if the elements are present in the rendered content
    expect(screen.getByText("Trending Repositories")).toBeInTheDocument();
    expect(screen.getByText("Favourited Repositories")).toBeInTheDocument();
    expect(screen.getByText("Favourite Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Unfavourite Sample Repo 1")).toBeInTheDocument();
  });
  it("should store favourited repositories in local storage", () => {
    render(
      <TrendingReposProvider>
        {({ favouritedRepos, handleFavouriteRepo, handleUnfavouriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favouritedRepos={favouritedRepos}
            handleFavouriteRepo={handleFavouriteRepo}
            handleUnfavouriteRepo={handleUnfavouriteRepo}
          />
        )}
      </TrendingReposProvider>
    );

    // Click the "Favourite Sample Repo 1" button
    fireEvent.click(screen.getByText("Favourite Sample Repo 1"));

    // Check if the repository is favourited
    expect(screen.getByText("Favourited Repositories")).toBeInTheDocument();

    // Ensure there are two elements with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(2);

    // Check if the favourited repository is stored in local storage
    const storedRepos = JSON.parse(
      localStorage.getItem("favouritedRepos") || "[]"
    );
    expect(storedRepos).toContainEqual(sampleRepo1);
  });

  it("should allow unfavoriting repositories and update local storage", () => {
    render(
      <TrendingReposProvider>
        {({ favouritedRepos, handleFavouriteRepo, handleUnfavouriteRepo }) => (
          <TestComponent
            trendingRepos={[sampleRepo1, sampleRepo2]}
            favouritedRepos={favouritedRepos}
            handleFavouriteRepo={handleFavouriteRepo}
            handleUnfavouriteRepo={handleUnfavouriteRepo}
          />
        )}
      </TrendingReposProvider>
    );
    // Click the "Favourite Sample Repo 1" button
    fireEvent.click(screen.getByText("Favourite Sample Repo 1"));

    // Ensure there are two elements with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(2);

    // Click the "Unfavourite Sample Repo 1" button
    fireEvent.click(screen.getByText("Unfavourite Sample Repo 1"));

    // Ensure there is now one element with the text "Sample Repo 1"
    expect(screen.getAllByText("Sample Repo 1")).toHaveLength(1);

    // Check if the repository is removed from local storage
    const storedRepos = JSON.parse(
      localStorage.getItem("favouritedRepos") || "[]"
    );
    expect(storedRepos).not.toContainEqual(sampleRepo1);
  });
});
