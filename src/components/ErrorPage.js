import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({ statusCode = 404, message = 'Page not found.' }) => {
	return (
		<div className="error-block">
			<h1>{statusCode}</h1>
			<p>{message.toUpperCase()}</p>
		</div>
	);
};

export default ErrorPage;
