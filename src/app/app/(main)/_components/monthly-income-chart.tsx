'use client'

import { subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

interface MonthlyIncomeChartProps {
    data: Array<{
        _id: number;
        monthlyIncome: number;
        taskCount: number;
    }>;
}

export default function MonthlyIncomeChart({ data }: MonthlyIncomeChartProps) {
    const labels = Array.from({ length: 12 }, (_, i) => format(subMonths(new Date(), 11 - i), "MMM", { locale: ptBR }));

    // Create a map for quick lookup
    const dataMap = new Map(data.map(item => [item._id, item]));

    const chartData = {
        labels,
        datasets: [
            {
                label: "Monthly Income (R$)",
                data: labels.map((_, index) => {
                    const monthNumber = new Date().getMonth() - 11 + index + 1;
                    const monthData = dataMap.get(monthNumber);
                    return monthData ? monthData.monthlyIncome : 0;
                }),
                borderColor: "rgb(34, 197, 94)",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(34, 197, 94)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 6,
            },
            {
                label: "Tasks Completed",
                data: labels.map((_, index) => {
                    const monthNumber = new Date().getMonth() - 11 + index + 1;
                    const monthData = dataMap.get(monthNumber);
                    return monthData ? monthData.taskCount : 0;
                }),
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: "rgb(59, 130, 246)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
                yAxisID: 'y1',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        if (context.datasetIndex === 0) {
                            return `Income: R$ ${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                        } else {
                            return `Tasks: ${context.parsed.y}`;
                        }
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
                    text: 'Income (R$)'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Tasks Completed'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div className="w-full h-80">
            <Line data={chartData} options={options} />
        </div>
    );
}
