# Github Trending Repos React App

This project is a web application that allows users to track and favorite GitHub repositories. 
View this project in Vercel: https://github-trending-repos-eiqa4o4k7-joshuacrew.vercel.app/

## Features

- [x] Display a list of the repositories created in the last 7 days with the most number of stars on GitHub.
- [x] Display basic information about the repository, including the repository name, link to GitHub, description, and the number of stars.
- [x] Allow users to favorite repositories and view a list of favorited repositories.
- [x] Use local storage for storing favorited repositories.
- [ ] Allow users to filter repositories by the programming languages used.

## Implementation Details

This application fetches data from GitHub using the GitHub public search endpoint:

GitHub Repository Search API: [https://api.github.com/search/repositories?q=created:>7days&sort=stars&order=desc](https://api.github.com/search/repositories?q=created:>7days&sort=stars&order=desc)

The implementation of this project can be broken down into the following steps:

1. Retrieve a list of repositories created in the last 7 days with the most stars from GitHub.
2. Display basic information about the repositories, such as name, GitHub link, description, and star count.
3. Display the repositories and allow users to favorite them and view a list of favorited repositories.
4. Store favorited repositories locally using local storage.

## How to Run

First, clone this repository to your local machine. Then, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

