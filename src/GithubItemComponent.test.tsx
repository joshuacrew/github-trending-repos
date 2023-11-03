import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GithubItemComponent from "./GithubItemComponent";
import { GithubItem } from "./api/GithubClient";

describe("GithubItemComponent", () => {
  const sampleRepo: GithubItem = {
    id: 1,
    name: "Sample Repo",
    description: "A sample repository",
    html_url: "https://github.com/sample-repo",
    stargazers_count: 100,
    language: "Python",
    created_at: "2023-10-31",
  };
  ``;

  it("should render a repository", () => {
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavourited={false}
        onFavourite={jest.fn()}
        onUnfavourite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Make sure the repository details are in the component
    expect(screen.getByText("Sample Repo")).toBeInTheDocument();
    expect(screen.getByText("A sample repository")).toBeInTheDocument();
    expect(screen.getByText("100 stars")).toBeInTheDocument();

    // Make sure the action button is "Favourite"
    expect(screen.getByText("Favourite")).toBeInTheDocument();
  });

  it("should render a favourited repository with an 'Unfavourite' button", () => {
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavourited={true}
        onFavourite={jest.fn()}
        onUnfavourite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Make sure the action button is "Unfavourite"
    expect(screen.getByText("Unfavourite")).toBeInTheDocument();
  });

  it("should render a favourited repository with a 'Go to GitHub' button", () => {
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavourited={true}
        onFavourite={jest.fn()}
        onUnfavourite={jest.fn()}
        isTrendingSection={false}
      />
    );

    // Make sure the action button is "Go to GitHub"
    expect(screen.getByText("Go to GitHub")).toBeInTheDocument();
  });

  it("should call the 'onFavourite' function when 'Favourite' is clicked", () => {
    const onFavourite = jest.fn();
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavourited={false}
        onFavourite={onFavourite}
        onUnfavourite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Click the "Favourite" button
    fireEvent.click(screen.getByText("Favourite"));

    // Verify that the 'onFavourite' function was called
    expect(onFavourite).toHaveBeenCalledTimes(1);
  });

  it("should call the 'onUnfavourite' function when 'Unfavourite' is clicked", () => {
    const onUnfavourite = jest.fn();
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavourited={true}
        onFavourite={jest.fn()}
        onUnfavourite={onUnfavourite}
        isTrendingSection={true}
      />
    );

    // Click the "Unfavourite" button
    fireEvent.click(screen.getByText("Unfavourite"));

    // Verify that the 'onUnfavourite' function was called
    expect(onUnfavourite).toHaveBeenCalledTimes(1);
  });
});
