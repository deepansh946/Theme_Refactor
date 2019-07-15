import React from 'react';
import FormField from '../UI/FormField';
import { camelCase } from '../util';

const ChangeTheme = ({ themeOptions, theme, updateTheme }) => {
	return (
		<div className="theme-card">
			<label style={{ display: 'block', padding: '7px 0' }} htmlFor="theme">
				Theme
			</label>
			<FormField
				type="dropdown"
				classes="dropdown"
				label="Select Theme"
				name="theme"
				value={theme.name}
				updateValue={(e) => updateTheme(e, 'name')}
				options={Object.keys(themeOptions).map((theme) => ({
					label: camelCase(theme),
					value: theme,
				}))}
			/>

			<FormField
				type="dropdown"
				classes="dropdown"
				label="Select color scheme"
				name="scheme"
				value={theme.scheme}
				updateValue={(e) => updateTheme(e, 'scheme')}
				options={[
					{
						label: 'Accent',
						value: 'accent',
					},
					{
						label: 'Light',
						value: 'light',
					},
					{
						label: 'Dark',
						value: 'dark',
					},
				]}
			/>
		</div>
	);
};

export default ChangeTheme;
