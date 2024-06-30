// Variables
const addTask = document.querySelector("#add-task");
const inputTask = document.querySelector("#input-task");
const taskContainer = document.querySelector("#task-container");

// Function to create a task element
function createTaskElement(taskText) {
    let task = document.createElement("div");
    task.classList.add("task");

    let li = document.createElement("li");
    li.innerText = taskText;
    task.appendChild(li);

    // Check button and delete button
    let checkbtn = document.createElement("button");
    checkbtn.innerHTML = '<i class="fas fa-check"></i>';
    checkbtn.classList.add("checktask");
    task.appendChild(checkbtn);

    let deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
    deletebtn.classList.add("deletetask");
    task.appendChild(deletebtn);

    // Add event listeners to buttons
    checkbtn.addEventListener("click", function () {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }
    });

    deletebtn.addEventListener("click", function (e) {
        let taskToDelete = e.target.parentNode; // or parentElement
        taskContainer.removeChild(taskToDelete);
        saveTasks();
    });

    return task;
}

// Function to save the Current tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task li").forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // it looks like tasks = [1,2,3,4]
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
// Function to load tasks from localStorage
function loadTasks() {
    // get already saved tasks = {inputText}
    //parse those input again passed into main-function(createTaskElement) when we re-load the page 
    //when we re-load the page it fade , LoadTasks load the same content(content before reload)again from the local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(taskText => {
            const task = createTaskElement(taskText);
            taskContainer.appendChild(task);
        });
    }
}

// Add event listener to add button
addTask.addEventListener("click", function () {
    if (inputTask.value === "") {
        alert("Please Enter a Task");
    } else {
        const task = createTaskElement(inputTask.value);
        taskContainer.appendChild(task);
        saveTasks();
        inputTask.value = "";
    }
});

