# Elite Entries Core Package

**Version:** 0.0.1  
**Author:** George Abreu Jr.  
**License:** GPL-3.0-only  
**Repository:** [Elite Entries API](https://github.com/elitentries/api)

---

## Overview

Elite Entries is a core trading package designed to interact with Alpaca's trading API. The package provides essential functions to manage accounts, place and cancel orders, and retrieve stock prices and candle data. Currently, **Elite Entries only supports equities trading via Alpaca**, but future versions will include support for **cryptocurrency and options trading**.

### Features:
- **Account Functions:** Retrieve current orders and positions.
- **Trading Functions:** Place and cancel orders on Alpaca.
- **Price Data:** Fetch real-time prices and candle data (historical and latest).
  
### Alpaca Integration:
Elite Entries utilizes Alpaca's API for its functionality. You need to provide your Alpaca API key and secret when using the package.

---

## Installation

```bash
npm install elite-entries
```
---

## Usage

To use the package, import the available functions as follows:

```typescript
import { 
  getOrders, 
  getPositions, 
  placeOrder, 
  cancelOrder, 
  getPrices, 
  getCandles, 
  getLatestCandles 
} from 'elite-entries';

// Retrieve account orders
getOrders(user, { key: '<ALPACA_KEY>', secret: '<ALPACA_SECRET>', paper: true });

// Place a trade
placeOrder({
  order: { 
    symbol: 'AAPL', 
    qty: 1, 
    side: 'buy', 
    type: 'market', 
    time_in_force: 'day' 
  },
  key: '<ALPACA_KEY>',
  secret: '<ALPACA_SECRET>',
  paper: true
});
```

---

## API Documentation (TODO)

### Account Functions

- **`getOrders(user, data)`**  
  Retrieve orders from the Alpaca account.

- **`getPositions(user, data)`**  
  Retrieve current positions from the Alpaca account.

### Trade Functions

- **`placeOrder(data)`**  
  Place an order with Alpaca. Ensure the order object is valid by following the requirements (e.g., `symbol`, `qty`, `side`, `type`, `time_in_force`).

- **`cancelOrder(data)`**  
  Cancel an active order on Alpaca.

### Price Functions

- **`getPrices(data)`**  
  Get the latest prices for the given symbols.

- **`getCandles(data)`**  
  Retrieve historical candles for specific symbols.

- **`getLatestCandles(data)`**  
  Retrieve the latest candles for specific stocks.

---

## Roadmap

- **Upcoming Features:**
  - **Cryptocurrency Support**
  - **Options Trading Support**

Currently, only equities are supported. Stay tuned for future updates with extended asset support.

---

## Contributing

Feel free to report issues or contribute to this project via GitHub:  
[Elite Entries GitHub Issues](https://github.com/elitentries/api/issues)

