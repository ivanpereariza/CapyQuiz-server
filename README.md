# API endpoints

## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | `/verify`      | verify authToken   |
| POST        | `/signup`      | signup handler     |
| POST        | `/login`       | login handler      |

## User routes
Base URL `/api/users`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | `/userById/:id`| Get info user by ID|
| PUT         | `/edit/:id`    | User edit by ID    |
| DELETE      | `/delete/:id`  | User delete by ID  |

## Quiz routes


Base URL `/api/quiz`

| HTTP Method | URI path                   | Description        |
| ----------- | -------------------------- | ------------------ |
| GET         | `/getAllQuizzes`           | All quizzes        |
| GET         | `/search?name={query}`     | Search by name     |
| GET         | `/quizById/:id`            | Get one Quiz by ID |
| POST        | `/saveQuiz`                | Create new quiz    |
| PUT         | `/edit/:id`                | Quiz edit by ID    |
| DELETE      | `/delete/:id`              | Quiz delete by ID  |