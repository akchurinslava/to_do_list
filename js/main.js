//find elements on page
const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const removeAllButton = document.getElementById('removeDoneTasks');

document.addEventListener('DOMContentLoaded', function () {
    const openButton = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closePopup');

    
    openButton.addEventListener('click', function () {
        
        popup.style.display = 'block';
        
    });

    closeButton.addEventListener('click', function () {
        popup.style.display = 'none';
    });
});


let tasks = [];


if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    //tasks.forEach((task) => renderTask(tasks));
};


tasks.forEach(function (task){
    renderTask(task);
});


checkEmptyList();


//sort task
// taskList.addEventListener('click', sortTask);


//remove all done tasks
removeAllButton.addEventListener('click', removeAllDoneTasks);


//add task
form.addEventListener('submit', addTask);


//delete task
taskList.addEventListener('click', deleteTask);


//done task
taskList.addEventListener('click', doneTask);


function addTask(event){
    //prevent page reload
    //event.preventDefault();

    //take task text from text field
    const taskText = taskInput.value;
    const dayText = dayInput.value;
    const monthText = monthInput.value;
    const minutesText = minutesInput.value;
    const hoursText = hoursInput.value;
    const yearText = yearInput.value;
    
        
    //const currentDate = new Date();

    // const day = currentDate.getDate();
    // const month = currentDate.getMonth() + 1;
    // const hours = currentDate.getHours();
    // const minutes = currentDate.getMinutes();
    //const years = currentDate.getFullYear();
 
    // const id = `${day}.${month}.${year} ${hours}:${minutes}`;
    //describe task like object
    const newTask = {
        id: Date.now(),
        text: taskText,
        hour: Number(hoursText),
        minute: Number(minutesText),
        day: Number(dayText),
        year: Number(yearText),
        month: Number(monthText),
        done: false
    };

    //add task to array
    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);

    //clear text field and save focus
    taskInput.value = "";
    dayInput.value = "";
    monthInput.value = "";
    minutesInput.value = "";
    hoursInput.value = "";
    yearInput.value = "";
    taskInput.focus();

    // //if in list more then 1 element, "task list is empty" will be hide
    // if(taskList.children.length > 1){
    //     emptyList.classList.add('none');
    // };
    checkEmptyList();
    
}; 


// function sortTask(event){
//     if (event.target.dataset.action !== 'sortList') return;

//     tasks.sort((a, b) => {
//         if (a.year !== b.year) {
//             return a.year - b.year;
//         }else if (a.month !== b.month){
//             return a.month - b.month;
//         }else if (a.day !== b.day){
//             return a.day - b.day;
//         }else if (a.hour !== b.hour){
//             return a.hour - b.hour
//         }else if (a.minute !== b.minute){
//             return a.minute - b.minute
//         }
//     });
//     saveToLocalStorage();
// };


function deleteTask(event){
    //if click was not by button "delete"
    if (event.target.dataset.action !== 'delete') return;

    //check that click on button "delete"
    const parentNode = event.target.closest('.list-group-item');

    //take task ID
    const id = Number(parentNode.id);

    
    // //find index in tasks array
    // const index = tasks.findIndex(function(task){
    //     return task.id === id;
    // });
    // //Second way
    // const index = tasks.findIndex((task) => task.id === id);
    // tasks.splice(index, 1);
    // // Third way
    // tasks = tasks.filter(function (task){
    //     if (tasks.id === id){
    //        return false;
    //     } else{
    //        return true;
    //     };
    // });

    tasks = tasks.filter((task) => task.id !== id);

    saveToLocalStorage();

    //delete task from markup
    parentNode.remove();

    // //if list is empty - show "task list is empty"
    // if(taskList.children.length === 1){
    // emptyList.classList.remove('none');
    // };
    checkEmptyList();


};


function removeAllDoneTasks(event){
    tasks = tasks.filter(function(obj) {
        return obj.done !== true;
      });
    tasks.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }else if (a.month !== b.month){
            return a.month - b.month;
        }else if (a.day !== b.day){
            return a.day - b.day;
        }else if (a.hour !== b.hour){
            return a.hour - b.hour
        }else if (a.minute !== b.minute){
            return a.minute - b.minute
        }
    });
    saveToLocalStorage();
    location.reload();    
};


function doneTask(event){
    //if click was not by button "done"
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');

    //defind task ID
    const id = Number(parentNode.id);
    // //First way
    // const task = tasks.find(function(task){
    //     if (task.id === id){
    //         return true;
    //     };
    // });
    // task.done = !task.done;
    // Second way
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done

    saveToLocalStorage();
    
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
};


function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/done.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Task list is empty</div>
        </li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    };

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    };
};


function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function renderTask(task){
    tasks.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }else if (a.month !== b.month){
            return a.month - b.month;
        }else if (a.day !== b.day){
            return a.day - b.day;
        }else if (a.hour !== b.hour){
            return a.hour - b.hour
        }else if (a.minute !== b.minute){
            return a.minute - b.minute
        }
    });
    saveToLocalStorage();

    //make CSS class
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    
    //!create markup for new task
    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}"><strong>${task.hour}:${task.minute}</strong> ${task.text}<br><strong>${task.day}.${task.month}.${task.year}</strong></span>
        <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
        </div>
        </li>`;
    
    //add task on page
    taskList.innerHTML += taskHTML;
    
};


