const express=require ('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');

//connect to database
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected',function(){

	console.log('Connected to database'+config.database);
});
//On error
mongoose.connection.on('error',function(err){

	console.log('Database error:'+err);
});
const app=express();
const users=require('./routes/users');
//Port Number
const port=3000;
//CORS Middleware
app.use(cors());
//SET STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')));
//body Prser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
//Index Route
app.get('/',function(req,res){
res.send('Invalid Endpoint');
});
//start server
app.listen(port, function() {
	console.log('server started at port: '+port);
});
