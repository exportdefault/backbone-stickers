//import Sticker  from './../models/sticker';

const { Model, Collection, LocalStorage } = Backbone;

class Sticker extends Model {
  constructor(...args) {
    super(...args);
  }

  // Define default attributes.
  defaults() {
    return {
        title: 'No title',
        description: 'Unknown',
        liked: false,
        user_id: 1,
        created: 0,
        likes: 0
      };
  }

  parse(response) {
   response.id = response._id;

   let user_id = Backbone.Radio.channel('app').request('session').user.get('id');

   // console.log(JSON.stringify(response));
   // console.log(user_id);

   response.liked = !!(_.find(response.likes, item => item.user_id == user_id ));
   response.likes = response.likes.length;

   return response;
  }

  isLiked() {
    return this.get('liked');
  }

  toggle() {
    return this.set({
      'liked': !this.isLiked(),
      'like': true
    });
  }

  initialize() {
    if (this.isNew()) {
      this.set('created', Date.now());
    }
  }
}


class Stickers extends Collection {

  constructor(options) {
    super(options);

    this.comparator = 'created';

    // Hold a reference to this collection's model.
    this.model = Sticker;
   
    // url to sync
    this.url = '/api/stickers';

  }

  getLiked() {
    return this.filter(this._isLiked);
  }

  getActive() {
    return this.reject(this._isLiked);
  }

  _isLiked(item) {
    return item.isLiked();
  }

}


export { Sticker, Stickers };