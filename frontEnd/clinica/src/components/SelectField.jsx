import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useController } from "react-hook-form";

const SelectField = ({
  name,
  control,
  label,
  options,
  isMulti = false,
  rules,
  placeholder = "Selecciona una opción...",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>
        {label}
      </label>
      <Select
        {...field}
        id={name}
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
        onChange={(val) =>
          field.onChange(isMulti ? val?.map((v) => v.value) : val?.value)
        }
        value={
          isMulti
            ? options.filter((opt) => field.value?.includes(opt.value))
            : options.find((opt) => opt.value === field.value) || null
        }
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isMulti: PropTypes.bool,
  rules: PropTypes.object,
  placeholder: PropTypes.string,
};

export default SelectField;
