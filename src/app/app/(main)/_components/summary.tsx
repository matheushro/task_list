import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyToBR } from "@/lib/utils";
import { TrendingUp, Clock, DollarSign, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface SummaryProps {
    stats: {
        totalValue: number;
        totalReviewValue: number;
        avgValuePerHour: number;
        avgValuePerMonth: number;
        totalTasks: number;
        completedTasks: number;
        totalSpentHours: number;
    };
}

export default function Summary({ stats }: SummaryProps) {
    const completionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            <Card className="shadow-lg border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-800">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-900">
                        {formatCurrencyToBR(stats.totalValue) || 0}
                    </div>
                    <p className="text-xs text-green-700 mt-1">Total amount of incomes</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-yellow-800">Waiting for Payment</CardTitle>
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-900">
                        {formatCurrencyToBR(stats.totalReviewValue) || 0}
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">Completed tasks waiting for payment</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800">Average Hour Revenue</CardTitle>
                    <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900">
                        {formatCurrencyToBR(stats.avgValuePerHour) || 0}
                    </div>
                    <p className="text-xs text-blue-700 mt-1">Amount of money made by hour</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-purple-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-800">Average Month Revenue</CardTitle>
                    <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-900">
                        {formatCurrencyToBR(stats.avgValuePerMonth) || 0}
                    </div>
                    <p className="text-xs text-purple-700 mt-1">Amount of money made by month</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-indigo-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-indigo-800">Total Tasks</CardTitle>
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-indigo-900">
                        {stats.totalTasks || 0}
                    </div>
                    <p className="text-xs text-indigo-700 mt-1">All tasks created</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-800">Completion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">
                        {completionRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-emerald-700 mt-1">
                        {stats.completedTasks || 0} of {stats.totalTasks || 0} tasks completed
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-800">Total Hours Worked</CardTitle>
                    <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-900">
                        {stats.totalSpentHours || 0}h
                    </div>
                    <p className="text-xs text-orange-700 mt-1">Hours spent on completed tasks</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-50 to-rose-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-rose-800">Productivity Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-rose-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-rose-900">
                        {stats.totalSpentHours > 0 ? (stats.totalValue / stats.totalSpentHours).toFixed(0) : 0}
                    </div>
                    <p className="text-xs text-rose-700 mt-1">Revenue per hour worked</p>
                </CardContent>
            </Card>
        </div>
    )
}