import React from 'react';
import { DocumentRequirements } from './sections/index';

const DocumentRequirementInfo = (props) => {
	const { onClick, onHide, visible } = props;
	return (
		<div className="p-grid">
			<div className="p-col-12 p-md-12 p-sm-12">
				<DocumentRequirements
					onClick={onClick}
					onHide={onHide}
					visible={visible}
					displayFileName={false}
				/>
			</div>
		</div>
	);
};
export default DocumentRequirementInfo;
