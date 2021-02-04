class Questions {
  constructor() {
    this._endpoint = "https://jsonmock.hackerrank.com/api/questions/";
    this._id = 1;
    this._answer;
    this._correctAnswers = 0;
  }

  //Get Questions from API
  async getQuestion(callback) {
    try{
      const response = await fetch(this._endpoint + this._id)
      if(!response.ok){
        throw new Error('No more questions from API')
      }
      const responseData = await response.json();
      const data = responseData.data;
      this._answer = data.answer;
      callback(data);
    }catch(err){
      console.log(err.message)
    }

  }


  get answer() {
    return this._answer;
  }

  set id(incr) {
    if (this._id != 6) {
      this._id += incr;
    }else{
      alert(`Congrats! You have ${this._correctAnswers} correct answers!`)
    }
  }

  set correctAnswers(incr) {
    this._correctAnswers += incr;
  }
}
