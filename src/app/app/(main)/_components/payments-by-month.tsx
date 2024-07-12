'use client'

import { subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

interface DataProps {
    data: number[];
}

export default function PaymentsByMonth({ data }: DataProps) {
    const labels = Array.from({ length: 12 }, (_, i) => format(subMonths(new Date(), 11 - i), "MMMM", { locale: ptBR }));

    const dataEvents = {
        labels,
        datasets: [
            {
                label: "Payments by month R$",
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: data,  // Use the last 6 months of data
                borderRadius: 5,
                barThickness: 30,
            },
        ],
    };

    return (
        <div className='w-full h-96'>
            <Bar data={dataEvents} />
        </div>
    );
}
