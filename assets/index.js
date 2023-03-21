
const search = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const dataWrapper = document.querySelector('.data-wrapper')
const tempWrapper = document.querySelector('.temp-wrapper')
const addToWatchlist = document.querySelector('.add-to-watchlist')
let title, poster, rating, year, type, runTime, genre, plot
const noDescription = 'No plot available &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'



const getItemHtml = () => {
    
    return  `
    <div class="item">
        <div class="item-image">
            <img class="poster" src=${poster} alt="No poster available">
        </div>
        <div class="item-data">
            <div class="item-header">
                <h3>${title} <span class="release-year">(${year})</span></h3>
                <p class="type">${type}</p>
                <div>
                    <img src="assets/images/star.png">
                    <p class="rating">${rating}</p>
                </div>
            </div>
            
            <div class="item-metadata">
                <p class="runtime">${runTime}</p>
                <p class="genre">${genre}</p>
                <div class="add-to-watchlist">
                    <img class="add" src="assets/images/plus.png">
                    <p class="add">Watchlist</p>
                </div>
            </div>

            <div class="item-desc">
            <p class="plot">${plot}</p>
            
            </div>
            </div>
            </div>
            <hr>
            `
    
}

const fetchMovies = () => {
    
    tempWrapper.style.display = 'none'
    dataWrapper.innerHTML = '<div class="loading"></div>'
    
    const searchedMovie = search.value.split(' ').join('+')
    
    fetch(`http://www.omdbapi.com/?apikey=ea4ff75d&s=${searchedMovie}`)
    .then(res => res.json())
    .then(data => {
            document.querySelector('.main').style.height = 'fit-content'
            
                const results = data.Search
                if (!results || results.length === 0) {
                    console.log('Nothing found');
                    dataWrapper.innerHTML = `
                    <h3 class=nothing-found>
                        Uh oh, it seems like the movie you are looking for has gone on a vacation!
                    </h3>`
                    return;
                }
                dataWrapper.innerHTML = ''
                for (i in results) {
                    let movieName = results[i].Title
                    
                    movieName = movieName.split(' ').join('+')
                    
                    fetch(`http://www.omdbapi.com/?apikey=ea4ff75d&t=${movieName}`)
                        .then(res => res.json())
                        .then(data => {
                            title = data.Title
                            poster = data.Poster
                            year = data.Year
                            rating = data.imdbRating
                            type = data.Type
                            runTime = data.Runtime
                            genre = data.Genre
                            if(data.Plot === "N/A") {
                                plot = noDescription
                            } else {
                                plot = data.Plot

                            }
                                

                            dataWrapper.innerHTML += getItemHtml()

                            
                        })

                    

                }
                
        })
        .catch(error => {
            dataWrapper.innerHTML = `
            <h3 class=nothing-found>
                Check your internet connection and try again!
            </h3>`
            
        })
        
        
    



    search.value = ''
}



searchBtn.addEventListener('click', () => {
    if (search.value.trim().length) {
        fetchMovies()
    }
})
search.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (search.value.trim().length) {
            fetchMovies()

        }
    }
})





// Dealing with Local Storage shit


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add')) {
        let localStorageMovieObject = {}
        const item = e.target.closest('.item');
        
        localStorageMovieObject.title = item.querySelector('h3').textContent
        localStorageMovieObject.poster = item.querySelector('.poster').src
        localStorageMovieObject.rating = item.querySelector('.rating').textContent
        localStorageMovieObject.type = item.querySelector('.type').textContent
        localStorageMovieObject.runTime = item.querySelector('.runtime').textContent
        localStorageMovieObject.genre = item.querySelector('.genre').textContent
        localStorageMovieObject.plot  = item.querySelector('.plot').textContent
        
        
        
        let watchlistLocalStorage = JSON.parse(localStorage.getItem('watchlist')) || [];
        
        const exist = watchlistLocalStorage.find(obj => {
            return obj.title === localStorageMovieObject.title
        })
        //if not, add it
        if(!exist) {
            watchlistLocalStorage.unshift(localStorageMovieObject)
        }
        
        //take array back to LS
        localStorage.setItem('watchlist', JSON.stringify(watchlistLocalStorage))        


        
        
    }
})


