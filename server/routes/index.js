const path = require("path");
const router = require("express").Router();
const authRoutes = require("./auth");
const apiRoutes = require("./api");

// Auth Routes
router.use('/auth', authRoutes);

// API Routes
router.use("/api", apiRoutes);

// Zach trying to help fix heroku build issue - logs indicate build succeeded but when you click the heroku link, you get the heroku application error page:
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// from Alper's reactreadinglist-auth project, which is what we used as our base - If no routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// This is the change Alper had Jen make that actually fixed the Heroku build issue mentioned above, went up one additional level in path, not sure why we changed it from router.use to router.get - found this article in StackOverflow https://stackoverflow.com/questions/27227650/difference-between-app-use-and-router-use-in-express/30868426 - per this article, "router.get is only for defining subpaths.". This still doesn't make sense to me. I would think we would want router.use here. However, router.get did fix our issue...the heroku build works.
// If no routes are hit, send the React app
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
});



module.exports = router;
