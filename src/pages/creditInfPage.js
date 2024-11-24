import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getCreditPlayedMovies } from "../api/tmdb-api";
import { Typography, Paper, Avatar, Button, Box } from "@mui/material";
import MovieCard from "../components/movieCard"; // 引入电影卡片组件

const CreditInfPage = () => {
  const { id } = useParams(); // 获取URL中的演员ID
  const navigate = useNavigate(); // 获取导航功能

  // 获取演员详细信息
  const { data: actor, error, isLoading } = useQuery(
    ["getActorDetails", { id }],
    getActorDetails
  );
  const { data: movies, error: moviesError, isLoading: isMoviesLoading } = useQuery(
    ["getCreditPlayedMovies", { id }],
    getCreditPlayedMovies
  );

  if (isLoading || isMoviesLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (moviesError) return <Typography>Error: {moviesError.message}</Typography>;

  return (
    <Paper sx={{ padding: 2 }}>
      {/* 返回按钮 */}
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}  // 返回上一页
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>

      {/* 演员头像 */}
      <Avatar
        alt={actor.name}
        src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : ""}
        sx={{ width: 150, height: 150 }}
      />
      <Typography variant="h4" component="h1" sx={{ marginTop: 2 }}>
        {actor.name}
      </Typography>
      <Typography variant="h6" component="p">
        {actor.biography || "Biography not available."}
      </Typography>
      <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
        Known for: {actor.known_for_department || "Not specified"}
      </Typography>
      <Typography variant="body1" component="p">
        Popularity: {actor.popularity || "N/A"}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Movies
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto", // 设置水平滚动
          padding: 1,
          gap: 2, // 卡片间距
          "&::-webkit-scrollbar": { display: "up" }, // 隐藏滚动条（可选）
        }}
      >
        {movies.cast.length > 0 ? (
          movies.cast.map((movie) => (
            <Box key={movie.id} sx={{ minWidth: 300 }}>
              <MovieCard movie={movie} action={() => <></>} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">No movies available for this actor.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default CreditInfPage;