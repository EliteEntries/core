import Alpaca from "@alpacahq/alpaca-trade-api";

/**
 * Checks if order is valid
 * @param {Order} order Order to check
 * @throws Error if order is invalid
 */
export function checkOrder(order: any) {
  if (!order?.type) throw new Error("Order type required");
  if (order.type == "market" || order.type == "limit" ||
  order.type == "stop" || order.type == "stop_limit" ||
  order.type == "trailing_stop") {
    // check if order is valid
    if (order.type == "limit" || order.type == "stop_limit") {
      if (!order.limit_price) {
        throw new Error("Limit price required");
      }
    }
    if (order.type == "stop" || order.type == "stop_limit") {
      if (!order.stop_price) {
        throw new Error("Stop price required");
      }
    }
    if (order.type == "trailing_stop") {
      if (!order.trail_price && !order.trail_percent) {
        throw new Error("Trail price or trail percent required");
      }
    }
    // check if all required fields are present
    if (!order.symbol || !order.side || !order.time_in_force) {
      throw new Error("Missing required fields");
    }
    // check if one of notional or qty is present
    if (!order.notional && !order.qty) {
      throw new Error("Notional or qty required");
    }
    // check if both notional and qty are present
    if (order.notional && order.qty) {
      throw new Error("Notional or qty required, not both");
    }
    /* if notional is set, order type must be market
         and time in force must be day */
    if (order.notional) {
      if (order.time_in_force != "day") {
        throw new Error("Notional must be day order");
      }
    }
  } else {
    throw new Error("Order type not valid");
  }
}

/** Send Order
 * Sends order to alpaca
 * @param {reqData} data
 * @return {Promise<any>} response from alpaca
 */
export async function sendAlpacaOrder(data: any):
    Promise<any> {
  const {order, key, secret, paper}: any = data;

  // check order type for validity
  checkOrder(order);

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // send order to alpaca
  const resp = await alpaca.createOrder(order);
  return resp;
}

/** Cancel Order
 * Cancels order on alpaca
 * @param {reqData} data
 * @return {Promise<any>} response from alpaca
 */
export async function cancelAlpacaOrder(data: any):
  Promise<any> {
  const {order, key, secret, paper}: any = data;
  if (!order) throw new Error("Order id required");

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // cancel order on alpaca
  const resp = await alpaca.cancelOrder(order);
  return resp;
}

/** Get Orders
 * Get orders from alpaca
 * @param {reqData} data
 * @return {Promise<any>} response from alpaca
 */
export async function getAlpacaOrders(data: any):
  Promise<any> {
  const {key, secret, paper}: any = data;

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // get orders from alpaca
  const resp = await alpaca.getOrders();
  return resp;
}

/** Get Positions
 * Get positions from alpaca
 * @param {reqData} data
 * @return {Promise<any>} response from alpaca
 */
export async function getAlpacaPositions(
  data: any):Promise<any> {
  const {key, secret, paper}: any = data;

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // get positions from alpaca
  const resp = await alpaca.getPositions();
  return resp;
}

/** Get Candles
 * Get candles from alpaca
 * @param {reqData} data
 * @return {any[]} response from alpaca
 */
export async function getAlpacaCandles(
  data: any):Promise<any> {
  let {key, secret, paper, symbols, limit}: any = data;
  let {start, end, timeframe} = data;
  if (!symbols) throw new Error("At least one symbol required");
  if (!timeframe) timeframe = '1day';

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // get candles from alpaca
  if (!Array.isArray(symbols)) symbols = [symbols]
  const resp = await alpaca.getMultiBarsV2(symbols, {
    start, end, limit, timeframe, feed: 'iex'  
  })
  console.log(Object.keys(resp))
  const bars = [];
  for await (let b of resp) {
    bars.push(b);
  }
  return bars;
}

/** Get Latest Candles
 * Get latest candles from alpaca
 * @param {reqData} data
 * @return {any[]} response from alpaca
 */
export async function getAlpacaLatestCandles(
  data: any):Promise<any> {
  let {key, secret, symbols, paper}: any = data;
  if (!symbols) throw new Error("At least one symbol required");

  // create alpaca instance
  const alpaca = new Alpaca({
    keyId: key || process.env.ALPACA_KEY,
    secretKey: secret || process.env.ALPACA_SECRET,
    paper: paper || false,
  });

  // get latest candles from alpaca
  if (!Array.isArray(symbols)) symbols = [symbols]
  const resp = await alpaca.getLatestBars(symbols)
  const bars = [];
  for await (let b of resp) {
    bars.push(b);
  }
  return bars;
}

/** Get Latest Stock Candles
 * Get latest stock candles from alpaca
 * @param {reqData} data
 * @return {any[]} response from alpaca
 */
export async function getAlpacaLatestStockCandles(data:any): Promise<any> {
  let {key, secret, symbols, paper, limit, start, end, timeframe}: any = data;
  if (!symbols) throw new Error("At least one symbol required");
  if (!timeframe) timeframe = '1day';
  if (!Array.isArray(symbols)) symbols = [symbols]
  symbols = (symbols as string[]).join(',');
  limit = limit || 1;
  start = start || new Date(new Date().setDate(new Date().getDate() - 365)).toISOString();
  end = end || null;
  const baseUrl = 'https://data.alpaca.markets/v2/stocks/bars?&adjustment=raw&feed=iex&sort=desc';
  let url = `${baseUrl}&symbols=${symbols}&limit=${limit}&start=${start}&timeframe=${timeframe}`;
  if (end) url += `&end=${end}`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': key || process.env.ALPACA_KEY,
      'APCA-API-SECRET-KEY': secret || process.env.ALPACA_SECRET
    }
  }; 

  try {
    const res = await fetch(url,options);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error('error:', e);
    return e;
  }
}

/** Get Stock Prices
 * Get prices from alpaca
 * @param {reqData} data
 * @return {Promise<any>} response from alpaca
 */
export async function getAlpacaPrices(
  data: any):Promise<any> {
  let {key, secret, symbols, paper}: any = data;
  if (!symbols) throw new Error("At least one symbol required");
  if (!Array.isArray(symbols)) symbols = [symbols]
  const baseUrl = `https://data.alpaca.markets/v2/stocks/trades/latest?feed=iex&symbols=`
  let url = baseUrl + symbols.join(',');
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': key || process.env.ALPACA_KEY,
      'APCA-API-SECRET-KEY': secret || process.env.ALPACA_SECRET
    }
  };
  try {
    const res = await fetch(url,options);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error('error:', e);
    return e;
  }
}