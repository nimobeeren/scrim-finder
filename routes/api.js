const express = require("express");
const auth = require("../auth");
const db = require("../db/db");

// Express router
const router = express.Router();

// Use Express middleware to parse JSON requests
router.use("/", express.json());

/**
 * GET: Retrieves a filtered set of posts and their replies
 * POST: Creates a new post
 */
router
  .route("/posts")
  .get(async (req, res) => {
    // Get encoded query string from URL
    const query = req.query.filters;

    // Decode and parse query as JSON
    let filters = null;
    if (query) {
      try {
        filters = JSON.parse(decodeURIComponent(query));
      } catch (e) {
        if (e instanceof SyntaxError) {
          res.status(400).send("Bad filters parameter");
        } else {
          res.status(500).send("Could not retrieve posts: " + e.message || e);
        }
      }
    }

    // Get posts that match filters from database
    const posts = await db.getPosts(filters);
    res.send(posts);
  })
  .post(async (req, res) => {
    // Validate request
    if (!req.body) {
      res.sendStatus(400);
      return;
    }

    // Verify authentication
    let authorId;
    try {
      authorId = auth.verifyToken(req);
    } catch (e) {
      res
        .status(500)
        .send("Could not verify authentication token: " + e.message || e);
      return;
    }
    if (!authorId) {
      res.sendStatus(401);
      return;
    }

    // Create new post based on request body, with verified author
    const post = Object.assign({}, req.body, {
      author: authorId,
      replies: [], // don't allow setting replies during post create request
    });

    // Add post to database
    try {
      await db.createPost(post);
    } catch (e) {
      res.status(500).send("Could not create post: " + e.message || e);
      return;
    }
    res.sendStatus(200);
  });

/**
 * GET: Gets details of a specific post
 * POST: Creates a reply to a specific post
 */
router
  .route("/posts/:postId")
  .get(async (req, res) => {
    let post;
    try {
      post = await db.getPost(req.params.postId);
    } catch (e) {
      res.status(500).send("Could not retrieve post: " + e.message || e);
      return;
    }

    if (!post) {
      res.sendStatus(404);
    }

    res.status(200).send(post);
  })
  .post(async (req, res) => {
    // Validate request
    if (!req.body || !req.params.postId) {
      res.sendStatus(400);
      return;
    }

    // Verify authentication
    let authorId;
    try {
      authorId = auth.verifyToken(req);
    } catch (e) {
      res
        .status(500)
        .send("Could not verify authentication token: " + e.message || e);
      return;
    }
    if (!authorId) {
      res.sendStatus(401);
      return;
    }

    // Create new reply with verified author
    const reply = Object.assign({}, req.body, {
      author: authorId,
      // TODO: Only let the post author set `status` field
    });

    // Attach reply to specified post in database
    try {
      await db.sendReply(reply, req.params.postId);
    } catch (e) {
      // TODO: Check if postId exists, otherwise 404
      if (e.name === "ArgumentError") {
        // Reply format was invalid
        res.status(400).send(e.message || e);
        return;
      } else {
        res.status(500).send("Could not create reply: " + e.message || e);
        return;
      }
    }
    res.sendStatus(200);
  });

/**
 * PUT: Modifies a reply
 */
router.route("/replies/:replyId").put(async (req, res) => {
  // Validate request
  if (!req.body || !req.params.replyId) {
    res.sendStatus(400);
    return;
  }

  // Verify authentication
  let authorId;
  try {
    authorId = auth.verifyToken(req);
  } catch (e) {
    res
      .status(500)
      .send("Could not verify authentication token: " + e.message || e);
    return;
  }
  if (!authorId) {
    res.sendStatus(401);
    return;
  }

  // Create new reply with verified author and modified body
  const newReply = Object.assign({}, req.body, {
    author: authorId,
    // TODO: Only let the post author set `status` field
  });

  try {
    await db.editReply(req.params.replyId, newReply);
  } catch (e) {
    res.status(500).send("Could not edit reply: " + e.message || e);
    return;
  }
  res.sendStatus(200);
});

/**
 * GET: Gets a list of all users
 */
router.get("/users", async (req, res) => {
  let users;
  try {
    users = await db.getUsers();
  } catch (e) {
    res.status(500).send("Could not get users: " + e.message || e);
    return;
  }
  res.status(200).send(users);
});

module.exports = router;
