import React from 'react';

const ReviewBody = ({ image, name, username, body }) => {
    return (
        <div className="review-body">
            <div className="d-flex align-items-center">
                <img className="img-fluid rounded-circle shadow" width="60" src={image} alt={username} />
                <div className="d-flex flex-column ml-3">
                    <h6 className="mb-0" style={{ fontWeight: '600' }}>
                        {name}
                    </h6>
                    <span>{username}</span>
                </div>
            </div>
            <p className="mt-3">{body}</p>
            <hr />
        </div>
    );
};

export default ReviewBody;
