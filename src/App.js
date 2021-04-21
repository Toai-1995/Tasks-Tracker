import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './component/Header'
import Footer from './component/Footer'
import AddTask from './component/AddTask'
import Tasks from './component/Tasks'
import About from './component/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])
  // Fetch Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  };

  // Fetch Task

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  };


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    const taskUpdate = await fetchTasks();
    setTasks(taskUpdate)
  }

  //Toggle reminder
  const toggleReminder = async (id) => {

    const taksToToggle = await fetchTask(id);
    const updTask = { ...taksToToggle, reminder: !taksToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  };

  // Add Task
  const addTask = async (task) => {

    const res = await fetch(` http://localhost:5000/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker'
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        ></Header>
        <Route path='/' exact render={(props) =>
        (
          <>
            {showAddTask && <AddTask addTask={addTask} />}
            {
              tasks.length > 0 ? <Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} />
                : 'No task to show'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div >
    </Router>

  );
}

export default App;