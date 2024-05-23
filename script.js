document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const allTasksButton = document.getElementById('all-tasks');
    const completedTasksButton = document.getElementById('completed-tasks');
    const pendingTasksButton = document.getElementById('pending-tasks');

    // 從本地儲存中加載任務
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 渲染任務
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
                createTaskElement(task, index);
            }
        });
    };

    // 創建任務元素
    const createTaskElement = (task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.toggle('completed', task.completed);

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? '復原' : '完成';
        completeButton.addEventListener('click', () => toggleTaskCompletion(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '刪除';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(index));

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // 新增任務
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    };

    // 刪除任務
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    };

    // 切換任務完成狀態
    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    };

    // 更新本地儲存
    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // 點擊按鈕或按下 Enter 鍵新增任務
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // 篩選任務
    allTasksButton.addEventListener('click', () => renderTasks('all'));
    completedTasksButton.addEventListener('click', () => renderTasks('completed'));
    pendingTasksButton.addEventListener('click', () => renderTasks('pending'));

    // 初次渲染
    renderTasks();
});