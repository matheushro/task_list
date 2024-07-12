'use server'
import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { auth } from '@/services/auth'

export async function GetTaskStatistics() {
    try{
        const session = await auth();
        if (!session?.user?.id) {
            return {
                error: 'Not authorized',
                data: null,
            };
        }

        await connectMongoDB();

        const idUser = session.user.id;

        // Aggregate pipeline to get the statistics
        const stats = await Task.aggregate([
            { $match: { id_user: idUser } },
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $cond: [{ $and: [{ $eq: ["$status", "Completed"] }, { $gt: [{ $strLenCP: { $ifNull: ["$value", ""] } }, 0] }] }, { $toDouble: "$value" }, 0] } },
                    totalSpentHours: { $sum: { $cond: [{ $and: [{ $eq: ["$status", "Completed"] }, { $gt: [{ $strLenCP: { $ifNull: ["$spentHours", ""] } }, 0] }] }, { $toDouble: "$spentHours" }, 0] } },
                    totalTasks: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    avgValuePerHour: { $cond: [{ $eq: ["$totalSpentHours", 0] }, 0, { $divide: ["$totalValue", "$totalSpentHours"] }] }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalValue: 1,
                    avgValuePerHour: 1,
                    totalSpentHours: 1,
                    totalTasks: 1
                }
            }
        ]);

        const now = new Date();
        const firstMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        const monthlyStats = await Task.aggregate([
            { $match: { id_user: idUser, createdAt: { $gte: firstMonth } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    monthlyTotal: { $sum: { $cond: [{ $gt: [{ $strLenCP: { $ifNull: ["$value", ""] } }, 0] }, { $toDouble: "$value" }, 0] } }
                }
            }
        ]);

        const avgMonthlyValue = monthlyStats.reduce((sum, stat) => sum + stat.monthlyTotal, 0) / (monthlyStats.length || 1);

        const reviewTasks = await Task.aggregate([
            { $match: { id_user: idUser, status: 'Review' } },
            {
                $group: {
                    _id: null,
                    totalReviewValue: { $sum: { $cond: [{ $gt: [{ $strLenCP: { $ifNull: ["$value", ""] } }, 0] }, { $toDouble: "$value" }, 0] } }
                }
            }
        ]);

        const totalReviewValue = reviewTasks.length > 0 ? reviewTasks[0].totalReviewValue : 0;

        return {
            totalValue: stats.length > 0 ? stats[0].totalValue : 0,
            avgValuePerMonth: avgMonthlyValue,
            avgValuePerHour: stats.length > 0 ? stats[0].avgValuePerHour : 0,
            totalReviewValue,
        };
    } catch (error) {
        throw error;
    }
}

export async function GetMonthlyPayments() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return {
                error: 'Not authorized',
                data: null,
            };
        }

        await connectMongoDB();

        const idUser = session.user.id;
        const now = new Date();
        const firstMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);

        const monthlyPayments = await Task.aggregate([
            { 
                $match: { 
                    id_user: idUser, 
                    payDate: { $exists: true, $ne: "" },
                    expectedDelivery: { $exists: true, $ne: "" }
                }
            },
            {
                $addFields: {
                    expectedDeliveryDate: { $dateFromString: { dateString: "$expectedDelivery" } }
                }
            },
            { 
                $match: { 
                    expectedDeliveryDate: { $gte: firstMonth } 
                }
            },
            {
                $group: {
                    _id: { $month: "$expectedDeliveryDate" },
                    monthlyTotal: { $sum: { $cond: [{ $gt: [{ $strLenCP: { $ifNull: ["$value", ""] } }, 0] }, { $toDouble: "$value" }, 0] } }
                }
            },
            {
                $sort: { "_id": 1 } // Ensure the result is sorted by month
            }
        ]);

        return monthlyPayments;
    } catch (error) {
        throw error;
    }
}