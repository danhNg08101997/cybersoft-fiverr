import StatsCard from '@pages/AdminTemplate/_Components/StatsCard';
import type { JSX } from 'react';

export default function DashboardStats(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Users" value="1,245" />
      <StatsCard title="Jobs" value="532" />
      <StatsCard title="Orders" value="843" />
      <StatsCard title="Revenue" value="$12,400" />
    </div>
  );
}