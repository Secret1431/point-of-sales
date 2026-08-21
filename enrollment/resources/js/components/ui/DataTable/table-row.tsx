interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return (
    <tr className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}