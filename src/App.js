import React from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      isInValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputchange = this.inputchange.bind(this)
    this.changeTaskState = this.changeTaskState.bind(this)
  }
  handleSubmit (event){
    if (this.state.newTask === ''){
      this.setState({
        isInValid: true
      })
    }else{
      const oldTasks = this.state.tasks
      const last = oldTasks.slice(-1)[0]
      const newTask = {
        id: last.id + 1,
        name: this.state.newTask,
        done: false
      }
      this.setState({
        tasks: [...oldTasks, newTask],
        newTask: '',
        isInValid: false
      })
    }
    event.preventDefault()
  }

  inputchange (event){
    this.setState({
      newTask: event.target.value
    })
  }

  changeTaskState (id){
    const newArr = this.state.tasks.map(task => {
      if (task.id === id){
        task.done = !task.done
      }
      return task
    })
    this.setState({
      tasks: newArr
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task) => {
              return(
                <li
                  className = {task.done ? 'done' : ''}
                  key={task.id}
                  onClick = {() => this.changeTaskState(task.id)}>
                  {task.name}
                </li>
              )
            })}
          </ul>
          <form onSubmit = {this.handleSubmit}>
            <input
            type="text"
            id="new-task"
            placeholder="Ingresa una tarea y oprime Enter"
            value={this.state.newTask}
            onChange={this.inputchange}
            className= {this.state.isInValid ? 'error' : ''}
          />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
