"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { Job, JobType, JobStatus } from "../../../utility";

export default function EditJobPage() {
  const { id } = useParams();
  const jobId = Number(id);
  const router = useRouter();

  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", []);
  const [formData, setFormData] = useState<Job | null>(null);

  useEffect(() => {
    const found = jobs.find((j) => j.id === jobId);
    if (found) setFormData(found);
  }, [jobs, jobId]);

  if (!formData) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    if (!formData) return;

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? formData : j))
    );

    router.push(`/jobs/${jobId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          {Object.values(JobType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          {Object.values(JobStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg px-3 py-2 h-24"
        />

        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Application link"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push(`/jobs/${jobId}`)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
