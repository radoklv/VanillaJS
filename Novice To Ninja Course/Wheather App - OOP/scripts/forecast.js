class Forecast {
  constructor() {
    this.key = "90mjt2h8sSGqAAudrriJCliMFoorjXIT";
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURL =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const responseData = await response.json();
    
    return responseData[0];
  }

  async getWeather(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const responseData = await response.json();

    return responseData[0];
  }

  async updateCity(city){
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
  
    return { cityDets, weather };
  };
}
