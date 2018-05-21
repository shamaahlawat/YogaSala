import actionTypes from '../action_types';
import * as API from '../../config/api';

export function updateContactDetails(path, data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_ORDER_CONTACT_DETAILS,
            payload: data,
            path: path
        });
    };
}

export function updateTicketDetails(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_TICKET_DETAILS,
            payload: data
        });
    };
}

export function updateTicketQuantity(ticket_type, index, callback) {
    let payload = {
        ticket_type,
        index
    };

    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_TICKET_QUANTITY,
            payload,
        });
        callback();
    };
}

export function getTotalValue() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_TOTAL_VALUE,
        });
    };
}

export function submitOrderDetails(data) {
    console.log(data);
    return function (dispatch) {
        API.submitOrderDetails(data, (err, res) => {
            console.log(data);
            console.log(res);
            if (!err) {
                dispatch({
                    type: actionTypes.SUBMIT_ORDER_REQUEST,
                    payload: res
                });

                let order_details = {
                    ...res,
                    total_count: data.order_items_attributes.length,
                    email: res.email,
                    phone: res.phone
                };
                openRazorPay(dispatch, order_details);
            }
        });
    };
}

function openRazorPay(dispatch, order) {
    window.openPaymentPage(order, function (razorResponse) {
        dispatch({
            type: actionTypes.ORDER_UPDATING,
            payload: {
                razorpay_id: razorResponse.razorpay_payment_id
            }
        });

        API.updatePaymentStatus({
            order_id: order.id, razorpay_id: razorResponse.razorpay_payment_id, amount: order.total
        }).then(function (res) {
            dispatch({
                type: actionTypes.ORDER_UPDATED,
                payload: res
            });
            // dispatch({
            //     type: actionTypes.LOAD_CONFIRMATION_PAGE
            // });
        }).catch(function () {
            dispatch({
                type: actionTypes.ORDER_UPDATE_ERR
            });
        });
    });
}





