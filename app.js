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

  // Get number of completed todos
  toggleAll: function() {
    const totalTodos = this.todos.length;
    let completedTodos = 0;
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    // 1, If everything is true, make everything false
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
      // 2, Otherwise make everything true
    } else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
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
  deleteTodo: function () {
    const deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = "";
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
      
      todoLi.textContent = todoTextWithCompletetion;
      todosUl.appendChild(todoLi); // Inserting the li into the HTML
    }
  }
};











