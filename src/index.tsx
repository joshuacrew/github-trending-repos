import { render } from "react-dom";
import App from "./App";
import TrendingReposProvider from "./TrendingReposProvider";

function Root() {
  return (
    <TrendingReposProvider>
      {({
        trendingRepos,
        favoritedRepos,
        handleFavoriteRepo,
        handleUnfavoriteRepo,
      }) => (
        <App
          trendingReposProps={trendingRepos}
          favoritedReposProps={favoritedRepos}
          handleFavoriteRepoProps={handleFavoriteRepo}
          handleUnfavoriteRepoProps={handleUnfavoriteRepo}
        />
      )}
    </TrendingReposProvider>
  );
}

render(<Root />, document.getElementById("root"));
