import { TextField } from "@mui/material";

/**
 * @description A customizable text field component using Material-UI TextField.
 *
 * @param {Object} props - The properties to customize the FieldText component.
 * @param {string} props.variant - The variant of the TextField component (e.g., "standard", "outlined", "filled").
 * @param {string} props.type - The type of the input element (e.g., "text", "password").
 * @param {string} props.value - The value of the input field.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} props.label - The label displayed above the input field.
 * @param {Function} props.setValue - A function to update the value of the input field.
 * @param {string} props.placeholder - The placeholder text inside the input field.
 * @param {string} props.helperText - The helper text displayed below the input field.
 * @param {boolean} props.required - Specifies if the input field is required.
 * @param {boolean} props.disabled - Specifies if the input field is disabled.
 * @param {boolean} props.fullWidth - Specifies if the input field should take full width.
 * @param {Function} props.onFocus - A function to be executed when the input field gains focus.
 * @param {Function} props.onBlur - A function to be executed when the input field loses focus.
 * @param {boolean} props.multiline - Specifies if the input field is multiline.
 * @param {string} props.autoComplete - Specifies autocomplete behavior for the input field.
 * @param {boolean} props.error - A boolean containing error state.
 * @param {string} props.errorMessage - A string containing error message.
 * @param {Function} props.setError - A function to update the error state.
 * @param {Function} props.validateMethod - A function to validate the input field's value.
 * @returns {JSX.Element} Returns a JSX element representing the FieldText component.
 */
const FieldText = ({ 
  variant = "standard", 
  type = "text", 
  value, 
  name, 
  label, 
  setValue = () => {},
  placeholder = "", 
  helperText = " ", 
  required = false, 
  disabled = false, 
  fullWidth = true,
  onFocus = () => {},
  onBlur = () => {}, 
  multiline = true,
  readOnly = false, 
  autoComplete="off", 
  error = false,
  errorMessage = "",
  setError = () => {},
  validateMethod = () => {},
}) => {
  /**
   * Sets the focus on the input field.
   */
  const handleFocus = () => {
    onFocus();
    setError(false);
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
      style={{ marginTop: 12 }}
      id={name}
      variant={variant} 
      value={value} 
      name={name} 
      type={type}  
      label={label} 
      required={required} 
      helperText={error ? errorMessage : helperText}
      placeholder={placeholder} 
      fullWidth={fullWidth}
      disabled={disabled}
      autoComplete={autoComplete}
      multiline={multiline}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(event) => setValue(event.target.value)}
      error={error}
      inputProps={
        { readOnly: readOnly }
      }
    />
  );
};

export default FieldText;
