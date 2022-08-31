import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import ConfigViewPopup from './ConfigViewPopup'
// import GetStartedPopup from './GetStartedPopup'
import {
	getUserPaymentPlan,
	getAllAmenities,
	getRealTimeStuffs,
	getOtherStuffs,
	getAllViewOptions,
	getAllLocationKeyword,
	// getLocationKeyWordsByState,
	getAllUniqueHabits,
	getAllUserInspection,
} from '../../redux/strapi_actions/view.action'
import {
	suggestThemForMe,
} from '../../redux/strapi_actions/alice.actions'
import { getUser } from '../../redux/strapi_actions/auth.actions'
// import NotificationPopup from './NotificationPopup'
import AppUpdatePopup from './AppUpdatePopup'
import { logout, setUserOnline } from '../../redux/strapi_actions/auth.actions'
import { useInterval } from 'react-use'
// import Global from '../../Global'
// import LocationUpdatePopup from './LocationUpdatePopup'
// import UserService from '../../services/UserService'
import GetMoreInfoPopup from './GetMoreInfoPopup'
import Cookies from 'js-cookie'
// import axios from 'axios'
import LocationKeywordPopup from './LocationKeywordPopup'
import RobotMessage from '../Ads/RobotMessage/RobotMessage'
import Global from '../../Global'
import PaymentPopup from './PaymentPopup'

const MasterPopup = (props) => {
	const token = Cookies.get('token')
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector(
		(state) => state.view
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!Cookies.get('token')) {
			dispatch(logout())
		}
	}, [])

	const getForViews = () => {
		dispatch(getAllViewOptions())
	}

	const getForRealTime = () => {
		if (user && !user?.user?.deactivated) {
			dispatch(getRealTimeStuffs())
		}
	}

	const getForUser = () => {
		if (user && !user?.user?.deactivated && token) {
			dispatch(suggestThemForMe(user?.user?.id))
		}
	}

	// FOR ONE TIME
	useEffect(() => {
		
		// const _token = Cookies.get('token')
		if (localStorage.getItem('token')) {
			localStorage.clear()
			sessionStorage.clear()
			dispatch(logout())
			window.location.reload()
			return
		}
		if (user) {
			dispatch(setUserOnline())
			getForRealTime()
			getForUser()
			dispatch(getOtherStuffs())
			dispatch(getAllUserInspection(user?.user?.id))
		}
		getForViews()
		dispatch(getAllUniqueHabits())
	}, [dispatch])

	useEffect(() => {
		if (user) {
			dispatch(getUserPaymentPlan())
		}
	}, [user])

	// FOR A LONGER TIME
	useInterval(() => {
		if (user) {
			dispatch(getUser())
			dispatch(setUserOnline())
			dispatch(getOtherStuffs())
		}
	}, 550000)

	// FOR THINGS THAT COME IN FREQUENTLY
	useInterval(() => {
		if (user) {
			// dispatch(getOtherStuffs())
			getForRealTime()
		}
	}, [80000])

	useEffect(() => {
		if (personal_info && personal_info?.nin) {
			Cookies.set('has_nin', true, { expires: 7})
		}else {
			Cookies.set('has_nin', false)
		}
		if(personal_info && personal_info?.location_keyword && personal_info?.state){
			dispatch(getAllLocationKeyword(personal_info?.state?.id))
		}else {
			dispatch(getAllLocationKeyword(1))
		}
	}, [personal_info])

	if (user) {
		return (
			<>
				{!Cookies.get('agent') && <ConfigViewPopup />}
				{/* <GetStartedPopup /> */}
				<GetMoreInfoPopup />
				{/* {Global.PLATFORM !== 'iPhone' && (
					<>
						<NotificationPopup />
						<LocationUpdatePopup />
					</>
				)} */}
				<PaymentPopup />
				<AppUpdatePopup />
				<LocationKeywordPopup />
				{Global.isMobile && <RobotMessage />}
			</>
		)
	} else {
		return null
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPopup)
