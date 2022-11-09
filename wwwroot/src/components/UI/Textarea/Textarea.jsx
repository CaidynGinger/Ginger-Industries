import React from "react";

import styles from "./Textarea.module.scss";

// https://codepen.io/vescoyez/pen/wMyRLP

export const Textarea = (props) => {
  return (
    <div className={styles.form__group}>
      <textarea
        id={props.id}
        className={styles.form__field}
        placeholder={props.placeHolder}
        rows={props.rows}
        onChange={props.onChange}
        value={props.value}
        name={props.id}
      ></textarea>
      <label htmlFor={props.id} className={styles.form__label}>
        {props.placeHolder}
      </label>
    </div>
  );
};
