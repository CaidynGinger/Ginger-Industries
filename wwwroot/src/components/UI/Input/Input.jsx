import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.scss";

export const Input = React.forwardRef(
  (
    {
      type,
      id,
      label,
      required,
      onBlur,
      onChange,
      value,
      aria_describedby,
      invalid,
      onFocus,
      valid,
      focusState,
      showHidePasswordHandler,
      showHidePassword,
      ShowHide,
    },
    ref
  ) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    const handleShowPassword = () => {
      showHidePasswordHandler((prevState) => !prevState);
    };

    return (
      <div className={classes.group}>
        <input
          type={type}
          id={id}
          value={value}
          ref={inputRef}
          required={required}
          onBlur={onBlur}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={aria_describedby}
          onFocus={onFocus}
        />
        <span className={classes.highlight}></span>
        <span className={classes.bar}></span>
        <div className={classes.icon_container}>
          {ShowHide && (
            <span
              onClick={handleShowPassword}
              className={`${classes.icon} ${classes.icon_password}`}
            >
              {showHidePassword && <ion-icon name="eye-off-outline"></ion-icon>}
              {!showHidePassword && <ion-icon name="eye-outline"></ion-icon>}
            </span>
          )}
          {value && valid && (
            <span className={`${classes.icon} ${classes.true}`}>
              {" "}
              <ion-icon name="checkmark-done-outline"></ion-icon>
            </span>
          )}

          {value && !valid && (
            <span className={`${classes.icon} ${classes.false}`}>
              {" "}
              <ion-icon name="close-outline"></ion-icon>
            </span>
          )}
        </div>

        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
);
