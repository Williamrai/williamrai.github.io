const addCategory = document.querySelector('.add-cat-btn')
const categoryInput = document.querySelector('.category-input')
const categoryContainer = document.querySelector('.category-display')
const newTaskModal = document.getElementById('add-container-div')
const addTaskBtn = document.querySelector('.addTask')
const saveBtn = document.getElementById('save-btn')
const closeBtn = document.querySelector('.close-btn')

// Input Category is not added to DOM on page load
categoryInput.remove()
// newTaskModal.classList.add('add-container-hidden')

//add category input to DOM whenver add category link is clicked
addCategory.addEventListener('click', function(){
    categoryContainer.prepend(categoryInput)
});

addTaskBtn.addEventListener('click', function(){
    newTaskModal.classList.remove('add-container-hidden')
    newTaskModal.classList.add('add-container-appear')
});

saveBtn.addEventListener('click', function(){
    // newTaskModal.classList.remove('add-container-appear')
    // newTaskModal.classList.add('add-container-hidden')
});

closeBtn.addEventListener('click', function(){
    newTaskModal.classList.remove('add-container-appear')
    newTaskModal.classList.add('add-container-hidden')
});

