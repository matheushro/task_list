import PaymentsByMonth from "./_components/payments-by-month";
import Summary from "./_components/summary";
import TaskStatusChart from "./_components/task-status-chart";
import MonthlyIncomeChart from "./_components/monthly-income-chart";
import ProjectPerformanceChart from "./_components/project-performance-chart";
import { GetTaskStatistics, GetMonthlyPayments, GetTaskStatusDistribution, GetMonthlyIncome, GetProjectPerformance } from "./actions";

export default async function page() {
    let stats = null;
    let monthlyPayments = [];
    let statusDistribution = [];
    let monthlyIncome = [];
    let projectPerformance = [];

    try {
        // Fetch all data in parallel
        const [statsResponse, paymentsResponse, statusResponse, incomeResponse, projectResponse] = await Promise.all([
            GetTaskStatistics(),
            GetMonthlyPayments(),
            GetTaskStatusDistribution(),
            GetMonthlyIncome(),
            GetProjectPerformance()
        ]);

        stats = statsResponse;
        
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

        statusDistribution = Array.isArray(statusResponse) ? statusResponse : [];
        monthlyIncome = Array.isArray(incomeResponse) ? incomeResponse : [];
        projectPerformance = Array.isArray(projectResponse) ? projectResponse : [];
    } catch (e) {
        console.error(e);
    }

    if (!stats || 'error' in stats) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-600">No data available</h1>
                <p className="text-gray-500 mt-2">Create some tasks to see your dashboard</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString('pt-BR')}
                </div>
            </div>

            {/* Summary Cards */}
            <Summary stats={stats} />

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Monthly Income Trend */}
                <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="p-6 pb-4">
                        <h3 className="text-lg font-semibold mb-4">Monthly Income Trend</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <MonthlyIncomeChart data={monthlyIncome} />
                    </div>
                </div>

                {/* Task Status Distribution */}
                <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="p-6 pb-4">
                        <h3 className="text-lg font-semibold mb-4">Task Status Distribution</h3>
                    </div>
                    <div className="px-6 pb-6">
                        <TaskStatusChart data={statusDistribution} />
                    </div>
                </div>

                {/* Project Performance */}
                {projectPerformance.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg border overflow-hidden lg:col-span-2">
                        <div className="p-6 pb-4">
                            <h3 className="text-lg font-semibold mb-4">Project Performance</h3>
                        </div>
                        <div className="px-6 pb-6">
                            <ProjectPerformanceChart data={projectPerformance} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
