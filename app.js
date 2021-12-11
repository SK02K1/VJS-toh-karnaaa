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