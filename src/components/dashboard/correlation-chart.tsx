'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Hormone, HormoneLevels } from '@/lib/types';
import { ChartTooltipContent } from '@/components/ui/chart';

interface CorrelationChartProps {
  hormones: HormoneLevels;
}

const hormoneDisplay: Record<Hormone, { name: string; fill: string }> = {
  cortisol: { name: 'Cortisol', fill: 'var(--color-cortisol)' },
  melatonin: { name: 'Melatonin', fill: 'var(--color-melatonin)' },
  dopamine: { name: 'Dopamine', fill: 'var(--color-dopamine)' },
  serotonin: { name: 'Serotonin', fill: 'var(--color-serotonin)' },
};

export default function CorrelationChart({ hormones }: CorrelationChartProps) {
  const chartData = (Object.keys(hormones) as Hormone[]).map((key) => ({
    name: hormoneDisplay[key].name,
    value: hormones[key],
    fill: hormoneDisplay[key].fill,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Hormone Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <style>{`
            :root {
              --color-cortisol: hsl(var(--chart-1));
              --color-melatonin: hsl(var(--chart-2));
              --color-dopamine: hsl(var(--chart-3));
              --color-serotonin: hsl(var(--chart-4));
            }
          `}</style>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
