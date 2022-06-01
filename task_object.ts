// properties and behaviors of a Task

class Task {
    
    masterList : HTMLElement;

    constructor(masterList : HTMLElement) {
        this.masterList = masterList;
    }

    addtoMaster(text : string): void {
        let newTaskItem : HTMLElement = document.createElement("input");
        newTaskItem.textContent = text;
        newTaskItem.setAttribute("type", "checkbox");
        this.masterList.appendChild(newTaskItem);
    }
}