import React, { PureComponent } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';

import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import AppTopbar from './AppTopbar';
import AppBreadcrumb from './AppBreadcrumb';
import AppMenu from './AppMenu';
import AppInlineProfile from './AppInlineProfile';
import AppFooter from './AppFooter';

// UI Components
import Logo from '../../components/UI/Logo';
import Loader from '../../components/UI/Loader';
import Dashboard from '../../components/UI/Dashboard';

// Main components
import SentItems from '../SentItems';
import Loans from '../../components/Loans';
import Feedback from '../Feedback';
import ContactUs from '../ContactUs';
import ContactUsHistory from '../ContactUsHistory';
import Profile from '../Profile';
import Settings from '../../components/Settings';
import SampleTableContainer from '../SampleTableContainer';
import Inbox from '../Inbox';
import PasswordPolicy from '../PasswordPolicy';
import Sessions from '../Sessions';
import EquicomForm from '../EquicomForm/containers/ApplicationFormContainer';
import UserHistory from '../UserHistory';

//Actions
import {
	request_refresh_session$,
	request_logout$,
} from '../../redux/effects/auth_effects';
import { get_user_ui$ } from '../../redux/effects/user_effects';
import { add_global_message } from '../../redux/actions/ui_actions';
import { request_logout_success } from '../../redux/actions/auth_actions';

import {
	DASHBOARD_ICON,
	FEEDBACK_ICON,
	CONTACT_US_HISTORY_ICON,
	CONTACT_US_ICON,
	INBOX_ICON,
	SENT_ITEMS_ICON,
	HISTORY_ICON,
	EQUICOM_ICON,
} from '../../Utils/icons';
import ErrorPage from '../../components/ErrorPage';
import {
	REQUEST_REFRESH_SESSION_SUCCESS,
	REQUEST_LOGOUT_SUCCESS,
} from '../../redux/constants/auth_constant';
import { GET_USER_INFO_SUCCESS } from '../../redux/constants/user_constant';

import ThemeContext from '../../context/themeContext';
import { removeSpaces } from '../../Utils/common';

let refreshSessionId = null;

