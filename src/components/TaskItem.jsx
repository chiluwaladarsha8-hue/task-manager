import { useState } from 'react'
import { CATEGORIES, formatDueDate, today } from '../constants'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Editing state lives here because it only concerns this one row.
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)
  const [draftCategory, setDraftCategory] = useState(task.category)
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate)

  const isOverdue = !task.completed && task.dueDate !== '' && task.dueDate < today()

  function startEditing() {
    setDraftTitle(task.title)
    setDraftCategory(task.category)
    setDraftDueDate(task.dueDate)
    setIsEditing(true)
  }

  function saveEdit(event) {
    event.preventDefault()
    const trimmed = draftTitle.trim()
    if (trimmed === '') return

    onEdit(task.id, {
      title: trimmed,
      category: draftCategory,
      dueDate: draftDueDate,
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="task task--editing">
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            className="input input--title"
            type="text"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            autoFocus
          />
          <div className="edit-form__meta">
            <select
              className="input input--compact"
              value={draftCategory}
              onChange={(event) => setDraftCategory(event.target.value)}
            >
              {CATEGORIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              className="input input--compact"
              type="date"
              value={draftDueDate}
              onChange={(event) => setDraftDueDate(event.target.value)}
            />
            <button type="submit" className="button button--primary">
              Save
            </button>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className={task.completed ? 'task task--done' : 'task'}>
      <label className="task__check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task__box" aria-hidden="true" />
        <span className="visually-hidden">Mark "{task.title}" complete</span>
      </label>

      <div className="task__body">
        <p className="task__title">{task.title}</p>
        <p className="task__meta">
          <span className={`tag tag--${task.category.toLowerCase()}`}>
            {task.category}
          </span>
          {task.dueDate !== '' && (
            <span className={isOverdue ? 'due due--overdue' : 'due'}>
              {isOverdue ? 'Overdue ' : 'Due '}
              {formatDueDate(task.dueDate)}
            </span>
          )}
        </p>
      </div>

      <div className="task__actions">
        <button
          type="button"
          className="button button--ghost"
          onClick={startEditing}
        >
          Edit
        </button>
        <button
          type="button"
          className="button button--ghost button--danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
