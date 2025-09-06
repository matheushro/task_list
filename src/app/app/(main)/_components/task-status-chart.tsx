'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface TaskStatusChartProps {
    data: Array<{
        _id: string;
        count: number;
        totalValue: number;
    }>;
}

export default function TaskStatusChart({ data }: TaskStatusChartProps) {
    const colors = {
        'Backlog': '#94a3b8',
        'In-progress': '#3b82f6',
        'Review': '#f59e0b',
        'Completed': '#10b981'
    };

    const chartData = {
        labels: data.map(item => item._id),
        datasets: [
            {
                data: data.map(item => item.count),
                backgroundColor: data.map(item => colors[item._id as keyof typeof colors] || '#6b7280'),
                borderColor: data.map(item => colors[item._id as keyof typeof colors] || '#6b7280'),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} tasks (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="w-full h-80">
            <h3 className="text-lg font-semibold mb-4">Task Status Distribution</h3>
            <Doughnut data={chartData} options={options} />
        </div>
    );
}
