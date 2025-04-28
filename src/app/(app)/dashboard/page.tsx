"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, CalendarRange, CalendarCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Dynamically import ApexCharts
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Example datasets
const last30DaysData = Array.from({ length: 30 }, (_, i) => ({
  day: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  ),
  bookings: Math.floor(Math.random() * 10) + 1,
}));

const thisMonthData = Array.from({ length: new Date().getDate() }, (_, i) => ({
  day: `${i + 1}`,
  bookings: Math.floor(Math.random() * 10) + 1,
}));

function Page() {
  const [chartOptions] = useState({
    chart: {
      id: "bookings-line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        style: {
          fontSize: "12px",
          colors: "#6b7280",
        },
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    colors: ["#4f46e5"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: "#e5e7eb",
    },
  });

  const last30DaysSeries = [
    {
      name: "Bookings",
      data: last30DaysData.map((data) => data.bookings),
    },
  ];

  const thisMonthSeries = [
    {
      name: "Bookings",
      data: thisMonthData.map((data) => data.bookings),
    },
  ];

  const last30DaysCategories = last30DaysData.map((data) => data.day);
  const thisMonthCategories = thisMonthData.map((data) => data.day);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">Dashboard</div>
          <SidebarTrigger />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Booking Cards */}
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Bookings This Month</CardTitle>
                <CardDescription>
                  Overview of this month&apos;s bookings
                </CardDescription>
              </div>
              <CalendarDays className="h-10 w-10 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">120</p>
            </CardContent>
            <CardFooter>
              <p>Updated just now</p>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Bookings This Week</CardTitle>
                <CardDescription>
                  Current week&apos;s performance
                </CardDescription>
              </div>
              <CalendarRange className="h-10 w-10 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">35</p>
            </CardContent>
            <CardFooter>
              <p>Updated 1 hour ago</p>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Bookings Today</CardTitle>
                <CardDescription>Today&apos;s booking activity</CardDescription>
              </div>
              <CalendarCheck className="h-10 w-10 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">5</p>
            </CardContent>
            <CardFooter>
              <p>Updated few minutes ago</p>
            </CardFooter>
          </Card>
        </div>

        {/* Line Chart Card with Tabs */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bookings Trend</CardTitle>
                <CardDescription>
                  Switch between views to see bookings
                </CardDescription>
              </div>
              {/* Tabs */}
              <Tabs defaultValue="last30" className="w-auto">
                <TabsList>
                  <TabsTrigger value="last30">Last 30 Days</TabsTrigger>
                  <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="last30" className="w-full">
              <TabsContent value="last30" className="mt-0">
                <div className="h-[300px]">
                  <ApexChart
                    options={{
                      ...chartOptions,
                      xaxis: {
                        ...chartOptions.xaxis,
                        categories: last30DaysCategories,
                      },
                    }}
                    series={last30DaysSeries}
                    type="line"
                    height="100%"
                    width="100%"
                  />
                </div>
              </TabsContent>
              <TabsContent value="thisMonth" className="mt-0">
                <div className="h-[300px]">
                  <ApexChart
                    options={{
                      ...chartOptions,
                      xaxis: {
                        ...chartOptions.xaxis,
                        categories: thisMonthCategories,
                      },
                    }}
                    series={thisMonthSeries}
                    type="line"
                    height="100%"
                    width="100%"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
