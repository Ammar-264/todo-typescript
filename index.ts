import inquirer from 'inquirer'

let todos = [
    {
        todo:"todo 1",
        completed:false,
    },
    {
        todo:"todo 2",
        completed:false,
    },
    {
        todo:"todo 3",
        completed:false,
    },
    {
        todo:"todo 4",
        completed:true,
    },
    {
        todo:"todo 5",
        completed:false,
    },
]

let runAgain = true

while(runAgain){



let todoOptions = await inquirer.prompt({
    type:"list",
    name:"todoOption",
    message:"Select One Option ?",
    choices:[
        {
            name:"Add New Todo",
            value:"add"
        },
        {
            name:"check  Todo",
            value:"update"
        },
        {
            name:"delete Todo",
            value:"delete"
        },
        {
            name:"see all Todos",
            value:"see"
        },
        { name: 'Exit', value: 'exit' },

    ]
})


async function deleteTodos(existingTodos: any[]){
    const todoChoices = existingTodos.map((todo, index) => ({
        name: `${todo.todo} ${todo.completed ? '(completed)' : '' }`,
        value: index,
      }));
    
      const { todosToDelete } = await inquirer.prompt({
        type: 'checkbox',
        name: 'todosToDelete',
        message: 'Select todos to delete:',
        choices: todoChoices,
      });
    
      // Filter out the selected todos
      const updatedTodos = existingTodos.filter((todo, index) => !todosToDelete.includes(index));
      return updatedTodos
}
  
async function updateTodos(existingTodos: any[]){
    const uncompletedTodoChoices = existingTodos
    .filter(todo => !todo.completed)
    .map((todo, index) => ({ name: todo.todo, value: index }));

  if (uncompletedTodoChoices.length === 0) {
    console.log('No uncompleted todos to mark as completed.');
  } else {
    const { todosToMarkCompleted } = await inquirer.prompt({
      type: 'checkbox',
      name: 'todosToMarkCompleted',
      message: 'Select uncompleted todos to mark as completed:',
      choices: uncompletedTodoChoices,
    });

    // Update the selected todos to mark them as completed
    todosToMarkCompleted.forEach(index => {
      if (existingTodos[index]) {
        existingTodos[index].completed = true;
      }
    });
  }

  return existingTodos;
}


async function addTodo(){
    let getTodo = await inquirer.prompt({
        type:"input",
        name:"todo",
        message:"Enter Todo : "
    })


    let newTodo = {
        todo: getTodo.todo,
        completed: false
    };

    todos.push(newTodo);

}

if(todoOptions.todoOption === 'add'){

    await addTodo()
    
    
}else if(todoOptions.todoOption === 'delete'){
    todos = await deleteTodos(todos);
  
}else if(todoOptions.todoOption === 'update'){
    
    todos = await  updateTodos(todos)
}else if(todoOptions.todoOption === 'see'){

    let allTodos = todos.map((todo) => (
        `${todo.todo} ${todo.completed ? '(completed)' : '' }`
    ));

    for(let i=0 ; i< allTodos.length ; i++){
        console.log(`${i+1}) ${allTodos[i]}`);
        
    }
    console.log('\n');
    
}else if (todoOptions.todoOption === 'exit') {
    runAgain = false;
  }




}