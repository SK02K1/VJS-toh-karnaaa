const formAddNewTask = document.querySelector('#form-add-new-task');
const formSearchTask = document.querySelector('#form-search-task');
const taskContainer = document.querySelector('.task-container');
const dateContainer = document.querySelector('.date');

dateContainer.textContent = `${dateFns.format(new Date(), 'MMMM D, YYYY')}`;

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getTasks = () => JSON.parse(localStorage.tasks);

class Task {
  constructor(task) {
    this.id = uuidv4();
    this.task = task;
    this.isCompelted = false;
  }
}

const updateUI = () => {
  taskContainer.innerHTML = getTasks()
    .map(({ id, task, isCompelted }) => {
      return `
        <div class="task-card" data-id="${id}">
            <label>
                <input class="btn-check" type="checkbox" ${
                  isCompelted ? 'checked' : ''
                }>
                <span class="task ${
                  isCompelted ? 'completed' : ''
                }">${task}</span>
            </label>
            <div class="controls-container" >
                <i class="fas fa-trash btn-delete control"></i>
            </div>
        </div>
    `;
    })
    .join('');
};

const updateTasks = (updatedTasks) => {
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  updateUI();
};

const addTask = (newTask) => {
  updateTasks([...getTasks(), newTask]);
};

const deleteTask = (taskID) => {
  updateTasks(getTasks().filter(({ id }) => id !== taskID));
};

const changeTaskState = (taskID) => {
  updateTasks(
    getTasks().map((taskInfo) => {
      if (taskInfo.id === taskID) {
        const { id, task, isCompelted } = taskInfo;
        return { id, task, isCompelted: !isCompelted };
      } else {
        return taskInfo;
      }
    })
  );
};

formAddNewTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = new Task(formAddNewTask.task.value.trim());
  addTask(newTask);
  formAddNewTask.reset();
});

taskContainer.addEventListener('click', (e) => {
  const target = e.target;
  const id = target.parentElement.parentElement.getAttribute('data-id');
  if (target.classList.contains('btn-check')) {
    changeTaskState(id);
  } else if (target.classList.contains('btn-delete')) {
    deleteTask(id);
  }
});

if (!getTasks()) {
  localStorage.setItem('tasks', JSON.stringify([]));
} else {
  updateUI();
}

formSearchTask.search.addEventListener('keyup', (e) => {
  const query = e.target.value.trim().toLowerCase();
  Array.from(taskContainer.children).forEach((taskCard) => {
    if (
      taskCard.children[0].children[1].textContent.toLowerCase().includes(query)
    ) {
      taskCard.classList.remove('hide');
    } else {
      taskCard.classList.add('hide');
    }
  });
});
