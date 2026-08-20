interface TableHeaderProps {
    title: string;
    description: string;
    onAddClick: () => void;
}

export function TableHeader({ title, description, onAddClick }: TableHeaderProps) {
    return (
        <div className="w-full bg-white border border-gray-600 text-gray-700 shadow-sm rounded-xl font-[Montsarrat]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-3">

                <div>
                    <h2>{title}</h2>
                    {description && (
                        <p className="text-sm">{description}</p>
                    )}
                </div>

                {onAddClick && (
                    <button
                        onClick={onAddClick}
                        className="py-2 px-4 border border-gray-600 text-black shadow-sm rounded"
                    >
                        + Add New
                    </button>
                )}
            </div>
        </div>
    )
}