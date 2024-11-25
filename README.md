# BookShop - RiaJul Pro

A comprehensive Express.js application built with TypeScript and MongoDB, featuring CRUD operations for managing a book store. The project includes schema validation with Mongoose and offers functionality for inventory management, order processing, and revenue calculation.

## **Features**

- Add, update, delete, and fetch books.
- Place orders with dynamic inventory management.
- Search books by title, author, or category.
- Calculate total revenue from all orders using MongoDB aggregation.
- Robust error handling for validation, not found, and inventory issues.

---

## **Technologies Used**

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **API Testing:** Postman
- **Code Quality:** ESLint and Prettier

---

## **Setup Instructions**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/riajulpro/bookshop-l2a2-rp.git
   ```
2. **Install Dependencies:**
   ```bash
   cd bookshop-l2a2-rp
   npm install
   ```
3. **Set Environment Variables:**
   Create a `.env` file with the following:
   ```
   DATABASE_URL=mongodb+srv://your-mongodb-uri
   PORT=5000
   ```
4. **Run the Application:**
   ```bash
   npm run start:dev
   ```
5. **API Documentation:**
   Use Postman or any API client to test the endpoints.

## **API Endpoints**

### **Products (Books)**

| Action        | Method | Endpoint                   | Description                                                                                                         |
| ------------- | ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Create Book   | POST   | `/api/products`            | Adds a new book                                                                                                     |
| Get All Books | GET    | `/api/products`            | Retrieves all books or search with searchTerm with title, author and category name `/api/products?searchTerm=title` |
| Get Book      | GET    | `/api/products/:productId` | Fetches a specific book by ID                                                                                       |
| Update Book   | PUT    | `/api/products/:productId` | Updates details of a specific book                                                                                  |
| Delete Book   | DELETE | `/api/products/:productId` | Deletes a book by ID                                                                                                |

---

### **"Create Book" Data Body**

Use this format to send data as body into the books create api

```json
{
  "title": "1984",
  "author": "George Orwell",
  "price": 13.99,
  "category": "Fiction",
  "description": "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.",
  "quantity": 30
}
```

### **Orders**

| Action         | Method | Endpoint      | Description         |
| -------------- | ------ | ------------- | ------------------- |
| Place an Order | POST   | `/api/orders` | Creates a new order |

---

### **Data body**

```json
{
  "email": "mail@riajul.com",
  "productId": "67441a6e797b3d0685e6e7a9", // use valid productId
  "quantity": 3
}
```

---

### **Revenue**

| Action                  | Method | Endpoint              | Description                          |
| ----------------------- | ------ | --------------------- | ------------------------------------ |
| Calculate Total Revenue | GET    | `/api/orders/revenue` | Aggregates total revenue from orders |

## **Essential Links**

Live link: [explore the live server]()
