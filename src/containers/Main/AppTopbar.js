import React, { PureComponent } from 'react';
import { Calendar } from 'primereact/calendar';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from '../../components/UI/Logo';
import NavigationDropdown from '../../components/UI/Navigation/NavigationDropdown';

class AppTopbar extends PureComponent {
	constructor() {
		super();
		this.eventInput = React.createRef();
	}

	static propTypes = {
		onMenuButtonClick: PropTypes.func.isRequired,
		onTopbarMenuButtonClick: PropTypes.func.isRequired,
		onTopbarItemClick: PropTypes.func.isRequired,
		topbarMenuActive: PropTypes.bool.isRequired,
		activeTopbarItem: PropTypes.string,
		profileMode: PropTypes.string,
		horizontal: PropTypes.bool,
	};

	render() {
		const {
			onMenuButtonClick = null,
			onTopbarMenuButtonClick = null,
			onTopbarItemClick = null,
			topbarMenuActive = false,
			activeTopbarItem = null,
			profileMode = null,
			horizontal = null,
		} = this.props;

		const TopbarItemClick = (event, item) => {
			console.log(this.eventInput);
			if (onTopbarItemClick) {
				onTopbarItemClick({
					originalEvent: event,
					item: item,
				});
			}
		};

		let topbarItemsClassName = classNames('topbar-menu fadeInDown', {
			'topbar-menu-visible': topbarMenuActive,
		});

		return (
			<div className="layout-topbar clearfix">
				<Logo
					src="assets/layout/images/logo-white"
					styleClass="layout-topbar-logo"
					alt="babylon-layout"
					imgId="layout-topbar-logo"
				/>

				<button
					className="layout-menu-button p-link"
					onClick={onMenuButtonClick}
				>
					<i className="pi pi-bars" />
				</button>

				<button
					id="topbar-menu-button"
					className="p-link"
					onClick={onTopbarMenuButtonClick}
				>
					<i className="pi pi-ellipsis-v" />
				</button>

				<ul className={topbarItemsClassName}>
					{(profileMode === 'popup' || horizontal) && (
						<li
							className={classNames('user-profile', {
								'active-topmenuitem': activeTopbarItem === 'profile',
							})}
							onClick={(e) => TopbarItemClick(e, 'profile')}
						>
							<button className="p-link">
								<img
									alt="babylon-layout"
									src="assets/layout/images/avatar.png"
								/>
								<span className="topbar-item-name">Arlene Welch</span>
							</button>

							<NavigationDropdown
								styleClass="fadeInDown"
								items={[
									{ icon: 'pi pi-user', title: 'Profile', link: '/profile' },
									{ icon: 'pi pi-cog', title: 'Settings', link: '/settings' },
									{ icon: 'pi pi-envelope', title: 'Message' },
									{ icon: 'pi pi-bell', title: 'Notification' },
								]}
							/>
						</li>
					)}
					<li
						className={classNames({
							'active-topmenuitem': this.props.activeTopbarItem === 'settings',
						})}
						onClick={() => {
							this.eventInput.current.inputElement.focus();
						}}
					>
						<button className="p-link">
							<i className="topbar-icon pi pi-calendar" />
							<span className="topbar-item-name">Events</span>
						</button>
						<Calendar
							ref={this.eventInput}
							inputId="eventInput"
							panelClassName="event-calendar"
							inputStyle={{ width: 0, height: 0, opacity: 0 }}
						></Calendar>
					</li>
					<li
						className={classNames({
							'active-topmenuitem': activeTopbarItem === 'messages',
						})}
						onClick={(e) => TopbarItemClick(e, 'messages')}
					>
						<button className="p-link">
							<i className="topbar-icon pi pi-inbox" />
							<span className="topbar-item-name">Messages</span>
							<span className="topbar-badge">8</span>
						</button>
						<NavigationDropdown
							styleClass="fadeInDown"
							items={[
								{
									buttonClass: 'topbar-message',
									img: {
										src: 'assets/layout/images/avatar-john.png',
										alt: 'title',
									},
									title: 'Give me a call',
								},
								{
									buttonClass: 'topbar-message',
									img: {
										src: 'assets/layout/images/avatar-julia.png',
										alt: 'title',
									},
									title: 'Reports Attached',
								},
							]}
						/>
					</li>
				</ul>
			</div>
		);
	}
}
export default AppTopbar;
