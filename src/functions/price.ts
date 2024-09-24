import { getAlpacaCandles, getAlpacaLatestStockCandles, getAlpacaPrices } from "../exchanges/alpaca";

export const getPrices = async (data: any): Promise<any> => {
    return getAlpacaPrices(data)
}

export const getCandles = async (data: any): Promise<any> => {
    return getAlpacaCandles(data)
}

//! Temporarily only stock
export const getLatestCandles = async (data: any): Promise<any> => {
    return getAlpacaLatestStockCandles(data)
}