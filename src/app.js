const path = require('path')
const geocode = require('./utisels/geocode')
const forecast = require('./utisels/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectorypath = path.join(__dirname,'../Templates')
const partialspath = path.join(__dirname,'../Templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirectorypath)
hbs.registerPartials(partialspath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
  res.render('index',{
    title:'weather app',
    name:'sai kumar'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'help page',
    name:'sai kumar'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about me',
    name:'sai kumar'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:"you must provide a search address"
    })
  }
  const address = req.query.address

  geocode(address,(error,{latitude,longitude,place}={})=>{
    if(error){
     return res.send({
       error
     })
    }
    
     forecast(latitude,longitude,(error,forecastdata) => {
      if(error){
        return res.send({
          error
        })
      }
        res.send({
          place:place,
          forecast:forecastdata,
          address:req.query.address
        })
      
     })   
    
})
}
)


app.get('/products',(req,res)=>{
   if(!req.query.search){
     return res.send("you must provide a search term")
   }
    res.send({
      products:[]
    })
})

app.get('/help/*',(req,res)=>{
  res.render('error',{
    errorname:"Help articles not found"
  })
})


app.get('*',(req,res)=>{
  res.render('error',{
    name:"Sai kumar",
    errorname:"404 page not found",
    title:"weather app"
  })})


app.listen(port,()=>{
  console.log("server is up on "+ port)
})

