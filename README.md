Frontend repository: https://github.com/ivanpereariza/client
Deployed project: https://capyquiz.vercel.app/

# API endpoints

## Auth routes

Base URL `/api/auth`

| HTTP Method | URI path       | Description        |
| ----------- | -------------- | ------------------ |
| GET         | `/verify`      | Verify authToken   |
| POST        | `/signup`      | Signup handler     |
| POST        | `/login`       | Login handler      |

## User routes

Base URL `/api/users`

| HTTP Method | URI path              | Description                |
| ----------- | --------------------- | -------------------------- |
| GET         | `/userById/:id`       | Get info user by ID        |
| GET         | `/getUsersByPoints`   | Users by points for ranking|
| GET         | `/userWithQuizzes/:id`| User by ID with own quizzes|
| GET         | `/resetToken/:id`     | Reset user token           |
| PUT         | `/addQuiz/:id`        | Add quiz played to user    |
| PUT         | `/editPoints/:id`     | Add total points to user   |
| PUT         | `/edit/:id`           | User edit by ID            |
| DELETE      | `/delete/:id`         | User delete by ID          |

## Quiz routes

Base URL `/api/quiz`

| HTTP Method | URI path                                                    | Description                             |
| ----------- | ----------------------------------------------------------- | --------------------------------------- |
| GET         | `/getAllQuizzes`                                            | All quizzes                             |
| GET         | `/getPopularQuizzes`                                        | Three popular quizzes                   |
| GET         | `/quizByOwner/:id`                                          | Quizzes by owner ID                     |
| GET         | `/ownerOfQuiz/:id`                                          | Get owner by quiz ID                    |
| GET         | `/quizComments/:id`                                         | Get comments by quiz ID                 |
| GET         | `/getDailyQuiz`                                             | Get daily quiz                          |
| GET         | `/search?search={query}&ratingMin={query}&ratingMax={query}`| Search by name, theme and rating        |
| GET         | `/quizById/:id`                                             | Get one quiz by ID                      |
| POST        | `/saveQuiz`                                                 | Create new quiz                         |
| PUT         | `/edit/:id`                                                 | Quiz edit by ID                         |
| PUT         | `/addPoints/:id`                                            | Add points earned by user to quiz by ID |
| DELETE      | `/delete/:id`                                               | Quiz delete by ID                       |

## Comments routes

Base URL `/api/comments`


| HTTP Method | URI path          | Description                   |
| ----------- | ----------------- | ----------------------------- |
| POST        | `/create/:quizId` | Create comment and ad to quiz |
| PUT         | `/edit/:id`       | Edit comment                  |
| DELETE      | `/delete/:id`     | Delete comment                |

## Notifications routes

Base URL `/api/notifications`

| HTTP Method | URI path                | Description                        |
| ----------- | ----------------------- | ---------------------------------- |
| GET         | `/getNotifications/:id` | Get notifications by owner quiz ID |
| POST        | `/create`               | Create notification                |
| DELETE      | `/delete/:id`           | Delete notification                |

## Upload routes

Base URL `/api/upload`

| HTTP Method | URI path    | Description                |
| ----------- | ----------- | -------------------------- |
| POST        | `/image`    | Upload image to cloudinary |
