import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Spinner } from "react-activity";
import axios from "axios";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import { notification } from "antd";
import { notifyEmy } from "../../services/Sheruta";

export default function MessageNew(props) {
    const guestUser = props.match.params?.user_id;
    const { user } = useSelector((state) => state.auth);
    const [conv_id, set_conv_id] = useState(null);

    const createNewConversation = (owner, guest) => {
        axios(process.env.REACT_APP_API_URL + `/conversations`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            data: {
                owner,
                guest,
                uuid: uuid() + "@" + owner + "@" + guest,
                last_visited: new Date().toJSON()
            },
        })
            .then((res) => {
                set_conv_id(res.data.uuid);
                notifyEmy({ heading: "stared a new conversation"})
            })
            .catch((err) => {
                notifyEmy({ heading: "Error starting a new conversation", status: 'error', log: err });
                notification.error({ message: "Error creating conversation" });
            });
    };

    useEffect(async () => {
        try {
            const notOwner = await axios(
                process.env.REACT_APP_API_URL +
                    `/conversations/?owner=${guestUser}&guest=${user.user.id}`,
            );
            const authIsOwner = await axios(
                process.env.REACT_APP_API_URL +
                    `/conversations/?guest=${guestUser}&owner=${user.user.id}`,
            );
            if (notOwner.data.length === 0 && authIsOwner.data.length === 0) {
                createNewConversation(user.user.id, guestUser);
            }else if(authIsOwner.data.length > 0){
                set_conv_id(authIsOwner.data[0].uuid)
            }else if(notOwner.data.length > 0){
                set_conv_id(notOwner.data[0].uuid);
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }, []);

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (conv_id) {
        return <Redirect to={`/messages/${conv_id}`} />;
    }

    return (
        <Layout>
            <section class="error-wrap mt-4">
                <div
                    class="container"
                    style={{ paddingTop: "10vh", height: "50vh" }}
                >
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-10 text-center">
                            <h4>Loading</h4>
                            <h6 className="mt-2">Please Wait...</h6>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
