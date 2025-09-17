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
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface CorrelationChartProps {
  hormones: HormoneLevels;
}

const chartConfig = {
  value: {
    label: 'Value',
  },
  cortisol: {
    label: 'Cortisol',
    color: 'hsl(var(--chart-1))',
  },
  melatonin: {
    label: 'Melatonin',
    color: 'hsl(var(--chart-2))',
  },
  dopamine: {
    label: 'Dopamine',
    color: 'hsl(var(--chart-3))',
  },
  serotonin: {
    label: 'Serotonin',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export default function CorrelationChart({ hormones }: CorrelationChartProps) {
  const chartData = (Object.keys(hormones) as Hormone[]).map((key) => ({
    name: key,
    value: hormones[key],
    fill: `var(--color-${key})`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Hormone Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
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
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
