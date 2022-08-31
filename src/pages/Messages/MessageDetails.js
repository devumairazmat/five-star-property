import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Global from '../../Global'
import EachMessage from './EachMessage'
import { IoIosArrowBack } from 'react-icons/io'
import { IoCallSharp } from 'react-icons/io5'
import { useHistory } from 'react-router'
import MessageService from '../../services/MessageService'
import { useInterval } from 'react-use'
import { FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PaymentAlert from '../../components/PaymentAlert/PaymentAlert'
import { notifyEmy } from '../../services/Sheruta'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
import styled from 'styled-components'
import { Dots } from 'react-activity'
import moment from 'moment'

export default function MessageDetails({ conversation_id }) {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)
	const { payment_plan, app_details } = useSelector((state) => state.view)
	const [conversation, setConversation] = useState(null)
	const [otherUser, setOtherUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const [inputRows, setInputRows] = useState('2')
	const defaultHeight = Global.isMobile ? '55vh' : '75vh'
	const [height, setHeight] = useState(defaultHeight)

	// const conversation_id = props.match.params.conversation_id;

	const executeScroll = () => {
		// console.log('HERE WE GO')
		// Bring this back :
		if (document.getElementById('end')) {
			document.getElementById('end').scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			})
		}
	}

	const getMessages = async () => {
		if (conversation && conversation_id) {
			try {
				const msgs = await MessageService.getConversationMessages(
					conversation.id
				)
				setMessages(msgs.data)
				setLoading(false)
				// executeScroll()
				return Promise.resolve(msgs)
			} catch (error) {
				return Promise.reject(error)
			}
		}
	}

	useEffect(() => {
		if (message.length > 40) {
			setInputRows('3')
		} else if (message.length > 140) {
			setInputRows('5')
		} else {
			setInputRows('1')
		}
		console.log('LENTH --', message.length)
	}, [message])

	useEffect(() => {
		if (messages.length > 5) {
			setTimeout(() => {
				executeScroll()
			}, 90)
		}
		setTimeout(() => {
			executeScroll()
		}, 3000)
	}, [])

	const getConversation = () => {
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL + `/conversations/?uuid=${conversation_id}`
		)
			.then((res) => {
				if (res.data[0].owner.id !== user.user.id) {
					setOtherUser(res.data[0].owner)
				} else {
					setOtherUser(res.data[0].guest)
				}
				setConversation(res.data[0])
				// executeScroll()
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
			})
	}

	useEffect(() => {
		getConversation()
	}, [conversation_id])

	useEffect(async () => {
		if (conversation && conversation_id) {
			const msgs = await MessageService.getConversationMessages(conversation.id)
			setMessages(msgs.data)
			// executeScroll();
		}
	}, [conversation])

	useEffect(() => {
		getMessages()
	}, [conversation])

	useInterval(() => {
		if (conversation && conversation_id) {
			getMessages()
		}
	}, 10000)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (message === null || message === '') {
			return
		}
		try {
			setLoading(true)
			const sent = await MessageService.sendMessage({
				to: otherUser,
				from: user.user.id,
				message_text: message,
				seen: false,
				conversation: conversation.id,
			})
			Analytics.create({ user_id: otherUser, type: AnalyticsTypes.message })
			if (sent) {
				setLoading(false)
				messages.push(sent.data)
				setMessage('')
				executeScroll()
				notifyEmy({
					heading: `sent a message to ${sent.data.to.first_name} saying >> ${sent.data.message_text} <<`,
				})
			}
		} catch (error) {
			setLoading(false)
			notifyEmy({
				heading: 'Error sending message',
				log: error,
				status: 'error',
			})
			Promise.reject(error)
		}
	}

	const handleInputFocus = () => {
		if (Global.isMobile) {
			setHeight('30vh')
		} else {
			setHeight(defaultHeight)
		}
	}

	if (!otherUser) {
		return (
			<div
				className="d-flex text-center justify-content-center"
				id="end"
				style={{ paddingTop: '30vh' }}
			>
				<Dots />
			</div>
		)
	}
	return (
		<div className="col-xl-12 col-xxl-12 col-lg-12 pe-0 ps-0">
			<div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
				<div className="card rounded-0 p-3 d-block border-0 d-block shadow-sm">
					<figure className="avatar mb-0 float-left me-2">
						<img
							src={otherUser?.avatar_url}
							alt="image"
							className="w35 me-1"
							style={{ borderRadius: '100%' }}
						/>
					</figure>
					<Link to={`/user/${otherUser?.username}`}>
						<h5 className="fw-700 text-theme font-xssss mt-1 mb-1">
							{otherUser?.first_name?.split(' ')[0]}
						</h5>
					</Link>
					<h4 className="text-grey-500 font-xsssss mt-0 mb-0">
						<span
							class={`d-inline-block ${
								otherUser?.online ? 'bg-success' : 'bg-danger'
							} btn-round-xss m-0`}
						></span>{' '}
						{otherUser?.online
							? 'Available'
							: `Last Seen ${moment(otherUser?.last_seen).fromNow()}`}
					</h4>
					{payment_plan && (
						<a
							href={`tel: ${otherUser?.phone_number}`}
							className="font-xssss position-absolute right-0 top-0 mt-3 me-4"
						>
							<i
								className="fa fa-phone text-theme mt-2 d-inline-block"
								style={{ fontSize: '20px' }}
							></i>
						</a>
					)}
				</div>
				<div
					className="messages-content chat-wrapper scroll-bar p-3"
					style={{ height }}
				>
					{messages.map((val, i) => {
						return <EachMessage message={val} key={`msg-${i}`} />
					})}
					<div id="end" className="p-5" />
				</div>
				<form
					className="d-flex shadow-sm chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 theme-dark-bg "
					onSubmit={
						!payment_plan && !app_details?.everything_free
							? (e) => {
									e.preventDefault()
									dispatch({
										type: 'SET_VIEW_STATE',
										payload: {
											showPaymentPopup: true,
										},
									})
							  }
							: handleSubmit
					}
				>
					{/* <button className="bg-grey float-left">
						<i className="ti-microphone text-white"></i>
					</button> */}
					<div className="form-groupp w-100 ">
						<input
							type="text"
							placeholder="Start typing.."
							value={message}
							autoFocus
							onFocus={handleInputFocus}
							onBlur={() => setHeight(defaultHeight)}
							onChange={(e) => setMessage(e.target.value)}
							disabled={loading}
							rows={inputRows}
							style={{
								borderRadius: message.length > 40 ? '7px' : '50px',
								// borderTopRightRadius: 0,
								// borderBottomRightRadius: 0,
							}}
							className="z-index-3 border-0 form-control pos-top text-black fw-700 bg-theme-light"
						/>
					</div>
					<button className="bg-current">
						<i className="ti-arrow-right text-white"></i>
					</button>
				</form>
			</div>
		</div>

		// {/*
		// 		<div className="h-100 bg-dark d-block">
		// 			<div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
		// 				<div className="modal-popup-header w-100 border-bottom">
		// 					<div className="card p-3 d-block border-0 d-block">
		// 						<figure className="avatar mb-0 float-left me-2">
		// 							<img src="images/user-12.png" alt="image" className="w35 me-1" />
		// 						</figure>
		// 						<h5 className="fw-700 text-primary font-xssss mt-1 mb-1">
		// 							Hendrix Stamp
		// 						</h5>
		// 						<h4 className="text-grey-500 font-xsssss mt-0 mb-0">
		// 							<span className="d-inline-block bg-success btn-round-xss m-0"></span>{' '}
		// 							Available
		// 						</h4>
		// 						<a
		// 							href="#"
		// 							className="font-xssss position-absolute right-0 top-0 mt-3 me-4"
		// 						>
		// 							<i className="ti-close text-grey-900 mt-2 d-inline-block"></i>
		// 						</a>
		// 					</div>
		// 				</div>
		// 				<div className="modal-popup-body w-100 p-3" style={{ height: '70vh' }}>
		// 					<div className="message">
		// 						<div className="message-content font-xssss lh-24 fw-500">
		// 							Hi, how can I help you?
		// 						</div>
		// 					</div>
		// 					<div className="date-break font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">
		// 						Mon 10:20am
		// 					</div>
		// 					<div className="message self text-right mt-2">
		// 						<div className="message-content font-xssss lh-24 fw-500">
		// 							I want those files for you. I want you to send 1 PDF and 1 image
		// 							file.
		// 						</div>
		// 					</div>
		// 					<div
		// 						className="snippet pt-3 ps-4 pb-2 pe-3 mt-2 bg-grey rounded-xl float-right"
		// 						data-title=".dot-typing"
		// 					>
		// 						<div className="stage">
		// 							<div className="dot-typing"></div>
		// 						</div>
		// 					</div>
		// 					<div className="clearfix"></div>
		// 				</div>
		// 				<div className="modal-popup-footer w-100 border-top">
		// 					<div className="card p-3 d-block border-0 d-block">
		// 						<div className="form-group icon-right-input style1-input mb-0">
		// 							<input
		// 								type="text"
		// 								placeholder="Start typing.."
		// 								className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
		// 							/>
		// 							<i className="feather-send text-grey-500 font-md"></i>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div> */}
	)
}
