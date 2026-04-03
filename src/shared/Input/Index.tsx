import { useState } from "react";
import type { FC } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
  label?: string;
  required?: boolean;
  labelStyles?: React.CSSProperties;
  error?: string;
  type?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  onChangeText?: (value: string) => void;
  isPassword?: boolean;
  extraLabel?: React.ReactNode;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Input: FC<InputProps> = ({
  label,
  required,
  labelStyles,
  error,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  autoComplete,
  autoFocus,
  onFocus,
  onBlur,
  onKeyDown,
  className = "",
  style,
  onChangeText,
  isPassword = false,
  extraLabel,
  icon,
  size = "medium",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly && onChange) {
      onChange(event);
      onChangeText?.(event.target.value);
    }
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const sizeClasses = {
    small: "px-[12px] py-[10px] text-sm",
    medium: "px-[17px] py-[14px] text-sm",
    large: "px-[20px] py-[16px] text-base",
  };

  const inputBaseStyles = `
    w-full ${sizeClasses[size]}
    bg-gray-50 
    border border-[#98a2b3] rounded-[15px]
    font-normal text-[#011a2a]
    transition-all duration-200 ease-in-out
    placeholder:text-[#727a86] placeholder:font-normal
    hover:border-[#667085] hover:bg-white
    focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10
    disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed
    disabled:placeholder:text-gray-400
    disabled:hover:border-gray-300 disabled:hover:bg-gray-100
    read-only:bg-gray-50 read-only:cursor-default
  `;

  const errorInputStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
    : "";

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`} style={style}>
      {/* Label Container */}
      <div className="flex items-center justify-between">
        {label && (
          <label
            className={`text-sm font-medium text-[#727a86] cursor-pointer ${
              required
                ? "after:content-['*'] after:text-red-500 after:ml-1"
                : ""
            }`}
            style={labelStyles}
          >
            {label}
          </label>
        )}
        {extraLabel && extraLabel}
      </div>

      {/* Input with Password Toggle or Icon */}
      {isPassword ? (
        <div className="relative w-full">
          <input
            name={name}
            type={showPassword ? "text" : "password"}
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            readOnly={readOnly}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={`${inputBaseStyles} ${errorInputStyles} ${icon ? "pl-10 pr-12" : "pr-12"}`}
          />
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-gray-800 cursor-pointer hover:text-gray-600 transition-colors flex items-center justify-center p-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <FaRegEyeSlash className="w-5 h-5" />
            ) : (
              <FaRegEye className="w-5 h-5" />
            )}
          </button>
        </div>
      ) : icon ? (
        <div className="relative w-full">
          <input
            name={name}
            type={type}
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            readOnly={readOnly}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={`${inputBaseStyles} ${errorInputStyles} pl-10`}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        </div>
      ) : (
        <input
          name={name}
          type={type}
          value={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className={`${inputBaseStyles} ${errorInputStyles}`}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="text-xs text-red-500 mt-1 font-normal">{error}</div>
      )}
    </div>
  );
};

export default Input;
