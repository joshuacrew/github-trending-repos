import React from 'react';
import { Grid, Typography, List } from '@mui/material';
import GithubItemComponent from './GithubItemComponent';
import { GithubItem } from './api/GithubClient';

interface AppProps {
  trendingReposProps: GithubItem[];
  favouritedReposProps: GithubItem[];
  handleFavouriteRepoProps: (repo: GithubItem) => void;
  handleUnfavouriteRepoProps: (repo: GithubItem) => void;
}

const App: React.FC<AppProps> = ({
  trendingReposProps,
  favouritedReposProps,
  handleFavouriteRepoProps,
  handleUnfavouriteRepoProps,
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
              isFavourited={favouritedReposProps.some((favourite) => favourite.id === repo.id)}
              onFavourite={() => handleFavouriteRepoProps(repo)}
              onUnfavourite={() => handleUnfavouriteRepoProps(repo)}
              isTrendingSection={true}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4">Favourited Repositories</Typography>
        <List>
          {favouritedReposProps.map((repo) => (
            <GithubItemComponent
              key={repo.id}
              repo={repo}
              isFavourited={true}
              onFavourite={() => handleUnfavouriteRepoProps(repo)}
              onUnfavourite={() => handleUnfavouriteRepoProps(repo)}
              isTrendingSection={false}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default App;
