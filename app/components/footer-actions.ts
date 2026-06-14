"use server";

import { prisma } from "@/lib/prisma";

export async function getVisitorStats() {
  try {
    // 1. Record the current visit
    await prisma.visit.create({ data: {} });

    // 2. Calculate dates
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);

    const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

    const startOfYear = new Date(startOfToday.getFullYear(), 0, 1);

    // 3. Execute counts in parallel
    const [todayCount, yesterdayCount, monthCount, yearCount, totalCount] = await Promise.all([
      prisma.visit.count({
        where: { timestamp: { gte: startOfToday } },
      }),
      prisma.visit.count({
        where: {
          timestamp: {
            gte: startOfYesterday,
            lt: startOfToday,
          },
        },
      }),
      prisma.visit.count({
        where: { timestamp: { gte: startOfMonth } },
      }),
      prisma.visit.count({
        where: { timestamp: { gte: startOfYear } },
      }),
      prisma.visit.count({}),
    ]);

    return {
      today: todayCount.toLocaleString("id-ID"),
      yesterday: yesterdayCount.toLocaleString("id-ID"),
      month: monthCount.toLocaleString("id-ID"),
      year: yearCount.toLocaleString("id-ID"),
      total: totalCount.toLocaleString("id-ID"),
    };
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    return {
      today: "0",
      yesterday: "0",
      month: "0",
      year: "0",
      total: "0",
    };
  }
}
