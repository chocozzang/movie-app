import { useState } from 'react';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import ScrollContainer from 'react-indiana-drag-scroll';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);


  // 검색어로 영화데이터 요청
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8ccebf15`;
    // 자바스크립트는 비동기 구동임
    // 즉, url로 api를 요청해서 다 받기 전에 실행함
    // 따라서, await를 이용해서 요청이 끝날 때 까지 기다리도록 함
    // await 사용시 async를 붙여야함..
    const response = await fetch(url);

    const responseJson = await response.json();
    //setMovies(responseJson.Search);
    //console.log(responseJson);
    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  // 로컬저장소에 저장
  const saveToLocalStorage = (items) => {
    localStorage.setItem('favorites', JSON.stringify(items));
  }

  // 실제로 선호작에 추가
  const addFavoriteMovie = (movie) => {
    const newList = [...favorites, movie]; // 선호작 리스트에 영화 하나 추가함
    setFavorites(newList);
    saveToLocalStorage(newList);
  }

  const removeFavoriteMovie = (movie) => {
    const newList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    ); // 해당 영화를 필터링하고 나머지를 newList에 저장함
    setFavorites(newList);
    saveToLocalStorage(newList);
  }

  useEffect(() => {
    if(searchValue.length > 3) getMovieRequest(searchValue);
  }, [searchValue]);

  // 브라우저 저장소에서 favorites들을 가져옴 - 앱 시작 시 1번만 실행함
  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);


  return (
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading="영화 검색과 선호작 등록"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <ScrollContainer className='row scroll-container centeralign'>
        <MovieList movies={movies} handleClick={addFavoriteMovie} addmovie={true}/>
      </ScrollContainer>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading="내 선호작"/>
      </div>
      <ScrollContainer className='row scroll-container'>
        <MovieList movies={favorites} handleClick={removeFavoriteMovie} addmovie={false}/>
      </ScrollContainer>
    </div>
  );
}

export default App;
