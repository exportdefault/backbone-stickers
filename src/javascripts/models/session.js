import BaseModel from './../core/model';

let instance = null;

export default class Session extends BaseModel {
  constructor(...args) {
    super(...args);

    if (!instance) {
      instance = this;
    }

    this.url = '/session';

    return instance;
  }

  initialize() {

    var token = $('meta[name="csrf-token"]').attr('content');

    //Ajax Request Configuration
    //To Set The CSRF Token To Request Header
    $.ajaxSetup({
      headers : {
        'X-CSRF-Token' : token
      }
    });

    //Check for sessionStorage support
    if(Storage && sessionStorage){
      this.supportStorage = true;
    }

  }


  get(key) {

    if(this.supportStorage) {
      var data = sessionStorage.getItem(key);
      if(data && data[0] === '{') {
        return JSON.parse(data);
      } else {
        return data;
      }
    } else {
      return BaseModel.prototype.get.call(this, key);
    }
  }

  set(key, value) {

    if(this.supportStorage) {
      sessionStorage.setItem(key, value);
    } else {
      BaseModel.prototype.set.call(this, key, value);
    }
    return this;
  }

  unset(key){
    if(this.supportStorage) {
      sessionStorage.removeItem(key);
    } else {
      Backbone.Model.prototype.unset.call(this, key);
    }
    return this;  
  }

  clear(){
    if(this.supportStorage) {
      sessionStorage.clear();  
    } else {
      Backbone.Model.prototype.clear(this);
    }
  }

  login(credentials) {
    var that = this;
    var login = $.ajax({
      url : this.url + '/login',
      data : credentials,
      type : 'POST'
    });
    login.done(function(response){
      that.set('authenticated', true);
      that.set('user', JSON.stringify(response.user));
      if(that.get('redirectFrom')){
        var path = that.get('redirectFrom');
        that.unset('redirectFrom');
        Backbone.history.navigate(path, { trigger : true });
      }else{
        Backbone.history.navigate('', { trigger : true });
      }
    });
    login.fail(function(){
      Backbone.history.navigate('login', { trigger : true });
    });
  }

  logout(callback) {
    var that = this;
    $.ajax({
      url : this.url + '/logout',
      type : 'DELETE'
    }).done(function(response){
      //Clear all session data
      that.clear();
      //Set the new csrf token to csrf vaiable and
      //call initialize to update the $.ajaxSetup 
      // with new csrf
      csrf = response.csrf;
      that.initialize();
      callback();
    });
  }


  getAuth(callback) {
    console.log('getAuth');
    var that = this;
    var Session = this.fetch();

    Session.done(function(response){
      that.set('authenticated', true);
      that.set('user', JSON.stringify(response.user));
    });

    Session.fail(function(response){
      response = JSON.parse(response.responseText);
      that.clear();
      csrf = response.csrf !== csrf ? response.csrf : csrf;
      that.initialize();
    });

    Session.always(callback);
  }


}
