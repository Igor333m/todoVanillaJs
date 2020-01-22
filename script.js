const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let allTodos = []


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

function newTodo () {
  const newTodo = prompt('New Todo!')
  
  allTodos.push(todoObject(newTodo))

  render()
  checkCount.addCount()
  checkCount.getTotalCount()
  itemCount.addCount()
  itemCount.getItemCount()
  
  
}

function checkedFunc (e) {
  if(e.target.checked) {
    checkCount.removeCount()
    checkCount.getTotalCount()
  } else {
    checkCount.addCount()
    checkCount.getTotalCount()
  }
}

function deleteTodo (e, tt) {
  allTodos.forEach( (item, index) => {
    if (item === tt) {
      allTodos.splice(index, 1);
    }
  })
  tt.remove()
}

function todoObject (todo) {
  let li = document.createElement('li'),
      input = document.createElement('input'),
      label = document.createElement('label'),
      cancelButton = document.createElement('button')

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


function render () {
  allTodos.map( item => {
    list.appendChild(item)
  })
}