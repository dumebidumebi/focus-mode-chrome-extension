
//get from local storage
const storedTodoz = JSON.parse(localStorage.getItem('todoz'))

// Array to store the todos
let todos = storedTodoz?[...storedTodoz]:[];

//place in chrome storage
chrome.storage.local.set({ todoz: todos});


function setStorage(){
  localStorage.setItem('todoz', JSON.stringify(todos))
  chrome.storage.local.set({ todoz: todos});
}

displayTodos()


// Function to add a new todo
function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const newTodo = {
      name: todoText,
      checked: false
    };

    todos.push(newTodo);

    // Clear the input field
    todoInput.value = '';

    // Set storage
    // localStorage.setItem('todoz', JSON.stringify(todos))
    setStorage()
    // chrome.storage.local.set({ todoz: todos});

    // Refresh the todo list
    displayTodos(); 
    messaging()
  }
}
// Function to handle key press events
function handleKeyPress(event) {
  if (event.keyCode === 13 || event.which === 13) {
    addTodo();
  }
}

// Attach key press event listener to the input field
const todoInput = document.getElementById('todoInput');
todoInput.addEventListener('keypress', handleKeyPress);


// Function to display the todos
function displayTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.checked;
    checkbox.addEventListener('change', () => toggleTodoStatus(index));

    const todoText = document.createElement('span');
    todoText.textContent = todo.name;

    listItem.appendChild(checkbox);
    listItem.appendChild(todoText);
    todoList.appendChild(listItem);

    
  });
}

// Function to toggle the status of a todo
function toggleTodoStatus(index) {
  todos[index].checked = !todos[index].checked;
  setTimeout(() => {
    todos.splice(index, 1);
    displayTodos();
    setStorage()
    
  }, 500);
  
  
}


//messaging
function messaging(){
// chrome.runtime.sendMessage({greeting: "hello from popup"});
chrome.tabs.query({active: true, lastFocusedWindow: true}, gotTabs);
  function gotTabs(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {farewell: "goodbye"});
  }
};

function sendResponse(response){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, gotTabs);
  function gotTabs(tabs){
    chrome.tabs.sendMessage(tabs[0].id, response);
  }
};