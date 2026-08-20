interface TableCellProps {
    children: React.ReactNode;
    header?: boolean;
}

export function TableCell({ children, header = false }: TableCellProps) {
    if (header) {
        <th>{children}</th>
    }

    return <td>{children}</td>
}