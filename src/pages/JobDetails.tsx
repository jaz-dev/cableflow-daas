import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Download, FileText } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useJobStore } from '../stores/jobStore';

export const JobDetails = () => {
  const { projectId, jobId } = useParams();
  const navigate = useNavigate();
  const [isReviseModalOpen, setIsReviseModalOpen] = useState(false);
  const [revisionFile, setRevisionFile] = useState<File | null>(null);
  const [revisionInstructions, setRevisionInstructions] = useState('');
  
  const jobs = useJobStore((state) => state.jobs);
  const updateJob = useJobStore((state) => state.updateJob);
  const jobDetails = jobs.find(job => job.id === jobId);

  if (!jobDetails) {
    return <div>Job not found</div>;
  }

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionFile || !revisionInstructions) return;

    const newRevision = {
      id: `rev-${jobDetails.revisions.length + 1}`,
      file: revisionFile,
      instructions: revisionInstructions,
      timestamp: new Date().toISOString(),
    };

    updateJob(jobDetails.id, {
      status: 'In Progress',
      revision: String.fromCharCode(jobDetails.revision.charCodeAt(0) + 1),
      revisions: [...jobDetails.revisions, newRevision],
    });

    setIsReviseModalOpen(false);
    setRevisionFile(null);
    setRevisionInstructions('');
  };

  const handleDownloadDrawing = () => {
    const link = document.createElement('a');
    link.href = '/Example Drawing.pdf'; // Path to the PDF file
    link.download = 'Example Drawing.pdf'; // Default filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Job Details</h1>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job ID</label>
            <p className="mt-1 text-gray-900">{jobDetails.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Part Name</label>
            <p className="mt-1 text-gray-900">{jobDetails.partName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Revision</label>
            <p className="mt-1 text-gray-900">{jobDetails.revision}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
              jobDetails.status === 'Completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {jobDetails.status}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created</label>
            <p className="mt-1 text-gray-900">{jobDetails.created}</p>
          </div>
        </div>

        {jobDetails.typeformUrl && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Input Form</label>
            <a
              href={jobDetails.typeformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View Form Response
            </a>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revisions</h2>
          {jobDetails.revisions.length === 0 ? (
            <p className="text-gray-600">None.</p>
          ) : (
            <div className="space-y-4">
              {jobDetails.revisions.map((revision) => (
                <div key={revision.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{revision.file.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{revision.instructions}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(revision.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDownloadDrawing}
            disabled={jobDetails.status === 'In Progress'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5" />
            Download Drawing
          </button>
          <button
            onClick={() => setIsReviseModalOpen(true)}
            disabled={jobDetails.status === 'In Progress'}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Revise
          </button>
        </div>
      </div>

      <Dialog
        open={isReviseModalOpen}
        onClose={() => setIsReviseModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Submit Revision
            </Dialog.Title>

            <form onSubmit={handleRevisionSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Revision Document
                  </label>
                  <div className="relative group">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                    <div className="hidden group-hover:block absolute right-0 transform translate-x-1/4 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-sm rounded-lg">
                      Upload revised/redmarked docs
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  onChange={(e) => setRevisionFile(e.target.files?.[0] || null)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Instructions
                </label>
                <textarea
                  value={revisionInstructions}
                  onChange={(e) => setRevisionInstructions(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReviseModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};