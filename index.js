

// console.log(list);

var songApi = 'http://localhost:3000/songs';

function start() {
    getSongs(renderSong);
    handleAddSong();
}

start();

// function


function getSongs(callBack) {
    fetch(songApi)
    .then(response => response.json())
    .then(callBack)

}

function renderSong(songs) {
    var list = document.querySelector('.list');

    var htmls = songs.map( function(song) {
        return `
        <h4>${song.name}</h4> 
        <p>${song.path}</p>
        <button onclick="deleteSong(${song.id})">Xóa</button>
        `
        
    })
    list.innerHTML = htmls.join('');
}


function addSong(data) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    
    fetch(songApi,options)
    .then(function (response) {return response.json()})
    .then(function () {
        getSongs(renderSong)
    })
}

function deleteSong (id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },

    }

    fetch(songApi + '/' + id, options)
    .then(response => response.json())
    .then(function() {
        getSongs(renderSong);
    })
} 

function handleAddSong() {
    var addBtn = document.querySelector('.add');
    addBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var path = document.querySelector('input[name="path"]').value;
     
        var formData = {
            name : name,
            path : path
        }

        addSong(formData)
    }
}