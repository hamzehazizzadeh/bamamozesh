import { Fragment } from "react";
import { useSelector } from "react-redux";

import Icon from "@/components/ui/Icon";

const SelectGroup = ({
  label,
  placeholder = "Select Option",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  description,
  onChange,
  options = [],
  defaultValue,
  size,
  multiple,
  children,
  merged,
  append,
  prepend,
  onFocus,
  ...rest
}) => {
  const loading = useSelector((state) => state.loading);

  const isDisabled = disabled || loading;

  return (
    <div className={`${horizontal ? "flex" : ""} ${merged ? "merged" : ""}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize ${classLabel}${
            horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-stretch inputGroup ${
          append ? "has-append" : ""
        } ${prepend ? "has-prepend" : ""} ${error ? "is-invalid" : ""}  ${
          validate ? "is-valid" : ""
        } ${horizontal ? "flex-1" : ""}`}
      >
        {/* prepend*/}
        {prepend && (
          <span className="flex-none input-group-addon">
            <div className="input-group-text h-full prepend-slot">
              {prepend}
            </div>
          </span>
        )}
        <div className="flex-1">
          <div
            className={`relative textfiled-wrapper2 ${
              error ? "is-error" : ""
            } ${validate ? "is-valid" : ""}`}
          >
            {name && (
              <select
                onChange={onChange}
                onFocus={onFocus}
                {...register(name)}
                {...rest}
                multiple={multiple}
                className={`${
                  error ? " is-error" : " "
                } input-group-control block w-full focus:outline-none py-[10px] appearance-none ${className}`}
                readOnly={readonly}
                disabled={isDisabled}
                id={id}
                value={value}
                size={size}
                defaultValue={defaultValue}
              >
                {children ? (
                  children
                ) : (
                  <Fragment>
                    <option value="" disabled selected hidden>
                      {placeholder}
                    </option>
                    {options.map((option, i) => (
                      <Fragment key={i}>
                        {option.value && option.label ? (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ) : (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                )}
              </select>
            )}
            {!name && (
              <select
                onChange={onChange}
                onFocus={onFocus}
                multiple={multiple}
                className={`${
                  error ? " is-error" : " "
                } input-group-control block w-full focus:outline-none py-[10px] appearance-none ${className}`}
                readOnly={readonly}
                disabled={isDisabled}
                id={id}
                value={value}
                size={size}
                defaultValue={defaultValue}
              >
                {children ? (
                  children
                ) : (
                  <Fragment>
                    <option value="" disabled>
                      {placeholder}
                    </option>
                    {options.map((option, i) => (
                      <Fragment key={i}>
                        {option.value && option.label ? (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ) : (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                )}
              </select>
            )}

            {/* icon */}
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2 space-x-1 rtl:space-x-reverse">
              <span className="relative -right-2 inline-block text-gray-900 dark:text-gray-300 pointer-events-none">
                <Icon icon="heroicons:chevron-down" />
              </span>
              {error && (
                <span className="text-red-500">
                  <Icon icon="ph:info-fill" />
                </span>
              )}
              {validate && (
                <span className="text-green-500">
                  <Icon icon="ph:check-circle-fill" />
                </span>
              )}
            </div>
          </div>
        </div>
        {/* append*/}
        {append && (
          <span className="flex-none input-group-addon right">
            <div className="input-group-text h-full append-slot">{append}</div>
          </span>
        )}
      </div>
      {/* error and success message*/}
      {error && (
        <div className="mt-2 text-red-500 block text-sm text-right">{error.message}</div>
      )}
      {/* validated and success message*/}
      {validate && (
        <div className="mt-2 text-green-500 block text-sm">{validate}</div>
      )}
      {/* only description */}
      {description && <span className="input-help">{description}</span>}
    </div>
  );
};

export default SelectGroup;
