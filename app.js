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
class Task {
  constructor(task) {
    this.id = uuidv4();
    this.task = task;
    this.isCompelted = false;
  }
}

const tasksInStorage = () => JSON.parse(localStorage.tasks);

const updateStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addToStorage = (newTask) => {
  updateStorage([...tasksInStorage(), newTask]);
};

const addNewTask = ({ id, task, isCompelted }) => {
  taskContainer.innerHTML += `
        <div class="task-card" data-id="${id}">
            <label>
                <input class="btn-check" type="checkbox" ${
                  isCompelted && 'checked'
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
};

formAddNewTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = formAddNewTask.task.value.trim();
  const newTask = new Task(task);
  addNewTask(newTask);
  addToStorage(newTask);
  formAddNewTask.reset();
});

const changeTaskState = (taskCard, uid) => {
  updateStorage(
    tasksInStorage().map((taskInfo) => {
      if (taskInfo.id === uid) {
        const { id, task, isCompelted } = taskInfo;
        return { id, task, isCompelted: !isCompelted };
      } else {
        return taskInfo;
      }
    })
  );

  taskCard.classList.toggle('completed');
};

const deleteTask = (task, uid) => {
  updateStorage(tasksInStorage().filter(({ id }) => id !== uid));
  task.remove();
};

taskContainer.addEventListener('click', (e) => {
  const target = e.target;
  const id = target.parentElement.parentElement.getAttribute('data-id');
  if (target.classList.contains('btn-check')) {
    changeTaskState(target.nextElementSibling, id);
  } else if (target.classList.contains('btn-delete')) {
    deleteTask(target.parentElement.parentElement, id);
  }
});

if (localStorage.tasks === undefined) {
  localStorage.setItem('tasks', JSON.stringify([]));
} else {
  tasksInStorage().forEach((task) => addNewTask(task));
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
