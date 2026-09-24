import TaskItem from './TaskItem'
import EmptyState from './EmptyState'

export default function TaskList({
  tasks,
  hasAnyTasks,
  onToggle,
  onEdit,
  onDelete,
}) {
  // Two different empty screens: a brand new list, or filters that match nothing.
  if (tasks.length === 0) {
    return (
      <EmptyState
        message={
          hasAnyTasks
            ? 'No tasks match these filters.'
            : 'Add your first task above and it will show up here.'
        }
      />
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
