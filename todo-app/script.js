const enterTask = document.querySelector(".add input");
const addTaskBtn = document.querySelector(".add button");
const todoTabs = document.querySelectorAll(".todo-list-tabs div");
const toDoListAll = document.querySelector(".todo-list-all");
const toDoCompleted = document.querySelector(".todo-list-completed");
const clearAllBtn = document.querySelector(".links button");
const tabs = document.querySelectorAll(".links a");
const searchInput = document.querySelector(".search input");

// Initial states of searchInput & clearAllBtn
searchInput.disabled = true;
searchInput.placeholder = "Can't search";
clearAllBtn.classList.add("ri-prohibited-2-line", "disabled");

// Initial height of toDoListAll
let height = 0;
toDoListAll.style.height = `${height}px`;
toDoListAll.style.transition = "height 0.5s ease";

// Clearing all tasks
const clearAll = () => {
  toDoListAll.innerHTML = "";
  toDoCompleted.innerHTML = "";
  enterTask.focus();
};

// Clearing all task on button click & delete key press
clearAllBtn.addEventListener("click", () => {
  if (toDoListAll.childElementCount === 0) {
    alert("No Task To Delete!");
  }
  clearAll();
});
document.addEventListener("keydown", (event) => {
  // Keyboard delete button work only when toDoListAll tab is active
  if (toDoListAll.classList.contains("active")) {
    // If there is no task added
    if (toDoListAll.childElementCount === 0 && event.key === "Delete") {
      alert("No Task To Delete!");
    }
    event.key === "Delete" ? clearAll() : null;
  }
});

// Handling the tabs
tabs.forEach((tab, index) => {
  // Initial states of toDoCompleted tab
  if (index === 1) {
    tab.style.pointerEvents = "none";
    tab.style.color = "grey";
  }
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    // All task tab
    if (index == 0) {
      todoTabs.forEach((tabs) => tabs.classList.remove("active"));
      toDoListAll.classList.add("active");
      enterTask.placeholder = "Add a new task";
      enterTask.disabled = false;
      addTaskBtn.classList.remove("ri-prohibited-2-line", "disabled");
      addTaskBtn.textContent = "Add";
      searchInput.placeholder = "Search task";
      searchInput.disabled = false;
      clearAllBtn.classList.remove("disabled", "ri-prohibited-2-line");
      clearAllBtn.textContent = "Clear All";
    }
    // Completed task tab
    else {
      todoTabs.forEach((tabs) => tabs.classList.remove("active"));
      toDoCompleted.classList.add("active");
      enterTask.placeholder = "Can't add";
      enterTask.disabled = true;
      addTaskBtn.classList.add("ri-prohibited-2-line", "disabled");
      addTaskBtn.textContent = "";
      searchInput.placeholder = "Can't search";
      searchInput.disabled = true;
      clearAllBtn.classList.add("disabled", "ri-prohibited-2-line");
      clearAllBtn.textContent = "";
      if (toDoCompleted.children.length === 0) {
        toDoCompleted.style.padding = "unset";
      }
    }
  });
});

