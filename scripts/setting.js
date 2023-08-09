'use strict';

const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const submitButton = document.getElementById('btn-submit');

// Load saved settings from local storage
const currentUser = getFromStorage('CURRENT_USER');
const userArr = getFromStorage('USER_ARRAY');

const savedCategory = currentUser.settings.category;
const savedPageSize = currentUser.settings.pageSize;

console.log('>>>SAVED SETTINGS', savedCategory, savedPageSize);

pageSizeInput.value = savedPageSize;
categoryInput.value = savedCategory;

// Add event listener for the submit button
submitButton.addEventListener('click', function () {
  console.log('>>> SUBMIT BUTTON');

  const newCategory = categoryInput.value;
  const newPageSize = parseInt(pageSizeInput.value);

  if (!newPageSize) {
    alert('Please set the news per page');
  } // khi không nhập page size sẽ báo lỗi

  // Lưu trữ settings cho user vào currentUser và cả thông tin của user đó trên USER_ARRAY
  // => Khi thoát tài khoản ra thì user đó vẫn còn lưu setting cũ

  currentUser.settings.category = newCategory;
  currentUser.settings.pageSize = newPageSize;
  saveToStorage('CURRENT_USER', currentUser);

  const currentUserStorage = userArr.find(
    user => user.username === currentUser.username
  );

  currentUserStorage.settings.category = newCategory;
  currentUserStorage.settings.pageSize = newPageSize;
  saveToStorage('USER_ARRAY', userArr);

  console.log(currentUser.settings);
  console.log(currentUserStorage.settings);

  console.log('>>> NEW SETTINGS', newCategory, newPageSize);
});
