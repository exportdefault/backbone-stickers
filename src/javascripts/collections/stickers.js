import Sticker  from './../models/sticker';

const { Collection, LocalStorage } = Backbone;

export default class Stickers extends Collection {

  constructor(options) {
    super(options);

    this.comparator = 'created';

    // Hold a reference to this collection's model.
    this.model = Sticker;
   
    // sync
    this.url = '/api/stickers';

    // Save all of the sticker's items
    //this.localStorage = new LocalStorage('backbone-stickers');
  }

  getLiked() {
    return this.filter(this._isLiked);
  }

  getActive() {
    return this.reject(this._isLiked);
  }

  _isLiked(todo) {
    return todo.isLiked();
  }

}