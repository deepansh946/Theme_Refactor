import React from 'react';
import Logo from '../../components/UI/Logo';

const AppFooter = () => {
	return (
		<div className="layout-footer">
			<Logo
				src="assets/layout/images/logo-black"
				styleClass="layout-footer-logo"
				alt="babylon-layout"
				imgId="layout-footer-logo"
				footer={true}
			/>
		</div>
	);
};

export default React.memo(AppFooter);
