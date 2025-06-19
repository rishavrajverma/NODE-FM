import express from "express";
import bodyParser from "body-parser";
import { fileMakerRoutes } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/filemaker", fileMakerRoutes);

app.listen(8000, () => {
  console.log(" Server running on http://localhost:8000");
});
