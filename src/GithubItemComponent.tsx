import React from "react";
import { GithubItem } from "./api/GithubClient";
import { Grid, Typography, ListItem, Button, Link } from "@mui/material";

export interface GithubItemComponentProps {
  repo: GithubItem;
  isFavorited: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
  isTrendingSection: boolean;
}

const GithubItemComponent: React.FC<GithubItemComponentProps> = ({
  repo,
  isFavorited,
  onFavorite,
  onUnfavorite,
  isTrendingSection,
}) => {
  const actionButton = isFavorited ? (
    isTrendingSection ? (
      <Button variant="contained" color="secondary" onClick={onUnfavorite}>
        Unfavorite
      </Button>
    ) : (
      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <Button variant="contained" color="primary">
          Go to GitHub
        </Button>
      </Link>
    )
  ) : (
    <Button variant="contained" color="primary" onClick={onFavorite}>
      Favorite
    </Button>
  );

  return (
    <ListItem>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Typography variant="h6">{repo.name}</Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            {repo.description}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">{`${repo.stargazers_count} stars`}</Typography>
            </Grid>
            <Grid item>{actionButton}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default GithubItemComponent;
