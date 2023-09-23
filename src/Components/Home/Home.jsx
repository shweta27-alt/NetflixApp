import React, { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "6dc9e316fd67c58d8e7e405fd8d7ca29";
const url = "https://api.themoviedb.org/3/movie";
const imgurl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, settopRated] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/upcoming?api_key=${apiKey}&page=2`);
      setUpcomingMovie(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
      setNowPlaying(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/popular?api_key=${apiKey}&page=2`);
      setPopular(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
      settopRated(results);
    };

    const fetchGetAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      setGenre(genres);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchGetAllGenre();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popular[0]
            ? `url(${`${imgurl}/${popular[0].poster_path}`})`
            : " rgb(16,16,16)",
        }}
      >
        {popular[0] && <h1>{popular[0].original_title}</h1>}

        {popular[0] && <p>{popular[0].overview}</p>}

        <div>
          <button>
            {" "}
            <BiPlay />
            Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovie} />
      <Row title={"Now Playing Movies"} arr={nowPlaying} />
      <Row title={"Popular Movies"} arr={popular} />
      <Row title={"Top Rated"} arr={topRated} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
