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
  const [searchValue, setSearchValue] = useState([]);

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

  useEffect(() => {
    if(searchValue.length > 3) getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <ScrollContainer className='row scroll-container'>
        <MovieList movies={movies}/>
      </ScrollContainer>
    </div>
  );
}

export default App;
