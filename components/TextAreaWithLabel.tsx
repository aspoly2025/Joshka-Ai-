
import React from 'react';

interface TextAreaWithLabelProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows: number;
    helperText?: string;
    warningText?: string;
    statusText?: string;
}

export const TextAreaWithLabel: React.FC<TextAreaWithLabelProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    rows,
    helperText,
    warningText,
    statusText,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-lg font-semibold text-gray-200 mb-3">
                {label}
            </label>
            <textarea
                id={id}
                rows={rows}
                className="w-full p-4 border border-gray-600 bg-gray-900 text-gray-100 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 text-base"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {helperText && (
                <p className="text-sm text-gray-400 mt-2">
                    <span className="font-bold text-yellow-300">نصيحة:</span> {helperText}
                </p>
            )}
            {warningText && (
                 <p className="text-sm text-gray-400 mt-2">
                    <span className="font-bold text-red-400">تحذير:</span> {warningText}
                </p>
            )}
            {statusText && (
                 <p className="text-xs text-green-400 mt-2 p-2 bg-gray-700/70 rounded-lg">
                    {statusText}
                </p>
            )}
        </div>
    );
};
