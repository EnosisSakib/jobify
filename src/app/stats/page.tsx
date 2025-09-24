"use client";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Job, JobStatus } from "../utility";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, XCircle } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatsPage() {
  const [jobs] = useLocalStorage<Job[]>("jobs", []);

  const pending = jobs.filter((j) => j.status === JobStatus.Pending).length;
  const interview = jobs.filter((j) => j.status === JobStatus.Interview).length;
  const declined = jobs.filter((j) => j.status === JobStatus.Declined).length;

  const monthlyCounts: Record<string, number> = {};
  jobs.forEach((job) => {
    if (!job.date) return;
    const date = new Date(job.date);
    const key = date.toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
  });


  const sortedMonths = Object.keys(monthlyCounts).sort((a, b) => {
    const [ma, ya] = a.split(" ");
    const [mb, yb] = b.split(" ");
    const dateA = new Date(`20${ya}-${ma}-01`).getTime();
    const dateB = new Date(`20${yb}-${mb}-01`).getTime();
    return dateA - dateB;
  });

  const chartOptions = {
    chart: { id: "monthly-applications", toolbar: { show: false } },
    xaxis: { categories: sortedMonths },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    colors: ["#14B8A6"],
  };

  const chartSeries = [
    { name: "Applications", data: sortedMonths.map((m) => monthlyCounts[m]) },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-400">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-yellow-600">
              {pending}
            </CardTitle>
            <Briefcase className="w-6 h-6 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pending Applications
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-400">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-blue-600">
              {interview}
            </CardTitle>
            <Calendar className="w-6 h-6 text-blue-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Interviews Scheduled
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-400">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-red-600">
              {declined}
            </CardTitle>
            <XCircle className="w-6 h-6 text-red-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Jobs Declined</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <section className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Monthly Applications
        </h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={300}
        />
      </section>
    </div>
  );
}
