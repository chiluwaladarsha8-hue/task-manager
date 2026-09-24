import { useEffect, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import useLocalStorage from './hooks/useLocalStorage'
import { createId } from './constants'

export default function App() {
  // Persisted state: tasks and the chosen theme survive a refresh.
  const [tasks, setTasks] = useLocalStorage('tm.tasks', [])
  const [theme, setTheme] = useLocalStorage('tm.theme', 'light')

  // Session state: filters reset every time the app loads.
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Keep the <html> element in sync with the theme so the CSS variables swap.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function addTask({ title, category, dueDate }) {
    const newTask = {
      id: createId(),
      title,
      category,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((current) => [newTask, ...current])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function editTask(id, updates) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed))
  }

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  // Derived values — recalculated on every render from the task list.
  const visibleTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !task.completed) ||
      (statusFilter === 'completed' && task.completed)
    const matchesCategory =
      categoryFilter === 'all' || task.category === categoryFilter
    return matchesStatus && matchesCategory
  })

  const remainingCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.length - remainingCount

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <TaskStats
          total={tasks.length}
          remaining={remainingCount}
          completed={completedCount}
        />

        <TaskForm onAddTask={addTask} />

        <FilterBar
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
        />

        <TaskList
          tasks={visibleTasks}
          hasAnyTasks={tasks.length > 0}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>

      <footer className="footer">
        Saved in your browser. Clearing site data removes your tasks.
      </footer>
    </div>
  )
}
