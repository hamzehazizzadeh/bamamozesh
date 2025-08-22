import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Icon from "@/components/ui/Icon";

function Button({
  text,
  type = "button",
  isLoading,
  disabled,
  className = "bg-indigo-700 text-white",
  children,
  icon,
  loadingClass = "unset-classname",
  iconPosition = "left",
  iconClass = "text-[20px]",
  link,
  onClick,
  div,
  width,
  rotate,
  hFlip,
  vFlip,
}) {
  const loading = useSelector((state) => state.loading);

  const isLoader = isLoading || loading;

  return (
    <>
      {!link && !div && (
        <button
          type={type}
          onClick={onClick}
          className={`btn btn inline-flex justify-center ${
            isLoader ? " pointer-events-none" : ""
          }
          ${disabled ? " opacity-60 cursor-not-allowed" : ""}
          ${className}`}
        >
          {/* if has children and not loading*/}
          {children && !isLoader && children}

          {/* if no children and  loading*/}
          {!children && !isLoader && (
            <span className="flex items-center">
              {/* if has icon */}
              {icon && (
                <span
                  className={`${
                    iconPosition === "right" ? "order-1 ltr:ml-2 rtl:mr-2" : " "
                  } ${
                    text && iconPosition === "left" ? "ltr:mr-2 rtl:ml-2" : ""
                  } ${iconClass}`}
                >
                  <Icon
                    icon={icon}
                    width={width}
                    rotate={rotate}
                    hFlip={hFlip}
                    vFlip={vFlip}
                  />
                </span>
              )}
              <span>{text}</span>
            </span>
          )}

          {/* if loading*/}
          {isLoader && (
            <>
              <svg
                className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading ...
            </>
          )}
        </button>
      )}
      {!link && div && (
        <div
          onClick={onClick}
          className={`btn btn inline-flex justify-center   ${
            isLoader ? " pointer-events-none" : ""
          }
        ${disabled ? " opacity-60 cursor-not-allowed" : ""}
        ${className}`}
        >
          {/* if has children and not loading*/}
          {children && !isLoader && children}

          {/* if no children and  loading*/}
          {!children && !isLoader && (
            <span className="flex items-center">
              {/* if has icon */}
              {icon && (
                <span
                  className={`
          ${iconPosition === "right" ? "order-1 ltr:ml-2 rtl:mr-2" : " "}
          ${text && iconPosition === "left" ? "ltr:mr-2 rtl:ml-2" : ""}
          
          ${iconClass}
          
          `}
                >
                  <Icon icon={icon} />
                </span>
              )}
              <span>{text}</span>
            </span>
          )}

          {/* if loading*/}
          {isLoader && (
            <>
              <svg
                className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading ...
            </>
          )}
        </div>
      )}
      {link && !div && (
        <Link
          to={link}
          className={`btn btn inline-flex justify-center   ${
            isLoader ? " pointer-events-none" : ""
          }
        ${disabled ? " opacity-60 cursor-not-allowed" : ""}
        ${className}`}
        >
          {/* if has children and not loading*/}
          {children && !isLoader && children}

          {/* if no children and  loading*/}
          {!children && !isLoader && (
            <span className="flex items-center">
              {/* if has icon */}
              {icon && (
                <span
                  className={`
          ${iconPosition === "right" ? "order-1 ltr:ml-2 rtl:mr-2" : " "}
          ${text && iconPosition === "left" ? "ltr:mr-2 rtl:ml-2" : ""}
          
          ${iconClass}
          
          `}
                >
                  <Icon icon={icon} />
                </span>
              )}
              <span>{text}</span>
            </span>
          )}

          {/* if loading*/}
          {isLoader && (
            <>
              <svg
                className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              درحال بارگذاری ...
            </>
          )}
        </Link>
      )}
    </>
  );
}

export default Button;
