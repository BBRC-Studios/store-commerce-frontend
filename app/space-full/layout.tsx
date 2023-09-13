import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full bg-[#f6f6f6]">
          <Suspense>{children}</Suspense>
      </div>
    </Suspense>
  );
}
