import { createClient } from '@/utils/supabase/server';
import { TrendingUp } from 'lucide-react';

export default async function LiveInquiryCounter() {
  const supabase = await createClient();

  // Count bookings created in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  const displayCount = count ?? 0;
  if (displayCount === 0) return null;

  return (
    <div
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold animate-pulse-slow"
      style={{ background: 'rgba(243,200,146,0.08)', border: '1px solid rgba(243,200,146,0.2)', color: '#f3c892' }}
    >
      <TrendingUp className="w-4 h-4" />
      <span>
        <strong>{displayCount}</strong> team{displayCount !== 1 ? 's' : ''} booked this week
      </span>
      {/* Live dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
    </div>
  );
}
