import { getOrders, getPositions } from "./functions/account";
import { placeOrder, cancelOrder } from "./functions/trade";
import { getPrices, getCandles, getLatestCandles } from "./functions/price";

export const account = {
    getOrders,
    getPositions,
}

export const trade = {
    placeOrder,
    cancelOrder,
}

export const price = {
    getPrices,
    getCandles,
    getLatestCandles,
}

export {
    getOrders,
    getPositions,
    placeOrder,
    cancelOrder,
    getPrices,
    getCandles,
    getLatestCandles,
}

export default {
    getOrders,
    getPositions,
    placeOrder,
    cancelOrder,
    getPrices,
    getCandles,
    getLatestCandles,
    account,
    trade,

}
