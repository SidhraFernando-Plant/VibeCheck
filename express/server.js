//Configure the express.js server
const express = require("express");
const cors = require("cors");

const app = express();

//Allow API requests from front end
var corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node, express and sequelize app" });
});

//add API routes
require("./app/routes/user.routes.js")(app);
require("./app/routes/post.routes.js")(app);
require("./app/routes/reply.routes.js")(app);
require("./app/routes/like.routes.js")(app);
require("./app/routes/follow.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
