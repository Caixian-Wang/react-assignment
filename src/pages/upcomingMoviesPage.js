import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

const UpcomingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页

  // 使用 useQuery 获取即将上映的电影数据
  const { data, error, isLoading, isError } = useQuery(
    ["upcoming", currentPage],
    () => getUpcomingMovies(),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 每页显示 17 部电影
  const moviesPerPage = 17;
  const movies = data.results.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // 计算总页数
  const total_pages = Math.ceil(data.results.length / moviesPerPage);

  // 处理分页事件
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        {/* Pagination 组件 */}
        <Pagination
          count={total_pages} // 总页数
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Grid>
    </>
  );
};

export default UpcomingMoviesPage;