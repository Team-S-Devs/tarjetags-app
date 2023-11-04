import { MenuItem, TextField } from "@mui/material";

const DropdownField = ({ 
  variant = "standard", 
  type = "text", 
  value, 
  name, 
  label, 
  setValue = () => {},
  placeholder = "", 
  helperText = "", 
  required = false, 
  disabled = false, 
  fullWidth = true,
  onFocus = () => {},
  onBlur = () => {}, 
  multiline = true, 
  autoComplete="off", 
  errorObject = {isError: false, errorMessage: ""},
  setErrorObject = () => {},
  validateMethod = () => {},
  options = [],
  defaultValue
}) => {
  /**
   * Sets the focus on the input field.
   */
  const handleFocus = () => {
    onFocus();
    const err = errorObject;
    err.isError = false;
    setErrorObject(err);
  };

  /**
   * Validates the input field's value and updates the error state if necessary.
   */
  const handleBlur = () => {
    onBlur();
    validateMethod();
  };

  return (
    <TextField 
      id={name}
      select
      defaultValue={defaultValue != undefined && defaultValue}
      variant={variant} 
      value={value} 
      name={name} 
      type={type}  
      label={label} 
      required={required} 
      helperText={errorObject.isError ? errorObject.errorMessage : helperText}
      placeholder={placeholder} 
      fullWidth={fullWidth}
      disabled={disabled}
      autoComplete={autoComplete}
      multiline={multiline}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(event) => setValue(event.target.value)}
      error={errorObject.isError}
    >
        {options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
  );
};

export default DropdownField;
