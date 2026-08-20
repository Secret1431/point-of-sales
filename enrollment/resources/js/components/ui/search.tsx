interface SearchProps {
    search: string;
    onSearchChange: (search: string) => void;
}

export function Search({ search, onSearchChange }: SearchProps) {
    return (
        <div>
            <input 
                type="search"
                placeholder="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-gray-100 py-2 px-4"
            />
        </div>
    )
}