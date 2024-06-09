'use client'

import { subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Chart  as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

interface DataProps {
    dates?: string[];
    data?: number[];
}

const exampleData = [150, 200, 250, 300, 350, 400];  // Dados de exemplo para depuração

export default function PaymentsByMonth({ data = exampleData, dates }: DataProps) {
    const dataEvents = {
        labels: [
            format(subMonths(new Date(), 5), "MMMM", { locale: ptBR }),
            format(subMonths(new Date(), 4), "MMMM", { locale: ptBR }),
            format(subMonths(new Date(), 3), "MMMM", { locale: ptBR }),
            format(subMonths(new Date(), 2), "MMMM", { locale: ptBR }),
            format(subMonths(new Date(), 1), "MMMM", { locale: ptBR }),
            format(new Date(), "MMMM", { locale: ptBR }),
        ],
        datasets: [
            {
                label: "Payments by month",
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: [
                    data?.[5],
                    data?.[4],
                    data?.[3],
                    data?.[2],
                    data?.[1],
                    data?.[0],
                ],
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
