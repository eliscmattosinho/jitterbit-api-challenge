# Jitterbit - Technical Challenge: Professional Services

## About

This repository contains the implementation of a REST API developed in **Node.js** for managing orders. The project is part of the theoretical and practical test by **Jitterbit** for the Professional Services position.

The application focuses on data integration, receiving payloads in a specific format, performing field transformation (mapping), and persisting them in a **MongoDB** database.

<br />

## Technologies and Tools

- **Runtime:** Node.js
- **Language:** JavaScript
- **Web framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Architecture:** Simplified MVC (Model-View-Controller) for organization and scalability.

<br />

## API Endpoints

The API is configured to operate on `localhost:3000` as per requirements.

### Mandatory

- **Create Order** (`POST /order`): Receives raw data, applies the mapping (from-to), and saves it to the database.
- **Get Order** (`GET /order/:orderId`): Returns specific order data based on the URL parameter.

### Optional

- **List All** (`GET /order/list`): Lists all registered orders.
- **Update** (`PUT /order/:orderId`): Updates information for an existing order.
- **Delete** (`DELETE /order/:orderId`): Removes an order from the database.

<br />

## Data Mapping (Transformation)

A central requirement is the transformation of the input JSON into the persistence format. Below is the mapping table applied:

| Input Field (Body)      | Output Field (Database)   |
| :---------------------- | :------------------------ |
| `numeroPedido`          | `orderId`                 |
| `valorTotal`            | `value`                   |
| `dataCriacao`           | `creationDate`            |
| `items` (array)         | `items` (array)           |
| `items.idItem`          | `items.productId`         |
| `items.quantidadeItem`  | `items.quantity`          |
| `items.valorItem`       | `items.price`             |

> **Note:** The creation date is converted to ISO (Z) standard as specified in the challenge.

<br />

## Basis Folder Structure

```text
src/
├── config/          # MongoDB Connection
├── controllers/     # Control logic and HTTP responses
├── models/          # Schemas and Modeling (Mongoose)
├── routes/          # Route definitions (Express)
├── utils/           # Mapping functions and Helpers
└── app.js           # Server initialization
