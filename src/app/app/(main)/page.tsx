import PaymentsByMonth from "./_components/payments-by-month";
import Summary from "./_components/summary";

export default function page(){
    return (
        <div className="flex flex-col gap-12">
            <h1>Dashboard</h1>
            <Summary />
            <PaymentsByMonth />
        </div>
    )
}