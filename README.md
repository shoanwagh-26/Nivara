# Nivara — Retail Trading Platform

### From market watchlist to portfolio state — a full-stack trading experience inspired by modern Indian brokerage platforms.

Nivara is a full-stack trading platform built around the core loop of retail investing:

**discover a stock → evaluate it → take a position → reflect the transaction in the portfolio.**

The project was built to understand how that loop can be represented across a frontend interface, backend APIs, application logic, and persistent data rather than treating a trading platform as a collection of dashboard screens.

## Live Demo

Coming Soon...

## The Core Experience

- **Market View** — Users can explore available stocks and their relevant market information from a trading-oriented dashboard.
- **Trading Actions** — Buy and sell interactions are connected to the application's backend workflow.
- **Portfolio State** — Trading activity is reflected in the user's holdings and portfolio information.
- **Transaction Flow** — Trading-related data is processed and persisted rather than remaining as temporary frontend state.
- **Account-Specific Data** — Investment-related information is associated with individual users.
- **Trading Dashboard** — Market information, portfolio information, and trading actions are brought together within the same application experience.

## What Makes the Project Technically Interesting

Nivara is built around a simple principle:

> **A trading action should change application state, not just the screen.**

A user's interaction with the trading interface moves through the application and ultimately affects the data represented in their portfolio.

This required connecting the frontend interaction layer with backend request handling and persistent database state.

## Engineering Decisions

### Authentication & Authorization

Nivara separates authentication from authorization to protect account-specific trading functionality.

Authentication verifies the user's identity before accessing protected features, while authorization controls whether the authenticated user is permitted to perform user-specific operations.

This ensures that portfolio and trading-related actions are handled within the context of the authenticated account rather than being treated as unrestricted application actions.

### State follows the transaction

Buy and sell operations are treated as application workflows. The resulting portfolio state is derived from the underlying transaction rather than relying on hardcoded interface values.

### User data remains user-specific

Portfolio and transaction-related information is associated with the relevant account, allowing the application to maintain separate investment states for different users.

### Frontend and backend have defined responsibilities

The frontend is responsible for presenting market and portfolio information and capturing user actions. The backend handles application operations and communicates with persistent data.

## Built With

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** AWS

## Project Scope

Nivara is an educational implementation inspired by retail brokerage platforms. It does not connect to a real stock exchange or execute real financial trades.

The objective was to understand the **software workflows behind a trading product** — particularly the relationship between user actions, backend processing, and persistent portfolio state.
