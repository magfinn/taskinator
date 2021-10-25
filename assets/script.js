//start taskcounterid at 0 to create unique ids for each task
var taskIdCounter = 0;

//querySelectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

//delete task function to be called in taskButtonHandler function
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//edit task function to be called in taskButton Handler function
var editTask = function(taskId) {
    //get task list item element
    var taskSelected= document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent= "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

//set up the form
var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  };
  //clear the form once a task is submitted
  formEl.reset();
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  createTaskEl(taskDataObj);
};


//function to create new tasks
var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  //give it a class name and attribute
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  //create task actions element for list items
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id taskIdCounter++;
};
//end create new function

//begin code for creating task "actions"
var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className= "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent= "Delete";
    deleteButtonEl.className= "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    //create status selection
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(statusSelectEl);

    //create for loop for drop-down options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    //when all is done, return.
    return actionContainerEl;
};
//end create task actions 

//submit tasks

var taskButtonHandler = function (event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if(targetEl.matches(".delete-btn")) {
       var taskId = targetEl.getAttribute("data-task-id");
       deleteTask(taskId);
    }
};

formEl.addEventListener("submit", taskFormHandler);

//create an event listener for the parent element so that clicks in child elements will bubble
pageContentEl.addEventListener("click", taskButtonHandler);
