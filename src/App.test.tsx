import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { GithubItem } from "./api/GithubClient";
import { GithubItemComponentProps } from "./GithubItemComponent";

jest.mock("./GithubItemComponent", () => {
  return {
    __esModule: true,
    default: (gh: GithubItemComponentProps) => {
      return (
        <div>
          {gh.isFavorited ? (
            <button onClick={gh.onUnfavorite}>Unfavorite</button>
          ) : (
            <button onClick={gh.onFavorite}>Favorite</button>
          )}
          <div>{gh.repo.name}</div>
        </div>
      );
    },
  };
});

describe("App", () => {
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

  it("should render trending GitHub repositories with 'Favorite' button", async () => {
    const handleFavoriteRepo = jest.fn();
    render(
      <App
        trendingReposProps={[sampleRepo1, sampleRepo2]}
        favoritedReposProps={[]}
        handleFavoriteRepoProps={handleFavoriteRepo}
        handleUnfavoriteRepoProps={jest.fn()}
      />
    );

    expect(
      screen.getByText("Trending GitHub Repositories")
    ).toBeInTheDocument();

    // Ensure the sample repositories are rendered`
    expect(screen.getByText("Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Repo 2")).toBeInTheDocument();

    // Ensure the "Favorite" button is present for each repository
    const favoriteButtons = screen.getAllByText("Favorite");
    expect(favoriteButtons).toHaveLength(2);

    favoriteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Ensure that the handleFavoriteRepo function is called for each repository
    expect(handleFavoriteRepo).toHaveBeenCalledTimes(2);
  });

  it('should render favorited repositories with "Unfavorite" button', async () => {
    const handleUnfavoriteRepo = jest.fn();
    render(
      <App
        trendingReposProps={[]}
        favoritedReposProps={[sampleRepo1, sampleRepo2]}
        handleFavoriteRepoProps={jest.fn()}
        handleUnfavoriteRepoProps={handleUnfavoriteRepo}
      />
    );

    expect(screen.getByText("Favorited Repositories")).toBeInTheDocument();

    // Ensure the sample repositories are rendered
    expect(screen.getByText("Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Repo 2")).toBeInTheDocument();

    // Ensure the "Unfavorite" button is present for each repository
    const unfavoriteButtons = screen.getAllByText("Unfavorite");
    expect(unfavoriteButtons).toHaveLength(2);

    unfavoriteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Ensure that the handleUnfavoriteRepo function is called for each repository
    expect(handleUnfavoriteRepo).toHaveBeenCalledTimes(2);
  });
});
