/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Calendar } from 'primereact/calendar';
import './styles.css';

function DatePickerComponent({ rangeDates, setRangeDates, buttonValue, disabled = false }) {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    if (rangeDates.startDate && rangeDates.endDate) {
      const startDate = momentTimezone.tz(moment(rangeDates.startDate).format('YYYY-MM-DD'), 'America/Sao_Paulo').toDate();

      const endDate = momentTimezone.tz(moment(rangeDates.endDate).format('YYYY-MM-DD'), 'America/Sao_Paulo').toDate();

      setDates([startDate, endDate]);
    }
  }, [rangeDates, setRangeDates]);

  const newDates = (value) => {
    setDates(value);

    if (value[0] !== null && value[1] !== null) {
      const startDate = moment(value[0]).format('YYYY-MM-DD');
      const endDate = moment(value[1]).format('YYYY-MM-DD');

      setRangeDates({ startDate, endDate });
    }
  };

  return (
    <div className="card flex align-items-center datePickerContainer">
      <i className="pi pi-calendar"></i>
      <Calendar
        value={dates}
        disabled={buttonValue !== 'Personalizado' || disabled === true ? true : false}
        onChange={(e) => newDates(e.value)}
        selectionMode="range"
        readOnlyInput
        hideOnRangeSelection
        dateFormat="dd/mm/yy"
        monthNavigator
        yearNavigator
        yearRange={`2015:${moment(new Date()).format('YYYY')}`}
      />
    </div>
  );
}

export const DatePicker = memo(DatePickerComponent);
