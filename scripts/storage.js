'use strict';

const KEY = 'USER_ARRAY';

// Lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu từ LocalStorage
function getFromStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}

// Xóa dữ liệu khỏi LocalStorage
function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// Chuyển đổi từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  return user;
}
