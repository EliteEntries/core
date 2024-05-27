import { getAlpacaOrders, getAlpacaPositions } from "../exchanges/alpaca";

export const getOrders = async (user: any, data: any): Promise<any> => {
        return getAlpacaOrders(data)
};

export const getPositions = async (user: any, data: any): Promise<any> => {
        return getAlpacaPositions(data)
};