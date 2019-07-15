import React from 'react';
import { Link, withRouter } from 'react-router-dom';
const NavigationItem = ({ buttonClass, img, icon, title, link, badge }) => {
	console.log(link);
	return (
		<li role="menuitem">
			<Link to={link || ''}>
				<button className={`p-link ${buttonClass}`}>
					{img && <img src={img.src} alt={img.alt} />}
					{icon && <i className={icon} />}
					<span>{title}</span>
					{badge && <span className="topbar-submenuitem-badge">{badge}</span>}
				</button>
			</Link>
		</li>
	);
};

export default withRouter(NavigationItem);
