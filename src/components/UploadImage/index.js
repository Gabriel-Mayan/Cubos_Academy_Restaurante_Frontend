import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UploadIcon from "../../assets/upload-icon.svg";

const useStyles = makeStyles(() => ({
	label: {
		cursor: "pointer",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "17px",
		margin: 0,
		width: "384px",
		height: "384px",
		borderRadius: "16px",
		justifyContent: "flex-end",
	},
	span: {
		color: "white",
		fontSize: "14px",
		textAlign: "center",
		marginBottom: "40px",
	},
	upload: {
		width: "384px",
		height: "384px",
		borderRadius: "16px",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		marginTop: "88px"
	},
	inputFile: {
		display: "none"
	}
}));

function UploadImage({ baseImage, setBaseImage, register, id }) {
	const uploadRef = useRef();
	const classes = useStyles();

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setBaseImage(base64);
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleClick = () => {
		uploadRef.current.click();
	}

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%), url(${baseImage})`,
			}}
			className={classes.upload}
		>
			<input
				{...register(`${id}`, { value: baseImage })}
				ref={uploadRef}
				type="file"
				onChange={(e) => {
					uploadImage(e);
				}}
				className={classes.inputFile}
				id={id}
			/>
			<label className={classes.label} onClick={handleClick}>
				<img src={UploadIcon} alt="" />
				<span className={classes.span}>
					Clique ou arraste
					<br />
					para adicionar uma imagem
				</span>
			</label>
		</div>
	);
}

export default UploadImage;
