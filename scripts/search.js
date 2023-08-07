'use strict';

// const apiKey = '99aad95797ef4c40b25cd244a76ad707';
const apiKey = 'badb947b74ee46619d65444ed2fd40a9';

// Elements
const newsContainer = document.getElementById('news-container');

const searchInput = document.getElementById('input-query');
const searchButton = document.getElementById('btn-submit');

const pageNumElement = document.getElementById('page-num');
const prevButton = document.getElementById('btn-prev');
const nextButton = document.getElementById('btn-next');

// Khai báo
let currentPage = 1;

const currentUser = getFromStorage('CURRENT_USER');
const pageSize = currentUser.settings.pageSize;

// Function
// 1. Hiển thị danh sách bài viết lên trang News
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

// 2. cập nhật trạng thái của nút "Previous" và "Next"
function updatePaginationButtons(totalResults) {
  const maxPages = Math.ceil(totalResults / pageSize);
  console.log('>>> updatePaginationButtons invoked');
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

// 3. Chuyển đổi một chuỗi thành một chuỗi kí tự tìm kiếm theo định cung cấp:
function convertToSearchString(inputString) {
  // Loại bỏ khoảng trắng đầu và cuối chuỗi và thay thế khoảng trắng trong chuỗi bằng dấu cộng (+)
  const cleanedString = inputString.trim().replace(/ /g, '+');
  // https://newsapi.org/docs/endpoints/everything
  //   Keywords or phrases to search for in the article title and body.

  // Advanced search is supported here:

  // Surround phrases with quotes (") for exact match.
  // Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
  // Prepend words that must not appear with a - symbol. Eg: -bitcoin
  // Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
  // The complete value for q must be URL-encoded. Max length: 500 chars.

  // Chuyển chuỗi thành chuỗi kí tự tìm kiếm có ""
  // const searchString = '"' + cleanedString + '"';

  return cleanedString;
}

// 4. Gọi API và lấy dữ liệu bài viết theo keyword được search
async function searchNewsArticles(keyword) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
    );
    const data = await response.json();
    // console.log(data);
    console.log('>>> searchNewsArticles data:', data);
    const { articles, totalResults, ...rest } = data;

    return data;
  } catch (error) {
    console.error('Error searching news articles:', error);
    return [];
  }
}

// 5. Xử lý sự kiện khi nhấn nút Search
async function searchHandler() {
  const searchKeyword = searchInput.value.trim();
  const encodedKeyword = convertToSearchString(searchKeyword);
  console.log(encodedKeyword);

  if (searchKeyword !== '') {
    currentPage = 1;
    const searchData = await searchNewsArticles(encodedKeyword);
    const searchArticles = searchData.articles;
    const totalResults = searchData.totalResults;

    displayArticles(searchArticles);
    pageNumElement.textContent = currentPage;
    updatePaginationButtons(totalResults);

    displayArticles(searchArticles);
  }
}

// 6. Xử lý sự kiện khi nhấn nút Previous
async function prevButtonHandler() {
  const searchKeyword = searchInput.value.trim();
  const encodedKeyword = convertToSearchString(searchKeyword);
  if (searchKeyword !== '') {
    currentPage--;

    const searchData = await searchNewsArticles(encodedKeyword);
    const searchArticles = searchData.articles;
    const totalResults = searchData.totalResults;

    displayArticles(searchArticles);
    pageNumElement.textContent = currentPage;
    updatePaginationButtons(totalResults);

    displayArticles(searchArticles);
  }
}

// 7. Xử lý sự kiện khi nhấn nút Next
async function nextButtonHandler() {
  const searchKeyword = searchInput.value.trim();
  const encodedKeyword = convertToSearchString(searchKeyword);

  currentPage++;

  const searchData = await searchNewsArticles(encodedKeyword);
  const searchArticles = searchData.articles;
  const totalResults = searchData.totalResults;

  displayArticles(searchArticles);
  pageNumElement.textContent = currentPage;
  updatePaginationButtons(totalResults);

  displayArticles(searchArticles);
}

// 8. Xử lý sự kiện DOMContentLoaded
async function searchLoadedHandler() {
  searchButton.addEventListener('click', searchHandler);
  prevButton.addEventListener('click', prevButtonHandler);
  nextButton.addEventListener('click', nextButtonHandler);
}

//////////////////////////////////////
// Tìm kiếm bài viết theo từ khóa
document.addEventListener('DOMContentLoaded', searchLoadedHandler);
