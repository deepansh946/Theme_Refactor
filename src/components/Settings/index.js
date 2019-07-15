import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';

import ChangeTheme from './ChangeTheme';
import ChangeMenu from './ChangeMenu';
import { validateRequireFields } from '../../Utils/formValidation';

// redux effects and actions
import { UPDATE_UI_SUCCESS } from '../../redux/constants/ui_constant';
import { add_global_message } from '../../redux/actions/ui_actions';
import { update_ui$ } from '../../redux/effects/ui_effects';

import './style.css';
import { bindActionCreators } from 'redux';
import ThemeContext from '../../context/themeContext';

const themeOptions = {
	blue: ['accent', 'light', 'dark'],
	'blue grey': ['accent', 'light', 'dark'],
	'light blue': ['accent ', 'light', 'dark'],
	indigo: ['accent', 'light', 'dark'],
	pink: ['accent', 'light', 'dark'],
	green: ['accent', 'light', 'dark'],
	'light green': ['accent', 'light', 'dark'],
	teal: ['accent', 'light', 'dark'],
	cyan: ['accent', 'light', 'dark'],
	lime: ['accent', 'light', 'dark'],
	amber: ['accent', 'light', 'dark'],
	orange: ['accent', 'light', 'dark'],
	'deep orange': ['accent', 'light', 'dark'],
	yellow: ['accent', 'light', 'dark'],
	purple: ['accent', 'light', 'dark'],
	'deep purple': ['accent', 'light', 'dark'],
	brown: ['accent', 'light', 'dark'],
};

const menuOptions = {
	Slim: 'slim',
	Static: 'static',
	Overlay: 'overlay',
};

class Settings extends Component {
	static contextType = ThemeContext;

	state = {
		theme: {
			name: this.context.state.theme.name,
			scheme: this.context.state.theme.scheme,
		},
		menu: this.context.state.layoutMode,
	};

	updateValue = (e) => {
		const formData = { ...this.state.formData };
		formData[e.target.name].value = e.target.value;
		// if !valid reset it
		if (!formData[e.target.name].valid) {
			formData[e.target.name].valid = true;
			formData[e.target.name].msg = '';
		}
		this.setState({
			formData,
		});
	};

	updateTheme = (e, key) => {
		this.setState({
			theme: {
				...this.state.theme,
				[key]: e.target.value,
			},
		});
		// update theme
		setTimeout(() => {
			const { theme, menu: layoutMode } = this.state;
			this.context.changeTheme(theme, layoutMode, key);
		}, 500);
	};

	updateMenu = (e) => {
		this.setState({
			menu: e.target.value,
		});
		// update theme
		setTimeout(() => {
			const { theme, menu: layoutMode } = this.state;
			this.context.changeTheme(theme, layoutMode, 'menu');
		}, 500);
	};

	updateUserUI = async () => {
		const payload = {
			action: 'updateThemeDetails',
			payload: {
				idToken: this.props.idToken,
				sessionId: this.props.sessionId,
				theme: this.state.theme,
				menu: this.state.menu,
			},
		};

		// send request to update user ui
		const response = await this.props.update_ui$({ ...payload });

		if (response.type === UPDATE_UI_SUCCESS) {
			const { theme, menu: layoutMode } = this.state;
			// success flash
			this.props.add_global_message({
				message: 'Your theme has been updated successfully.',
				messageType: 'success',
				flash: true,
			});
			// update theme
			this.context.changeTheme(theme, layoutMode);
		}
	};

	toggleViewPassword = (target) => {
		const formData = { ...this.state.formData };
		formData[target].viewPassword = !formData[target].viewPassword;
		this.setState({
			formData,
		});
	};

	resetPassword = (e) => {
		e.preventDefault();
		const updatedState = validateRequireFields(this.state.formData);

		this.setState({
			formData: updatedState,
		});
	};

	render() {
		return (
			<div className="p-grid">
				<div className="p-col-12">
					<div className="card">
						<ChangeTheme
							themeOptions={themeOptions}
							theme={this.context.state.theme}
							updateTheme={this.updateTheme}
						/>
						<br />
						<ChangeMenu
							menuOptions={menuOptions}
							menu={this.context.state.layoutMode}
							updateMenu={this.updateMenu}
						/>
						<br />
						<Button
							onClick={this.updateUserUI}
							label="Change"
							className="p-button-raised"
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UI,
		sessionId: state.AUTH.auth.sessionId,
		idToken: state.AUTH.auth.IdToken,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ add_global_message, update_ui$ }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings);
