import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    await axios.post(API, task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const updateStatus = async (task) => {
    const updated = {
      ...task,
      status: task.status === 'Pending' ? 'Completed' : 'Pending'
    };

    await axios.put(`${API}/${task._id}`, updated);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Management Dashboard</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;