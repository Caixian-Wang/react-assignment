import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页

  // 使用 useQuery 获取当前页的数据
  const { data, error, isLoading, isError } = useQuery(
    ["discover", currentPage],
    () => getMovies(currentPage),
    { keepPreviousData: true } // 缓存前一页数据以减少加载闪烁
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 使用 slice 截取每页显示的电影数量为 17
  const movies = data.results.slice(0, 17);

  // 处理分页事件
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={data.total_pages} // 总页数从 API 数据中获取
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Grid>
    </>
  );
};

export default HomePage;