import React from 'react';
import FormField from '../UI/FormField';

const ChangeMenu = ({ menuOptions, menu, updateMenu }) => {
	return (
		<div>
			<label style={{ display: 'block', padding: '7px 0' }} htmlFor="menu">
				Menu
			</label>
			<FormField
				type="dropdown"
				classes="dropdown"
				label="Select Menu"
				name="menu"
				value={menu}
				updateValue={updateMenu}
				options={Object.keys(menuOptions).map((menuItem) => ({
					label: menuItem,
					value: menuOptions[menuItem],
				}))}
			/>
		</div>
	);
};

export default ChangeMenu;
