const request =require('request')

const getCode = (address, callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address + '.json?access_token=pk.eyJ1IjoibG91aXM0NSIsImEiOiJja2N1OGhyNWcyNXM1MnhzNng4YmZ1MXR3In0.gQCzsPRP9O3LuOvV_BBj8Q'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("Data cannot be retrieved", undefined)
        }else if(body.features.length==0){
            callback("Unable to retrieve data at the moment", undefined)
        }else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports=getCode