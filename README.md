# react-assignment

# Assignment 1 - ReactJS app.

Name: Caixian Wang (20108795)

## Overview.

This repository contains a movie-related web application built with React. It features a variety of pages and components for browsing, viewing details, and interacting with movies, including functionality for adding reviews, exploring similar movies, and managing favorites. The app uses data from The Movie Database (TMDB) API to provide information on movies, TV shows, and related media. It also incorporates features such as a custom spinner for loading states and a dynamic movie list display. The project is organized into components, contexts, hooks, and pages to ensure scalability and maintainability.

### Features.
+ Feature 1: Two additional static endpoints from TMDB  included  the trending and popular movies.

![](image\QQ20241124-141358.png)

![](image\QQ20241124-141427.png)

+ Feature 2: One parameterised endpoint  is included. Click the Similar button, show the similar movies.

 ![](image\QQ20241124-141705.png)



![](image\QQ20241124-141810.png)

+ Feature 3: Another parameterised endpoint  is included. Click the Recommendations button, show the Recommendations movies.
+ Feature 4:  Click the name of movie‘s credit，then show the information of the credit.

+ Feature 5:  When you are in the credit-information page, you can click the movies that he or she participate to learn more information.

![](image\QQ20241124-142533.png)



## API endpoints.

+ **Trending Movies**: Retrieves the list of currently trending movies.
  Pathname: `/movie/trending`
+ **Popular Movies**: Retrieves the list of currently popular movies.
  Pathname: `/movie/popular`
+ **Movie Credits**: Fetches the cast and crew for a specific movie by ID.
  Pathname: `/movie/:id/credits`
+ **Similar Movies**: Fetches the movies that be similar to the movie by ID.
  Pathname: `/movie/:id/similar`
+ **Recommendations**: Fetches movie recommendations based on a specific movie by ID.
  Pathname: `/movie/:id/recommendations`
+ **People Movie Credits**: Get the movie credits for a person by ID.
  Pathname: `/person/:id/movie_credits`

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /movies/trending  ``TrendingMoviesPage``
+ /movies/popular  ``PopularMoivesPage``
+ /movies/:id/recommendations  ``MovieRecommendationPage``
+ /movies/:id/similars  ``MovieSimilarPage``
+ /credits/:id/creditInf   ``CreditInfPage``  

## Independent learning (If relevant).

**Material-UI Pagination Component**

- Integrated the `Pagination` component from Material-UI to enable users to navigate between pages of movies.
- Customized the component to fit the design of the application.

**Dynamic Data Slicing**

Used JavaScript’s slice() method to display a fixed number of movies per page (17 movies per page).
Calculated the total number of pages based on the total number of movies.
