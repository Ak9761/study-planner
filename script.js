// ====================
// DOM ELEMENTS
// ====================

const timer = document.getElementById('timer');
const startBtn = document.getElementById('startButton');
const resetBtn = document.getElementById('resetButton');
const increaseBtn = document.getElementById('increaseButton');
const decreaseBtn = document.getElementById('decreaseButton');

const addTaskBtn = document.getElementById('addtaskbutton');
const taskdialog = document.getElementById('taskDialog');
const notesdialog = document.getElementById('notesDialog');
const taskList = document.getElementById('tasklist');
const closeTaskDialogBtn = document.getElementById('cancelTask');
const closeNotesDialogBtn = document.getElementById('cancelNotes');
const taskCount = document.getElementById('taskCount');

const chart = document.getElementById('productivityChart');

const addnotesbutton = document.getElementById('Addnotes');
const noteslist = document.getElementById('noteslist');

// ====================
// VARIABLES
// ====================

let seconds = 25 * 60;
let interval;

// ====================
// TIMER
// ====================

function updateTimer() {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;

  if (seconds >= 3600) {
    timer.textContent =
      `${hours.toString().padStart(2, '0')}:` +
      `${mins.toString().padStart(2, '0')}:` +
      `${secs.toString().padStart(2, '0')}`;
  } else {
    timer.textContent =
      `${mins.toString().padStart(2, '0')}:` +
      `${secs.toString().padStart(2, '0')}`;
  }
}

function startTimer() {
  if (interval) return;

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

function increaseTimer() {
  seconds += 5 * 60;
  updateTimer();
}

function decreaseTimer() {
  seconds -= 5 * 60;

  if (seconds < 0) {
    seconds = 0;
  }

  updateTimer();
}

// ====================
// TIMER EVENT LISTENERS
// ====================

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

// ====================
// TASKS
// ====================

taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    updateTaskListcount();
  }
});

function updateTaskListcount() {
  const unchecked = document.querySelectorAll(
    '.task-main input[type="checkbox"]:not(:checked)'
  ).length;

  console.log(unchecked);

  taskCount.textContent = `${unchecked} tasks remaining`;
}

// ====================
// ADD TASK
// ====================

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
  taskItem.classList.add('task-item');

  taskItem.innerHTML = `
        <div class="task-main-left">
            <input 
                type="checkbox" 
                class="task-checkbox"
                name="taskmain-1"
            />

            <span>${taskName}</span>
        </div>

        <div class="task-main-right">
            <span>${taskPriority}</span>

            <time datetime="PT${taskDuration}M">
                ${taskDuration} minutes
            </time>
        </div>
        <div>
        <button class="deletetaskbtn">Delete</button>
        </div>
    `;
  const deletetaskButton = taskItem.querySelector('.deletetaskbtn');

  deletetaskButton.addEventListener('click', (e) => {
    e.target.closest('.task-item').remove();
    updateTaskListcount;
    updateTaskListcount();
  });

  taskList.appendChild(taskItem);

  updateTaskListcount();

  taskdialog.close();
});

// ====================
// TASK DIALOG
// ====================

closeTaskDialogBtn.addEventListener('click', () => {
  taskdialog.close();
});

// ====================
// INITIAL TASK SETUP
// ====================

updateTaskListcount();

// ====================
// PROGRESS / PRODUCTIVITY CHART
// ====================

new Chart(chart, {
  type: 'line',

  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

    datasets: [
      {
        label: 'Study Hours',

        data: [2, 3, 1.5, 4, 5, 3, 6],

        borderWidth: 2,
        tension: 0
      }
    ]
  },

  options: {
    responsive: true
  }
});

// notes section

notesdialog.addEventListener('submit', (e) => {
  e.preventDefault();

  const note = document.getElementById('notesName').value;

  const notesitem = document.createElement('div');

  notesitem.classList.add('note-item');

  notesitem.innerHTML = `
    <span>${note}
    <button class="deletenotesbtn notes-button">Delete</button>
    </span>
`;

  const deleteBtn = notesitem.querySelector('.deletenotesbtn');

  deleteBtn.addEventListener('click', (e) => {
    e.target.closest('.note-item').remove();
  });

  noteslist.appendChild(notesitem);
  notesdialog.close();
});

addnotesbutton.addEventListener('click', () => {
  notesdialog.showModal();
});
closeNotesDialogBtn.addEventListener('click', () => {
  notesdialog.close();
});
