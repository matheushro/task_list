import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetTaskStatistics } from "../actions";
import { formatCurrencyToBR } from "@/lib/utils";

export default async function Summary({stats}: {stats: any}){
    

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12">
            <Card className="shadow bg-green-400">
                <CardHeader>
                    <CardTitle className="text-sm font-normal">Total Revenue</CardTitle>
                    <span className="text-xs">Total amount of incomes</span>
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                    {formatCurrencyToBR(stats.totalValue) || 0}
                </CardContent>
            </Card>
            <Card className="shadow bg-yellow-500 ">
                <CardHeader>
                    <CardTitle className="text-sm font-normal">Waiting for payment</CardTitle>
                    <span className="text-xs">Completed tasks waiting for payment</span>
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                    {formatCurrencyToBR(stats.totalReviewValue) || 0}
                </CardContent>
            </Card>
            <Card className="shadow bg-blue-500 text-white">
                <CardHeader>
                    <CardTitle className="text-sm font-normal">Avarage hour revenue</CardTitle>
                    <span className="text-xs">Amount of money made by hour</span>
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                    {formatCurrencyToBR(stats.avgValuePerHour) || 0}
                </CardContent>
            </Card>
            <Card className="shadow bg-blue-500 text-white">
                <CardHeader>
                    <CardTitle className="text-sm font-normal">Avarage month revenue</CardTitle>
                    <span className="text-xs">Amount of money made by month</span>
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                    {formatCurrencyToBR(stats.avgValuePerMonth) || 0}
                </CardContent>
            </Card>
        </div>
    )
}