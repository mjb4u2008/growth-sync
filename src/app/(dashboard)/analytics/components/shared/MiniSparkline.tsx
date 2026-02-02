import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniSparklineProps {
  data: number[]; // Array of values
  height?: number; // Default: 30px
  width?: number; // Default: 100px
  color?: string; // Default: var(--accent)
}

/**
 * MiniSparkline - Tiny inline chart showing trend
 * No axes, no grid, no tooltip - just a simple line
 */
export function MiniSparkline({
  data,
  height = 30,
  width = 100,
  color = "var(--accent)",
}: MiniSparklineProps) {
  // Transform data into chart format
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
