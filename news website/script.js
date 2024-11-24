const API_KEY = "5eae1f508ff1462b8ec4317b2b2f0f66";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); 
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newImg = cardClone.querySelector('#news-img');
    const newTitle = cardClone.querySelector('#news-title');
    const newSource = cardClone.querySelector('#news-source');
    const newDesc = cardClone.querySelector('#news-desc');

    newImg.src = article.urlToImage;
    newTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newSource.innerHTML = `${article.source.name} . ${date}`; 
     
    cardClone.firstElementChild.addEventListener("click",() =>{
      window.open(article.url,"_blank");
    });


}

function onNavItemClick(id){
    fetchNews(id);
}
