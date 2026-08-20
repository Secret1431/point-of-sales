interface TableHeadProps {
    children: React.ReactNode;
}

export function TableHead({ children}: TableHeadProps) {
    return (
        <thead>
            <tr>{children}</tr>
        </thead>
    )
}