## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/shawn291989/food-delivery-backend/edit/gh-pages/docs/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/shawn291989/food-delivery-backend/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.

# Food Delivery System Backend
This is an API server, and a backing relational database that will allow a front-end client to navigate through that sea of data easily, and intuitively. The front-end team will use the documentation to build the front-end clients.

The APIs will cover below features:

1. List all restaurants that are open at a certain datetime
2. List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically. More or less (than x) is a parameter that the API allows the consumer to enter.
3. Search for restaurants or dishes by name, ranked by relevance to search term
4. Process a user purchasing a dish from a restaurant, handling all relevant data changes in an atomic transaction. Do watch out for potential race conditions that can arise from concurrent transactions!

Set up Guideline for Application
To install required packages, from the terminal, run


yarn install
To run database migration,


yarn run typeorm migration:run
To run the application,


yarn start dev
To establish database connectivity a dotenv (.env) file needs to be created at the root directory of the application folder.

Here are the credentials to put on .env file:


ENV=development
PORT=3000
REQUEST_LIMIT=100kb

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=USERNAME
DB_PASSWORD=PASSWORD
DB_DATABASE=DATABASENAME

 

API Implementation Guideline
1st Task,
List all restaurants that are open at a certain DateTime

API Behavior:
A GET request should be made with DateTime in 2022-07-27 11:30:00 this formate. The API will return an array of the restaurants that are open at the given DateTime. 

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?dateTime=
Method: GET

Postman cURL: 


curl --location --request GET 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?dateTime=2022-07-27 11:30:00&qRestaurantName=&qDishName=' \
--data-raw ''
 

Sample Request:


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?dateTime=2022-07-27 11:30:00
 

Sample Success Response:

HTTP status code: 200

{
    "RestaurantName": [
        "Ulu Ocean Grill and Sushi Lounge",
        "1515 Restaurant",
        "024 Grille"
    ]
}
 

Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": [
        "dateTime must be a valid ISO 8601 date string"
    ],
    "error": "Bad Request"
}
 

HTTP status code: 404

{
    "statusCode": 404,
    "message": "No Restaurent found",
    "error": "Not Found"
}
 

2nd Task,
2. List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically. More or less (than x) is a parameter that the API allows the consumer to enter.

API Behavior:
A GET request should be made with the parameters named, dishesHaveMoreThan , dishesHaveLessThan, lowerPrice & topPrice as the query strings. 

In lowerPrice & topPrice there needs to put a price range, eg,lowerPrice=5&topPrice=30 dishesHaveMoreThan="highest number of dishes available with the price range should return as result” & dishesHaveLessThan="lowest number of dishes available with the price range should return as result” eg. disheshHaveMoreThan=20&dishesHaveLessThan=5

So, API will return a list of restaurants with more or less than x number of dishes within a price range. Results are ranked alphabetically.

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/top-restaurants?dishesHaveMoreThan=&dishesHaveLessThan=&lowerPrice=&topPrice=
 

Method: GET

Postman cURL: 


curl --location --request GET 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/top-restaurants?dishesHaveMoreThan=1&dishesHaveLessThan=40&lowerPrice=1&topPrice=50' \
--data-raw ''
 

Sample Request:


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/top-restaurants?dishesHaveMoreThan=1&dishesHaveLessThan=40&lowerPrice=1&topPrice=50
 

Sample Success Response:

HTTP status code: 200

{
    "RestaurantName": [
        "1515 Restaurant"
    ]
}
 

Sample Error Response:

HTTP status code: 404

{
    "statusCode": 404,
    "message": "No Restaurent is found !!!",
    "error": "Not Found"
}
 

3rd Task
3. Search for restaurants or dishes by name, ranked by relevance to search term

API Behavior:
A GET request should be made with the parameters, qRestaurantName & qDishNameThe API will return a list of restaurants by restaurant name & dish name. , ranked by relevance to search term

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?qRestaurantName=&qDishName=
Method: GET

Postman cURL: 


curl --location --request GET 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?qRestaurantName=1515 Restaurant&qDishName=Oysters' \
--data-raw ''
 

Sample Request:


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants?qRestaurantName=1515 Restaurant&qDishName=Oysters
 

Sample Success Response:

HTTP status code: 200

{
    "RestaurantName": [
        "1515 Restaurant"
    ]
}
 

Sample Error Response:

HTTP status code: 404

{
    "statusCode": 404,
    "message": "No Restaurent is found !!!",
    "error": "Not Found"
}
 

4th Task
4. Process a user purchasing a dish from a restaurant, handling all relevant data changes in an atomic transaction. Do watch out for potential race conditions that can arise from concurrent transactions!

