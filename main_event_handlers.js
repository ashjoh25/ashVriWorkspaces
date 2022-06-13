"use strict";
// event handlers for the main page that contains the task manager itself
// sets the "[User]'s Task Manager!" heading on the page
function setUsername() {
    let username = localStorage.getItem("username");
    let username_ele = document.querySelector(".username");
    if (username === "Your") {
        username_ele.textContent = username + " Task Manager!";
    }
    else {
        username_ele.textContent = username + "'s Task Manager!";
    }
    ;
}
;
// create a new task object and list object that contain the necessary methods
const taskObject = new taskManager();
const listObject = new listManager();
setUsername();
// calls the method to load and put all the user's lists on the page
listObject.loadLists();
// checks if user has info through local storage, and if so, loads the data stored into the page
if (localStorage.getItem("userWithInfo") === "true") {
    listObject.loadMasterTasks();
    listObject.loadListsTasks(taskObject);
}
;
// a series of selecting one of the buttons on the page and adding an event listener to listen for user's click
// methods are called corresponding to the button / the button's purpose
const addTaskbutton = document.querySelector("#addTask");
addTaskbutton.addEventListener("click", () => {
    let user_task_input = document.querySelector(".taskInput");
    if (!user_task_input.value) { // checking if user did not type anything
        return;
    }
    else {
        let master_default = document.querySelector(".master1");
        taskObject.addtoList(user_task_input.value, master_default);
        taskObject.updateLocal();
    }
    ;
});
const clearTasksbutton = document.querySelector("#clearAll");
clearTasksbutton.addEventListener("click", () => {
    taskObject.clearAllStorage();
    taskObject.clearDisplay();
});
const changeListNamebutton = document.querySelector("#changeListName");
changeListNamebutton.addEventListener("click", () => {
    let listNameInput = document.querySelector(".listNameInput");
    if (!listNameInput.value) { // checking if user did not type anything
        return;
    }
    else {
        listObject.changeListName(listNameInput.value);
        listObject.loadListsTasks(taskObject);
    }
    ;
});
// const deleteButton = document.querySelector("#delete") as HTMLButtonElement;
// document.addEventListener("keydown", (event : KeyboardEvent) => {
//     if (event.repeat)
//         return;
//     if (event.key === "Backspace") {
//         taskObject.removeTask(event.target as HTMLElement);
//     }
// });
//beginning of dragging code
let dragged = null;
document.addEventListener("dragstart", dragStart);
function dragStart(event) {
    dragged = event.target;
}
;
const boxes = document.querySelectorAll(".list_container");
const moreboxes = document.querySelectorAll(".masterList");
moreboxes.forEach(masterList => {
    masterList.addEventListener("dragenter", dragEnter);
    masterList.addEventListener("dragover", dragOver);
    masterList.addEventListener("dragleave", dragLeave);
    masterList.addEventListener("drop", drop);
});
boxes.forEach(list_container => {
    list_container.addEventListener("dragenter", dragEnter);
    list_container.addEventListener("dragover", dragOver);
    list_container.addEventListener("dragleave", dragLeave);
    list_container.addEventListener("drop", drop);
});
function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
}
;
function dragOver(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
}
;
function dragLeave(event) {
    event.target.classList.remove("drag-over");
}
;
function drop(event) {
    event.target.classList.remove("drag-over");
    //add it to drop target
    event.target.appendChild(dragged);
    taskObject.updateLocal();
}
;
//end of dragging code
// "autosave" --> every 2000 millseconds, updateLocal() is called to save in local storage the current version of the page + its data
setInterval(function () {
    taskObject.updateLocal();
}, 2000);
