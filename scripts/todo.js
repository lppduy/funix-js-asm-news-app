'use strict';

class Task {
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }
}

// Selecting elements
const todoList = document.getElementById('todo-list');
const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');

// Khai báo

const currentUser = getFromStorage('CURRENT_USER');
const todoArr = getFromStorage('TODO_LIST', []);
console.log(currentUser);

// 1. Function thêm mới Todo và Lưu dữ liệu vào LocalStorage
function addTaskToTodoList(task, owner) {
  const newTask = new Task(task, owner);
  todoArr.push(newTask);
  saveToStorage('TODO_LIST', todoArr);
}
// 2. Function hiển thị các Task
function displayTodoList() {
  todoList.innerHTML = '';

  const currentUserTasks = todoArr.filter(
    task => task.owner === currentUser.username
  );

  currentUserTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');

    taskItem.textContent = task.task;

    if (task.isDone) {
      taskItem.classList.add('checked');
    }

    const closeButton = document.createElement('span');

    closeButton.classList.add('close');
    closeButton.textContent = '×';

    closeButton.addEventListener('click', function () {
      deleteTask(index);
      displayTodoList();
    });

    taskItem.addEventListener('click', function () {
      toggleTask(task);
      displayTodoList();
    });

    taskItem.appendChild(closeButton);
    todoList.appendChild(taskItem);
  });
}
// 3. Function Toggle Task

function toggleTask(task) {
  task.isDone = !task.isDone;
  saveToStorage('TODO_LIST', todoArr);
  displayTodoList();
}
// 4. Function Delete Task

function deleteTask(index) {
  todoArr.splice(index, 1);
  saveToStorage('TODO_LIST', todoArr);
}
// 5. Function xử lý sự kiện add task
function addTaskHandler() {
  const taskText = inputTask.value.trim();

  if (taskText !== '') {
    addTaskToTodoList(taskText, currentUser.username);
    inputTask.value = ''; // Xóa nội dung input sau khi thêm
    // Gọi hàm để hiển thị lại danh sách Todo sau khi thêm mới
    displayTodoList();
  }
}

//////////////////////////////////////////////////////////////
// Thực hiện các tính năng

displayTodoList();

btnAdd.addEventListener('click', addTaskHandler);
