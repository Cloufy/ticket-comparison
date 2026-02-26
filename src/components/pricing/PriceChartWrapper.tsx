"use client";

import { getMatchHistory } from "@/data/priceHistory";
import { PLATFORMS } from "@/data/platforms";
import { Card } from "@/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function PriceChartWrapper({ matchId }: { matchId: string }) {
  const history = getMatchHistory(matchId);

  if (history.length === 0) {
    return (
      <Card hover={false} className="p-8 text-center">
        <p className="text-sm text-muted">No price history available for this match.</p>
      </Card>
    );
  }

  // Transform data: group by date, columns per platform
  const dateMap = new Map<string, Record<string, number>>();
  for (const snap of history) {
    const existing = dateMap.get(snap.date) || {};
    existing[snap.platformId] = snap.price;
    dateMap.set(snap.date, existing);
  }

  const chartData = Array.from(dateMap.entries())
    .map(([date, prices]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ...prices,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Card hover={false} className="p-4 sm:p-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [`$${value}`, ""]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
          />
          {PLATFORMS.map((p) => (
            <Line
              key={p.id}
              type="monotone"
              dataKey={p.id}
              name={p.name}
              stroke={p.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
