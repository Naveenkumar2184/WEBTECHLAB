// backend/public/app.js
const apiUrl = 'http://localhost:5000/api/tasks';

// Fetch tasks and display them
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        const tasksList = document.getElementById('tasks');
        tasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.dataset.taskId = task._id;
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.textContent = task.title;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => openEditModal(task._id);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task._id);

            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);
            tasksList.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Add a new task
async function addTask() {
    try {
        const taskInput = document.getElementById('new-task');
        const newTask = { title: taskInput.value, completed: false };

        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });

        taskInput.value = '';
        fetchTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Fetch task details and open edit modal
async function openEditModal(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const task = await response.json();

        const editTaskIdInput = document.getElementById('editTaskId');
        const editTaskTitleInput = document.getElementById('editTaskTitle');
        const editTaskDescriptionInput = document.getElementById('editTaskDescription');
        const editTaskCompletedInput = document.getElementById('editTaskCompleted');

        editTaskIdInput.value = task._id;
        editTaskTitleInput.value = task.title;
        editTaskDescriptionInput.value = task.description || '';
        editTaskCompletedInput.checked = task.completed;

        const editTaskModal = document.getElementById('editTaskModal');
        editTaskModal.style.display = 'block';
    } catch (error) {
        console.error('Error opening edit modal:', error);
    }
}

// Close edit modal
function closeEditModal() {
    const editTaskModal = document.getElementById('editTaskModal');
    editTaskModal.style.display = 'none';
}

// Handle edit task form submission
document.getElementById('editTaskForm').addEventListener('submit', async(event) => {
    event.preventDefault();

    const editTaskId = document.getElementById('editTaskId').value;
    const editTaskTitle = document.getElementById('editTaskTitle').value;
    const editTaskDescription = document.getElementById('editTaskDescription').value;
    const editTaskCompleted = document.getElementById('editTaskCompleted').checked;

    try {
        await fetch(`${apiUrl}/${editTaskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: editTaskTitle,
                description: editTaskDescription,
                completed: editTaskCompleted
            })
        });

        closeEditModal();
        fetchTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
});

// Close edit modal when clicking outside of it
window.onclick = function(event) {
    const editTaskModal = document.getElementById('editTaskModal');
    if (event.target == editTaskModal) {
        editTaskModal.style.display = 'none';
    }
};

// Fetch tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);