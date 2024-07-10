store
const results = document.getElementById('searchResult')
const watchListDiv = document.getElementById('myWatchlist')
const addButtone = document.getElementById('addToList')
const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementById('search')

let watchlist = [];

function addToWatchlist(data) {
    watchlist.push[data]
    updateList()

}
function updateList(data) {
    watchListDiv.innerHTML = `<h2>Watchlist</h2> `
    watchlist.forEach(data => {
        const li = document.createElement('li')
        li.textContent = data.Title;
        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', () => watchlistRemove(data.Title));
        li.appendChild(removeButton)
        watchListDiv.appendChild(li)
    })
}
function watchlistRemove(title) {
    watchlist = watchlist.filter(data => data.Title !== title)
    updateList()
}

searchButton.addEventListener('click', function () {
    let movieTitle = searchBar.value.trim()
    fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=7642a4e6`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Response == "True") {
                results.innerHTML = `
                    <h2>&nbsp${data.Title}</h2>
                    <p><span class="star">&#9733;</span>${data.Ratings[0].Value}</p>
                    <p id="date-lenght">${data.Released}  ${data.Runtime} </p>
                    <img id="poster" src="${data.Poster}">
                    <hr>
                    <p>${data.Plot}</p>
                    <hr>
                    <table>
                    <tr>
                     <th>Writer:</th>
                     <td>${data.Writer}</td>
                    </tr>
                    <tr>
                      <th>Director:</th>
                      <td>${data.Director}</td>
                    </tr>
                    <tr>
                      <th>Actors:</th>
                      <td>${data.Actors}</td>
                     </tr>
                  </table>`
            } else {
                results.innerHTML = `<h1>No respone to your Querry</h1>`
            }
            addButtone.addEventListener('click', addToWatchlist(data))
        })

})



