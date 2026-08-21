interface TableHeaderProps {
  title: string;
  description?: string;
  onAddClick?: () => void;
  addLabel?: string;
}

export function TableHeader({ title, description, onAddClick, addLabel = '+ Add New' }: TableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 font-[Montsarrat]">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {description && <span className="text-sm font-medium">{description}</span>}
      </div>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="py-1.5 px-4 border border-gray-400 rounded-lg text-gray-700"
        >
          {addLabel}
        </button>
      )}
    </div>
  )
}