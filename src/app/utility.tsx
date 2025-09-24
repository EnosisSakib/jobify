export enum JobStatus {
  Pending = "Pending",
  Interview = "Interview",
  Declined = "Declined",
  Accepted = "Accepted",
}

export enum JobType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Internship = "Internship",
  Remote = "Remote",
}

export interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  jobType: JobType;
  status: JobStatus;
  date: string; // YYYY-MM-DD
  description: string;
  link: string;
}
