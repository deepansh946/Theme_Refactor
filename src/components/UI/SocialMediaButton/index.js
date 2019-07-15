import React from 'react';
import { Button } from 'primereact/button';
import './style.css';

const SocialMediaButton = ({ type, label }) => {
	let button = null;

	switch (type) {
		case 'facebook': {
			button = (
				<Button
					className="social-facebook"
					label={label}
					icon="fa fa-facebook"
				/>
			);
			break;
		}
		case 'google': {
			button = (
				<Button className="social-google" label={label} icon="fa fa-google" />
			);
			break;
		}
		case 'amazon': {
			button = (
				<Button className="social-amazon" label={label} icon="fa fa-amazon" />
			);
			break;
		}
		default:
			button = null;
			break;
	}
	return button;
};

export default React.memo(SocialMediaButton);
