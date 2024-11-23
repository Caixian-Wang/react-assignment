import React from "react";
import { useParams } from "react-router-dom";  // 用于获取 URL 参数
import { useQuery } from 'react-query';
import { getSimilarMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const MovieSimilarPage = () => {
  // 使用 useParams 获取当前 URL 中的 movieId 参数
  const { id } = useParams();  // 通过 useParams 获取电影的 id 参数

  // 检查获取到的 id
  console.log("Current Movie ID:", id);

  // 使用 movieId 作为 queryKey 来获取推荐电影数据
  const { data, error, isLoading, isError } = useQuery(
    ['Similar', { id }],  // 传递 id 给 queryKey
    getSimilarMovies
  );

  // 加载状态
  if (isLoading) {
    return <Spinner />;
  }

  // 错误处理
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Similar Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default MovieSimilarPage;