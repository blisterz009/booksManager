# BooksManager
This repo contains RESTful APIs to manage books

## Scope of the project
Users should be able to:
  * Add a new book (title, author, summary)
  * View a list of all books
  * View details of a specific book by its ID
  * Update a book's details
  * Delete a book

## The project is deployed in docker which is running in AWS EC2

### Health check path
```
http://3.109.58.16:3000/api/health
```
## Run the project locally
```
node server.js
```

# APIs 

## 1. Add a new Book
### Request
`POST /api/v1/create/book`

```
curl --location 'http://localhost:3000/api/v1/create/book' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "Ikigai",
    "author" : "Oscar Sharma",
    "summary" : "This book will change your life",
    "genre" : "Thriller",
    "ageGroup" : "Adult"
}'
```
### Response
```
{
    "message": "Book successfully created",
    "BookData": {
        "title": "Ikigai",
        "author": "Oscar Sharma",
        "summary": "This book will change your life",
        "genre": "Thriller",
        "ageGroup": "Adult",
        "_id": "653f6f42d6b44fe3db2b3b45",
        "createdAt": "2023-10-30T08:54:26.865Z",
        "updatedAt": "2023-10-30T08:54:26.865Z",
        "__v": 0
    }
}
```

## 2. View a list of all Books
### Request
`GET api/v1/get/all-books`

```
curl --location 'http://localhost:3000/api/v1/get/all-books?page=1&limit=2'
```
Contains two additional fields limit and page as it is a paginated query. By default values for page and limit are 1 and 10 respectively.
### Response
```
{
    "Booklist": [
        {
            "_id": "653f6846760746c2ca876e91",
            "title": "Test112",
            "author": "Test author",
            "summary": "test summary",
            "genre": "Comedy",
            "ageGroup": "Adult",
            "createdAt": "2023-10-30T08:24:38.065Z",
            "updatedAt": "2023-10-30T08:29:17.210Z",
            "__v": 0
        },
        {
            "_id": "653f6a5a56192b3e669816c0",
            "title": "Test11",
            "author": "Test author",
            "summary": "test summary",
            "genre": "Horror",
            "ageGroup": "Adult",
            "createdAt": "2023-10-30T08:33:30.813Z",
            "updatedAt": "2023-10-30T08:33:30.813Z",
            "__v": 0
        }
    ],
    "totalPages": 3,
    "currentPage": "1",
    "totalCount": 5
}
```
## 3. View details of a specific book by it's ID
### Request
`GET api/v1/get/bookByID/:bookID`

```
curl --location 'http://localhost:3000/api/v1/get/bookByID/653f6580fc26a3f3e5b784ff'
```
### Response
```
{
    "BookData": {
        "_id": "653f6580fc26a3f3e5b784ff",
        "title": "Test1",
        "author": "Test author",
        "summary": "test summary",
        "ageGroup": "Adult",
        "createdAt": "2023-10-30T08:12:48.509Z",
        "updatedAt": "2023-10-30T08:12:48.509Z",
        "__v": 0
    }
}
```
## 4. Update details of a specific book by it's ID
### Request
`PUT api/v1/update/bookByID/:bookID`

```
curl --location --request PUT 'http://localhost:3000/api/v1/update/bookByID/653f6846760746c2ca876e91' \
--header 'Content-Type: application/json' \
--data '{
    "genre" : "Comedy"
}'
```
Inside the data object only add the field(s) to update.
### Response
```
{
    "BookData": {
        "_id": "653f6846760746c2ca876e91",
        "title": "Test112",
        "author": "Test author",
        "summary": "test summary",
        "genre": "Comedy",
        "ageGroup": "Adult",
        "createdAt": "2023-10-30T08:24:38.065Z",
        "updatedAt": "2023-10-30T08:29:17.210Z",
        "__v": 0
    }
}
```
## 5. Delete a book by it's ID
### Request
`DELETE api/v1/delete/bookByID/:bookID`

```
curl --location --request DELETE 'http://localhost:3000/api/v1/delete/bookByID/653f638c5883a419cc9a3ada'
```
### Response
```
{
    "message": "Book deleted"
}
```
# Future Scope

* Add users
* Users can be divided into 2 groups(Admin and Users) 
* Add middleware in APIs
* Implement security checks
    * Users can only add/fetch/update/delete their own books
    * Admins can perform all actions
    * Admins can add users
