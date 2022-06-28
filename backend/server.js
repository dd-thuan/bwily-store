const app = require("./app");

const dotenv = require("dotenv");

// Config
if(process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


const server = app.listen(process.env.PORT, () => {
  console.log(`"server is working on http://localhost:${process.env.PORT}`);
});

