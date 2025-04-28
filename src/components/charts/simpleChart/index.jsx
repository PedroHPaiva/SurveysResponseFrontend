/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// eslint-disable-next-line react/prop-types
function SimpleChartComponent({
  typeChart = 'line',
  data,
  groupBy,
  legend,
  dataKey = 'period',
  width = '200%',
}) {
  const [legendPayload, setlegendPayload] = useState([]);

  useEffect(() => {
    const legendPayload = legend.map((item) => {
      return { value: item.name, name: item.id, color: item.color };
    });

    const legendMap = {};

    legendPayload.forEach((item) => {
      legendMap[item.name] = item.value;
    });

    setlegendPayload(legendPayload);
  }, [legend]);

  const maxConversionRate = Math.max(
    ...data.flatMap((item) =>
      Object.entries(item)
        .filter(([key]) => key !== 'period') // ignora o campo 'period'
        .map(([, value]) => value || 0)
    )
  );

  const formatXAxis = (tickItem) => {
    if (!tickItem) return null;

    try {
      if (groupBy === 'day') {
        const [, month, day] = tickItem.split('-');
        return `${day}/${month}`;
      }

      if (groupBy === 'month') {
        const [year, month] = tickItem.split('-');
        return `${month}/${year}`;
      }

      if (groupBy === 'hour') {
        const [, month, day] = tickItem.split('-');
        const [newDay, hour] = day.split(' ');
        return `${newDay}/${month} ${hour}`;
      }
    } catch (err) {
      return tickItem;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        overflowX: 'auto',
        overflowY: 'hidden',
        position: 'relative',
      }}
    >
      {typeChart === 'line' && (
        <ResponsiveContainer width={width} height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -12, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKey}
              tickFormatter={dataKey === 'period' ? formatXAxis : null}
            />
            <YAxis domain={[0, maxConversionRate + 0.2]} />
            <Tooltip strokeWidth={3} />
            {legend &&
              legend.map((item) => (
                <Line
                  key={item.id}
                  type="monotone"
                  dataKey={item.id}
                  stroke={item.color}
                  strokeWidth={3}
                  activeDot={{ strokeWidth: 4, stroke: item.color }}
                />
              ))}
            <Legend payload={legendPayload} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export const SimpleChart = SimpleChartComponent;
