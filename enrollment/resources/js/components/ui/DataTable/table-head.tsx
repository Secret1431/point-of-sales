interface TableHeadProps {
  children: React.ReactNode;
}

export function TableHead({ children }: TableHeadProps ) {
  return (
    <thead className="w-full border-b border-gray-200">{children}</thead>
  )
}