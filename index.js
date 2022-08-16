

// console.log(list);

var songApi = 'http://localhost:3000/songs';
var isFixing = false;
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
        <div class="song">
        <div class="songInfo" song-id="${song.id}">
           <h4 class="songName" name-id="${song.id}">${song.name}</h4> 
            <p class="songPath" path-id="${song.id}">${song.path}</p>
        </div>
        <button onclick="deleteSong(${song.id})">Xóa</button>
        <button class="add" onclick="handleUpdateSong(${song.id})">update</button>
        

        </div>
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

// update 

function handleUpdateSong(id) {
    isFixing = !isFixing;

    var songInfo = document.querySelector(`[song-id = "${id}"]`);
    var a = document.querySelector(`[name-id = "${id}"]`);
    var b = document.querySelector(`[path-id = "${id}"]`);

    
    if(isFixing){
        a.style.display = 'none';
        b.style.display = 'none';

        songInfo.innerHTML = convertToInput(a.innerHTML,b.innerHTML,id);     
    }
    else {
        // return input value
        var nameValueOnInput = document.querySelector(`[name-id="${id}"]`)
        var pathValueOnInput = document.querySelector(`[path-id="${id}"]`)

        var formData = {
            name: nameValueOnInput.value,
            path: pathValueOnInput.value,
        }
        updateData(formData,id)


        // songInfo.innerHTML = convertToNotInput();     
    }
   
}

function updateData(data,id) {
    var options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(songApi + '/' +id ,options)
    .then(response => response.json())
}

function convertToInput(a,b,id){
    return`
    <div>
        <div> 
            <input type="text" name="name" value="${a}" name-id="${id}">
        </div>
        <div>
            <input type="text" name="path" value="${b}" path-id="${id}">
        </div>
   

    </div>
    `

}

