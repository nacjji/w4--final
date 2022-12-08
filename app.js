const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("sequelize connected");
  })
  .catch((err) => {
    console.log("sequelize connection failed");
  });

// bodyparser - middleware
app.use(express.json());
app.use("/api", express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(3000, () => {
  console.log(3000, " port connected");
});
