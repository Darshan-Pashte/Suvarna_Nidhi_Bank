// import { useState } from 'react';
// import React from "react";
// import './ToggleButton.module.css'

// // Filename: ./components/ToggleSwitch.js
 
// const ToggleSwitch = ({ label }) => {
//   return (
//     <div className="container">
//       {label}{" "}
//       <div className="toggle-switch">
//         <input type="checkbox" className="checkbox"
//                name={label} id={label} />
//         <label className="label" htmlFor={label}>
//           <span className="inner" />
//           <span className="switch" />
//         </label>
//       </div>
//     </div>
//   );
// };
 
// export default ToggleSwitch;

// Filename: ./components/ToggleSwitch.js

import React from "react";
import classes from "./ToggleButton.module.css";

const ToggleSwitch = ({ label,checked, onChange, }) => {
return (
	<div className={classes.container}>
	{label}{" "}
	<div className={classes.toggle_switch}>
		<input type="checkbox" className={classes.checkbox}
			name={label} id={label}
			checked={checked}
			onChange={onChange} />
		<label className={classes.label} htmlFor={label}>
		<span className={classes.inner} />
		<span className={classes.switch} />
		</label>
	</div>
	</div>
);
};

export default ToggleSwitch;
