import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DateRangePicker({ dateRange, onChange }) {
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selected={startDate}
        onChange={(date) => onChange([date, endDate])}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="bg-gray-700 text-white rounded-lg px-4 py-2"
      />
      <span className="text-white">to</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => onChange([startDate, date])}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        className="bg-gray-700 text-white rounded-lg px-4 py-2"
      />
    </div>
  );
}