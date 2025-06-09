NODE_ENV: test
PGDATABASE: nc_news_test
DATABASE_URL: undefined

## Test Output

It is **Recommended** to open this file in preview mode for readability.

Read through all errors messages, hints and any linked relevant notes as well as using any other [NC Notes](https://l2c.northcoders.com/courses/sd-notes/back-end#sectionId=,step=). Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

---

### CORE GET `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {...} }` instead of on a key of `articlesWithNoBody`
- return the single article in an object, not in an array

Relevant Notes:

- [Parametric Endpoints](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=express-servers,step=parametric-endpoints)
- [Parameterized queries](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=node-postgres,step=parameterized-queries)

---

### CORE PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client

---

### CORE GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

Relevant Notes:

- [Handline Empty Responses](https://l2c.northcoders.com/courses/sd-notes/back-end#sectionId=handling-empty-responses,step=intro)

---

### CORE POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys

Relevant Notes:

- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [Custom Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=custom-errors)

---

### CORE POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

Relevant Notes:

- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [Custom Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=custom-errors)

---

### CORE POST `/api/articles/not-a-valid-id/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request when `POST` contains an invalid article_id

Relevant Notes:

- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [PSQL Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=postgresql-errors)

---

### CORE POST `/api/articles/1/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist

Relevant Notes:

- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [Custom Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=custom-errors)
