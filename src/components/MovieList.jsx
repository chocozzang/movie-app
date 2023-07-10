import React from "react";

const MovieList = (props) => {
   return (
    <>
        {props.movies.map((movie) => (
            <div className = "image-container d-flex m-3" key={movie.imdbID}>
                <img src={movie.Poster} alt='movie'></img>
                <div className="overlay d-flex align-items-center justify-content-center"
                    onClick={() => props.handleClick(movie)}>
                    <span className='me-2'>{props.addmovie ? '선호작 추가' : '선호작 삭제'}</span>
                    <span>{props.addmovie ? '❤' : '❌'}</span>
                </div>
            </div>
        ))}
    </>
   )
}

export default MovieList;
