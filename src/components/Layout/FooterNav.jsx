import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiAddCircleLine } from 'react-icons/ri'
import { BiHomeAlt } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FiBell } from 'react-icons/fi'
import { Avatar } from 'antd'

const BadgeCount = ({ count }) => {
	if (count === 0) {
		return null
	}
	return (
		<small
			className="badge badge-danger position-absolute z-index-1"
			style={{ bottom: '19px', left: '21px' }}
		>
			{count}
		</small>
	)
}

export default function FooterNav({ pageName }) {
	const { notifications, personal_info } = useSelector((state) => state.view)
	const { user_suggestions } = useSelector((state) => state.alice)
	const { user } = useSelector((state) => state.auth)
	const iconSize = 25

	return (
		<div
			className="_app-footer fixed-bottom p-2  border-0 shadow-lg card border border-dark rounded-0"
			style={{ zIndex: 80 }}
		>
			{user && user?.user?.deactivated && (
				<div className="p-0 alert alert-danger">
					<marquee behavior="scroll" direction="left">
						WARNING! Your account has been deactivated, some features might not
						work properly, please go to settings to activate your account.
					</marquee>
				</div>
			)}
			<div className="card-body pt-1 pb-1 d-flex justify-content-between align-items-center">
				<Link
					to={`/feeds`}
					className="position-relative nav-content-bttn nav-center active"
				>
					<BiHomeAlt
						size={iconSize}
						className={`text-${
							pageName === 'feeds' ? 'theme' : 'dark'
						} feather-home`}
					/>
				</Link>
				<Link to={`/match`} className="position-relative nav-content-bttn">
					<BadgeCount count={user_suggestions && user_suggestions.length} />
					<BsPeople
						size={iconSize}
						className={`text-${
							pageName === 'match' ? 'theme' : 'dark'
						} feather-users`}
					/>
				</Link>
				<Link
					to={personal_info?.looking_for ? `/flat/request` : '/flat/submit'}
					className="position-relative nav-content-bttn"
					data-tab="chats"
				>
					{/* <i className="text-dark feather-plus"></i> */}
					<RiAddCircleLine
						className={`text-${pageName === 'requests' ? 'theme' : 'dark'}`}
						size={iconSize + 10}
					/>
				</Link>
				<Link
					to="/notifications"
					className="position-relative nav-content-bttn"
				>
					<BadgeCount
						count={notifications && notifications.filter((x) => !x.seen).length}
					/>

					<FiBell
						size={iconSize}
						className={`text-${
							pageName === 'notifications' ? 'theme' : 'dark'
						}`}
					/>
				</Link>
				<Link
					to={`/user/${user.user.username}`}
					className="position-relative nav-content-bttn"
				>
					{/* <RiUser2Line size={30} /> */}
					<Avatar
						src={user.user.avatar_url}
						alt="user"
						className={`w30 shadow-xss rounded-circle ${
							pageName === 'profile'
								? 'border border-2 shadow border-success'
								: ''
						}`}
					/>
				</Link>
			</div>
		</div>
	)
}
