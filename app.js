const formAddNewTask = document.querySelector("#form-add-new-task");
const taskContainer = document.querySelector(".task-container");

const addNewTask = (task) => {
    taskContainer.innerHTML += `
        <div class="task-card">
        <span class="task">${task}</span>
        <div class="controls-container" >
            <i class="fas fa-check-square btn-check control"></i>
            <i class="fas fa-trash btn-delete control"></i>
        </div>
        </div>
    `;
};

formAddNewTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = formAddNewTask.task.value.trim();
    formAddNewTask.reset();
    addNewTask(task);
});

const changeTaskState = (task) => {
    task.classList.toggle("completed");
};

const deleteTask = (task) => {
    task.remove();
};

taskContainer.addEventListener("click", (e) => {
   const target  = e.target;
   if(target.classList.contains("btn-check")){
       changeTaskState(target.parentElement.previousElementSibling);
   }else if(target.classList.contains("btn-delete")){
       deleteTask(target.parentElement.parentElement);
   }
});