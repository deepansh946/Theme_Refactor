import React from 'react';

const UploadFile = (props) => {
	const { fileInfo, fileSelectedHandler } = props;
	return (
		<div>
			<table id="customers">
				<thead>
					<tr>
						<th>Serial No.</th>
						<th>Document To be Uploaded</th>
						<th>Upload</th>
						<th>Uploaded File</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td rowSpan="2">1 </td>
						<td>Two(2) valid government issued ID</td>
						<td>
							<label class="uploadButton" htmlFor={'FileUpload1'}>
								<i class="fa fa-upload icon-color " />
							</label>

							<input
								key={1}
								type="file"
								id={'FileUpload1'}
								onChange={fileSelectedHandler}
								name={'0'}
								class="hide-input"
							/>

							<button>
								<i class="fa fa-close cross-icon"></i>
							</button>
						</td>
						<td>
							<span>{fileInfo[1]}</span>;{console.log(fileInfo)}
						</td>
					</tr>
					<tr>
						<td>Three(3) Specimen signature</td>
						<td>
							<label class="uploadButton" htmlFor={'FileUpload2'}>
								<i class="fa fa-upload icon-color " />
							</label>

							<input
								key={2}
								type="file"
								id={'FileUpload2'}
								onChange={fileSelectedHandler}
								name={'1'}
								class="hide-input"
							/>

							<button>
								<i class="fa fa-close cross-icon"></i>
							</button>
						</td>
						<td>
							<span>{fileInfo[2]}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default UploadFile;
