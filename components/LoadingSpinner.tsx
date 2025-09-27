
import React from 'react';

export const LoadingSpinner: React.FC = () => (
    <div className="flex items-center space-x-2" style={{marginLeft: 'auto'}}>
        <span className="text-sm text-yellow-300">جاري المعالجة...</span>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-300"></div>
    </div>
);
