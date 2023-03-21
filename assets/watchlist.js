
const dataWrapper = document.querySelector('.data-wrapper')
const wrapper = document.querySelector('.wrapper')
let watchlist

const setWatchlist = () => {
    watchlist = JSON.parse(localStorage.getItem('watchlist'));
    
}
setWatchlist()


const generateWrapperhtml = () => {
    return `
    <div class="wrapper">
    <div class="watchlist-placeholder">
        <h2>Your watchlist is looking a little empty...</h2>
        <div>
            <a href="index.html">
                <img src="assets/images/plus.png"> <p>Let's add some movies!</p>
            </a>
        </div>

    </div>

</div>
    `
}


const getItemHtml = (movieObject) => {
    const {title, poster, rating, type, runTime, genre, plot} = movieObject
    
    return  `
    <div class="item">
        <div class="item-image">
            <img class="poster" src=${poster} alt="No poster available">
        </div>
        <div class="item-data">
            <div class="item-header">
                <h3>${title}</span></h3>
                <p class="type">${type}</p>
                <div>
                    <img src="assets/images/star.png">
                    <p class="rating">${rating}</p>
                </div>
            </div>
            
            <div class="item-metadata">
                <p class="runtime">${runTime}</p>
                <p class="genre">${genre}</p>
                <div class="remove-from-watchlist">
                    <img class="remove" src="assets/images/minus.png">
                    <p class="remove">Remove</p>
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
const renderWatchlist = () => {
    if (watchlist.length > 0) {
        wrapper.style.display = 'none'
        
        
        watchlist.forEach(movie => {
            dataWrapper.innerHTML += getItemHtml(movie)
        })
        
    }

}
renderWatchlist()

const renderWatchlistAfterRemove = () => {
        dataWrapper.innerHTML = ''
        if (watchlist.length === 0) {
            dataWrapper.innerHTML = generateWrapperhtml()
            
        }
        watchlist.forEach(movie => {
            dataWrapper.innerHTML += getItemHtml(movie)
        })
    
}




document.addEventListener('click', (e) => {
    setTimeout(() => {
        if (e.target.classList.contains('remove')) {
            const movieName = e.target.closest('.item').querySelector('h3').textContent
            
            const updatedWatchlist = watchlist.filter(movie => {
                return movie.title !== movieName
            })
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
            setWatchlist()
            renderWatchlistAfterRemove()
    
        }
    }, 300);
})