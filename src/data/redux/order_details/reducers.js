import actionTypes from '../action_types';
import states from './states';
import dotProp from 'dot-prop-immutable';
// import _ from 'lodash';

import * as CONSTANTS from '../../config/constants';

export default function order_details(state = states.order_details, action) {
    let index = -1;
    let ticket = {};
    let total = 0;

    switch (action.type) {

        case actionTypes.UPDATE_ORDER_CONTACT_DETAILS:
            return dotProp.set(state, action.path, action.payload);

        case actionTypes.UPDATE_TICKET_DETAILS: {
            let tickets = [...action.payload];
            tickets.map((ticket, index) => {
                tickets[index] = Object.assign({}, ticket, { quantity: (index === 0) ? 1 : 0 });
            });

            return {
                ...state,
                total_value: tickets[0].price,
                tickets
            };
        }

        case actionTypes.SUBMIT_ORDER_REQUEST:
            return {
                ...state,
                contact_details: states.order_details.contact_details,
                tickets: [],
                total_value: 0
            };

        case actionTypes.SHOW_TICKET_CONFIRM_POPUP:
            return {
                ...state,
                loaders: {
                    success: true
                }
            };

        case actionTypes.UPDATE_TICKET_QUANTITY:
            index = action.payload.index;
            ticket = {
                ...state.tickets[index],
                quantity: action.payload.ticket_type === CONSTANTS.ticketCounterTypes.INCREASE ?
                    (state.tickets[index].quantity + 1) :
                    ((action.payload.ticket_type === CONSTANTS.ticketCounterTypes.DECREASE && state.tickets[index].quantity !== 0) ?
                        state.tickets[index].quantity - 1 : state.tickets[index].quantity)
            };
            for (let i = 0; i < state.tickets.length; i++) {
                total = total + state.tickets[i].price * state.tickets[i].quantity;
            }
            return {
                ...state,
                tickets: [...state.tickets.slice(0, index), ticket, ...state.tickets.slice(index + 1)],
                total_value: total
            };

        case actionTypes.GET_TOTAL_VALUE:
            for (let i = 0; i < state.tickets.length; i++) {
                total = total + state.tickets[i].price * state.tickets[i].quantity;
            }
            return {
                ...state,
                total_value: total
            };

        // case actionTypes.ORDER_ADDED: {
        //     return {
        //         ...state,
        //         payment_details: action.payload.order_details,
        //     };
        // }

        case actionTypes.ORDER_UPDATING: {
            return {
                ...state,
                razorpay_id: action.payload.razorpay_id,
            };
        }

        case actionTypes.ORDER_UPDATED: {
            return {
                ...state,
                order_details: action.payload.order_details,
            };
        }

        default:
            return state;
    }
}
