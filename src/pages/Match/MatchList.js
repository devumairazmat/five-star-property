import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import { Spinner } from "react-activity";
import styled from "styled-components";
import EachMatchCard from "./EachMatchCard";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Alice from "../../services/Alice";
import { getAllMySuggestion } from "../../redux/strapi_actions/alice.actions";
import { notifyEmy } from "../../services/Sheruta";


const NavBtn = styled.button`
    background-color: white;
    color: black;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20vh;
`;

export default function MatchList() {
    const { user_suggestions, loading } = useSelector((state) => state.alice);
    const { personal_info } = useSelector((state) => state.view);
    const { user } = useSelector(state => state.auth);
    const [showMessages, setShowMessage] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        Alice.suggestThemForMe(user?.user?.id);
        dispatch(getAllMySuggestion());
        setTimeout(() => {
            setShowMessage(false)
        }, 4000);
    }, []);

    const handleStatusUpdate = async (suggestion_id, status) => {
        try {
            const rejected = await Alice.rejectThisSuggestion(
                suggestion_id,
                status,
            );
            dispatch(getAllMySuggestion());
            // notifyEmy({ heading: `${status} someone as a suggestion`})
        } catch (error) {
            return Promise.reject(error);
        }
    };
    if(!user){
        return <Redirect to="/login" />
    }
    return (
			<div className="pb-0">
				{personal_info && !personal_info.nin ? (
					<div
						className="text-center"
						style={{ marginTop: '15vh', marginBottom: '20vh' }}
					>
						<h1 className="display-4">😢</h1>
						<h2>
							<b>Profile Not Yet Verified</b>
						</h2>
						<h4 className="fw-400">Verify your profile and view suggested flat mates</h4>
						<br />
						<Link to="/start">
							<Btn
								text="Get Started"
								className="p-1 pl-3 pr-3 mt-2"
								onClick={() => {}}
							/>
						</Link>
					</div>
				) : (
					<>
						{loading ? (
							<div
								className="d-flex justify-content-center"
								style={{ marginTop: '30vh' }}
							>
								<Spinner color="#00ba74" size={20} />
							</div>
						) : user_suggestions.length === 0 ? (
							<div
								// className="d-flex justify-content-center"
								className="text-center"
								style={{ marginTop: '20vh' }}
							>
								<h1>😔</h1>
								<h4>You have no more suggestions</h4>
							</div>
						) : (
							<div>
								{showMessages && (
									<div className="alert alert-info">
										<h4 className="mb-0">
											These are people we think you might be interested in.
										</h4>
									</div>
								)}
								<Carousel
									// indicators={false}
									interval={140000}
									className="pb-3 pt-0 p-3"
									nextIcon={
										<NavBtn className="shadow border-gray">Next</NavBtn>
									}
									prevIcon={
										<NavBtn className="shadow border-gray">Prev</NavBtn>
									}
								>
									{user_suggestions.map((val, i) => {
										return (
											<Carousel.Item key={`items-${i}`}>
												<EachMatchCard
													data={val}
													handleStatusUpdate={handleStatusUpdate}
												/>
											</Carousel.Item>
										)
									})}
								</Carousel>
							</div>
						)}
					</>
				)}
			</div>
		)
}
