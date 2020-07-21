const request = require('request')

const forecast= (long, lat, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=fbf7f5dd9c051a666b63ba461a928d9e&query='+lat+','+long
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to database", undefined)
        }else if(body.error){
            callback("Unable to retrieve the indicated data", undefined)
        }else{
            callback(undefined, {
                temperature:`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees.`,
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`
            })
        }
    })

}


module.exports =forecast
