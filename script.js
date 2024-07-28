document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const themeButtons = document.querySelectorAll('.theme-button');

    addTodoButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.body.className = '';
            if (button.dataset.theme === 'dark') {
                document.body.classList.add('dark-theme');
            }
        });
    });

    function addTodo() {
        const todoText = newTodoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', handleCheckboxChange);

        const span = document.createElement('span');
        span.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', handleDelete);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        newTodoInput.value = '';
    }

    function handleCheckboxChange(event) {
        const li = event.target.parentElement;
        if (event.target.checked) {
            li.classList.add('completed');
            li.style.animation = 'fadeToGreen 0.5s forwards';
            setTimeout(() => {
                todoList.appendChild(li);
                playDingSound();
            }, 500);
        } else {
            li.classList.remove('completed');
            li.style.animation = '';
        }
    }

    function handleDelete(event) {
        const li = event.target.parentElement;
        li.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            li.remove();
        }, 500);
    }

    function playDingSound() {
        const audio = new Audio('ding.mp3');
        audio.play();
    }
});
