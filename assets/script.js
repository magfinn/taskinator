//assign button element to a variable
var formEl.addEventListener("submit", createTaskHandler);
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']");

    var taskTypeInput = document.querySelector("select[name='task-type']");
//create list item
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";

//create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
//give it a class name
taskInfoEl.className = "task-info";
//add HTML content to div
taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);