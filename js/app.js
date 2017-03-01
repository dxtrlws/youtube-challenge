// YouTube base URL
var youTube_Url = 'https://www.googleapis.com/youtube/v3/search?';
var apiKey = 'AIzaSyC-9MH1AZNiKPgj8ZJpcAaqmyjrP6sQILA';


function getDataFromYoutube(searchTerm, callback) {

    var settings = {
        q: searchTerm,
        part: 'snippet',
        key: apiKey,
        maxResults: 16,
        order: 'date',


    };
    $.getJSON(youTube_Url, settings, callback);

}

function displayResults(data) {
    var resultElement = '';
    var resultRow = '';
    debugger;
    $.each(data.items, function(key, item){
        

        var vidTitle = item.snippet.title;
        var vidImage = item.snippet.thumbnails.high.url;
        var vidId = item.id.videoId;
        var vidUrl = 'https://www.youtube.com/watch?v='
        
        resultElement +=
        '<div class="col-md-3"><img class="img-responsive" src="'+vidImage+'">' +
        '<p style="height: 50px;"><a href="' + vidUrl + vidId+'">'+ item.snippet.title + '</a></p></div>';
        if ((key + 1) % 4 === 0) {
            resultRow += '<div>' + resultElement + '</div>';
            resultElement = '';
        }
    });
        $('.js-results').html(resultRow + '<div>' + resultElement + '</div>');
        console.log('video URL' + vidUrl);
    
}

// function displayInRows(data) {
//     var resultElement = '';
    
//     $.each(data.items, function(key, item){
//         var vidTitle = item.snippet.title;
//         var vidImage = item.snippet.thumbnails.high.url;
//         var vidId = item.id.videoId;
//         var vidUrl = 'https://www.youtube.com/watch?v='
//         resultElement +=
//         '<img class="img-responsive" src="'+vidImage+'">' +
//         '<p><a href="' + vidUrl + vidId+'">'+ item.snippet.title + '</a></p>';
        
//     });
//         $('.js-results').html(resultElement);
//         console.log('video URL' + vidUrl);
    
// }

//Event listener
function formWatch() {
    $('#search').click(function (e) {
        e.preventDefault();
        var query = $('#YouTubeSearch').val();
        console.log(query);
        getDataFromYoutube(query, displayResults);
    });
}

$(function () {
    formWatch();
});