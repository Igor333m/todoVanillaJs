const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Array of all <li>
let allTodos = []

/**
 *  Keep item count in sync
 */
const itemCount = {
  itemCount: 0,
  addCount: function () {
    return ++this.itemCount
  },
  removeCount: function () {
    return --this.itemCount
  },
  getItemCount: function () {
    return itemCountSpan.innerText = this.itemCount
  }
}

/**
 *  Keep check count in sync
 */
const checkCount = {
  totalUncheckedCount: 0,
  addCount: function () {
    return ++this.totalUncheckedCount
  },
  removeCount: function () {
    return --this.totalUncheckedCount
  },
  getTotalCount: function () {
    console.log('this.totalUncheckedCount: ', this.totalUncheckedCount)
    return uncheckedCountSpan.innerText = this.totalUncheckedCount
  }
}

/**
 *  Create new todo item
 */
function newTodo () {
  const newTodo = prompt('New Todo!')
  
  allTodos.push(todoObject(newTodo))

  render()
  checkCount.addCount()
  checkCount.getTotalCount()
  itemCount.addCount()
  itemCount.getItemCount()
  
  
}

/**
 *  Controls the checkbox counter 
 */
function checkedFunc (e) {
  if(e.target.checked) {
    checkCount.removeCount()
    checkCount.getTotalCount()
  } else {
    checkCount.addCount()
    checkCount.getTotalCount()
  }
}

/**
 * Delete li and li in the array
 * @param e - Mouse Event
 * @param clickedLi - clicked li
 */
function deleteTodo (e, clickedLi) {
  allTodos.forEach( (item, index) => {
    if (item === clickedLi) {
      allTodos.splice(index, 1);
    }
  })
  clickedLi.remove()
}

/**
 *  Creates new li element
 *  @param todo - Todo text from prompt
 */
function todoObject (todo) {
  let li = document.createElement('li'),
      input = document.createElement('input'),
      label = document.createElement('label'),
      cancelButton = document.createElement('button')


  li.setAttribute('class', classNames.TODO_ITEM)

  input.setAttribute('type', 'checkbox')
  input.setAttribute('class', classNames.TODO_CHECKBOX)
  input.setAttribute('name', 'todo')

  input.addEventListener( 'change', (e) => checkedFunc(e))

  label.setAttribute('for', 'todo')
  label.innerText = todo

  cancelButton.addEventListener('click', function (e) { deleteTodo(e, li) })
  cancelButton.innerText = 'x'

  li.appendChild(input)
  li.appendChild(label)
  li.appendChild(cancelButton)
  return li
}

/**
 *  Renders all items
 */
function render () {
  allTodos.map( item => {
    list.appendChild(item)
  })
}