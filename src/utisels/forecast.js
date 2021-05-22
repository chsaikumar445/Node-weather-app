const request = require("request")


const forecast = (latitude,longitutde,callback)=>{
  const url ='http://api.weatherstack.com/current?access_key=ddd3dcb83d1795541cdb6aa7dd5da57f&query='+latitude+','+longitutde+'&units=f'

request({url,json:true},(error,{ body })=>{
    if(error){
      callback("Unable to connect to weather api !",undefined)
    }
    else if(body.error){
      callback("Unable to find location. try another location",undefined)
    }
    else{
      callback(undefined,body.current.weather_descriptions+" it is "+body.current.temperature+" degress out there ")
    }
  })
}

module.exports = forecast