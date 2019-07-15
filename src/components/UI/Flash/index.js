import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { remove_global_message } from '../../../redux/actions/ui_actions';
import { CSSTransition } from 'react-transition-group';
import './style.css';

let timer = null;

const Flash = ({
	type = 'error',
	message = 'Something went wrong',
	remove_global_message,
	flash,
	sessionExpired,
}) => {
	clearInterval(timer);

	const icon = type === 'error' ? 'fa-warning' : 'fa-check-circle-o';
	// close flash message
	if (flash) {
		timer = setTimeout(
			() => {
				remove_global_message();
				if (sessionExpired) {
					window.location.reload();
				}
			},
			message === 'Something went wrong' ? 2000 : 15000,
		);
	}

	return (
		<CSSTransition
			in={flash}
			timeout={{ enter: 300, exit: 0 }}
			classNames="flash"
			unmountOnExit
			mountOnEnter
		>
			<div className={`${type}-message--flash`} style={{ zIndex: '1000' }}>
				<span className={`fa ${icon} shadow`}></span>

				<span className={`fa ${icon} icon`}></span>
				<p>
					<b>{type === 'error' ? 'Failed!' : 'Success!'}</b>
					{message}
				</p>
				<button
					className={`close-flash--btn`}
					onClick={() => {
						remove_global_message();
						if (sessionExpired) {
							window.location.reload();
						}
					}}
				>
					<i className="fa fa-close"></i>
				</button>
			</div>
		</CSSTransition>
	);
};

const mapStateToProps = (state) => {
	return {
		sessionExpired: state.UI.sessionExpired,
	};
};

const mapActionsToProps = (dispatch) => {
	return bindActionCreators({ remove_global_message }, dispatch);
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(Flash);
