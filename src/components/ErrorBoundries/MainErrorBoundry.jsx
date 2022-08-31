import React from 'react'
import { notifyEmy } from '../../services/Sheruta'

export default class MainErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo)
        // console.log('THE ERROR --', error, errorInfo)
		const state = JSON.parse(localStorage.getItem('state'))
		notifyEmy({
			heading: `⛔ THE SITE HAS CRASHED ⛔ please check log`,
			log: {
				url: window.location.pathname,
				error,
				errorInfo,
				state: {
					personal_info: state?.view?.personal_info,
					user: state?.auth?.user,
					view_location_keyword: state?.view?.location_keywords
				}
			},
		})
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div style={{ minHeight: '90px' }} className="text-center pt-5">
                    <h1>An Error Occurred</h1>
					<img
						src={
							'https://i.pinimg.com/originals/f7/5d/e6/f75de6a33bb3e791f5dddd9337d300bc.png'
						}
                        width="600"
                        alt='error'
					/><br />
                    <button className='btn bg-accent text-white' onClick={() => window.location.reload()}>Reload Page</button>
				</div>
			)
		}

		return this.props.children
	}
}
