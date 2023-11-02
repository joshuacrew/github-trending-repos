import React from 'react';
import { Grid, Typography, List } from '@mui/material';
import GithubItemComponent from './GithubItemComponent';
import { GithubItem } from './api/GithubClient';

interface AppProps {
  trendingReposProps: GithubItem[];
  favoritedReposProps: GithubItem[];
  handleFavoriteRepoProps: (repo: GithubItem) => void;
  handleUnfavoriteRepoProps: (repo: GithubItem) => void;
}

const App: React.FC<AppProps> = ({
  trendingReposProps,
  favoritedReposProps,
  handleFavoriteRepoProps,
  handleUnfavoriteRepoProps,
}) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="h4">Trending GitHub Repositories</Typography>
        <List>
          {trendingReposProps.map((repo) => (
            <GithubItemComponent
              key={repo.id}
              repo={repo}
              isFavorited={favoritedReposProps.some((favorite) => favorite.id === repo.id)}
              onFavorite={() => handleFavoriteRepoProps(repo)}
              onUnfavorite={() => handleUnfavoriteRepoProps(repo)}
              isTrendingSection={true}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4">Favorited Repositories</Typography>
        <List>
          {favoritedReposProps.map((repo) => (
            <GithubItemComponent
              key={repo.id}
              repo={repo}
              isFavorited={true}
              onFavorite={() => handleUnfavoriteRepoProps(repo)}
              onUnfavorite={() => handleUnfavoriteRepoProps(repo)}
              isTrendingSection={false}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default App;
