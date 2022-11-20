## Setting up on Docker

## Note - Make sure you have docker installed
- To install docker, visit: https://www.docker.com/products/docker-desktop/

- Navigate to the main app folder
- RUN: 
    docker-compose build &&
    docker-compose start
- The above step spins up new images for the services, Mongodb & RabbitMQ
  and runs the server at `http://localhost:3001`

## Customer deposit
- Endpoint: /deposit
- Method: POST
 - body
   {
     String email: "test@test.com",
     String amount: "500"
   }

## Get balance
- Endpoint: /get-balance
- Method: GET
 - Query
   {
     email: "test@test.com",
   }
   i.e /get-balance?email=test@test.com

## Get Transactions
- Endpoint: /get-transactions
- Method: GET
 - Query
   {
     email: "test@test.com",
   }
   i.e /get-transactions?email=test@test.com