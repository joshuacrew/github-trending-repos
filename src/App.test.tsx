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
          {gh.isFavourited ? (
            <button onClick={gh.onUnfavourite}>Unfavourite</button>
          ) : (
            <button onClick={gh.onFavourite}>Favourite</button>
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

  it("should render trending GitHub repositories with 'Favourite' button", async () => {
    const handleFavouriteRepo = jest.fn();
    render(
      <App
        trendingReposProps={[sampleRepo1, sampleRepo2]}
        favouritedReposProps={[]}
        handleFavouriteRepoProps={handleFavouriteRepo}
        handleUnfavouriteRepoProps={jest.fn()}
      />
    );

    expect(
      screen.getByText("Trending GitHub Repositories")
    ).toBeInTheDocument();

    // Ensure the sample repositories are rendered`
    expect(screen.getByText("Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Repo 2")).toBeInTheDocument();

    // Ensure the "Favourite" button is present for each repository
    const favouriteButtons = screen.getAllByText("Favourite");
    expect(favouriteButtons).toHaveLength(2);

    favouriteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Ensure that the handleFavouriteRepo function is called for each repository
    expect(handleFavouriteRepo).toHaveBeenCalledTimes(2);
  });

  it('should render favourited repositories with "Unfavourite" button', async () => {
    const handleUnfavouriteRepo = jest.fn();
    render(
      <App
        trendingReposProps={[]}
        favouritedReposProps={[sampleRepo1, sampleRepo2]}
        handleFavouriteRepoProps={jest.fn()}
        handleUnfavouriteRepoProps={handleUnfavouriteRepo}
      />
    );

    expect(screen.getByText("Favourited Repositories")).toBeInTheDocument();

    // Ensure the sample repositories are rendered
    expect(screen.getByText("Sample Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Repo 2")).toBeInTheDocument();

    // Ensure the "Unfavourite" button is present for each repository
    const unfavouriteButtons = screen.getAllByText("Unfavourite");
    expect(unfavouriteButtons).toHaveLength(2);

    unfavouriteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Ensure that the handleUnfavouriteRepo function is called for each repository
    expect(handleUnfavouriteRepo).toHaveBeenCalledTimes(2);
  });
});
