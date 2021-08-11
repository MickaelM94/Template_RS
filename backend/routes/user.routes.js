module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new User
    app.post("/api/users", users.create);
  
    // Retrieve a single User with userId
    app.get("/api/users/:userId", users.findOne);
  
    // Update a User with userId
    app.put("/api/users/:userId", users.update);
  
    // Delete a User with userId
    app.delete("/api/users/:userId", users.delete);
  };