API Behavior:
To make a purchase a POST request should be made with the below parameters in the API request body:

‘name' which is the name of the user/customer. 'dishName' which dish is to be purchased. 'restaurantName’ from which restaurant user is willing to purchase. 'transactionAmount' amount needs to purchase the dish item.

After a successful transaction, the inventory of the dish item will be deducted by 1. The cash balance of the user/customer will be deducted by the transaction amount. The cash balance of the restaurant will be increased by the transaction amount.

Before proceeding to purchase, a user needs to be registered with the cash balance first. there is a separate API to accomplish this purpose.

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/purchase
Method: POST

Postman cURL: 


curl --location --request POST 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/purchase' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Edith Johnson",
    "dishName": "Watercress",
    "restaurantName": "1515 Restaurant",
    "transactionAmount": 10.25
}'
 

Sample Success Response:

HTTP status code: 200

{
    "userName": "Edith Johnson",
    "dishName": "Watercress",
    "availabeInventory": 29,
    "restaurantName": "1515 Restaurant",
    "transactionAmount": 10.25,
    "userCashBalance": 690.45,
    "restaurantCashBalance": 4852.05,
    "transactionDate": "2022-07-17T03:02:04.075Z"
}
 

Sample Error Responses:

HTTP status code: 404

{
    "statusCode": 404,
    "message": "Dish name, Watercres, is invalid !!!",
    "error": "Not Found"
}
HTTP status code: 400

{
    "statusCode": 400,
    "message": "The price of this item is, 10.25 please provide the amount instead of 10.28",
    "error": "Bad Request"
}
HTTP status code: 404

{
    "statusCode": 404,
    "message": "Restaurant name, 1515 Resturant, is invalid !!!",
    "error": "Not Found"
}
HTTP status code: 404

{
    "statusCode": 404,
    "message": "User, Edith Jonson, is not registered !!!",
    "error": "Not Found"
}
 

Note: API performance may vary because of HEROKU server downtime

 

Schema Design - Entity Relational Diagram

 

Guidelines On Data Populate Into Database
 

API to insert Restaurant information:
API Behavior:
A POST request with relevant restaurant information will populate data into the restaurant table and returns the restaurant ID with other relevant information. This restaurant ID will be used to call other APIs later.

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants
Method: POST

Postman cURL: 


curl --location --request POST 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/restaurants' \
--header 'Content-Type: application/json' \
--data-raw '{
    "restaurantName": "1515 Restaurant",
    "cashBalance": 4841.8
}'
Sample Success Response:

HTTP status code: 200

{
    "cashBalance": 4841.8,
    "restaurantName": "1515 Restaurant",
    "updated": "2022-07-17T02:29:17.427Z",
    "deletedAt": null,
    "id": "be124482-189d-4f2b-a16e-a8fd24d477c3",
    "created": "2022-07-17T02:29:17.495Z"
}
 

Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": [
        "cashBalance must be a number conforming to the specified constraints"
    ],
    "error": "Bad Request"
}
 

API to insert Menu information:
API Behavior:
A POST request with a previously created restaurant ID in query string should be made with relevant information as an array in the API request body, Please see the sample request below, The API request will populate menu information into the menu table, mapped with restaurant table by restaurant ID. After a successful insert operation, the API will return updated data as a success response.

Multiple requests with the same value will perform as upsert.

 

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/menu?restaurantId=
Request in the body:


{
	"menus": [{
                "dishName": "Watercress",
                "price": 10.25,
                "inventory": 30
            },
            {
                "dishName": "rote schweizer weine",
                "price": 12.42,
                "inventory": 30
            },
            {
                "dishName": "Curry of veal with rice",
                "price": 10.5,
                "inventory": 30
            },
            {
                "dishName": "Long Island Duck Dinner:  Relishes",
                "price": 13.0,
                "inventory": 30
            }
    ]
}
 

Method: POST

Postman cURL: 


curl --location --request POST 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/menu?restaurantId=be124482-189d-4f2b-a16e-a8fd24d477c3' \
--header 'Content-Type: application/json' \
--data-raw '{
	"menus": [{
                "dishName": "Watercress",
                "price": 10.25,
                "inventory": 30
            },
            {
                "dishName": "rote schweizer weine",
                "price": 12.42,
                "inventory": 30
            },
            {
                "dishName": "Curry of veal with rice",
                "price": 10.5,
                "inventory": 30
            }
    ]
}'
Sample Success Response:

HTTP status code: 200

