import express from "express";
import bodyParser from "body-parser";
import { AdminRoute } from "./routes";
import customerRoutes from "./routes/CustomerRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/api", customerRoutes);

app.listen(8000, () => {
  console.clear();
  console.log("App is running on port 8000");
});
