import React from 'react';
import './style.css';

const UserCard = ({ user }) => {
	return (
		<div className="user-profile--card">
			<div className="profile-img">
				<img src={user.profileImg} alt="user-profile" />
				<div className="upload-container">
					<label className="p-button-primary" htmlFor="profile">
						<i className="fa fa-camera" />
						<input type="file" id="profile" name="profile" />
					</label>
				</div>
			</div>
			<div className="info">
				{<span className={'danger-badge'}></span>}
				<ul className="info-list">
					<li>
						<span>Username</span>
						<span>{user.username}</span>
					</li>
					<li>
						<span>Phone Number</span>
						<span>{user.phoneNumber}</span>
					</li>
					<li>
						<span>Verified</span>
						<span
							style={{
								color: user.verified ? 'green' : 'red',
							}}
						>
							{user.verified ? 'Yes' : 'No'}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserCard;
