document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');

    let tasks = [];

    // Update the task counter display
    const updateCounter = () => {
        const count = tasks.length;
        taskCounter.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
    };

    // Add a new task
    const addTask = () => {
        const text = taskInput.value.trim();

        if (text === "") {
            // Simple shake animation on input if empty
            taskInput.style.border = "1px solid #ef4444";
            setTimeout(() => {
                taskInput.style.border = "1px solid rgba(255, 255, 255, 0.1)";
            }, 500);
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(task);
        renderTask(task);
        taskInput.value = "";
        updateCounter();
    };

    // Render a single task item
    const renderTask = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-content">
                <div class="checkbox">
                    <i class="fas fa-check"></i>
                </div>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" aria-label="Delete Task">
                <i class="fas fa-trash-can"></i>
            </button>
        `;

        // Toggle complete
        const content = li.querySelector('.task-content');
        content.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
        });

        // Delete task
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling completion

            // Add exit animation
            li.style.transform = "translateX(20px)";
            li.style.opacity = "0";

            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== task.id);
                li.remove();
                updateCounter();
            }, 300);
        });

        taskList.prepend(li); // Show newest tasks at the top
    };

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initialize counter
    updateCounter();
});