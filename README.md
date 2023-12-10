For locally run the project
command: npm run dev
1.For creating user :
Method : post
Endpoint :https://assignment-2-six-murex.vercel.app/
Request Body :
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
2. Retrieve a list of all users
Method : get
Endpoint : https://assignment-2-six-murex.vercel.app/api/users
3. Retrieve a specific user by ID
Method : get
Endpoint : https://assignment-2-six-murex.vercel.app/api/users/:userId
4. Update user information
Method : put
Endpoint : https://assignment-2-six-murex.vercel.app/api/users/:userId

5. Delete a user
Method : delete
Endpoint : https://assignment-2-six-murex.vercel.app/api/users/:userId

6. Add a New order
Method : put
Endpoint : https://assignment-2-six-murex.vercel.app/api/users/:userId/orders
Request Body:
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
7. Retrieve all orders for a specific user
Method : get
Endpoint :  https://assignment-2-six-murex.vercel.app/api/users/:userId/orders
Response :
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
8. Calculate Total Price of Orders for a Specific User
Method : get
Endpoint :  https://assignment-2-six-murex.vercel.app/api/users/:userId/orders/total-price
Response :
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}