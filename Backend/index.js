import { connecToMongo } from "./db.js";
import  express  from "express";
import Userrouter from "./routes/auth.js";
import Notesrouter from "./routes/notes.js";
import cors from "cors";

connecToMongo();


const app = express()
const port = 5000

app.use(express.json());

app.use(cors());

app.use("/api/auth",Userrouter);

app.use("/api/notes",Notesrouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})