# CSGO Scrim Finder

## General
A scrim, derived from the word skirmish, is when two teams play a practice match in a competitive environment. This web app provides a platform to organize and participate in these matches, specifically for the game Counter-Strike: Global Offensive (CSGO).

The aim is to provide players with a quick and easy way to find an opponent at fitting skill level, who wants to play the same map (game environments) and may or may not provide their own server to play on. Currently, this is usually done by posting text messages on Facebook groups or IRC channels. This app provides the advantages of easy filtering through posts, simplified communication and removal of useless clutter.

As the back-end is implemented, features such as messaging, adding friends and scheduling matches will be made available. Most of all, I hope this app can unify existing platforms and groups, allowing teams to find great opponents without the hassle.

## Front-end
The front-end was built using React, which helped create a well-structured HTML hierarchy, with modular components that can easily be reused. To manage the application’s state, Redux was used. This made it easier to pass data around, for example between the filters and the post list. Although it made the app more complex, Redux helps to avoid a big mess when the project grows.

The app was styled from scratch, using SCSS. This allowed variables to be used in CSS, which helped create a uniform style. To make the app responsive to different screen sizes, I used media queries in CSS. I am not completely satisfied with the method of styling components. In particular, sharing styles between components and avoiding conflicts proved to be more challenging than I originally thought.

## Back-end
The server runs NodeJS, MongoDB for data storage and Express for routing. Authentication is done using JWT. This token is issues when a user registers an anonymous account. It expires after 24 hours, but this can be extended by logging in.

## Databases
The Mongo database is accessed using Mongoose, which is a library that provides an interface using models, based on schema’s. This helps keep the database clean, and certainly improves usability within code. Everything stored on the database is accessible via a REST API.

## Interaction
Interaction is handled by Redux. When the user does something that changes the application state, an action is created. This action is picked up by a reducer, which determines how the state will change. Finally, the necessary components will be re-rendered.

## REST API

### Shapes
The REST API uses JSON for all object data. Here is an overview of the most important object shapes. These will be refered to later.

#### Post
    {
        "_id": ObjectId(Post),
        "updatedAt": Date,
        "createdAt": Date,
        "author": String,
        "__v": Number,
        "replies": [Reply],
        "body": {
            "teamName": String,
            "level": String,
            "server": Bool,
            "maps": [String]
        }
    }
    
#### Reply
    {
        "_id": ObjectId(Reply),
        "updatedAt": Date,
        "createdAt": Date,
        "author": String,
        "__v": Number, 
        "type": <"text", "request”, “accept", "decline">
        "body": {
            "map": String,
            "message": String
        }
    }

#### User
    {
        "_id": ObjectId(User),
        "updatedAt": Date,
        "createdAt": Date,
        "name": String,
        "lastLogin": Date,
        "__v": Number
    }

### Endpoints
These are the available endpoints:

#### GET /api/posts
Description:

Gets all posts matching filters.
Parameters should be passed as a URL encoded JSON string, using the URL parameter filters.


Parameters:

    {
        "level": String,
        "maps": [String],
        "server": Bool
    }

Response:

`[Post]`

#### POST /api/posts
Description:

Creates a new post.

Parameters:

    {
        author: ObjectId(User),
        body: {
            teamName: String,
            level: Number,
            maps: [String],
            server: Bool
        }
    }


Response:
`OK (200)`

#### GET /api/posts/:postId
Description:

Gets details of post with id `postId`, including replies.

Parameters:

URL parameter: `postId`.

Response:

    {
        Post
    }

#### POST /api/posts/:postId
Description:

Creates new reply on post with id postId.

Parameters:

`Reply`

Response:

`OK (200)`

#### GET /api/users
Description:

Gets all existing users.

Parameters:

None

Response:

`[User]`

#### POST /api/auth/register
Description:

Creates a new anonymous user. This user expires in 24 hours.

Parameters:

None

Response:

    {
        "userId": ObjectId(User),
        "token": String
    }

#### POST /api/auth/login
Description:

Extends an existing user’s session. The refreshed token expires in 24 hours.

Parameters:

Headers:
`Authorization: Bearer <token>`

Response:

    {
        "userId": ObjectId(User),
        "token": String
    }
