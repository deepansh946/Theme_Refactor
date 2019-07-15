import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { request_logout$ } from '../../redux/effects/auth_effects';
import { REQUEST_LOGOUT_SUCCESS } from '../../redux/constants/auth_constant';

class AppInlineProfile extends PureComponent {
	constructor() {
		super();
		this.state = {
			expanded: false,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		this.setState({ expanded: !this.state.expanded });
		event.preventDefault();
	}

	onLogOut = async () => {
		try {
			const auth = JSON.parse(localStorage.getItem('auth'));

			const idToken = auth.IdToken;
			const sessionId = auth.sessionId;

			const res = await this.props.request_logout$({
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
				action: 'signOut',
				payload: {
					sessionId: sessionId,
				},
			});

			if (res.type === REQUEST_LOGOUT_SUCCESS) {
				const deviceData = localStorage.getItem('deviceData') || undefined;
				localStorage.clear();
				if (deviceData) localStorage['deviceData'] = deviceData;
				// this.props.history.push('/login');
				window.location.reload();
			}
		} catch (error) {
			const res = error.response;
			console.log(res);

			if (res.type === REQUEST_LOGOUT_SUCCESS) {
				const deviceData = localStorage.getItem('deviceData') || undefined;
				localStorage.clear();
				if (deviceData) localStorage['deviceData'] = deviceData;
				// this.props.history.push('/login');
				window.location.reload();
			}
		}
	};

	render() {
		const { expanded } = this.state;

		return (
			<div
				className={classNames('layout-profile', {
					'layout-profile-active': expanded,
				})}
			>
				<button className="layout-profile-button p-link" onClick={this.onClick}>
					<img src="assets/layout/images/avatar.png" alt="babylon-layout" />
					<div className="layout-profile-userinfo">
						<span className="layout-profile-name">Arlene Welch</span>
						<span className="layout-profile-role">Design Ops</span>
					</div>
					<i className="layout-profile-icon pi pi-angle-down" />
				</button>

				<ul className="layout-profile-menu">
					<li role="menuitem">
						<button
							onClick={() => this.props.history.push('/profile')}
							className="p-link"
							tabIndex={expanded ? null : '-1'}
						>
							<i className="pi pi-user" />
							<span>Profile</span>
						</button>
					</li>
					<li role="menuitem">
						<button
							onClick={() => this.props.history.push('/settings')}
							className="p-link"
							tabIndex={expanded ? null : '-1'}
						>
							<i className="pi pi-cog" />
							<span>Settings</span>
						</button>
					</li>
					<li role="menuitem">
						<button
							className="p-link"
							tabIndex={expanded ? null : '-1'}
							onClick={() => this.props.history.push('/sessions')}
						>
							<i className="fa fa-laptop" />
							<span>Sessions</span>
						</button>
					</li>
					<li role="menuitem">
						<button
							className="p-link"
							tabIndex={expanded ? null : '-1'}
							onClick={() => this.props.history.push('/user-history')}
						>
							<i className="pi pi-clock" />
							<span>User History</span>
						</button>
					</li>

					<li role="menuitem">
						<button
							className="p-link"
							tabIndex={expanded ? null : '-1'}
							onClick={this.onLogOut}
						>
							<i className="pi pi-sign-out" />
							<span>Sign Out</span>
						</button>
					</li>
				</ul>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		...state.AUTH,
	};
};

const mapActionsToProps = (dispatch) =>
	bindActionCreators({ request_logout$ }, dispatch);

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(withRouter(AppInlineProfile));
