import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full">
        <div className="pt-5 pb-10 sm:mx-auto w-full">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
