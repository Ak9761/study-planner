const timer = document.getElementById('timer');
const startBtn = document.getElementById('startButton');
const resetBtn = document.getElementById('resetButton');
const increaseBtn = document.getElementById('increaseButton');
const decreaseBtn = document.getElementById('decreaseButton');
const addTaskBtn = document.getElementById('addtaskbutton');
const taskdialog = document.getElementById('taskDialog');
const taskList = document.getElementById('tasklist');
const closeTaskDialogBtn = document.getElementById('cancelTask');
const taskCount = document.getElementById('taskCount');
let taskcheckboxes = document.querySelectorAll('.task-checkbox');

let seconds = 25 * 60;
let interval;

function updateTaskCheckboxes() {
  taskcheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateTaskListcount);
  });
}

function updateTaskListcount() {
  const unchecked = document.querySelectorAll(
    '.task-main input[type="checkbox"]:not(:checked)'
  ).length;

  console.log(unchecked);
  taskCount.textContent = `${unchecked} tasks remaining`;
}

function increaseTimer() {
  seconds += 5 * 60;
  updateTimer();
}
function decreaseTimer() {
  seconds -= 5 * 60;
  if (seconds < 0) seconds = 0;
  updateTimer();
}

function updateTimer() {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;
  if (seconds >= 3600) {
    timer.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

function startTimer() {
  if (interval) return; // Prevent multiple intervals from being set{
  startBtn.innerHTML = 'Pause';
  interval = setInterval(() => {
    seconds--;
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    startBtn.innerHTML = 'Start';
  }
}

increaseBtn.addEventListener('click', increaseTimer);

decreaseBtn.addEventListener('click', decreaseTimer);

resetBtn.addEventListener('click', () => {
  pauseTimer();
  seconds = 25 * 60;
  updateTimer();
});

startBtn.addEventListener('click', () => {
  if (interval) {
    pauseTimer();
  } else {
    startTimer();
  }
});

addTaskBtn.addEventListener('click', () => {
  taskdialog.showModal();
});
taskdialog.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('taskName').value;
  const taskPriority = document.getElementById('taskPriority').value;
  let taskDuration = document.getElementById('taskDuration').value;
  taskDuration = parseInt(taskDuration, 10);
  const taskItem = document.createElement('li');

  taskItem.innerHTML = `
    <div class="task-main-left">
      <input type="checkbox" class = "task-checkbox" name="taskmain-1" id="" />
      <span>${taskName}</span>
    </div>
    <div class="task-main-right">
      <span>${taskPriority}</span>
      <time datetime="PT${taskDuration}M">${taskDuration} minutes</time>
    </div>
  `;

  taskList.appendChild(taskItem);
  updateTaskListcount();
  taskdialog.close();
});

updateTaskListcount();
updateTaskCheckboxes();

closeTaskDialogBtn.addEventListener('click', () => {
  taskdialog.close();
});
