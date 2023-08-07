'use strict';

// Selecting elements
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('btn-logout');

// Khai báo hàm và biến
const currentUser = getFromStorage('CURRENT_USER');

function verifyLoginStatus(currentUser) {
  if (currentUser) {
    // Đã đăng nhập
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    welcomeMessage.textContent = 'Welcome ' + currentUser.firstName;
  } else {
    // Chưa đăng nhập
    loginModal.style.display = 'block';
    mainContent.style.display = 'none';
  }
}

function logoutHandler() {
  {
    // Xóa thông tin đăng nhập từ LocalStorage

    removeFromStorage('CURRENT_USER');
    // Chuyển hướng người dùng đến trang Login
    window.location.href = '../pages/login.html';
  }
}

// Kiểm tra trạng thái đăng nhập
verifyLoginStatus(currentUser);
// Xử lý sự kiện logout
logoutButton.addEventListener('click', logoutHandler);
