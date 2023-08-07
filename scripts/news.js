'use strict';

// const apiKey = '99aad95797ef4c40b25cd244a76ad707';
const apiKey = 'badb947b74ee46619d65444ed2fd40a9';

// Selecting elements
const newsContainer = document.getElementById('news-container');
const pageNumElement = document.getElementById('page-num');
const prevButton = document.getElementById('btn-prev');
const nextButton = document.getElementById('btn-next');

// Khai báo biến

let currentPage = 1;
const currentUser = getFromStorage('CURRENT_USER');
const category = currentUser.settings.category;
const pageSize = currentUser.settings.pageSize;

console.log('>>> SETTINGS', category, pageSize);

// 1. Function để hiển thị danh sách bài viết lên trang News
function displayArticles(articles) {
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const articleCard = document.createElement('div');

    articleCard.className = 'card flex-row flex-wrap mb-3';

    articleCard.innerHTML = `
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.urlToImage}" class="card-img" style="height:100%" alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url} ttarget="_blank" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(articleCard);
  });
}

// 2. Function để gọi API và lấy dữ liệu bài viết
async function getNewsArticles() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
    );
    console.log(response);
    const data = await response.json();
    console.log('>>> getNewsArticles data:', data);
    const { articles, totalResults, ...rest } = data;
    // console.log(articles);
    // console.log(totalResults);
    // console.log(rest);

    return data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

// 3. Function để cập nhật trạng thái của nút "Previous" và "Next"
function updatePaginationButtons(totalResults) {
  const maxPages = Math.ceil(totalResults / pageSize);
  console.log('>>>> updatePaginationButtons invoked');
  console.log('totalResults', totalResults);
  console.log('pageSize', pageSize);
  console.log('maxPages', maxPages);
  if (currentPage === 1) {
    prevButton.classList.add('hidden');
  } else {
    prevButton.classList.remove('hidden');
  }

  if (currentPage === maxPages) {
    nextButton.classList.add('hidden');
  } else {
    nextButton.classList.remove('hidden');
  }
}

// 4. Function xử lý sự kiện khi nhấn nút Previous
async function prevButtonHandler() {
  if (currentPage > 1) {
    currentPage--;
    const data = await getNewsArticles();
    displayArticles(data.articles);
    pageNumElement.textContent = currentPage;
    updatePaginationButtons(data.totalResults);
  }
}

// 5. Function xử lý sự kiện khi nhấn nút Next
async function nextButtonHandler() {
  currentPage++;
  const data = await getNewsArticles();
  displayArticles(data.articles);
  pageNumElement.textContent = currentPage;
  updatePaginationButtons(data.totalResults);
}

// 6. Function xử lý sự kiện  DOMContentLoaded
async function loadedHandler() {
  const data = await getNewsArticles();
  console.log('>>> loadedHandler data', data);
  const initialArticles = data.articles;
  const totalResults = data.totalResults;

  console.log('>>> initialArticles', initialArticles);
  console.log('>>> totalResults', totalResults);

  displayArticles(initialArticles);
  pageNumElement.textContent = currentPage;
  updatePaginationButtons(totalResults);

  prevButton.addEventListener('click', prevButtonHandler);
  nextButton.addEventListener('click', nextButtonHandler);
}

document.addEventListener('DOMContentLoaded', loadedHandler);
