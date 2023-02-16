import app from "./app";

const Port = 3500;

app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
