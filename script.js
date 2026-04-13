
    function initTodoCard() {
  const dueDate = new Date("2026-03-01T18:00:00Z");

  const dueDateEl = document.getElementById("due-date");
  const timeRemainingEl = document.getElementById("time-remaining");
  const checkbox = document.getElementById("todo-checkbox");
  const title = document.getElementById("todo-title");
  const statusEl = document.getElementById("status");

  dueDateEl.textContent = "Due " + dueDate.toDateString();
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
    timeRemainingEl.textContent = calculateTimeRemaining();
  }

  updateTimeRemaining();
  setInterval(updateTimeRemaining, 60000);

  checkbox.addEventListener("change", () => {
    const completed = checkbox.checked;

    title.style.textDecoration = completed ? "line-through" : "none";
    const statusText = completed ? "Done" : "Pending";
    statusEl.textContent = statusText;
    statusEl.setAttribute("aria-label", `Status: ${statusText}`);

    if (completed) {
    timeRemainingEl.style.display = "none";
    dueDateEl.style.opacity = "0.5";
  } else {
    timeRemainingEl.style.display = "block";
    dueDateEl.style.opacity = "1";
  }
  });

  // Buttons
    document
      .querySelector('[data-testid="test-todo-edit-button"]')
      .addEventListener("click", () => {
        console.log("edit clicked");
      });

    document
      .querySelector('[data-testid="test-todo-delete-button"]')
      .addEventListener("click", () => {
        alert("Delete clicked");
      });

}

initTodoCard();
