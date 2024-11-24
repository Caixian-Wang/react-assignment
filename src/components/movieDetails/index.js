import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieCredits } from "../../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch movie credits
  const { data: credits, error, isLoading } = useQuery(
    ["movieCredits", { id: movie.id }],
    getMovieCredits
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      {/* Cast Section */}
      <Typography variant="h5" component="h3">
        Cast
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {credits.cast.map((credit) => (
          <li key={credit.id}>
            <Chip
              label={credit.name}
              sx={{ ...chip }}
              component={Link}
              to={`/credits/${credit.id}/creditinf`} 
              clickable
            />
          </li>
        ))}
      </Paper>

      <Fab
        color="primary"
        variant="extended"
        component={Link}
        to={`/movies/${movie.id}/recommendations`}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "19.3em",
          "&:hover": {
            backgroundColor: "#155a9c",
          },
        }}
      >
        <NavigationIcon />
        Recommendations
      </Fab>
      <Fab
        variant="extended"
        component={Link}
        to={`/movies/${movie.id}/similars`}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "10em",
          backgroundColor: "#FFDE59",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#155a9c",
          },
        }}
      >
        <NavigationIcon />
        Similars
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
          "&:hover": {
            backgroundColor: "#155a9c",
          },
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;