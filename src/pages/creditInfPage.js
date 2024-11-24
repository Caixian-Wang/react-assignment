import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api"; // 引入获取演员详情的API函数
import { Typography, Paper, Avatar, Button } from "@mui/material";
import StarRate from "@mui/icons-material/StarRate";

const CreditInfPage = () => {
  const { id } = useParams(); // 获取URL中的演员ID
  const navigate = useNavigate(); // 获取导航功能

  // 获取演员详细信息
  const { data: actor, error, isLoading } = useQuery(
    ['getActorDetails', { id }],
    getActorDetails
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

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
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        sx={{ width: 150, height: 150 }}
      />
      <Typography variant="h4" component="h1" sx={{ marginTop: 2 }}>
        {actor.name}
      </Typography>
      <Typography variant="h6" component="p">
        {actor.biography || "Biography not available."}
      </Typography>
      <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
        Known for: {actor.known_for_department}
      </Typography>
      <Typography variant="body1" component="p">
        Popularity: {actor.popularity}
      </Typography>
      <Typography variant="body1" component="p">
        <StarRate sx={{ verticalAlign: "middle" }} />
        {actor.vote_average} ({actor.vote_count} votes)
      </Typography>
    </Paper>
  );
};

export default CreditInfPage;