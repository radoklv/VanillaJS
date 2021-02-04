const key = '90mjt2h8sSGqAAudrriJCliMFoorjXIT';

const getCity = async (city) =>{
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);

    const responseData = await response.json();
    
    return responseData[0]
}

const getWeather = async (cityKey) =>{
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${key}`)

    const responseData = await response.json();

    return responseData[0]
}

// getCity('kazanluk').then(res =>{
//     // console.log(res)
//     return getWeather(res.Key)
// }).then(res =>{
//     // console.log(res)
// }).catch(err =>{
//     console.log(err)
// });