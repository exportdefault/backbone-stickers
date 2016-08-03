// Setting up block level variable to store class state
// set's to null by default.

let instance = null;

export default class Cache {
  constructor(data) {
    if(!instance){
      instance = this;
      this.data = {};
    }

    if (data) {
      this.data = data;
    }

    // to test whether we have singleton or not
    this.time = new Date();

    return instance;
  }

  getData(key) {
    return this.data[key];
  }

  setData(key, value) {

    if (typeof key === 'object') {
      // todo
    }

    this.data[key] = value;
  }
}

    /*let cache = new Cache();
    cache.setData('filter', 'all');
    console.log(cache.getData('filter'));

    setTimeout(function(){
     let cache = new Cache();
    console.log(cache.getData('filter'));
    },4000);*/