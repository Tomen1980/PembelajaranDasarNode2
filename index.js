const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const moment = require("moment");
const logger = require('./middleware/logger');
// const members = require("./members");
const members = require('./Members');

const app = express();

// const logger = (req,res,next)=>{
//     console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format()}`);
//     next();
// }


//init middleware
// app.use(logger);


//field members
// const members = [
    //     {
        //         id : 1,
        //         name : "agung jumantoro andrian",
        //         email : "agung@gmail.com",
        //         status : "active"
        //     },
        //     {
            //         id : 2,
//         name : "franky wahyu prasetyo",
//         email : "franky@gmail.com",
//         status : "active"
//     },
//     {
    //         id : 3,
    //         name : "Sultan Lathuf sakip",
//         email : "sultan@gmail.com",
//         status : "inactive"
//     },
//     {
    //         id : 4,
    //         name : "Pahuger Puruhita Baiq",
    //         email : "pahuger@gmail.com",
    //         status : "active"
    //     }
    // ];

    // //get all members
    // app.get("/api/members",(req,res)=>{
    //     res.json(members)
    // });
    
    // //get single member
    // app.get("/api/members/:id",(req,res)=>{
    //     const found = members.some(member => member.id === parseInt(req.params.id));

    //     if(found){
    //         res.json(members.filter(member => member.id === parseInt(req.params.id)));
    //     }else{
    //         res.status(400).json({
    //             msg : `no metter with the id of ${req.params.id}`
    //         })
    //     }
    // })


// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('hbs', exphbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
