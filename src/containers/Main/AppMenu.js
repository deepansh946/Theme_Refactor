import React, { PureComponent, Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AppSubmenu extends Component {
	static defaultProps = {
		className: null,
		items: null,
		onMenuItemClick: null,
		onRootItemClick: null,
		root: false,
		layoutMode: null,
		menuActive: false,
	};

	static propTypes = {
		className: PropTypes.string,
		items: PropTypes.array,
		onMenuItemClick: PropTypes.func,
		onRootItemClick: PropTypes.func,
		root: PropTypes.bool,
		layoutMode: PropTypes.string,
		menuActive: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	onMenuItemClick(event, item, index) {
		//avoid processing disabled items
		if (item.disabled) {
			event.preventDefault();
			return true;
		}

		if (this.props.root && this.props.onRootItemClick) {
			this.props.onRootItemClick({
				originalEvent: event,
				item: item,
			});
		}

		//execute command
		if (item.command) {
			item.command({ originalEvent: event, item: item });
		}

		if (index === this.state.activeIndex) this.setState({ activeIndex: null });
		else this.setState({ activeIndex: index });

		if (this.props.onMenuItemClick) {
			this.props.onMenuItemClick({
				originalEvent: event,
				item: item,
			});
		}
	}

	onMenuItemMouseEnter(index) {
		if (this.props.root && this.props.menuActive && this.isHorizontalOrSlim()) {
			this.setState({ activeIndex: index });
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (
			this.isHorizontalOrSlim() &&
			prevProps.menuActive &&
			!this.props.menuActive
		) {
			this.setState({ activeIndex: null });
		}
	}

	isHorizontalOrSlim() {
		return (
			this.props.layoutMode === 'horizontal' || this.props.layoutMode === 'slim'
		);
	}

	renderLinkContent(item) {
		let submenuIcon = item.items && (
			<i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
		);
		let badge = item.badge && (
			<span className="menuitem-badge">{item.badge}</span>
		);

		return (
			<React.Fragment>
				<i className={classNames('layout-menuitem-icon', item.icon)}></i>
				<span className="layout-menuitem-text">{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
	}

	renderLink(item, i) {
		let content = this.renderLinkContent(item);

		if (item.to) {
			return (
				<NavLink
					activeClassName="active-route"
					to={item.to}
					onClick={(e) => this.onMenuItemClick(e, item, i)}
					exact
					target={item.target}
					onMouseEnter={(e) => this.onMenuItemMouseEnter(i)}
					className={item.styleClass}
				>
					{content}
				</NavLink>
			);
		} else {
			return (
				<a
					href={item.url}
					onClick={(e) => this.onMenuItemClick(e, item, i)}
					target={item.target}
					onMouseEnter={(e) => this.onMenuItemMouseEnter(i)}
					className={item.styleClass}
				>
					{content}
				</a>
			);
		}
	}

	render() {
		const items =
			this.props.items &&
			this.props.items.map((item, i) => {
				let active = this.state.activeIndex === i;
				let styleClass = classNames(
					item.badgeStyleClass,
					{ 'layout-root-menuitem': this.props.root },
					{ 'active-menuitem': active },
				);
				let tooltip = this.props.root && (
					<div className="layout-menu-tooltip">
						<div className="layout-menu-tooltip-arrow"></div>
						<div className="layout-menu-tooltip-text">{item.label}</div>
					</div>
				);

				return (
					<li className={styleClass} key={i}>
						{item.items && this.props.root === true && (
							<div className="arrow"></div>
						)}
						{this.props.root && (
							<div>
								<span className="layout-menuitem-text">{item.label}</span>
							</div>
						)}
						{this.renderLink(item, i)}
						{tooltip}
						<AppSubmenu
							items={item.items}
							onMenuItemClick={this.props.onMenuItemClick}
							layoutMode={this.props.layoutMode}
							menuActive={this.props.menuActive}
						/>
					</li>
				);
			});

		return items ? <ul className={this.props.className}>{items}</ul> : null;
	}
}

class AppMenu extends PureComponent {
	static defaultProps = {
		model: null,
		onMenuItemClick: null,
		onRootMenuItemClick: null,
		layoutMode: null,
		active: false,
	};

	static propTypes = {
		model: PropTypes.array,
		layoutMode: PropTypes.string,
		onMenuItemClick: PropTypes.func,
		onRootMenuItemClick: PropTypes.func,
		active: PropTypes.bool,
	};

	render() {
		return (
			<AppSubmenu
				items={this.props.model}
				className="layout-menu"
				menuActive={this.props.active}
				onRootItemClick={this.props.onRootMenuItemClick}
				onMenuItemClick={this.props.onMenuItemClick}
				root={true}
				layoutMode={this.props.layoutMode}
			/>
		);
	}
}

export default AppMenu;
