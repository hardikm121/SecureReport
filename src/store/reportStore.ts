import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

export interface Report {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  date: string;
  time: string;
  status: 'pending' | 'under_investigation' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  reference: string;
  evidence: Evidence[];
  witnesses: string;
  suspectDescription: string;
  propertyDamage: boolean;
  damageValue: string;
  anonymous: boolean;
  emergencyResponse: boolean;
  assignedOfficer?: string;
  updates: Update[];
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  type: 'image' | 'video' | 'document';
  name: string;
  size: string;
  url: string;
}

export interface Update {
  id: string;
  message: string;
  timestamp: string;
  author: string;
}

interface ReportState {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt' | 'updates'>) => Promise<Report>;
  updateReport: (id: string, update: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => Report | undefined;
  addUpdate: (reportId: string, message: string, author: string) => void;
  addEvidence: (reportId: string, evidence: Evidence) => void;
  removeEvidence: (reportId: string, evidenceId: string) => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      reports: [],

      addReport: async (reportData) => {
        const newReport: Report = {
          id: Math.random().toString(36).substr(2, 9),
          reference: `REF-${format(new Date(), 'yyyyMMdd')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
          status: 'pending',
          updates: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...reportData,
        };

        set((state) => ({
          reports: [...state.reports, newReport],
        }));

        return newReport;
      },

      updateReport: (id, update) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? { ...report, ...update, updatedAt: new Date().toISOString() }
              : report
          ),
        }));
      },

      deleteReport: (id) => {
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        }));
      },

      getReport: (id) => {
        return get().reports.find((report) => report.id === id);
      },

      addUpdate: (reportId, message, author) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  updates: [
                    ...report.updates,
                    {
                      id: Math.random().toString(36).substr(2, 9),
                      message,
                      timestamp: new Date().toISOString(),
                      author,
                    },
                  ],
                  updatedAt: new Date().toISOString(),
                }
              : report
          ),
        }));
      },

      addEvidence: (reportId, evidence) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  evidence: [...report.evidence, evidence],
                  updatedAt: new Date().toISOString(),
                }
              : report
          ),
        }));
      },

      removeEvidence: (reportId, evidenceId) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  evidence: report.evidence.filter((e) => e.id !== evidenceId),
                  updatedAt: new Date().toISOString(),
                }
              : report
          ),
        }));
      },
    }),
    {
      name: 'report-storage',
    }
  )
);