// Adding task
enterTask.focus();
const addTask = () => {
  let task = enterTask.value;
  if (task.trim() != "") {
    // Check if the task already exists
    let isExist = Array.from(
      document.querySelectorAll(".todo-list-all label")
    ).find((label) => label.textContent.trim() === task.trim());

    // If the task doesn't exist, add it
    if (!isExist) {
      let createTodo = document.createElement("div");
      createTodo.classList.add("todo");
      createTodo.innerHTML = `
          <div class="d-flex">
            <input type="checkbox" class="me-3 form-check">
            <label class="text-capitalize">${task}</label>
          </div>
          <div class="d-flex align-items-center">
            <i class="ri-edit-box-line me-2"></i>
            <i class="ri-delete-bin-line"></i>
          </div>`;

      toDoListAll.appendChild(createTodo);
    } else {
      alert("Task already exists!");
    }

    // Selectig checkbox, edit button & delete button
    const checkBox = document.querySelectorAll(".todo input");
    const editBtn = document.querySelectorAll(".todo .ri-edit-box-line");
    const deleteBtn = document.querySelectorAll(".todo .ri-delete-bin-line");

    // Checkbox functionality
    checkBox.forEach((e, index) => {
      e.setAttribute("data-id", index);
      e.addEventListener("click", (curr) => {
        // Selecting current label text
        const currLabel = curr.target.nextElementSibling;
        const labelText = currLabel.textContent;

        // Creating element
        const taskCompleted = document.createElement("li");
        taskCompleted.textContent = labelText;
        taskCompleted.style.textTransform = "capitalize";
        toDoCompleted.style.padding = "1rem 3rem";

        // Check for existing completed item
        const existingCompletedItem = Array.from(toDoCompleted.children).find(
          (item) => item.textContent === labelText
        );

        // If checkbox is checked
        if (e.checked) {
          // Current label style
          currLabel.style.textDecoration = "line-through";
          currLabel.style.color = "#999";

          // If not in completed list, then add
          if (!existingCompletedItem) {
            toDoCompleted.appendChild(taskCompleted);
          }

          // Editing not allowed
          editBtn.forEach((edit) => {
            if (edit.getAttribute("data-id") === e.getAttribute("data-id")) {
              edit.classList.add("edit-disabled");
            }
          });
        }
        // If checkbox not checked
        else {
          // Current label style
          currLabel.style.textDecoration = "none";
          currLabel.style.color = "#212529";

          // If in completed list, then remove
          if (existingCompletedItem) {
            existingCompletedItem.remove();
          }

          // If unchecked then editing allowed
          editBtn.forEach((edit) => {
            if (edit.getAttribute("data-id") === e.getAttribute("data-id")) {
              edit.classList.remove("edit-disabled");
            }
          });
        }
      });
    });

    // Edit button functionality
    editBtn.forEach((edit, ind) => {
      edit.setAttribute("data-id", ind);
      edit.addEventListener("click", (e) => {
        // Get a reference to the current label element
        const editDiv = e.target.parentElement;
        const todoCurrLabel = editDiv.parentElement.querySelector("label");
        // Create a new input element
        let input = document.createElement("input");
        // Set the value of the input to the current label text
        input.value = todoCurrLabel.innerText;
        input.classList.add("dynamic-input");
        // Replace the label with the input element
        todoCurrLabel.parentNode.replaceChild(input, todoCurrLabel);
        // Focus on the input field
        input.focus();
        // When the input field loses focus, update the label text
        input.addEventListener("blur", () => {
          // Set the text content of the label to the input value
          todoCurrLabel.innerText = input.value;
          // Replace the input with the label
          input.parentNode.replaceChild(todoCurrLabel, input);
        });
      });
    });

    // Delete button functionality
    deleteBtn.forEach((e) => {
      e.addEventListener("click", (e) => {
        enterTask.focus();
        // Removing current task
        const btnDiv = e.target.parentElement;
        const todoCurr = btnDiv.parentElement;
        const labelText = todoCurr.querySelector("label").textContent;
        todoCurr.remove();

        // Check for existing completed item, if there then remove
        const existingCompletedItem = Array.from(toDoCompleted.children).find(
          (item) => item.textContent === labelText
        );
        if (existingCompletedItem) {
          existingCompletedItem.remove();
        }
      });
    });
  }
  // If input is empty
  else {
    alert("Input Can't Be Empty!");
  }
  enterTask.value = "";
  enterTask.focus();
};

// Adding task on button click & enter key press
addTaskBtn.addEventListener("click", addTask);
enterTask.addEventListener("keypress", (event) => {
  event.keyCode === 13 || event.which === 13 ? addTask() : null;
});

// MutationObserver to monitor changes in 'toDoListAll' element
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      if (mutation.addedNodes.length > 0) {
        // Increasing height of toDoListAll
        toDoListAll.style.height = `${(height += 66.4)}px`;
      }
      if (mutation.removedNodes.length > 0) {
        // Decreasing height of toDoListAll
        toDoListAll.style.height = `${(height -= 66.4)}px`;
      }

      // Changing states of clearAllBtn, searchInput & toDoCompleted tab
      if (mutation.removedNodes.length > toDoListAll.childElementCount) {
        clearAllBtn.classList.add("ri-prohibited-2-line", "disabled");
        clearAllBtn.textContent = "";
        searchInput.disabled = true;
        searchInput.placeholder = "Can't search";
        tabs.forEach((tab, index) => {
          if (index === 1) {
            tab.style.pointerEvents = "none";
            tab.style.color = "grey";
          }
        });
      } else {
        clearAllBtn.classList.remove("ri-prohibited-2-line", "disabled");
        clearAllBtn.textContent = "Clear All";
        searchInput.disabled = false;
        searchInput.placeholder = "Search task";
        tabs.forEach((tab, index) => {
          if (index === 1) {
            tab.style.pointerEvents = "all";
            tab.style.color = "";
          }
        });
      }

      // Check if there are no children, then reset height to 0px
      if (toDoListAll.childElementCount === 0) {
        height = 0;
        toDoListAll.style.height = `${height}px`;
      }
    }
  });
});

// Specifies the configuration for the observer
const observerConfig = {
  childList: true,
};

// Start observing changes in the 'toDoListAll' element
observer.observe(toDoListAll, observerConfig);

// Searching operation on search input
const searchLabels = (searchTerm) => {
  const todosLabel = document.querySelectorAll(".todo-list-all .todo label");
  for (const label of todosLabel) {
    label.style.transition = "all 0.5s ease";
    if (searchTerm && label.textContent.includes(searchTerm)) {
      label.style.backgroundColor = "yellow";
      label.style.fontWeight = "bold";
    } else {
      label.style.backgroundColor = "";
      label.style.fontWeight = "";
    }
  }
};

// Perform searching
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();
  searchLabels(searchTerm);
});
