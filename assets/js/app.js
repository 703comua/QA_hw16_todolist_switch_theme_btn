const container = document.querySelector(".wrap");
const ul = document.querySelector(".todo-list");
const input = document.querySelector(".todo-input");
const btn = document.querySelector(".add-task-btn");
const switchThemeBtn = document.querySelector(".switch-theme-btn");

let todosFromLocalStorage = JSON.parse(window.localStorage.getItem('todos'));
if(todosFromLocalStorage == null) {
	todosFromLocalStorage = [];
} else {
	for(let i = 0; i < todosFromLocalStorage.length; i++) {
		createTodo(todosFromLocalStorage[i])
	}
}

// create li
function createTodo(taskToAdd='') {
	// console.log(taskToAdd);

	const li = document.createElement("li");
	const textSpan = document.createElement("span");
	textSpan.classList.add("todo-text");
	const newTodo = input.value;

	if(taskToAdd != '') {
		textSpan.append(taskToAdd);
	} else {
		textSpan.append(newTodo);
	}

	const deleteBtn = document.createElement("span");
	deleteBtn.classList.add("del");

	ul.appendChild(li).append(deleteBtn, textSpan);

}

// add to localStorage
function addToLocalStorage(val) {
	todosFromLocalStorage.push(input.value);
	window.localStorage.setItem("todos", JSON.stringify(todosFromLocalStorage));
}

// remove from localStorage
function removeFromLocalStorage(target) {
	// console.log(target);
	// console.log(todosFromLocalStorage);
	for(let i = 0; i < todosFromLocalStorage.length; i++) {
		if(todosFromLocalStorage[i] === target) {
			// console.log(target + 'need to be deleted');
			todosFromLocalStorage.splice(i, 1); // начиная с позиции i, удалить 1 элемент
		}
	}
	// console.log(todosFromLocalStorage);
	window.localStorage.setItem("todos", JSON.stringify(todosFromLocalStorage));
}

// listen to enter keypress
input.addEventListener("keypress", (keyPressed) => {
	const keyEnter = 13;
	if (keyPressed.which == keyEnter) {
		// create task
		createTodo();
		
		// add to localStorage
		addToLocalStorage(input.value)
		
		// clear input
		input.value = "";
	}
});

// listen to btn click
btn.addEventListener('click', () => {
	// let input = document.querySelector(".todo-input");
	if(input.value == '' || input.value == 'enter task'){
		alert('Заполните поле!');
	} else {
		// create task
		createTodo();

		// add to localStorage
		addToLocalStorage(input.value)

		// clear input
		input.value = "";
	}
});

// remove task, check task
container.onclick = function(event) {
	// console.log(event.target.className);
	if (event.target.className == 'del') {
		let task = event.target.closest('li');
		task.remove();

		// remove from localstorage
		// console.log(event.target.closest('li'))
		removeFromLocalStorage(event.target.nextSibling.innerHTML);

	} else if(event.target.className == 'todo-text') {
		// console.log(event.target.className);
		event.target.classList.add("linethrough");
	} else if(event.target.className == 'todo-text linethrough') {
		// console.log(event.target.className);
		event.target.classList.remove("linethrough");
	}
};

// listen to switch-theme-btn click
switchThemeBtn.addEventListener('click', () => {
	let $body = document.body;
	if ($body.className == 'theme-dark') {
		$body.classList.remove("theme-dark");
	} else {
		$body.classList.add("theme-dark");
	}
});