"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Job, JobType, JobStatus } from "@/app/utility";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AddJobPage() {
  const router = useRouter();
  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", []);

  const [formData, setFormData] = useState<Job>({
    id: Date.now(),
    company: "",
    position: "",
    location: "",
    jobType: JobType.FullTime,
    status: JobStatus.Pending,
    date: new Date().toISOString().split("T")[0],
    description: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setJobs([...jobs, formData]);
    router.push("/jobs");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Job</h1>
      <div className="space-y-3">
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="w-full border rounded-lg px-3 py-2" />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="w-full border rounded-lg px-3 py-2" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border rounded-lg px-3 py-2" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        
        <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
          {Object.values(JobType).map((type) => <option key={type} value={type}>{type}</option>)}
        </select>

        <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
          {Object.values(JobStatus).map((status) => <option key={status} value={status}>{status}</option>)}
        </select>

        <input name="link" value={formData.link} onChange={handleChange} placeholder="Application Link" className="w-full border rounded-lg px-3 py-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" className="w-full border rounded-lg px-3 py-2 h-24" />

        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
      </div>
    </div>
  );
}
