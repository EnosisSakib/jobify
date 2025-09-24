"use client";

import { useParams, useRouter } from "next/navigation";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Job } from "../../utility";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const jobId = Number(id);

  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", []);

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-bold">Job not found</h1>
        <button
          onClick={() => router.push("/jobs")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    setJobs(jobs.filter((j) => j.id !== jobId));
    router.push("/jobs");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.push("/jobs")}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
         Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{job.position}</h1>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><span className="font-medium">Company:</span> {job.company}</p>
        <p><span className="font-medium">Location:</span> {job.location}</p>
        <p><span className="font-medium">Job Type:</span> {job.jobType}</p>
        <p><span className="font-medium">Status:</span> {job.status}</p>
        <p><span className="font-medium">Date:</span> {job.date}</p>
        <p><span className="font-medium">Description:</span> {job.description}</p>
        <p>
          <span className="font-medium">Link:</span>{" "}
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {job.link}
          </a>
        </p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => router.push(`/jobs/${job.id}/edit`)}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm border rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
