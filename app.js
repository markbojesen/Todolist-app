const todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() { 
    const totalTodos = this.todos.length;
    let completedTodos = 0;

    // Get number of completed todos.   
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      // Case 1 if everything is true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
        // Case 2, otherwise make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

// Handlers for onclick="" in HTML
const handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ''; //Clear input back to default
    view.displayTodos();
  },
  changeTodo: function() {
    const changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    const changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = ''; //Clear input back to default
    changeTodoTextInput.value = ''; //Clear input back to default
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    const toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompleted = ""; //Clear input back to default
    view.displayTodos();
  },
  toggleAll: function() {
  todoList.toggleAll();
  view.displayTodos();
  }
};

// View object
const view = {
  displayTodos: function() {
    const todosUl = document.querySelector('ul');
    todosUl.innerHTML = ''; // Make sure it starts from zero
    for (let i = 0; i < todoList.todos.length; i++) {
      const todoLi = document.createElement('li');
      const todo = todoList.todos[i];
      let todoTextWithCompletetion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletetion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletetion = '( ) ' + todo.todoText;
      }
      // Gives each delete button an individual id  
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletetion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi); // Inserts the li into the HTML
    }
  }, // Creates delete button
    createDeleteButton: function() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    const todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {  
      // Get the element that was clicked on
      const elementClicked = event.target;

      // Check if element clicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        // Grabs parentNode (li) which is a string and parseInt turns it into a number
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

// Calls event listerners
view.setUpEventListeners();










