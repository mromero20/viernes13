export function MessageProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="message-progress mx-auto flex items-center justify-center gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span key={index} className={`progress-dot${index + 1 === current ? ' is-current' : ''}${index + 1 < current ? ' is-read' : ''}`} />
      ))}
    </div>
  )
}
