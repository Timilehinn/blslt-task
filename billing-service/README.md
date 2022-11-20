# Billing Service

```
 this API accepts customerId and amount as parameters.

 Once the server starts up, the rabbitMQ connection is created and a pending transaction is created

```
- Endpoint: /deposit
- Method: POST
- body
   {
     String customerId: "63694f49f155b0...",
     String amount: "500"
   }
