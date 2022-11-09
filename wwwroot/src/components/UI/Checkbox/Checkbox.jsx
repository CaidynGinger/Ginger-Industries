import React from "react";

import styles from './Checkbox.module.scss'

export const Checkbox = (props) => {
  return (
    <label className={styles.pure_material_checkbox}>
      <input name={props.name} onChange={props.onChange} checked={props.checked} type="checkbox" />
      <span>{props.title}</span>
    </label>
  );
};
