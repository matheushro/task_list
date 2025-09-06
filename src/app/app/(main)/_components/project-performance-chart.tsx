'use client'

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

interface ProjectPerformanceChartProps {
    data: Array<{
        _id: string;
        totalValue: number;
        taskCount: number;
        completedTasks: number;
        completionRate: number;
        avgHours: number;
    }>;
}

export default function ProjectPerformanceChart({ data }: ProjectPerformanceChartProps) {
    const chartData = {
        labels: data.map(item => item._id),
        datasets: [
            {
                label: "Total Value (R$)",
                data: data.map(item => item.totalValue),
                backgroundColor: "rgba(34, 197, 94, 0.6)",
                borderColor: "rgba(34, 197, 94, 1)",
                borderWidth: 1,
                borderRadius: 4,
                yAxisID: 'y',
            },
            {
                label: "Completion Rate (%)",
                data: data.map(item => item.completionRate),
                backgroundColor: "rgba(59, 130, 246, 0.6)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                borderRadius: 4,
                yAxisID: 'y1',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        if (context.datasetIndex === 0) {
                            return `Value: R$ ${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                        } else {
                            return `Completion: ${context.parsed.y.toFixed(1)}%`;
                        }
                    },
                    afterLabel: function(context: any) {
                        const project = data[context.dataIndex];
                        return [
                            `Tasks: ${project.taskCount}`,
                            `Completed: ${project.completedTasks}`,
                            `Avg Hours: ${project.avgHours ? project.avgHours.toFixed(1) : 'N/A'}`
                        ];
                    }
                }
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Value (R$)'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Completion Rate (%)'
                },
                grid: {
                    drawOnChartArea: false,
                },
                max: 100,
            },
        },
    };

    return (
        <div className="w-full h-80">
            <Bar data={chartData} options={options} />
        </div>
    );
}
