import { notification } from 'antd'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Btn from '../../../components/Btn/Btn'
import ImageCropper from '../../../components/ImageCropper/ImageCropper'
import { storage } from '../../../Firebase'
import firebase from 'firebase'
import { getUser } from '../../../redux/strapi_actions/auth.actions'
import axios from 'axios'
import { notifyEmy } from '../../../services/Sheruta'
import Cookies from 'js-cookie'

const UpdateAvatar = (props) => {
	const { ended, standalone, setStep, step } = props
	const [done, setDone] = useState(null)
	const [blob, setBlob] = useState(null)
	const [img, setImg] = useState(null)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)
	const { user } = props.auth.user

	const reader = new FileReader()

	function handleEvent(event) {
		if (event.type === 'load') {
			//   console.log(`${event.type}: ${event.loaded} bytes transferred\n`);
			setBlob(reader.result)
		}
	}

	function addListeners(reader) {
		reader.addEventListener('loadstart', handleEvent)
		reader.addEventListener('load', handleEvent)
		reader.addEventListener('loadend', handleEvent)
		reader.addEventListener('progress', handleEvent)
		reader.addEventListener('error', handleEvent)
		reader.addEventListener('abort', handleEvent)
	}

	function handleSelected(e) {
		// eventLog.textContent = "";
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			addListeners(reader)
			reader.readAsDataURL(selectedFile)
		}
	}

	function handleCrop(data) {
    if(standalone){
      handleImageUpload()
    }
		setDone(true)
	}
	const upload = () => {
		document.getElementById('selectImage').click()
	}

	const sendToDb = (imageUrl) => {
		axios(
			process.env.REACT_APP_API_URL +
				`/users-permissions/auth/local/edit/${user.id}`,
			{
				method: 'POST',
				data: {
					avatar_url: imageUrl,
				},
				headers: {
					Authorization: 'Bearer ' + Cookies.get('token'),
				},
			}
		)
			.then((res) => {
				props.getUser()
				setUploading(false)
				notification.success({ message: 'Image Updated' })
				if (ended) {
					ended(img)
				}
				// if(setStep && step){
				// 	setStep(step + 1)
				// }
				if (props.setStep) props.setStep(props.step + 1)
			})
			.catch((err) => {
				console.log('UPDATE ERROR ---', err)
				setUploading(false)
				notification.error({ message: 'Upload Error, Please try again' })
			})
	}

	const handleImageUpload = () => {
		setUploading(true)
		var uploadTask = storage.child(`images/profile/${user.id}/image_0`).put(img)
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				console.log(
					'PROGRESS ---',
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// console.log("Upload is " + progress + "% done");
				setProgress(progress)
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused')
						break
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running')
						break
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				setUploading(false)
				notification.error({ message: 'Upload Error' })
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					sendToDb(downloadURL)
				})
			}
		)
	}

	useEffect(() => {
		notifyEmy({
			heading: ' Got to the avatar upload step',
		})
	}, [])

  useEffect(() => {
    if (img && blob && ended) {
			// ended(img)
		}
  },[blob,img])

	return (
		<div>
			<div className="sec-heading text-center mb-4">
				<h2 className="animated animate__bounceIn fw-bold">
					Upload am image of yourself
				</h2>
				<p>Its nice to put a face to the name</p>
			</div>
			{done ? (
				<div className="text-center">
					<img
						src={URL.createObjectURL(img)}
						className="img-fluid avater"
						alt=""
						width="200"
						style={{ borderRadius: '50%' }}
					/>
					<div
						onClick={() => {
							setBlob(null)
							setDone(false)
						}}
						className="badge badge-success shadow"
						style={{
							position: 'absolute',
							right: '405',
							fontSize: '13px',
							top: '40%',
							left: '52%',
						}}
					>
						<b>Change Image</b>
					</div>
					<h2 className="mt-3">
						{user.first_name} {user.last_name}
					</h2>
					<span>@{user.username}</span>
					<br />
					<hr />
					{!standalone && (
						<Btn
							text="Next"
							onClick={handleImageUpload}
							loading={uploading}
							className="mb-3"
						/>
					)}
				</div>
			) : (
				<>
					{blob ? (
						<div className="text-center">
							<div className="card" style={{ height: '40vh' }}>
								<ImageCropper
									image={blob}
									aspect={4 / 4}
									onChange={(e) => setImg(e)}
								/>
							</div>
							<Btn
								text="Crop"
								className=" w-50 mt-4 mb-5"
								onClick={handleCrop}
								// style={{ zIndex: 100, position: "absolute" }}
							/>
						</div>
					) : (
						<div className="text-center mb-5 mt-5">
							{/* <input type="file" onChange={(e) => handleSelected(e)} /> */}
							<button
								className="btn btn-lg text-theme bg-gray shadow"
								id="plus"
								onClick={upload}
							>
								Select Image +
							</button>
							<input
								id="selectImage"
								hidden
								type="file"
								accept="image/*"
								onChange={handleSelected}
							/>
						</div>
					)}
				</>
			)}
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {
	getUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAvatar)
