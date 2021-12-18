const formAddNewTask = document.querySelector("#form-add-new-task");
const taskContainer = document.querySelector(".task-container");
const dateContainer = document.querySelector(".date");

dateContainer.textContent = `${dateFns.format(new Date(), "MMMM D, YYYY")}`;
class Task {
    constructor(task){
        this.task = task;
        this.isCompelted = false;
    }
}

const updateLocalStorage = (newTaskData) => {
    const prevTasks = JSON.parse(localStorage.getItem("tasks"));
    prevTasks.push(newTaskData);
    localStorage.setItem("tasks", JSON.stringify(prevTasks));
};

const addNewTask = (newTaskData, id) => {
    taskContainer.innerHTML += `
        <div class="task-card" data-id="${id}">
            <label class="task">
                <input class="btn-check" type="checkbox" ${newTaskData.isCompelted && "checked"}>
                <span class="task ${newTaskData.isCompelted ? "completed" : ""}">${newTaskData.task}</span>
            </label>
            <div class="controls-container" >
                <i class="fas fa-trash btn-delete control"></i>
            </div>
        </div>
    `;
};

formAddNewTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.tasks);
    const id = tasks.length === 0 ? 0 : tasks.length;
    const task = formAddNewTask.task.value.trim();
    formAddNewTask.reset();
    const newTask = new Task(task);
    addNewTask(newTask, id);
    updateLocalStorage(newTask);
});

const changeTaskState = (task, id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[id].isCompelted = !(tasks[id].isCompelted);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.classList.toggle("completed");
};

const deleteTask = (task, id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.remove();
};

taskContainer.addEventListener("click", (e) => {
   const target  = e.target;
   const id = target.parentElement.parentElement.getAttribute("data-id");
   console.log(target.nextElementSibling, id)
   if(target.classList.contains("btn-check")){
       changeTaskState(target.nextElementSibling, id);
   }else if(target.classList.contains("btn-delete")){
       deleteTask(target.parentElement.parentElement, id);
   }
});


if(localStorage.tasks === undefined){
    localStorage.setItem("tasks", JSON.stringify([]));
}else{
    JSON.parse(localStorage.tasks).forEach((task, i) => {
        addNewTask(task, i);
    });
}