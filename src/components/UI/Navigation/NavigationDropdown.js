import React from "react";
import NavigationItem from "./NavigationItem";

const NavigationDropdown = ({ styleClass, items }) => {
  return (
    <ul className={styleClass}>
      {items.map((item, index) => (
        <NavigationItem {...item} key={index} />
      ))}
    </ul>
  );
};

export default NavigationDropdown;
