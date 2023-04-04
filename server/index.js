var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var router = require('./router');
var bodyparser = require('body-parser');
var url="mongodb://127.0.0.1:27017/serialnumberchecker";
app.use(cors({origin:'http://172.16.0.100:3006'}));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.static(path.join(__dirname, "./excel")));
mongoose.set("strictQuery", true);

mongoose.connect(url).then(() => console.log('Connected to DB successfully')).catch (error => console.log(error));

app.use("/",router)

app.listen(3007,()=>{
    console.log('Server is listening in port 3007')
})