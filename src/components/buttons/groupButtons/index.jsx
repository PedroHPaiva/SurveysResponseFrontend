/* eslint-disable react/prop-types */
import { SelectButton } from 'primereact/selectbutton';
import './styles.css';

export function GroupButton({ options, value, setValue, disabled = false }) {
  return (
    <div className="groupButton flex justify-content-center">
      <div className="scrollable">
        <SelectButton
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.value)}
          options={options}
        />
      </div>
    </div>
  );
}
