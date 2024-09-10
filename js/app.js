document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    loadTask();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        taskInput.value = '';
        saveTasks();
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');

        const taskInputField = document.createElement('input');
        taskInputField.type = 'text';
        taskInputField.value = taskText;
        taskInputField.setAttribute('readonly','readonly');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';


        editBtn.addEventListener('click', function() {
            if (editBtn.textContent.toLowerCase() === 'edit') {
                taskInputField.removeAttribute('readonly');
                taskInputField.focus();
                editBtn.textContent = 'Save';
            }else {
                taskInputField.setAttribute('readonly','readonly');
                editBtn.textContent = 'Edit';
                saveTasks();
            }
        });

        removeBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        })
    
        li.appendChild(taskInputField);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        return li;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.querySelector('input[type="text"]').value);
        });
        localStorage.setItem('todolist3_4', JSON.stringify(tasks));
    }

    function loadTask() {
        const tasks = JSON.parse(localStorage.getItem('todolist3_4'));
        if (tasks) {
            tasks.forEach(taskText => {
                const li = createTaskElement(taskText);
                taskList.appendChild(li);
            });
        }
    }
});