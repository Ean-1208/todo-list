// 初始化加载保存的任务
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  saveTask(task);
  appendTaskToDOM(task);
  taskInput.value = '';
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => appendTaskToDOM(task));
}

function appendTaskToDOM(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  
  li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
    <div>
      <button onclick="toggleTask(${task.id})">${task.completed ? '撤销' : '完成'}</button>
      <button onclick="deleteTask(${task.id})">删除</button>
    </div>
  `;

  taskList.appendChild(li);
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  location.reload(); // 简单刷新页面更新列表
}

function toggleTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  location.reload();
}