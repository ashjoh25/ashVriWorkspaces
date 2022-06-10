"use strict";
let dragged = null;
const taskObject = new taskManager();
const listObject = new listManager();
const masterList = document.querySelector(".master1");
const list_container = document.querySelector(".list_container");
const taskLabel = document.querySelector(".tasklabel");
listObject.setUsername();
listObject.loadLists();
if (localStorage.getItem("userWithInfo") === "true")
    listObject.loadMasterTasks(masterList);
listObject.loadListsTasks(taskObject);
const addTaskbutton = document.querySelector(".addTask");
addTaskbutton.addEventListener("click", () => {
    let taskInput = document.querySelector(".taskInput");
    if (!taskInput.value)
        return;
    else
        taskObject.addtoList(taskInput.value, masterList);
    taskObject.updateLocal();
});
const clearTasksbutton = document.querySelector(".clearAll");
clearTasksbutton.addEventListener("click", () => {
    taskObject.clearAllStorage();
    taskObject.clearDisplay();
});
document.addEventListener("dragstart", dragStart);
function dragStart(event) {
    dragged = event.target;
}
//drop targets
const boxes = document.querySelectorAll(".list_container");
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
function dragOver(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
}
function dragLeave(event) {
    event.target.classList.remove("drag-over");
}
function drop(event) {
    event.target.classList.remove("drag-over");
    //add it to drop target
    event.target.appendChild(dragged);
    taskObject.updateLocal();
}
const changeListNamebutton = document.querySelector(".changeListName");
changeListNamebutton.addEventListener("click", () => {
    let listNameInput = document.querySelector(".listNameInput");
    if (!listNameInput.value)
        return;
    else
        listObject.changeListName(listNameInput.value);
    listObject.loadListsTasks(taskObject);
});
