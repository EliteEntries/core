import { getAlpacaPrices, getAlpacaCandles, getAlpacaLatestCandles } from "../exchanges/alpaca";

export const getPrices = async (data: any): Promise<any> => {
    return getAlpacaPrices(data)
}

export const getCandles = async (data: any): Promise<any> => {
    return getAlpacaCandles(data)
}

export const getLatestCandles = async (data: any): Promise<any> => {
    return getAlpacaLatestCandles(data)
}