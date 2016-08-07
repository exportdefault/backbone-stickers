import BaseModel from './../model';
import UserModel from './user';

export default class SessionModel extends BaseModel {
  constructor() {
    super();

    this.url = 'api/auth';
  }


  // Initialize with negative/empty defaults
  // These will be overriden after the initial checkAuth
  defaults() {
    return {
      logged_in: false,
      user_id: '',
      is_admin: false
    };
  }

  initialize() {
    //_.bindAll(this);
    
    console.log('init session');

    // Singleton user object
    // Access or listen on this throughout any module with app.session.user
    this.user = new UserModel();


    /*var token = $('meta[name="csrf-token"]').attr('content');

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
    }*/

  }

  // Fxn to update user attributes after recieving API response
  updateSessionUser(userData){
    console.log('set user data');
    this.user.set(_.pick(userData, _.keys(this.user.defaults())));
  }

  /*
   * Check for session from API 
   * The API will parse client cookies using its secret token
   * and return a user object if authenticated
   */
  checkAuth(callback, args) {
    var self = this;
    this.fetch({ 
      success: function(mod, res){
        console.log(res);      
        if(!res.error && res.user){
          res.user.id = res.user._id;
          self.updateSessionUser(res.user);
          self.set({ logged_in : true });
          if('success' in callback) callback.success(mod, res);    
        } else {
          self.set({ logged_in : false });
          if('error' in callback) callback.error(mod, res);    
        }
      }, error:function(mod, res){
        console.log('error');              
        console.log(res);              
        self.set({ logged_in : false });
        if('error' in callback) callback.error(mod, res);    
      }
    }).done( function(){
      console.log('complete');     
      if('complete' in callback) callback.complete();
    });
  }

  /*
   * Abstracted fxn to make a POST request to the auth endpoint
   * This takes care of the CSRF header for security, as well as
   * updating the user and session after receiving an API response
   */
  postAuth(opts, callback, args) {
    var self = this;
    var postData = _.omit(opts, 'method');
    if (DEBUG) console.log(postData);

    $.ajax({
      url: this.url + '/' + opts.method,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      beforeSend: function(xhr) {
        // Set the CSRF Token in the header for security
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
      },
      data:  JSON.stringify( _.omit(opts, 'method') ),
      success: function(res) {

        if( !res.error ){
          if(_.indexOf(['login', 'signup'], opts.method) !== -1){
            self.updateSessionUser( res.user || {} );
            self.set({ user_id: res.user.id, logged_in: true });
          } else {
            self.set({ logged_in: false });
          }

          if(callback && 'success' in callback) callback.success(res);
        } else {
            if(callback && 'error' in callback) callback.error(res);
        }
      },
      error: function(mod, res){
        if(callback && 'error' in callback) callback.error(res);
      }
    }).done( function(){
      if(callback && 'complete' in callback) callback.complete();
    });
  }

  login(opts, callback, args){
    this.postAuth(_.extend(opts, { method: 'login' }), callback);
  }

  logout(opts, callback, args){
    this.postAuth(_.extend(opts, { method: 'logout' }), callback);
  }

  signup(opts, callback, args){
    this.postAuth(_.extend(opts, { method: 'signup' }), callback);
  }

  removeAccount(opts, callback, args){
    this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
  }
}
