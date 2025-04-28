/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';

export function SimpleInput({
  storageName = null,
  selectedOption,
  setSelectedOption,
  options,
  label = 'brand',
  placeholder = 'Selecione uma marca',
  defaultValue = null,
  disabled = false,
  background = null,
  setModification = null,
}) {
  useEffect(() => {
    const storedValue = localStorage.getItem(storageName);

    if (storedValue && storedValue !== undefined) {
      const parsedValue = JSON.parse(storedValue);
      setSelectedOption(parsedValue);
    } else {
      setSelectedOption(defaultValue ? defaultValue : null);
    }
  }, [storageName, setSelectedOption, defaultValue]);

  const handleSelectOption = (newValue) => {
    setSelectedOption(newValue);

    if (setModification) setModification(true);

    if (storageName) {
      localStorage.setItem(storageName, JSON.stringify(newValue));
    }
  };

  return (
    <div className="card w-full flex justify-content-center containerSimpleSelect">
      <Dropdown
        value={selectedOption}
        onChange={(e) => handleSelectOption(e.value)}
        options={options}
        disabled={disabled}
        optionLabel={label}
        optionValue="key"
        placeholder={placeholder}
        style={{ background: background ? background : 'transparent' }}
        className="simpleSelectContainer"
      />
    </div>
  );
}
