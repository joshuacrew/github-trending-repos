import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

// Mocking the API call
jest.mock("./api/GithubClient");

// Mock initial data for trendingRepos
const mockInitialTrendingRepos = [
  {
    id: 1,
    name: "Mock Repo 1",
    description: "Mock description 1",
    html_url: "https://github.com/mockrepo1",
    stargazers_count: 10,
  },
  {
    id: 2,
    name: "Mock Repo 2",
    description: "Mock description 2",
    html_url: "https://github.com/mockrepo2",
    stargazers_count: 20,
  },
];

test('renders "Hello World" and fetched repositories', async () => {
  // Mock useState to provide initial data
  const useStateMock = jest.spyOn(React, "useState");
  useStateMock.mockImplementation(() => [mockInitialTrendingRepos, jest.fn()]);

  render(<App />);

  await act(async () => {});

  // Verify that the component rendered "Trending GitHub Repositories"
  const helloWorldElement = screen.getByText("Trending GitHub Repositories");
  expect(helloWorldElement).toBeInTheDocument();

  // Verify that the fetched repositories are displayed
  const repoLinks = screen.getAllByRole("link");
  expect(repoLinks).toHaveLength(2);

  expect(screen.getByText("Mock Repo 1")).toBeInTheDocument();
  expect(screen.getByText("Mock Repo 2")).toBeInTheDocument();
  expect(screen.getByText("Mock description 1")).toBeInTheDocument();
  expect(screen.getByText("Mock description 2")).toBeInTheDocument();
  expect(screen.getByText("10 stars")).toBeInTheDocument();
  expect(screen.getByText("20 stars")).toBeInTheDocument();
});
