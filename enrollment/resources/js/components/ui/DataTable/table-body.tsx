interface TableBodyProps {
    children: React.ReactNode;
}

export function TableBody({ children}: TableBodyProps) {
    return (
        <tbody>
            <tr>{children}</tr>
        </tbody>
    )
}