"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Briefcase,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  jobType: string;
  status: "Pending" | "Interview" | "Declined" | "Accepted";
  date: string;
  description: string;
  link: string;
}

export default function HomePage() {
  const [jobs] = useLocalStorage<Job[]>("jobs", []);

  const pendingCount = jobs.filter((j) => j.status === "Pending").length;
  const interviewCount = jobs.filter((j) => j.status === "Interview").length;
  const declinedCount = jobs.filter((j) => j.status === "Declined").length;
  const acceptedCount = jobs.filter((j) => j.status === "Accepted").length;

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const upcomingInterviews = [...jobs]
    .filter((j) => j.status === "Interview")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-8 p-4 md:p-6">
      <section className="flex items-center justify-between bg-indigo-50 rounded-xl p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-indigo-800">Welcome</h1>
          <p className="text-sm text-indigo-600">
            Track and manage your job applications easily
          </p>
        </div>
        <Link href="/jobs/add">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center">
            <PlusCircle className="w-4 h-4 mr-1" /> Add Job
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-yellow-50 rounded-xl p-4 shadow-sm text-center">
          <Briefcase className="w-6 h-6 mb-1 text-yellow-500 mx-auto" />
          <div className="text-2xl font-bold text-yellow-600">
            {pendingCount}
          </div>
          <span className="text-yellow-700 text-sm">Pending</span>
        </Card>
        <Card className="bg-blue-50 rounded-xl p-4 shadow-sm text-center">
          <Calendar className="w-6 h-6 mb-1 text-blue-500 mx-auto" />
          <div className="text-2xl font-bold text-blue-600">
            {interviewCount}
          </div>
          <span className="text-blue-700 text-sm">Interviews</span>
        </Card>
        <Card className="bg-red-50 rounded-xl p-4 shadow-sm text-center">
          <FileText className="w-6 h-6 mb-1 text-red-500 mx-auto" />
          <div className="text-2xl font-bold text-red-600">{declinedCount}</div>
          <span className="text-red-700 text-sm">Declined</span>
        </Card>
        <Card className="bg-green-50 rounded-xl p-4 shadow-sm text-center">
          <CheckCircle className="w-6 h-6 mb-1 text-green-500 mx-auto" />
          <div className="text-2xl font-bold text-green-600">
            {acceptedCount}
          </div>
          <span className="text-green-700 text-sm">Accepted</span>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Recent Applications
        </h2>
        {recentJobs.length > 0 ? (
          recentJobs.map((job) => (
            <Card
              key={job.id}
              className="bg-purple-50 rounded-xl shadow-sm hover:bg-purple-100 transition-colors"
            >
              <CardContent className="p-4">
                <p className="font-medium text-purple-800">{job.position}</p>
                <p className="text-sm text-purple-600">
                  {job.company} · {job.status}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">No applications yet.</p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Upcoming Interviews
        </h2>
        {upcomingInterviews.length > 0 ? (
          upcomingInterviews.map((job) => (
            <Card
              key={job.id}
              className="bg-blue-50 rounded-xl shadow-sm hover:bg-blue-100 transition-colors"
            >
              <CardContent className="p-4">
                <p className="font-medium text-blue-800">{job.company}</p>
                <p className="text-sm text-blue-600">
                  {job.position} ·{" "}
                  {new Date(job.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">No upcoming interviews.</p>
        )}
      </section>
    </div>
  );
}
