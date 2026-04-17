const overdueEl = document.getElementById("overdue-indicator");

    function initTodoCard() {
  let dueDate = new Date("2026-03-01T18:00:00Z");

  const dueDateEl = document.getElementById("due-date");
  const timeRemainingEl = document.getElementById("time-remaining");
  const checkbox = document.getElementById("todo-checkbox");
  const title = document.getElementById("todo-title");
  const titleTextEl = document.getElementById("title-text");
  const statusEl = document.getElementById("status");
  const statusControl = document.getElementById("status-control");

  dueDateEl.textContent = `Due: ${dueDate.toDateString()}`; //toLocalDateString
  dueDateEl.setAttribute("datetime", dueDate.toISOString());

  function calculateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diff < 0) {
  const absDiff = Math.abs(diff);

  const totalHours = Math.floor(absDiff / (1000 * 60 * 60));
  const overdueDays = Math.floor(totalHours / 24);
  const overdueHours = totalHours % 24;

  if (overdueDays === 0) {
    return `Overdue by ${overdueHours} hour${overdueHours !== 1 ? "s" : ""}`;
  }

  if (overdueHours === 0) {
    return `Overdue by ${overdueDays} day${overdueDays !== 1 ? "s" : ""}`;
  }

  return `Overdue by ${overdueDays} day${overdueDays !== 1 ? "s" : ""}, ${overdueHours} hour${overdueHours !== 1 ? "s" : ""}`;
}

    if (minutes <= 1) return "Due now!";
    if (hours < 24) return `Due in ${hours} hour${hours !== 1 ? "s" : ""}`;
    if (days === 1) return "Due tomorrow";

    return `Due in ${days} days`;
  }

  function updateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;

    //if the task is done, then stop everything.
    if(statusEl.textContent === "Done") {
      timeRemainingEl.textContent = "Completed";
      overdueEl.classList.add("hidden");
      return;
    }

    //handles overdue state
    if(diff < 0) {
      overdueEl.classList.remove("hidden");
    } else {
      overdueEl.classList.add("hidden");
    }

    timeRemainingEl.textContent = calculateTimeRemaining();
  }

  updateTimeRemaining();
  const interval = setInterval(() => {
    if(statusEl.textContent === "Done") return;
    updateTimeRemaining();
  }, 60000);
  //setInterval(updateTimeRemaining, 60000);

  //checkbox
  checkbox.addEventListener("change", () => {
    const completed = checkbox.checked;

    const statusText = completed ? "Done" : "Pending";
    statusEl.textContent = statusText;
    statusControl.value = statusText;
    statusEl.setAttribute("aria-label", `Status: ${statusText}`);

    updateUI(completed)
  });

  //status control
  statusControl.addEventListener("change", (e) => {
    const selectedStatus = e.target.value;
    const completed = selectedStatus === "Done";

    statusEl.textContent = selectedStatus;
    statusEl.setAttribute("aria-label", `Status: ${selectedStatus}`);

    checkbox.checked = completed; //this replaces the code below..

    /*
    if(selectedStatus === "Done") {
      checkbox.checked = true
     } else {
      checkbox.checked = false;
     }
      */

    updateUI(completed)

    console.log('Hello Einstein');
  });

  // BUTTONS

  //edit flow
  const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const editForm = document.getElementById("edit-form");

const editTitleInput = document.getElementById("edit-title");
const editDescInput = document.getElementById("edit-desc");
const priorityEl = document.querySelector('[data-testid="test-todo-priority"]');
const editPriorityInput = document.getElementById("edit-priority");
const editDateInput = document.getElementById("edit-date");

  //save and cancel
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

//delete flow
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

//collapse buttons
const toggleBtn = document.getElementById("expand-toggle");
const collapsible = document.getElementById("collapsible-section");
const description = document.querySelector('[data-testid="test-todo-description"]');

//collapse

if(description.textContent.length > 100) {
  collapsible.classList.add("collapsed");
} else {
  toggleBtn.style.display = "none"; //hide button if it's not needed.
}

toggleBtn.addEventListener("click", () => {
  const isCollapsed = collapsible.classList.contains("collapsed");

  if(isCollapsed) {
    collapsible.classList.remove("collapsed");
    toggleBtn.textContent = "Show less";
    toggleBtn.setAttribute("aria-expanded", "true");
  } else {
    collapsible.classList.add("collapsed");
    toggleBtn.textContent = "Show more";
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});


  //edit
   editBtn.addEventListener("click", () => {
    editForm.style.display = "flex";

    requestAnimationFrame(() => {
      editForm.classList.add("active");
    });

    //editForm.classList.remove("hidden");

    editTitleInput.value = title.textContent;
    editDescInput.value = document.querySelector('[data-testid="test-todo-description"]').textContent;

    editPriorityInput.value = priorityEl.dataset.priority;

editDateInput.value = dueDate.toISOString().slice(0,16);
   });

   //save
   saveBtn.addEventListener("click", () => {
    titleTextEl.textContent = editTitleInput.value;
    document.querySelector('[data-testid="test-todo-description"]').textContent = editDescInput.value;

    //editForm.classList.add("hidden");

    const selectedPriority = editPriorityInput.value;
    
    priorityEl.dataset.priority = selectedPriority;
    priorityEl.textContent = selectedPriority;

    priorityEl.classList.remove("priority-low", "priority-medium", "priority-high");
    priorityEl.classList.add(`priority-${selectedPriority.toLowerCase()}`);

dueDate = new Date(editDateInput.value);


    dueDateEl.textContent = `Due ${dueDate.toDateString()}`;
    dueDateEl.setAttribute("datetime", dueDate.toISOString());

    closeEditForm();

    updateTimeRemaining();
   });

   cancelBtn.addEventListener("click", () => {
    closeEditForm();
   });


    deleteBtn.addEventListener("click", () => {
        alert("Delete clicked");
      });

      function updateUI(completed) {
        title.style.textDecoration = completed ? "line-through" : "none";

        if(completed) {
          timeRemainingEl.textContent = "";
          overdueEl.classList.add("hidden");
        } else {
          updateTimeRemaining();
        }

        if(completed) {
      timeRemainingEl.style.display = "block";
      dueDateEl.style.opacity = "0.5";
    } else {
      dueDateEl.style.opacity = "1";
    }
      }

      function closeEditForm() {
        editForm.classList.remove("active");

        setTimeout(() => {
          editForm.style.display = "none";
        }, 250);
      }
}

initTodoCard();