class Main extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			theme: {
				name: 'blue',
				scheme: 'accent',
			},
			layoutMode: 'static',
			overlayMenuActive: false,
			staticMenuDesktopInactive: false,
			staticMenuMobileActive: false,
			topbarMenuActive: false,
			activeTopbarItem: null,
			darkMenu: true,
			menuActive: false,
			profileMode: 'inline',
			grouped: true,
		};
		this.createMenu();

		console.log(`Refresh Session Id ==> ${refreshSessionId}`);
		clearInterval(refreshSessionId);

		const auth = this.props.auth;
		if (this.props.loggedIn && auth && auth.IdToken) {
			const idToken = auth.IdToken;
			const rememberMe = auth.rememberMe;

			const refreshToken = auth.RefreshToken;
			const sessionId = auth.sessionId;
			const sessionEndTime = auth.sessionEndTime;

			let refreshTime = moment(new Date(sessionEndTime))
				.subtract({ minutes: 2 })
				.format('YYYY-MM-DD HH:mm');

			refreshTime =
				refreshTime !== 'Invalid date'
					? refreshTime
					: moment(new Date())
							.subtract({ minutes: 30, hours: 5 })
							.format('YYYY-MM-DD HH:mm');

			const currentTime = moment(new Date())
				.subtract({ minutes: 30, hours: 5 })
				.format('YYYY-MM-DD HH:mm');

			console.log(refreshTime, currentTime, 'constructor');
			// debugger;

			if (currentTime >= refreshTime) {
				if (rememberMe) {
					console.log('Session refresh start constructor');

					(async () => {
						let tmpPayload = {
							refreshToken,
							sessionId,
							rememberMe,
						};

						const { deviceData, username } = this.props;

						const userDeviceData = deviceData[username] || {};

						console.log(userDeviceData);

						if (Object.keys(userDeviceData).length > 0) {
							tmpPayload = {
								...tmpPayload,
								deviceId: userDeviceData.deviceId,
								deviceSecret: userDeviceData.deviceSecret,
							};
						}

						const res = await this.props.request_refresh_session$({
							headers: {
								Authorization: `Bearer ${idToken}`,
							},
							action: 'refreshSession',
							payload: {
								...tmpPayload,
							},
						});

						if (res.type === REQUEST_REFRESH_SESSION_SUCCESS) {
							console.log(res.payload);

							const { challenge = undefined } = res.payload;

							// Getting only one challenge code i.e 159
							if (challenge === 159) {
								this.props.add_global_message({
									flash: true,
									message: 'Please verify your MFA.',
									messageType: 'success',
								});
								this.props.history.push('/verify-mfa');
							}
						}
					})();
				} else {
					(async () => {
						await this.onLogout();
						this.props.request_logout_success();
						window.location.reload();
					})();
					// this.props.history.push('/login');
				}
			} else {
				document.title = 'Credit Culture | Home';
			}
		} else {
			(async () => {
				await this.onLogout();
				this.props.request_logout_success();
				window.location.reload();
			})();
			// this.props.history.push('/login');
		}
	}

	onLogout = async () => {
		const auth = this.props.auth;
		const idToken = auth.IdToken;
		const sessionId = auth.sessionId;
		if (Object.keys(auth).length > 0) {
			try {
				// debugger;
				// console.log('Logout auth');

				const res = await this.props.request_logout$({
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
					action: 'signOut',
					payload: {
						sessionId: sessionId,
					},
				});

				// console.log('RES -> ', res);
				// debugger;

				if (res.type === REQUEST_LOGOUT_SUCCESS) {
					// console.log('SUCESS');
					// debugger;
					const deviceData = localStorage.getItem('deviceData') || undefined;
					localStorage.clear();
					if (deviceData) localStorage['deviceData'] = deviceData;
					window.location.reload();
				}
			} catch (error) {
				const res = error.response;
				// console.log(res);
				// debugger;
				if (res.type === REQUEST_LOGOUT_SUCCESS) {
					// console.log('SUCESS');
					// debugger;
					const deviceData = localStorage.getItem('deviceData') || undefined;
					localStorage.clear();
					if (deviceData) localStorage['deviceData'] = deviceData;
					window.location.reload();
				}
			}
		} else {
			// debugger;
			this.props.request_logout_success();
			window.location.reload();
			// this.props.history.push('/login');
		}
	};

	componentDidMount = async () => {
		if (this.props.loggedIn) {
			// debugger;

			// get user ui details
			const response = await this.props.get_user_ui$({
				action: 'getThemeDetails',
				payload: {
					sessionId: this.props.auth.sessionId,
					idToken: this.props.auth.IdToken,
				},
			});

			if (response.type === GET_USER_INFO_SUCCESS) {
				const {
					themeDetails: theme,
					dashboardMenu: layoutMode,
				} = response.payload;

				// update ui
				if (theme && layoutMode) {
					// update theme
					this.changeTheme(
						removeSpaces(theme.name),
						removeSpaces(theme.scheme),
					);
					// update state
					this.setState({
						theme,
						layoutMode,
						grouped: layoutMode !== 'slim',
					});
				}
			}
		}

		refreshSessionId = setInterval(async () => {
			console.log('Session refresh enter');
			const auth = JSON.parse(localStorage.getItem('auth'));

			if (this.props.loggedIn && auth && auth.IdToken) {
				const idToken = auth.IdToken;
				const rememberMe = auth.rememberMe;

				const refreshToken = auth.RefreshToken;
				const sessionId = auth.sessionId;

				const sessionEndTime = auth.sessionEndTime;

				let refreshTime = moment(new Date(sessionEndTime))
					.subtract({ minutes: 2 })
					.format('YYYY-MM-DD HH:mm');

				refreshTime =
					refreshTime !== 'Invalid date'
						? refreshTime
						: moment(new Date())
								.subtract({ minutes: 30, hours: 5 })
								.format('YYYY-MM-DD HH:mm');

				const currentTime = moment(new Date())
					.subtract({ minutes: 30, hours: 5 })
					.format('YYYY-MM-DD HH:mm');

				console.log(refreshTime, currentTime, 'componentDidMount');

				if (currentTime === refreshTime) {
					console.log('Session refresh start componentDidMount');

					let tmpPayload = {
						refreshToken,
						sessionId,
						rememberMe,
					};

					const { deviceData, username } = this.props;

					const userDeviceData = deviceData[username] || {};

					console.log(userDeviceData);

					if (Object.keys(userDeviceData).length > 0) {
						tmpPayload = {
							...tmpPayload,
							deviceId: userDeviceData.deviceId,
							deviceSecret: userDeviceData.deviceSecret,
						};
					}

					const res = await this.props.request_refresh_session$({
						headers: {
							Authorization: `Bearer ${idToken}`,
						},
						action: 'refreshSession',
						payload: {
							...tmpPayload,
						},
					});

					if (res.type === REQUEST_REFRESH_SESSION_SUCCESS) {
						console.log(res.payload);

						const { challenge = undefined } = res.payload;

						// Getting only one challenge code i.e 159
						if (challenge === 159) {
							this.props.add_global_message({
								flash: true,
								message: 'Please verify your MFA.',
								messageType: 'success',
							});
							this.props.history.push('/verify-mfa');
						}
					}
				} else if (currentTime > refreshTime) {
					console.log(
						'Session refresh componentDidMount currentTime>refreshTime',
					);
					if (rememberMe) {
						(async () => {
							let tmpPayload = {
								refreshToken,
								sessionId,
								rememberMe,
							};

							const { deviceData, username } = this.props;

							const userDeviceData = deviceData[username] || {};

							console.log(userDeviceData);

							if (Object.keys(userDeviceData).length > 0) {
								tmpPayload = {
									...tmpPayload,
									deviceId: userDeviceData.deviceId,
									deviceSecret: userDeviceData.deviceSecret,
								};
							}

							const res = await this.props.request_refresh_session$({
								headers: {
									Authorization: `Bearer ${idToken}`,
								},
								action: 'refreshSession',
								payload: {
									...tmpPayload,
								},
							});

							console.log(res);

							if (res.type === REQUEST_REFRESH_SESSION_SUCCESS) {
								console.log(res.payload);

								const { challenge = undefined } = res.payload;

								// Getting only one challenge code i.e 159
								if (challenge === 159) {
									this.props.add_global_message({
										flash: true,
										message: 'Please verify your MFA.',
										messageType: 'success',
									});
									this.props.history.push('/verify-mfa');
								}
							}
						})();
					} else {
						debugger;
						this.onLogout();
					}
				}
			} else {
				debugger;
				this.onLogout();
			}
		}, 60000);
	};

	componentWillUnmount() {
		console.log('Session refresh start componentWillUnmount');
		clearInterval(refreshSessionId);
	}

	onMenuClick = () => {
		this.menuClick = true;
	};

	onMenuButtonClick = (event) => {
		event.preventDefault();

		this.menuClick = true;
		this.setState({
			topbarMenuActive: false,
		});

		if (this.state.layoutMode === 'overlay') {
			if (this.isDesktop())
				this.setState({ overlayMenuActive: !this.state.overlayMenuActive });
			else
				this.setState({
					staticMenuMobileActive: !this.state.staticMenuMobileActive,
				});
		}

		if (this.isDesktop()) {
			this.setState({
				staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive,
			});
		} else {
			this.setState({
				staticMenuMobileActive: !this.state.staticMenuMobileActive,
			});
		}
	};

	onTopbarMenuButtonClick = (event) => {
		event.preventDefault();
		this.topbarItemClick = true;
		this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
		this.hideOverlayMenu();
	};

	onTopbarItemClick = (event) => {
		event.originalEvent.preventDefault();

		this.topbarItemClick = true;

		if (this.state.activeTopbarItem === event.item) {
			this.setState({ activeTopbarItem: null });
		} else {
			this.setState({ activeTopbarItem: event.item });
		}
	};

	onMenuItemClick = (event) => {
		if (!event.item.items) {
			this.hideOverlayMenu();
		}

		if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
			this.setState({
				menuActive: false,
			});
		}

		if (event.item.items && !this.isHorizontal() && this.layoutMenuScroller) {
			setTimeout(() => {
				this.layoutMenuScroller.moveBar();
			}, 500);
		}
	};

	onRootMenuItemClick = (event) => {
		event.originalEvent.preventDefault();
		this.setState({
			menuActive: !this.state.menuActive,
		});
	};

	onDocumentClick = () => {
		if (!this.topbarItemClick) {
			this.setState({
				activeTopbarItem: null,
				topbarMenuActive: false,
			});
		}

		if (!this.menuClick) {
			if (this.isHorizontal() || this.isSlim()) {
				this.setState({
					menuActive: false,
				});
			}

			this.hideOverlayMenu();
		}

		this.topbarItemClick = false;
		this.menuClick = false;
	};

	hideOverlayMenu = () => {
		this.setState({
			overlayMenuActive: false,
			staticMenuMobileActive: false,
		});
	};

	// checks for orientation & devices
	isTablet() {
		let width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	isMobile() {
		return window.innerWidth <= 640;
	}

	isOverlay = () => {
		return this.state.layoutMode === 'overlay';
	};

	isHorizontal = () => {
		return this.state.layoutMode === 'horizontal';
	};

	isSlim = () => {
		return this.state.layoutMode === 'slim';
	};

	/**
	 * @theme name of theme you want to apply
	 * @scheme of theme you want for theme ["accent","light","dark"]
	 */
	changeTheme = (theme, scheme) => {
		this.changeStyleSheetUrl('layout-css', theme, 'layout', scheme);
		this.changeStyleSheetUrl('theme-css', theme, 'theme', scheme);
	};

	/**
	 * Update StyleSheet based on theme selection
	 */
	changeStyleSheetUrl = (id, value, prefix, scheme) => {
		let element = document.getElementById(id);
		let urlTokens = element.getAttribute('href').split('/');

		if (id.localeCompare('layout-css') === 0) {
			urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
		} else {
			urlTokens[urlTokens.length - 2] = value;
			urlTokens[urlTokens.length - 1] = 'theme-' + scheme + '.css';
		}
		let newURL = urlTokens.join('/');
		element.setAttribute('href', newURL);

		if (scheme === 'dark') {
			this.setState({ darkMenu: true });
		} else if (scheme === 'light') {
			this.setState({ darkMenu: false });
		}

		let topbarLogo = document.getElementById('layout-topbar-logo');
		let menuLogo = document.getElementById('layout-menu-logo');

		if (
			value.localeCompare('yellow') === 0 ||
			value.localeCompare('lime') === 0
		) {
			if (topbarLogo) topbarLogo.src = 'assets/layout/images/logo-black.png';
			if (menuLogo) menuLogo.src = 'assets/layout/images/logo-black.png';
		} else {
			if (topbarLogo) topbarLogo.src = 'assets/layout/images/logo-white.png';
			if (menuLogo) menuLogo.src = 'assets/layout/images/logo-white.png';
		}
	};

	/**
	 * Generate group or ungrouped menu based on selection
	 */
	createMenu = () => {
		this.menuGrouped = [
			{
				label: 'Home',
				items: [{ label: 'Dashboard', icon: DASHBOARD_ICON, to: '/' }],
			},
			{
				label: 'Contact',
				items: [
					{ label: 'Contact Us', icon: CONTACT_US_ICON, to: '/contactus' },
					{
						label: 'Contact Us History',
						icon: CONTACT_US_HISTORY_ICON,
						to: '/contactus-history',
					},
					{ label: 'Inbox', icon: INBOX_ICON, to: '/inbox' },
					{ label: 'Sent Items', icon: SENT_ITEMS_ICON, to: '/sent-items' },
				],
			},
			{
				label: 'Loan',
				items: [
					{ label: ' Equicom Form', icon: EQUICOM_ICON, to: '/equicom-form' },
					{ label: 'Feedback', icon: FEEDBACK_ICON, to: '/feedback' },
				],
			},
		];

		/* {
				label: 'Home',
				items: [
					{ label: 'Dashboard', icon: DASHBOARD_ICON, to: '/' },
				
					{ label: 'Loans', icon: LOANS_ICON, to: '/table' },
					{ label: 'Feedback', icon: FEEDBACK_ICON, to: '/feedback' },
					{ label: 'Contact Us', icon: CONTACT_US_ICON, to: '/contactus' },
					{
						label: 'Contact Us History',
						icon: CONTACT_US_HISTORY_ICON,
						to: '/contactus-history',
					},
					{ label: 'Inbox', icon: INBOX_ICON, to: '/inbox' },
					{ label: 'Sent Items', icon: SENT_ITEMS_ICON, to: '/sent-items' },
					{
						label: 'Password Policy',
						icon: PASSWORD_POLICY_ICON,
						to: '/password-policy',
					},
					{ label: 'User History', icon: HISTORY_ICON, to: '/user-history' },
					{ label: ' Equicom Form', icon: EQUICOM_ICON, to: '/equicom-form' },
				],
			}, */

		this.menuUngrouped = [
			{
				label: 'Main Menu',
				icon: 'pi pi-fw pi-home',
				items: this.menuGrouped,
			},
		];
	};

	render() {
		const layoutClassName = classNames('layout-wrapper', {
			// "layout-horizontal": this.state.layoutMode === "horizontal",
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-slim': this.state.layoutMode === 'slim',
			'layout-static-inactive': this.state.staticMenuDesktopInactive,
			'layout-mobile-active': this.state.staticMenuMobileActive,
			'layout-overlay-active': this.state.overlayMenuActive,
			'layout-menu-dark': this.state.darkMenu,
			'layout-menu-light': !this.state.darkMenu,
		});

		const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

		const {
			topbarMenuActive,
			activeTopbarItem,
			profileMode,
			layoutMode,
			grouped,
			menuActive,
		} = this.state;

		return (
			<ThemeContext.Provider
				value={{
					state: {
						theme: this.state.theme,
						layoutMode: this.state.layoutMode,
					},
					changeTheme: (theme, layoutMode, key = 'all') => {
						if (key === 'menu') {
							this.setState({
								layoutMode,
								grouped: layoutMode !== 'slim',
							});
						} else if (key === 'name' || key === 'scheme') {
							this.setState({
								theme: {
									...this.state.theme,
									[key]: theme[key],
								},
							});
							// change theme
							this.changeTheme(
								removeSpaces(theme.name),
								removeSpaces(theme.scheme),
							);
						} else {
							this.setState({
								theme,
								layoutMode,
								grouped: layoutMode !== 'slim',
							});
							// change theme
							this.changeTheme(
								removeSpaces(theme.name),
								removeSpaces(theme.scheme),
							);
						}
					},
				}}
			>
				<div className={layoutClassName} onClick={this.onDocumentClick}>
					<AppTopbar
						topbarMenuActive={topbarMenuActive}
						activeTopbarItem={activeTopbarItem}
						onMenuButtonClick={this.onMenuButtonClick}
						onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
						onTopbarItemClick={this.onTopbarItemClick}
						profileMode={profileMode}
						horizontal={this.isHorizontal()}
					/>

					<div className="layout-menu-container" onClick={this.onMenuClick}>
						<div className="layout-menu-logo">
							{!this.state.staticMenuMobileActive && (
								<Logo
									src="assets/layout/images/logo-white"
									alt="babylon-layout"
									layoutMode={this.state.layoutMode}
								/>
							)}
						</div>
						<div className="layout-menu-wrapper">
							<ScrollPanel
								ref={(el) => (this.layoutMenuScroller = el)}
								style={{ height: '100%' }}
							>
								<div className="menu-scroll-content">
									{profileMode === 'inline' && layoutMode !== 'horizontal' && (
										<AppInlineProfile />
									)}
									<AppMenu
										model={grouped ? this.menuGrouped : this.menuUngrouped}
										onMenuItemClick={this.onMenuItemClick}
										onRootMenuItemClick={this.onRootMenuItemClick}
										layoutMode={layoutMode}
										active={menuActive}
									/>
								</div>
							</ScrollPanel>
						</div>
					</div>

					<div className="layout-main">
						<AppBreadCrumbWithRouter />
						<div className="layout-content">
							{this.props.global_loader && <Loader className="global" />}
							{/* Define all the inside routes here */}
							<Switch>
								<Route path="/" exact component={Dashboard} />
								<Route path="/loans" component={Loans} />
								<Route path="/feedback" component={Feedback} />
								<Route path="/contactus" component={ContactUs} />
								<Route path="/contactus-history" component={ContactUsHistory} />
								<Route path="/profile" component={Profile} />
								<Route path="/settings" component={Settings} />
								<Route path="contactus-history" component={ContactUsHistory} />
								<Route path="/inbox" component={Inbox} />
								<Route path="/table" component={SampleTableContainer} />
								<Route path="/password-policy" component={PasswordPolicy} />
								<Route path="/sent-items" component={SentItems} />
								<Route path="/sessions" component={Sessions} />
								<Route path="/equicom-form" component={EquicomForm} />
								<Route path="/user-history" component={UserHistory} />
								<Route path="*" component={ErrorPage} />
							</Switch>
						</div>
						<AppFooter />
					</div>
				</div>
			</ThemeContext.Provider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UI,
		...state.USER,
		...state.AUTH,
	};
};

const mapActionsToProps = (dispatch) =>
	bindActionCreators(
		{
			request_refresh_session$,
			add_global_message,
			request_logout$,
			request_logout_success,
			get_user_ui$,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(withRouter(Main));
