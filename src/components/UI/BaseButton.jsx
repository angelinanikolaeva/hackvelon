import React from "react";
import styles from "./BaseButton.module.scss";

function BaseButton(props) {
  return (
    <button {...props} className={props.className ? props.className : styles.button}>
      {props.children}
    </button>
  );
}

export default BaseButton;
