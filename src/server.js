
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars');
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')
const app =express()

const port =process.env.PORT || 3000
//Handles express config
const index=path.join(__dirname, '../amk')
const viewsPath=path.join(__dirname, '../templates/views')
const partialspath =path.join(__dirname, '../templates/partials')

//Sets up the handlebars
// app.engine('hbs', exphbs({
//     // defaultLayout: 'main',
//     extname: '.hbs'
// }));

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//Serves static files
app.use(express.static(index))

app.get('/', (req, res)=>{
    res.render('index', {
        title:"Weather App 2",
        name:" Gideon"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:"About Me",
        name:"Gideon"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Page Help",
        name:"Gideon"
    })
})

// app.get('/help', (req, res)=>{
//     res.send("Get any help from this page")
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>Info about our platform</h1>')
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"Provide address location"
        })
    }
    geocode(req.query.address, (error, data='')=>{
        if(error){
            return res.send({error})
        }        
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: "Your address is "+data.location,
                forecast: forecastData,
                address: req.query.address
            })
          })
    })
    
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"Provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:"Error 404",
        name:"Gideon",
        info:"File not found"
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title:"ERROR 404",
        name:"Gideon",
        info:"Page does not exist"
    })
})

app.listen(port, ()=>{
    console.log("Server is listening on port "+port)
})