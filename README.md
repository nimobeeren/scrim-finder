# CSGO Scrim Finder

## Usage

To run the app, you'll need to create a configuration file named `config.json` in the same directory as this README. It should have the following shape, filled in with your own data:

```
{
  // Used for Steam login
  "host": "URL where your app is hosted",

  // Including username/pw
  "mongoServer": "URL for the MongoDB instance",

  // Retrieved from https://steamcommunity.com/dev/apikey
  "steamApiKey": "your key",

  "secret": "some secret phrase"
}
```

Install the dependencies by running `npm install`, once in the root directory and once in the `/client` directory. To start the app, run `npm start` in the root directory. 

The default port for the development server is 3000, so you can view the app on `http://localhost:3000`. The default port for the back-end is 8000.

### Production

The development server always serves the latest version of the client, but it is not optimized for production. To create a production build of the app, go to `/client` and run `npm run build`. Now, when you start the app from the root directory with `npm start`, the production build will be served on `http://localhost:8000`.

## Description
A scrim, derived from the word skirmish, is when two teams play a practice match in a competitive environment. This web app provides a platform to set up and participate in these matches, specifically in the context of the game Counter-Strike: Global Offensive (CSGO).
                   
The aim is to provide players with a quick and easy way to find an opponent at fitting skill level, who wants to play the same map (game environments) and may or may not provide their own server to play on. Currently, this is usually done by posting text messages on Facebook groups or IRC channels. This app provides the advantages of easy filtering through posts, simplified communication and less clutter.
All functionality can be evaluated using an anonymous account, which is generated when you first visit the site. To continue your session using different browsers or devices, you can log in with a Steam account.

## Front-end
The frontend was built using React, combined with Redux and Redux Thunk. The main purpose of React is to modularize the user interface, by splitting it up into components that can be reused. For example, some form elements like groups of checkboxes are used in many places throughout the app. React allows us to write the markup only once, which reduces duplication.

In React, components can interact by passing down props to its children, or passing arguments up through event handlers. This works well when related components are clustered together, but can get very cumbersome when they are in different parts of the page. Take, for example, the popup dialog that appears when you create a post reply. For the popup to know what to display, it needs to have data passed in from the reply button.

This is where Redux comes in. Instead of passing data all the way to the root component, and then down into the popup, we put our data in an application-wide store. This is done by creating an action, which may hold some parameters, like what type of popup we want to show. When the action is emitted, one or more reducers can be triggered, which will look at the parameters and determine the new data to put in the store. The popup only needs to look at the store to know how it should render.

Normally, action creators are synchronous functions. This poses a problem when we need to make API calls, which take some time to complete. Redux Thunk allows us to use asynchronous action creators. This means that we can create an action when we first make the API request, and another when we receive a response. This way, the app knows we are waiting for a call to finish, and can render a loading animation, if desired.

## Back-end
Express was used as our web framework, which runs on NodeJS. Express is a minimalistic and highly customizable web framework, which supports middleware to take care of common tasks. In our case, JSON requests are parsed automatically, so that the rest of the application does not have to worry about that. API endpoints are nicely organized through Express Router objects.
The backend interacts with a MongoDB instance, which stores application data. This choice of database allows for easy access and manipulation of data, using only JavaScript. The structure of the database is quite similar to the JSON format, which works well with the rest of the app.

To authenticate users, they are given an authorization token when they log in or use an anoymous account. A token contains the user ID, which is encrypted by the server. The user stores this token, and provides it again when they want to access or modify a piece of protected data. The server can then verify the user, and process the request.

## Databases
For data storage, we use a MongoDB database, together with Mongoose for modeling and validating our data. Both of these work well together with our NodeJS backend. Mongoose provides an easy-to-use interface with our database. We can query for documents using the common Mongo query language, but also modify documents directly as JavaScript objects. Through the use of models, based on schemas, we automatically validate new and updated documents before they are inserted into the database.

The three main types of data that are stored in the database are users, posts and replies.

### User
Users are, like any document in our database, identified by a unique ID that is generated when the user is first created. This may happen when the app is used anonymously, or when a Steam account is linked. In case of the latter, an additional Steam ID is stored, which is then used to retrieve an alias for the user. For anonymous users, this name is randomly generated. Finally, we keep track of the last login moment for each user, which allows us to purge inactive accounts when we want to.

#### Schema
    {
      _id: ObjectId,
      createdAt: Date,
      updatedAt: Date,
      name: String,
      steamId: String,
      lastLogin: Date
    }

