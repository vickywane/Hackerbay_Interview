import express from 'express'
import cors from 'cors'
import debug from 'debug'
 
const app = express();

const port = 3000; 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(port, () => debug.log(`LISTENING ON PORT ${port}`));