{
    "restaurantId": "be124482-189d-4f2b-a16e-a8fd24d477c3",
    "menus": [
        {
            "uuid": "cd31ba3c-5021-4f9b-bb57-9f3b94312875",
            "dishName": "Watercress",
            "price": 10.25,
            "inventory": 30
        },
        {
            "uuid": "9ac3bd86-a58f-4d03-9061-1c0b3ee5b387",
            "dishName": "rote schweizer weine",
            "price": 12.42,
            "inventory": 30
        },
        {
            "uuid": "d72f0205-2ab0-4d29-9859-e5f924e234d0",
            "dishName": "Curry of veal with rice",
            "price": 10.5,
            "inventory": 30
        },
        {
            "uuid": "a02d6bf1-435c-451f-9c22-25cf5f959e64",
            "dishName": "Long Island Duck Dinner:  Relishes",
            "price": 13,
            "inventory": 30
        }
    ]
}
 

Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": "The value passed as UUID is not a string",
    "error": "Bad Request"
}
 

API to insert Restaurant Opening Hours information:
API Behavior:
A POST request with a previously created restaurant ID in query string should be made with relevant information as an array in the API request body, Please see the sample request below, The API request will populate opening timing information into the openingHours table, mapped with restaurant table by restaurant ID. After a successful insert operation, the API will return updated data as a success response. 

Multiple requests with the same value will perform as upsert.

 

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/opening-hours?restaurantId=
Request in the body:


{
    "openingHours":[
        {
            "day": "mon",
            "startTime":"11:00:00",
            "endTime":"21:00:00"
        },
         {
            "day": "wed",
            "startTime":"11:00:00",
            "endTime":"21:00:00"
        }
    ]
}
Method: POST

Postman cURL: 


curl --location --request POST 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/opening-hours?restaurantId=be124482-189d-4f2b-a16e-a8fd24d477c3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "openingHours":[
        {
            "day": "mon",
            "startTime":"11:00:00",
            "endTime":"21:00:00"
        },
         {
            "day": "wed",
            "startTime":"11:00:00",
            "endTime":"21:00:00"
        },
        {
            "day": "thu",
            "startTime":"06:00:00",
            "endTime":"21:00:00"
        }
    ]
}'
Sample Success Response:

HTTP status code: 200

{
    "restaurantId": "be124482-189d-4f2b-a16e-a8fd24d477c3",
    "openingHours": [
        {
            "uuid": "ba4a1eb9-7aa2-4ebf-a0fb-a6fde654fdeb",
            "day": "mon",
            "startTime": "11:00:00",
            "endTime": "21:00:00"
        },
        {
            "uuid": "00719cf7-af42-419f-a5f5-c463aded0744",
            "day": "wed",
            "startTime": "11:00:00",
            "endTime": "21:00:00"
        },
        {
            "uuid": "d24a630f-bf4c-4ece-89a8-715592e77ac1",
            "day": "thu",
            "startTime": "06:00:00",
            "endTime": "21:00:00"
        }
    ]
}
 

Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": "The value passed as UUID is not a string",
    "error": "Bad Request"
}
API to insert User information:
API Behavior:
A POST request with the ‘user name' and 'cash balance’ in the request body will insert the user’s data into the user table. After a successful insert operation, the API will return updated data as a success response. 

Multiple requests with the same value will perform as upsert.

 

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/user
Sample Request in the body:


{
    "name": "Edith Johnson",
    "cashBalance": 700.7
}
Method: POST

Postman cURL: 


curl --location --request POST 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Edith Johnson",
    "cashBalance": 700.7
}'
Sample Success Response:

HTTP status code: 200

{
    "name": "Edith Johnson",
    "cashBalance": 700.7,
    "updated": "2022-07-17T02:47:49.969Z",
    "deletedAt": null,
    "id": "5790be49-f382-44d6-b819-4aaa3c2ae819"
}
Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": [
        "cashBalance must be a number conforming to the specified constraints"
    ],
    "error": "Bad Request"
}
API to remove User information:
API Behavior:
A DELETE request with the ‘userID'  will remove (Soft Delete) the user’s data into the user table.

API URL: 


https://buying-frenzy-food-delivery.herokuapp.com/api/v1/user?userId=
Method: DELETE

Postman cURL: 


curl --location --request DELETE 'https://buying-frenzy-food-delivery.herokuapp.com/api/v1/user?userId=8f758a23-42ce-437e-b829-3a0fc525c725'
 

Sample Success Response:

HTTP status code: 200
 

Sample Error Responses:

HTTP status code: 400

{
    "statusCode": 400,
    "message": "UserId can not be empty !!!",
    "error": "Bad Request"
}
