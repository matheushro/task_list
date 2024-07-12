import PaymentsByMonth from "./_components/payments-by-month";
import Summary from "./_components/summary";
import { GetTaskStatistics, GetMonthlyPayments } from "./actions";

export default async function page() {
    let stats = null;
    let monthlyPayments = [];

    try {
        stats = await GetTaskStatistics();
        const paymentsResponse = await GetMonthlyPayments();
        
        if (Array.isArray(paymentsResponse)) {
            const now = new Date();
            const months = Array.from({ length: 12 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - i, 1)).reverse();
            monthlyPayments = months.map(month => {
                const monthNumber = month.getMonth() + 1;
                const payment = paymentsResponse.find(p => p._id === monthNumber);
                return payment ? payment.monthlyTotal : 0;
            });
        } else {
            console.error(paymentsResponse.error);
        }
    } catch (e) {
        console.error(e);
    }

    if (!stats) return (
        <div>
            <h1>No data available</h1>
        </div>
    );

    return (
        <div className="flex flex-col gap-12">
            <h1>Dashboard</h1>
            <Summary stats={stats} />
            <PaymentsByMonth data={monthlyPayments} />
        </div>
    );
}
