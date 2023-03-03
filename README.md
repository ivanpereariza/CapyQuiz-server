# API endpoints

## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| POST        | `/signup`      | signup handler     |
| POST        | `/login`       | login handler      |
| GET         | `/verify`      | verify authToken   |
| PUT         | `/:id/edit`    | User edit by ID    |
| DELETE      | `/:id/delete`  | User delete by ID  |


Base URL `/api/quiz`

| HTTP Method | URI path                   | Description        |
| ----------- | -------------------------- | ------------------ |
| GET         | `/getAllQuizzes`           | All quizzes        |
| GET         | `/search?name={query}`     | Search by name     |
| GET         | `/search/:theme`           | Quizzes by theme   |
| POST        | `/saveQuiz`                | Create new quiz    |
| GET         | `/:id`                     | Get one Quiz by ID |
| PUT         | `/:id/edit`                | Quiz edit by ID    |
| DELETE      | `/:id/delete`              | Quiz delete by ID  |