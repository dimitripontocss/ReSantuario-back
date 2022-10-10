# <p align = "center"> ReSantuário API </p>

<p align="center">
   <img style="width:300px" src="./ReadMeIMG/android-chrome-512x512.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-dimitripontocss-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/dimitripontocss/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

This API is used to power the best recipes site all over the internet. If you want to find new recipes with their macros like: Kcals, proteins, carbohydrates and lipids per portion. And a very friendly interface, for finding new recipes or to create yours.

---

## :computer: Tecnologies used

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Prisma (ORM)
- Postgres
- Docker

---

## :rocket: Routes

```yml
POST /signup
    - Route used to regiter new users
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "passwordConfirmation": "loremipsum"
}
```

```yml
POST /signin
    - SignIn route, you receive a Token if data is correct
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml
GET /user/:userId
    - Get user info by userId
    - headers: {}
    - body: {}
```

```yml
GET /recipes
    - Get all recipes registered
    - headers: {}
    - body: {}
```

```yml
GET /recipes/:recipeId
    - Get recipe info by recipeId
    - headers: {}
    - body: {}
```

```yml
GET /random
    - Get a random recipeId
    - headers: {}
    - body: {}
```

```yml
GET /search/recipes/:title
    - Get recipes info by title
    - headers: {}
    - body: {}
```

```yml
POST /recipe (authenticated)
    - Route used to post a new recipe
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "category": "loremipsum",
        "pictureUrl": joi.string().uri().required(),
        "instructions": "loremipsum", min 20 char
        "difficulty": NUMBER 1 to 5,
        "ingredients": [] of ingredients,
        "portions": NUMBER as string,
    }
```

```yml
DELETE /recipe/:recipeId (authenticated)
    - Route used to delete a recipe
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /category/:categoryId
    - Get category info by categoryId
    - headers: {}
    - body: {}
```

```yml
POST /score (authenticated)
    - Route used to give a rating to a recipe
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "score": NUMBER 1 to 5,
        "recipeId": NUMBER of a valid Recipe
        }
```

---

## 🏁 Runnig the application

This project was made with Node.Js, so in order to run it at your machine you gotta have a stable version of Node.Js and NPM installed.

First, clone this directory:

```
git clone https://github.com/dimitripontocss/projeto22-ReSantuario-back
```

After, inside the directory, run this command to install the dependencies:

```
npm install
```

After its done run this comand to run the server:

```
npm start
```

Or if you are a docker user do this instead:

First, clone this directory:

```
git clone https://github.com/dimitripontocss/projeto22-ReSantuario-back
```

Then, create a .env file using .env.docker as an example, and after this, inside the directory, run this command to create your container:

```
docker-compose build
```

And this to run it:

```
docker-compose up
```

And now you are ready to use it!
