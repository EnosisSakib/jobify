"use client";
import { useState } from "react";
import { Job, JobType, JobStatus } from "../utility";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function JobListPage() {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobs] = useLocalStorage<Job[]>("jobs", []);

  const router = useRouter();
  const jobsPerPage = 12;

  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case JobStatus.Interview:
        return "bg-blue-100 text-blue-800";
      case JobStatus.Pending:
        return "bg-gray-100 text-gray-800";
      case JobStatus.Declined:
        return "bg-red-100 text-red-800";
      case JobStatus.Accepted:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sortJobs = (list: Job[]) => {
    let sorted = [...list];
    switch (sortBy) {
      case "newest":
        sorted = sorted.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        sorted = sorted.sort((a, b) => a.id - b.id);
        break;
      case "company":
        sorted = sorted.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "position":
        sorted = sorted.sort((a, b) => a.position.localeCompare(b.position));
        break;
      case "jobType":
        sorted = sorted.sort((a, b) => a.jobType.localeCompare(b.jobType));
        break;
      case "status":
        sorted = sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }
    if (sortOrder === "asc") return sorted;
    return sorted.reverse();
  };

  const filteredAndSortedJobs = sortJobs(
    jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredAndSortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by company, position, or location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="company">Company</option>
            <option value="position">Position</option>
            <option value="jobType">Job Type</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <Link href="/jobs/add">
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center">
          <PlusCircle className="w-4 h-4 mr-1" /> Add Job
        </Button>
      </Link>
      <br></br>
      <div className="grid gap-6 md:grid-cols-4">
        {paginatedJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{job.position}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  job.status
                )}`}
              >
                {job.status}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Company:</span> {job.company}
              </p>
              <p>
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p>
                <span className="font-medium">Job Type:</span> {job.jobType}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
