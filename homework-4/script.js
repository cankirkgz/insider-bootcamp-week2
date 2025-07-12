const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInputs = document.getElementsByName("priority");
const completedCheckbox  = document.getElementById("completed");
const taskList = document.getElementById("tasks");

    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.stopPropagation();
            const li = event.target.closest('li');
            li.remove();
        }

        if (event.target.classList.contains('task-checkbox')) {
            event.stopPropagation();
            const li = event.target.closest('li');
            const statusText = li.querySelector('.status-text');

            if (event.target.checked) {
                li.classList.add('done');
                statusText.textContent = "Tamamlandı";
            } else {
                li.classList.remove('done');
                statusText.textContent = "Tamamlanmadı";
            }
        }
    });

form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        let priority = "";
        priorityInputs.forEach(input=>{
            if (input.checked) {
                priority = input.value;
            }
        });

        if (!priority) {
            alert("Öncelik seviyesi seçmelisiniz.");
            return;
        }

        const isCompleted = completedCheckbox.checked;

        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('done');
        }

        li.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" ${isCompleted ? "checked" : ""}>
                <span class="priority-indicator ${priority}"></span>
                <strong class="task-title">${title}</strong>
            </div>
            <span class="task-description">${description || ""}</span>
            <div class="task-footer">
                <span class="status-text">${isCompleted ? "Tamamlandı" : "Tamamlanmadı"}</span>
                <span class="task-priority ${priority}">${priority === "low" ? "Düşük" : priority === "medium" ? "Orta" : "Yüksek"}</span>
            </div>
            <button class="delete-btn">Sil</button>
        `;

        taskList.appendChild(li);

        form.reset();
    } catch (error) {
        console.error("Görev eklenirken hata oluştu:", error);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
});

const filterButton = document.getElementById('filter-completed');
let showOnlyCompleted = false;

filterButton.addEventListener('click', () => {
    showOnlyCompleted = !showOnlyCompleted;

    filterButton.classList.toggle('active');

    filterButton.textContent = showOnlyCompleted ?  "Tüm Görevleri Görüntüle" : "Sadece Tamamlananları Göster";

    const allTasks = taskList.querySelectorAll('li');
    allTasks.forEach(li => {
        const checkbox = li.querySelector('.task-checkbox');

        if (showOnlyCompleted) {
            if (!checkbox.checked) {
                li.style.display = 'none';
            } 
        } else {
           li.style.display = '';
        }
    })
});

const sortButton = document.getElementById('sort-priority');

sortButton.addEventListener('click', () => {
  const priorityOrder = { 'Düşük': 1, 'Orta': 2, 'Yüksek': 3 };

  const allTasks = Array.from(taskList.querySelectorAll('li'));

  const sortedTasks = allTasks.sort((a, b) => {
    const aPriority = a.querySelector('span:nth-of-type(2)').textContent.replace("Öncelik: ", "").trim();
    const bPriority = b.querySelector('span:nth-of-type(2)').textContent.replace("Öncelik: ", "").trim();
    return priorityOrder[aPriority] - priorityOrder[bPriority];
  });

  taskList.innerHTML = "";
  sortedTasks.forEach(task => taskList.appendChild(task));
});