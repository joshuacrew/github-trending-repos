import { fetchMostFavoritedRepos } from './GithubClient';

test('fetchMostFavoritedRepos fetches data correctly', async () => {
  const data = await fetchMostFavoritedRepos();

  // Perform assertions on the fetched data
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);

  for (const repo of data) {
    expect(repo).toHaveProperty('id');
    expect(repo).toHaveProperty('name');
    expect(repo).toHaveProperty('stargazers_count');
    expect(repo).toHaveProperty('description');
    expect(repo).toHaveProperty('html_url');
    expect(repo).toHaveProperty('language');
    expect(repo).toHaveProperty('created_at');
  }
});