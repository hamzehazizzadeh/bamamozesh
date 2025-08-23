import { useState } from "react";
import { useSelector } from "react-redux";

import Icon from "@/components/ui/Icon";
import Cleave from "cleave.js/react";

import "cleave.js/dist/addons/cleave-phone.us";

const InputGroup = ({
  type,
  label,
  placeholder,
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
  isMask,
  description,
  hasicon,
  onChange,
  merged,
  append,
  prepend,
  options,
  onFocus,
  ...rest
}) => {
  const loading = useSelector((state) => state.loading);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

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
            <div className="input-group-text  h-full prepend-slot">
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
            {name && !isMask && (
              <input
                type={type === "password" && open ? "text" : type}
                {...register(name)}
                {...rest}
                className={`${
                  error ? " is-error" : ""
                } input-group-control block w-full focus:outline-none py-[10px] ${className}`}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={isDisabled}
                id={id}
                onChange={(e) => {
                  register(name).onChange(e);
                  onChange && onChange(e);
                }}
                onBlur={(e) => {
                  register(name).onBlur(e);
                  rest?.onBlur && rest.onBlur(e);
                }}
              />
            )}
            {!name && !isMask && (
              <input
                type={type === "password" && open === true ? "text" : type}
                className={`input-group-control block w-full focus:outline-none py-[10px] ${className}`}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={isDisabled}
                onChange={onChange}
                id={id}
              />
            )}

            {name && isMask && (
              <Cleave
                {...register(name)}
                {...rest}
                placeholder={placeholder}
                options={options}
                className={`${
                  error ? " is-error" : ""
                } input-group-control w-full py-[10px] ${className}`}
                id={id}
                readOnly={readonly}
                disabled={isDisabled}
                onChange={(e) => {
                  register(name).onChange(e);
                  onChange && onChange(e);
                }}
                onBlur={(e) => {
                  register(name).onBlur(e);
                  rest?.onBlur && rest.onBlur(e);
                }}
              />
            )}
            {!name && isMask && (
              <Cleave
                placeholder={placeholder}
                options={options}
                className={`${
                  error ? " is-error" : " "
                } input-group-control w-full py-[10px] ${className}  `}
                onFocus={onFocus}
                id={id}
                readOnly={readonly}
                disabled={isDisabled}
                onChange={onChange}
              />
            )}
            {/* icon */}
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
              {hasicon && (
                <span
                  className="cursor-pointer text-gray-400"
                  onClick={handleOpen}
                >
                  {open && type === "password" && (
                    <Icon icon="heroicons-outline:eye" />
                  )}
                  {!open && type === "password" && (
                    <Icon icon="heroicons-outline:eye-off" />
                  )}
                </span>
              )}

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
            <div className="input-group-text  h-full append-slot">{append}</div>
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

export default InputGroup;
