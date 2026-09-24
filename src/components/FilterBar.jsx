import { CATEGORIES, FILTERS } from '../constants'

export default function FilterBar({
  statusFilter,
  categoryFilter,
  onStatusChange,
  onCategoryChange,
  onClearCompleted,
  completedCount,
}) {
  return (
    <div className="filters">
      <div className="filters__group" role="group" aria-label="Filter by status">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={
              statusFilter === filter.id
                ? 'chip chip--selected'
                : 'chip'
            }
            aria-pressed={statusFilter === filter.id}
            onClick={() => onStatusChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="filters__right">
        <label className="visually-hidden" htmlFor="category-filter">
          Filter by category
        </label>
        <select
          id="category-filter"
          className="input input--compact"
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {completedCount > 0 && (
          <button
            type="button"
            className="button button--ghost"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  )
}
