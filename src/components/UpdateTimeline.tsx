import React from 'react';
import { format } from 'date-fns';
import { Update } from '../store/reportStore';

interface UpdateTimelineProps {
  updates: Update[];
}

const UpdateTimeline: React.FC<UpdateTimelineProps> = ({ updates }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {updates.map((update, idx) => (
          <li key={update.id}>
            <div className="relative pb-8">
              {idx !== updates.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                    <span className="text-sm font-medium text-indigo-600">
                      {update.author[0].toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">{update.message}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={update.timestamp}>
                      {format(new Date(update.timestamp), 'MMM d, yyyy HH:mm')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateTimeline;