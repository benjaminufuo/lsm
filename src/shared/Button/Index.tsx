import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = (props: ButtonProps) => {
  const {
    children,
    label,
    onClick,
    disabled,
    loading,
    variant = "primary",
    size = "medium",
    className,
    style,
    type = "button",
    fullWidth,
    icon,
    iconPosition = "left",
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const variantClasses: Record<string, string> = {
    primary:
      "bg-primary text-white hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed",
    outline:
      "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white disabled:opacity-60 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed",
  };

  const sizeClasses: Record<string, string> = {
    small: "px-4 py-2 text-xs h-8",
    medium: "px-5 py-2.5 text-sm h-10",
    large: "px-6 py-3 text-base h-12",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded font-medium cursor-pointer transition-all duration-150 ease-in-out focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2";

  const borderClasses = variant === "outline" ? "" : "border-none";

  const buttonClasses = [
    baseClasses,
    borderClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    loading && "cursor-wait",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
      {children || label}
      {icon && iconPosition === "right" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </>
  );

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClasses}
      style={style}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin"></span>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;
