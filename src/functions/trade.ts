import { sendAlpacaOrder, cancelAlpacaOrder } from "../exchanges/alpaca";

export const placeOrder = async (data: any): Promise<any> => {
    return sendAlpacaOrder(data);
}

export const cancelOrder = async (data: any): Promise<any> => {
    return cancelAlpacaOrder(data);
}

export default {
    placeOrder,
    cancelOrder,
}