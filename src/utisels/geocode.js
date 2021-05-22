const request = require("request")

const geocode = (address,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Fpa3VtYXIzNSIsImEiOiJja29rOXo1aHQwM2hvMnBybWt1OWpvcG53In0.nZDfPmt_fgA2cI0MUejwqw&limit=1'

  console.log(url)

  request({url,json:true},(error,{ body })=>{
    console.log(body.features.length)
    if(error){
      callback("Unable to connect weather api !",undefined)
    }
    else if(body.features.length===0){
      callback("unable to find cordinates of given location. try another location !",undefined)
    }
    else{
      callback(undefined,{
        latitude: body.features[0].center[1],
        longitude:body.features[0].center[0],
        place:body.features[0].place_name
      })
    }
  })

}


module.exports = geocode