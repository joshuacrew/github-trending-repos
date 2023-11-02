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
        isFavorited={false}
        onFavorite={jest.fn()}
        onUnfavorite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Make sure the repository details are in the component
    expect(screen.getByText("Sample Repo")).toBeInTheDocument();
    expect(screen.getByText("A sample repository")).toBeInTheDocument();
    expect(screen.getByText("100 stars")).toBeInTheDocument();

    // Make sure the action button is "Favorite"
    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  it("should render a favorited repository with an 'Unfavorite' button", () => {
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavorited={true}
        onFavorite={jest.fn()}
        onUnfavorite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Make sure the action button is "Unfavorite"
    expect(screen.getByText("Unfavorite")).toBeInTheDocument();
  });

  it("should render a favorited repository with a 'Go to GitHub' button", () => {
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavorited={true}
        onFavorite={jest.fn()}
        onUnfavorite={jest.fn()}
        isTrendingSection={false}
      />
    );

    // Make sure the action button is "Go to GitHub"
    expect(screen.getByText("Go to GitHub")).toBeInTheDocument();
  });

  it("should call the 'onFavorite' function when 'Favorite' is clicked", () => {
    const onFavorite = jest.fn();
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavorited={false}
        onFavorite={onFavorite}
        onUnfavorite={jest.fn()}
        isTrendingSection={true}
      />
    );

    // Click the "Favorite" button
    fireEvent.click(screen.getByText("Favorite"));

    // Verify that the 'onFavorite' function was called
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it("should call the 'onUnfavorite' function when 'Unfavorite' is clicked", () => {
    const onUnfavorite = jest.fn();
    render(
      <GithubItemComponent
        repo={sampleRepo}
        isFavorited={true}
        onFavorite={jest.fn()}
        onUnfavorite={onUnfavorite}
        isTrendingSection={true}
      />
    );

    // Click the "Unfavorite" button
    fireEvent.click(screen.getByText("Unfavorite"));

    // Verify that the 'onUnfavorite' function was called
    expect(onUnfavorite).toHaveBeenCalledTimes(1);
  });
});