The `_id`, `createdAt` and `updatedAt` fields are automatically generated by Mongoose, and cannot be set through the API. The `_id` can be assumed to be unique across all documents in the database.

### Post
When the user wants to take the initiative to set up a scrim, they should create a post, which will be displayed as a card on the home page. A post may contain information about the match environment, such as skill level, maps and server connection details. Not all of these fields are required, as can be seen in the schema.

#### Schema
    {
      _id: ObjectId,
      createdAt: Date,
      updatedAt: Date,
      author: { type: ObjectId, ref: 'User' },
      body: {
         teamName: String,
         level: { type: Number, required: true },
         maps: { type: [String], required: true },
         server: Boolean,
         ip: String,
         password: String
      },
      replies: [{ type: ObjectId, ref: 'Reply' }]
    }
    
In addition to the `_id`, `createdAt` and `updatedAt` fields, the author and replies fields cannot be individually set through the API. The author’s ID is retrieved from the authorization header, whereas replies can only be modified using the relevant methods.
Note that the author and replies fields contain references to other schemas. Instead of real values, they contain `_id`’s of other documents in the database. This prevents data redundancy, which is good for ease of modification and storage capacity.

### Reply
To allow communication, users can reply to posts. A reply can be one of the following types: a request to play; accepting/declining a request; regular text message (not yet implemented). A reply can be directed to a specific recipient, and may contain server information when the requester wants to play on their own server.

#### Schema
    {
      _id: ObjectId,
      createdAt: Date,
      updatedAt: Date,
      author: { type: ObjectId, ref: 'User', required: true },
      recipient: { type: ObjectId, ref: 'User' },
      type: {
         type: String,
         enum: ['text', 'request', 'accept', 'decline'],
         default: 'text'
      },
      status: {
         type: String,
         enum: ['accepted', 'declined']
      },
      body: {
         map: String,
         message: String,
         ip: String,
         password: String
      }
    }

## REST API
### External APIs
Users can log in through their Steam account to allow resuming  their session from any device. Steam uses OpenID to handle authentication. Using a Node library, we first genereate a login URL, where the user can log in to Steam. Then, Steam redirects to a verification endpoint on our server. After verification check, we extract the user’s trusted Steam ID.

We retrieve some additional information about Steam users, such as their display name, using the Steam Web API, in particular the GetPlayerSummaries method. This API requires an API key, stored on our server.

### Scrim Finder API
All actions can be made using our API. Endpoints marked with * require an authentication token, which requires the following header to be set:

    Authorization: Bearer: <your_token>
    
#### GET /api/posts
Retrieves a filtered set of posts and their replies. Parameters should be passed as a URL encoded JSON string, using the URL parameter filters.

##### Parameters
    filters: {
      level: String,
      maps: [String],
      server: Boolean,
      maxAge: Number
    }

##### Response
`[Post]`

#### POST* /api/posts
Creates a new post.

##### Request body
    author: ObjectId,
    body: {
      teamName: String,
      level: Number,
      maps: [String],
      server: Boolean
    }
    
##### Response
OK (200)

#### GET /api/posts/:postId
Gets details of a specific post, including replies.

##### Parameters
`postId` (replace `:postId` in URL)

##### Response
`Post`

#### POST* /api/posts/:postId
Creates a reply to a specific post.

##### Parameters
`postId` (replace `:postId` in URL)

##### Request body
`Reply`

##### Response
OK (200)

#### PUT* /api/replies/:replyId
Modifies a reply

##### Parameters
`replyId` (replace `:replyId` in URL)

##### Request body
`Reply`

##### Response
OK (200)

#### GET /api/users
Gets all existing users.

##### Response
`[User]`

#### POST /auth/anonRegister
Creates a new anonymous user, which expires in 24 hours.

##### Response
    {
      id: ObjectId,
      name: String,
      token: String
    }
    
#### POST* /auth/refresh
Extends an existing user’s session. The refreshed token expires in 24 hours.

##### Response
    {
      id: ObjectId,
      name: String,
      token: String
    }
    
#### GET /auth/login
Redirects to Steam’s OpenID login page.

#### GET /auth/verify
Callback endpoint for OpenID authentication. Redirects to home page, while returning a user identifier, including an authorization token in URL params.

##### Response
Redirect to `/`, with the following URL parameters:

    {
      id: ObjectId,
      name: String,
      steamId: String,
      token: String
    }
