import React from 'react'
import { Carousel } from 'react-bootstrap'
import Heading from '../../components/Heading/Heading'
import Global from '../../Global'

const EachQuote = ({ full_name, review_text, role }) => {
	return (
		<article className="card rounded-xl shadow-sm" style={{ height: Global.isMobile ?'54vh': "35vh" }}>
			<div className="card-body">
				<div className="testimonial_post">
					<div className="thumb d-flex">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/DONT%20DELETE%2F878597_user_512x512.png?alt=media&token=34573067-2e82-4b7f-8765-ee7b20ff0ba9"
							alt="1.jpg"
							style={{ height: '90px', marginTop: '10px' }}
						/>
						<div className="ml-3">
							<h2 className="title mt-3">
								<b>{full_name}</b>
							</h2>
							<small className="text-thm">{role}</small>
						</div>
					</div>
					<hr />
					<div className="details">
						<div className="icon text-thm">
							<span className="fa fa-quote-left"></span>
						</div>
						<p style={{ fontSize: '18px' }}>{review_text}</p>
					</div>
				</div>
			</div>
		</article>
	)
}

export default function WhatPeopleSay() {
	return (
		<article className="bgc-f7 pb-5 pt-4 bg-accent rounded-xl">
			<div className="container ">
				<h1 className="mt-2 mb-4 text-white text-center display-5">
					<b>Testimonials</b>
				</h1>
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-7">
						<div
							className="smart-textimonials smart-light slick-initialized slick-slider"
							id="smart-textimonials"
						>
							<Carousel controls={false} indicators={false}>
								<Carousel.Item>
									<EachQuote
										review_text="My apartment rent went up and i
                                            didnt want to loose the apartment
                                            and move into smaller space. I had a
                                            spare room and listed it on
                                            sheruta.ng, they provided me with
                                            the best flatmate with no wahala at
                                            all."
										full_name="Onyinye"
										role="CEO Of Onyx Hair"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<EachQuote
										review_text="Apartment search has been really
                                            stressfull for me especially with my
                                            kind of job. I came across the
                                            platform online and i got a space
                                            within days within my budget."
										full_name="Uche"
										role="Pharmacist"
									/>
								</Carousel.Item>
								{/* <Carousel.Item>
											<img
												className="d-block w-100"
												src="holder.js/800x400?text=Third slide&bg=20232a"
												alt="Third slide"
											/>

											<Carousel.Caption>
												<h3>Third slide label</h3>
												<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
											</Carousel.Caption>
										</Carousel.Item> */}
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}
