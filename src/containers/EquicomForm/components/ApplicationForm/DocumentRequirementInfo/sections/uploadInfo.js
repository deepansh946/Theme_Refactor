import axios from 'axios';

export class CarService {
	async getCarsMedium() {
		return await axios
			.get('showcase/resource/data2.json')
			.then((res) => res.data.data);
	}
	// res.data.data,
}
