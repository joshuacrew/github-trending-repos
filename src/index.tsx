import { render } from "react-dom";
import App from "./App";
import TrendingReposProvider from "./TrendingReposProvider";

function Root() {
  return (
    <TrendingReposProvider>
      {({
        trendingRepos,
        favouritedRepos,
        handleFavouriteRepo,
        handleUnfavouriteRepo,
      }) => (
        <App
          trendingReposProps={trendingRepos}
          favouritedReposProps={favouritedRepos}
          handleFavouriteRepoProps={handleFavouriteRepo}
          handleUnfavouriteRepoProps={handleUnfavouriteRepo}
        />
      )}
    </TrendingReposProvider>
  );
}

render(<Root />, document.getElementById("root"));
