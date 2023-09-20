const todoList = [];

function displayTodoList() {
    const todoListElement = document.querySelector('ul');
    todoListElement.innerHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoItem = todoList[i];

        const li = document.createElement('li');
        li.textContent = todoItem.task;
        if (todoItem.completed) {
            li.classList.add('completed');
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            const newTask = prompt('Enter new task:', todoItem.task);
            if (newTask !== null && newTask.trim() !== '') {
                editTodoItem(i, newTask.trim());
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(i);
        });

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        li.appendChild(actionsDiv);
        todoListElement.appendChild(li);
    }
}

function addTodoItem(task) {
    const todoItem = {
        task: task,
        completed: false
    };

    todoList.push(todoItem);
    displayTodoList();
}

function deleteTodoItem(index) {
    todoList.splice(index, 1);
    displayTodoList();
}

function completeTodoItem(index) {
    todoList[index].completed = true;
    displayTodoList();
}

function editTodoItem(index, newTask) {
    todoList[index].task = newTask;
    displayTodoList();
}

const form = document.querySelector('form');
const input = form.querySelector('input');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== '') {
        addTodoItem(task);
        input.value = '';
    }
});

const todoListElement = document.querySelector('ul');

todoListElement.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const li = event.target;
        const index = Array.from(todoListElement.children).indexOf(li);
        completeTodoItem(index);
    } else if (event.target.classList.contains('delete')) {
        const li = event.target.parentElement.parentElement;
        const index = Array.from(todoListElement.children).indexOf(li);
        deleteTodoItem(index);
    } else if (event.target.classList.contains('edit')) {
        const li = event.target.parentElement.parentElement;
        const index = Array.from(todoListElement.children).indexOf(li);
        const todoItem = todoList[index];
        const newTask = prompt('Enter new task:', todoItem.task);
        if (newTask !== null && newTask.trim() !== '') {
            editTodoItem(index, newTask.trim());
        }
    }
});