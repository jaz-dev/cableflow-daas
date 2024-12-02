import { create } from 'zustand';

export interface Job {
  id: string;
  partName: string;
  revision: string;
  status: 'Completed' | 'In Progress';
  created: string;
  typeformUrl?: string;
  revisions: Array<{
    id: string;
    file: File;
    instructions: string;
    timestamp: string;
  }>;
}

interface JobStore {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
}

// Generate sample jobs
const sampleJobs: Job[] = Array.from({ length: 100 }, (_, i) => ({
  id: `JOB-${String(i + 1).padStart(4, '0')}`,
  partName: `CBL-${Math.floor(10000 + Math.random() * 90000)}`,
  revision: String.fromCharCode(65 + Math.floor(Math.random() * 3)),
  status: ['Completed', 'In Progress'][Math.floor(Math.random() * 2)] as Job['status'],
  created: new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28))
    .toLocaleDateString('en-US'),
  typeformUrl: 'https://example.typeform.com/response/abc123',
  revisions: [],
}));

export const useJobStore = create<JobStore>((set) => ({
  jobs: sampleJobs,
  setJobs: (jobs) => set({ jobs }),
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),
}));