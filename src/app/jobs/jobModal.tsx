"use client";

import { useState } from "react";
import { Job, JobType, JobStatus } from "../utility";

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
  onSave: (job: Job) => void;
  onDelete: (id: number) => void;
  isNew: boolean;
}

export default function JobModal({
  job,
  onClose,
  onSave,
  onDelete,
  isNew,
}: JobModalProps & { isNew?: boolean }) {
  if (!job) return null;

  const [isEditing, setIsEditing] = useState(isNew);
  const [formData, setFormData] = useState<Job>(job);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[3px] z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {!isEditing ? (
          <>
            <h2 className="text-xl font-bold mb-4">{job.position}</h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Company:</span> {job.company}
              </p>
              <p>
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p>
                <span className="font-medium">Job Type:</span> {job.jobType}
              </p>
              <p>
                <span className="font-medium">Status:</span> {job.status}
              </p>
              <p>
                <span className="font-medium">Date:</span> {job.date}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {job.description}
              </p>
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


            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(job.id)}
                className="px-3 py-1 text-sm border rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <div className="space-y-3 text-sm">
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
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                {Object.values(JobStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Application Link"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="w-full border rounded-lg px-3 py-2 h-24"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm border rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
