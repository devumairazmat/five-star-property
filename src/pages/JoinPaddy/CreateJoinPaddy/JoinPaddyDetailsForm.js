import React, { useEffect, useState } from 'react'
import RequestService from '../../../services/RequestService'
import { Dots } from 'react-activity'
import { Radio } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Select from 'react-select'
import { useSelector } from 'react-redux'

export default function JoinPaddyDetailsFrom({ joinPaddyData, setData, done }) {
	const { user } = useSelector((state) => state.auth)
	const [request, setRequest] = useState(null)
	const [loading, setLoading] = useState(true)
	const [state, setState] = useState({
		budget: null,
		bedrooms: null,
		toilets: null,
		bathrooms: null,
		settingrooms: null,
		agenda: null,
	})

	useEffect(() => {
		setData({ ...joinPaddyData, ...state })
	}, [state])

	useEffect(async () => {
		try {
			setLoading(true)
			const res = await RequestService.getUserRequestByUserId(user?.user?.id)
			setRequest(res.data[0])
			console.log('REQUEST --', res.data[0])
			setLoading(false)
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		const { bedrooms, toilets, budget, agenda } = joinPaddyData
		if (bedrooms && toilets && budget && agenda) {
			done()
		}
	}, [joinPaddyData])

	useEffect(() => {
		if (request) {
			setState({
				budget: request.budget,
				bedrooms: request.bedrooms,
				toilets: request.toilets,
				bathrooms: request.bathrooms,
			})
		}
	}, [request])

	if (loading) {
		return (
			<div>
				<div className="d-flex justify-content-center mt-5 mb-5 text-center">
					<div>
						<h5>Please Wait</h5>
						<Dots />
					</div>
				</div>
			</div>
		)
	};

	const onChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	return (
		<div>
			<form action="#">
				{request && request.bedrooms && (
					<div className="alert alert-info text-center p-1">
						<h5 className="fw-700 mb-0">Auto filled from your request</h5>
					</div>
				)}

				<div className="row">
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Bedrooms</label>
							<input
								required
								type="number"
								name="bedrooms"
								className="form-control"
								defaultValue={state.bedrooms}
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Toilet</label>
							<input
								required
								type="number"
								name="toilets"
								className="form-control"
								defaultValue={state.toilets}
								onChange={onChange}
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Budget</label>
							<input
								required
								type="number"
								name="budget"
								className="form-control"
								defaultValue={state.budget}
								onChange={onChange}
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">
								Can You Change Budget?
							</label>
							<br />
							<Radio.Group
								options={[
									{ label: 'Yes', value: true },
									{ label: 'No', value: false },
								]}
								onChange={(e) => {
									setData({ ...joinPaddyData, change_budget: e.target.value })
								}}
								value={joinPaddyData?.change_budget}
								optionType="button"
							/>
						</div>
					</div>

					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Newly Built?</label>
							<br />
							<Radio.Group
								options={[
									{ label: 'Yes', value: true },
									{ label: 'No', value: false },
								]}
								onChange={(e) =>
									setData({ ...joinPaddyData, newly_built: e.target.value })
								}
								value={joinPaddyData?.newly_built}
								optionType="button"
							/>
						</div>
					</div>
					<div className="col-lg-12 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Agenda</label>
							<TextArea
								showCount
								defaultValue={joinPaddyData?.agenda}
								placeholder="Let's come together to find an apartment"
								maxLength={400}
								style={{ height: 100 }}
								onChange={(e) =>
									setData({ ...joinPaddyData, agenda: e.target.value })
								}
								required
							/>
							{/* <p>{state.body}</p> */}
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
