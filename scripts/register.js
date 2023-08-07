'use strict';

// Selecting elements
const registerButton = document.getElementById('btn-submit');

// Variables
const userArr = getFromStorage(KEY, []);

// Functions

function validateForm(
  firstName,
  lastName,
  username,
  password,
  confirmPassword
) {
  // Kiểm tra các trường không được bỏ trống
  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    return false;
  }

  // Kiểm tra xem username đã tồn tại trong mảng userArr chưa
  const existingUser = userArr.find(user => user.username === username);
  if (existingUser) {
    return false;
  }

  // Kiểm tra xem password và confirm password có khớp nhau không
  if (password !== confirmPassword) {
    return false;
  }

  // Kiểm tra độ dài password
  if (password.length < 8) {
    return false;
  }

  return true;
}
function registerHandler() {
  const firstName = document.getElementById('input-firstname').value;
  const lastName = document.getElementById('input-lastname').value;
  const username = document.getElementById('input-username').value;
  const password = document.getElementById('input-password').value;
  const confirmPassword = document.getElementById(
    'input-password-confirm'
  ).value;

  // Kiểm tra tính hợp lệ của form
  if (validateForm(firstName, lastName, username, password, confirmPassword)) {
    // Khởi tạo user mới
    const newUser = parseUser({ firstName, lastName, username, password });

    // Thêm user vào mảng userArr
    userArr.push(newUser);

    // Lưu mảng userArr vào LocalStorage
    saveToStorage(KEY, userArr);

    // Chuyển trang đến màn hình login
    window.location.href = '../pages/login.html';
  } else {
    // Hiển thị thông báo lỗi cho người dùng
    alert('Invalid form data. Please check your inputs.');
  }
}

// Lắng nghe sự kiện click vào nút Register
registerButton.addEventListener('click', registerHandler);
