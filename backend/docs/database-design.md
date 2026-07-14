# StockFlow Database Design

## Overview

StockFlow uses MongoDB as its primary database.

The system is designed to support inventory management, point of sale operations, reporting, user management, and future scalability.

---

## Collections

### Users

Stores all employee accounts.

Fields

- employeeId
- name
- email
- phone
- password
- role
- profileImage
- isActive
- lastLogin
- createdAt
- updatedAt

---

### Categories

Stores product categories.

Fields

- name
- description
- createdAt
- updatedAt

---

### Suppliers

Stores supplier information.

Fields

- companyName
- contactPerson
- phone
- email
- address

---

### Products

Stores all products.

Fields

- barcode
- name
- description
- category
- supplier
- buyingPrice
- sellingPrice
- stock
- minimumStock
- image
- isActive

---

### Customers

Stores customer information.

Fields

- name
- phone
- email
- loyaltyPoints

---

### Sales

Stores completed sales.

Fields

- saleNumber
- cashier
- customer
- items
- subtotal
- discount
- tax
- total
- paymentMethod
- paymentStatus

---

### Future Collections

- Purchases
- PurchaseItems
- Returns
- Expenses
- AuditLogs
- Notifications
- Settings
- Counters