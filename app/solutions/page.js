import { Suspense } from 'react';
import SolutionsPage from '../components/solutions-page';

export const metadata = {
  title: 'Solutions | Sinetcom',
  description: 'Sophos cybersecurity, StorONE backup, and Huawei infrastructure solutions. Firewall, endpoint, MDR, UPS, and Smart Server Rack in one place.',
};

export default function SolutionsRoute() {
  return (
    <Suspense fallback={<div className="pt-[var(--navbar-height,80px)] min-h-screen bg-gray-50 flex items-center justify-center"><span className="text-gray-500">Loading...</span></div>}>
      <SolutionsPage />
    </Suspense>
  );
}
