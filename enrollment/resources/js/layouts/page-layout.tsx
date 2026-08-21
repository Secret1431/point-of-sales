import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 sm:px-6 py-8">
      <div className="flex flex-col gap-6 w-full max-w-7xl items-center">
        {children}
      </div>
    </div>
  );
}