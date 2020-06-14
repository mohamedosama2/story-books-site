const mongoose=require('mongoose')
const express=require('express');
const authRoutes=require('./routes/auth');
const index=require('./routes/index');
const stories=require('./routes/stories');
const path=require('path')
const exps=require('express-handlebars')
const passport=require('passport');
const methodOverride=require('method-override');
const session=require('express-session')
const cookie=require('cookie-parser')
const bodyParser=require('body-parser')
const {truncate,stripTags,formatDate,select,editIcon}=require('./helpers/hbs')


require('./config/passport')(passport);

const keys=require('./config/keys');

const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.engine('handlebars',exps({
    helpers:{
        truncate:truncate,
        stripTags:stripTags,
        formatDate:formatDate,
        select:select,
        editIcon:editIcon
    },

    defaultLayout:'main'
}));

app.set('view engine','handlebars')

mongoose.Promise=global.Promise
mongoose.connect(keys.mongoURI,{
}).then(()=>console.log('connected'))
.catch(err=>console.log(err))



app.use(cookie())

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    res.locals.user=req.user||null;
    next();
})
app.use(express.static(path.join(__dirname,'public')))

app.use('/',index)
app.use('/auth',authRoutes)
app.use('/stories',stories)


app.listen(process.env.PORT||5000)