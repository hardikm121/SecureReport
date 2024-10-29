import React, { useCallback } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { Evidence } from '../store/reportStore';
import toast from 'react-hot-toast';

interface EvidenceUploaderProps {
  evidence: Evidence[];
  onUpload: (evidence: Evidence) => void;
  onRemove: (id: string) => void;
}

const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  evidence,
  onUpload,
  onRemove,
}) => {
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload an image, video, or PDF');
      return;
    }

    try {
      // Simulate file upload
      const newEvidence: Evidence = {
        id: Math.random().toString(36).substring(7),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url: URL.createObjectURL(file),
      };

      onUpload(newEvidence);
      toast.success('Evidence uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
    }
  }, [onUpload]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Evidence Upload
      </label>
      <div className="space-y-2">
        {evidence.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <Upload className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{file.name}</span>
              <span className="ml-2 text-xs text-gray-500">({file.size})</span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              Images, videos, or documents (max. 5MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*,.pdf"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default EvidenceUploader;