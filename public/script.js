const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
// read tasks from api/v1/tasks
const showTasks = async ()=> {
  try {
    //access to the endpoint created in routes/tasks.js
    const {data: tasks} = await axios.get("/api/v1/tasks");
    console.log(tasks);

    //when there is no tasks
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">There is no task.</h5>`;
      return;
    }

    // Output tasks form DB
    const allTasks = tasks.map((task) => {
      //console.log(task);
      const {completed, _id, name} = task;
      //console.log(name);
      return `<div class="single-task ${completed && "task-completed"}">
      <h5>
        <span><i class="fa-regular fa-circle-check"></i></span>${name}
      </h5>
      <div class="task-links">
        <!-- task link -->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fa-solid fa-pen-to-square"></i>
        </a>
        <!-- trash link -->
        <button class="delete-btn" data-id="${_id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;   
    }).join("");
    console.log(allTasks);
    tasksDOM.innerHTML = allTasks;
  } catch (err){
    console.log(err);
  }
};

showTasks();

// create a new task
formDOM.addEventListener("submit", async(event) =>{
  //avoid page reload after submit
  event.preventDefault();
  const name = taskInputDOM.value;

  try{
    await axios.post("/api/v1/tasks", {name: name}) //first name is data schema, the second one is const name created above
    showTasks();
    //after submit, empty the input field
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "Task added";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "Invalid data length. Please try again."
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// Delete a task
tasksDOM.addEventListener("click", async(event) =>{
  const element = event.target;
  console.log(element.parentElement);
  if(element.parentElement.classList.contains("delete-btn")){
    const id = element.parentElement.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});