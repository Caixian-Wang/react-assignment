import React from "react";
import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

export default function HorizontalMovieList({ movies }) {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto", // 允许水平滚动
        gap: 2, // 卡片之间的间距
        padding: 2, // 添加一些内边距
        "&::-webkit-scrollbar": {
          height: "8px", // 滚动条高度
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // 滚动条颜色
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // 滚动条悬停颜色
        },
      }}
    >
      {movies.map((movie) => (
        <Box key={movie.id} sx={{ minWidth: "200px" }}>
          <MovieCard movie={movie} action={() => null} />
        </Box>
      ))}
    </Box>
  );
}