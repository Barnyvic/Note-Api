import app from "./app";
import { dbConnection } from "./db/dbConfig";

const Port = 3500;

app.listen(Port, async () => {
  await dbConnection();
  console.log(`Server running on http://localhost:${Port}`);
});
