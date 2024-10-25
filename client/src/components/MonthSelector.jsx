import React from 'react';
import Select from 'react-select';

const monthOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
];

const MonthSelector = ({ selectedMonth, onChange }) => {
    return (
        <Select
            options={monthOptions}
            value={monthOptions.find(option => option.value === selectedMonth)}
            onChange={(option) => onChange(option.value)}
            placeholder="Select Month"
        />
    );
};

export default MonthSelector;
