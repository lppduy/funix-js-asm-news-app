'use strict';

// Selecting elements
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const btnLogin = document.querySelector('#btn-submit');

// Khai báo hàm xử lý sự kiện click vào nút Login
function loginHandler(e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const storedUsers = getFromStorage(KEY, []);

  // Validate username và password
  if (!username || !password) {
    alert('Please enter username and password');
    return;
  }

  // Tìm user khớp với username và password
  const currentUser = storedUsers.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (currentUser) {
    // Lưu current user vào LocalStorage
    saveToStorage('CURRENT_USER', currentUser);

    // Redirect to Home page
    window.location.href = '../index.html';
  } else {
    alert('Invalid username or password');
  }
}

// Lắng nghe sự kiện click vào nút Login
btnLogin.addEventListener('click', loginHandler);
