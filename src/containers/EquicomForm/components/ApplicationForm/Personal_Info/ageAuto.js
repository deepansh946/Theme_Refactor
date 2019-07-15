export const getAge = (date) => {
	var today = new Date();
	var birthDate = new Date(date);

	if (today.getFullYear() === birthDate.getFullYear()) {
		console.log('Not ellligible');
		return;
	}
	var age_now = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age_now--;
	}

	return age_now;
};
