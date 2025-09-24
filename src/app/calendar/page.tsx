"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Job } from "@/app/utility"; 

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const jobsStr = localStorage.getItem("jobs");
    if (!jobsStr) return;

    const jobs: Job[] = JSON.parse(jobsStr);

    const formatted = jobs.flatMap((job) => {
      const events = [];

      if (job.date) {
        events.push({
          title: `${job.position}`,
          start: new Date(job.date),
          end: new Date(job.date),
          allDay: true,
          jobId: job.id,
          // type: "applied",
        });
      }

      if (job.date) {
        events.push({
          title: `Interview: ${job.company}`,
          start: new Date(job.date),
          end: new Date(job.date),
          jobId: job.id,
          type: "interview",
        });
      }

      return events;
    });

    setEvents(formatted);
  }, []);

  const handleSelectEvent = (event: any) => {
    router.push(`/jobs/${event.jobId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
