let articles = [];

// Get iss news articles from newsapi.
function getISSNews() {
    $.ajax({
        method: 'GET',
        url: 'https://newsapi.org/v2/everything?apiKey=14a203dbcd734c259c66e3b17d72eb30&q=iss',
        success: (response) => {

            response.articles.forEach(article => {
                let articleItem = {
                    title: article.title,
                    description: article.description,
                    source: article.source.name,
                    url: article.url
                }
                articles.push(articleItem);
            });

            addArticles(6);
        }
    });
}

// Adds articles to the news table.
function addArticles(num) {

    for (var i = 0; i < num; i++) {
        let article = articles[i];
        let tr = $(`
            <tr class="news-row" data-url="${article.url}">
                <th scope="row"></th>
                <td>${article.title}</td>
                <td>${article.source}</td>
            </tr>
        `);

        $('#news-table-body').append(tr);
    }
}

// Toggle more or less articles.
$('#more-news-btn').on('click', function () {

    if ($(this).attr('data-state') === 'more') {
        $('#news-table-body').empty();
        $('#news-table').toggleClass('table-striped');

        addArticles(articles.length);

        $(this).attr('data-state', 'less');
        $(this).text('Less...');
    } else {
        //Scroll to top of news div
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#news-div").offset().top
        }, 0);        

        $('#news-table-body').empty();
        $('#news-table').toggleClass('table-striped');
        
        addArticles(6);

        $(this).attr('data-state', 'more');
        $(this).text('More...');
    }
});

// Go to article url.
$(document).on('click', '.news-row', function () {
    let url = $(this).attr('data-url');
    window.open(url, "_blank");
});

// Init
getISSNews();