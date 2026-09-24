export default function TaskStats({ total, remaining, completed }) {
  // Nothing useful to count yet, so the headline invites a first task instead.
  if (total === 0) {
    return (
      <section className="stats">
        <p className="stats__headline">Nothing planned yet.</p>
      </section>
    )
  }

  const percent = Math.round((completed / total) * 100)

  return (
    <section className="stats">
      <p className="stats__headline">
        {remaining === 0
          ? 'All done.'
          : `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left.`}
      </p>
      <p className="stats__detail">
        {completed} of {total} complete
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}
