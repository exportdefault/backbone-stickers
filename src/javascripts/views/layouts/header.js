//import { template as HeaderTemplate } from './../../templates/layouts/header'; 
import template from './../../../templates/layouts/header.handlebars'; 

//console.log(Handlebars.compile(template));

// Layout Header View
//var filterChannel = Backbone.Radio.channel('filter');

export default class HeaderLayout extends Backbone.Marionette.ItemView {

  constructor(options) {
    super(options);

    this.template = template;
  }

  /*template(serialized_model) {
    //var name = serialized_model.name;
    return _.template('')({
        //name : name,
        //some_custom_attribute : some_custom_key
    });
  }*/

  // UI bindings create cached attributes that
  // point to jQuery selected objects
  ui() {
    return {
      form: '#new-sticker'
    };
  }

  events() {
    return {
      //'keypress @ui.input': 'onInputKeypress',
      //'keyup @ui.input': 'onInputKeyup'
      'submit @ui.form': 'onSubmit'
    };
  }  

  // According to the spec
  // If escape is pressed during the edit, the edit state should be left and any changes be discarded.
  /*onInputKeyup(e) {
    var ESC_KEY = 27;

    if (e.which === ESC_KEY) {
      this.render();
    }
  }

  onInputKeypress(e) {
    var ENTER_KEY = 13;
    var todoText = this.ui.input.val().trim();

    if (e.which === ENTER_KEY && todoText) {
      this.collection.create({
        title: todoText
      });
      this.ui.input.val('');
    }
  }*/

  onSubmit(event) {
    event.preventDefault();
    var data = {};

    const $form = this.ui.form;

    $form.find('input').each( (i, el) => {
      if ($(el).val() != ''){

        /*if( el.id === 'keywords' ) {
          formData[el.id] = [];
          _.each($(el).val().split(' '), function( keyword ) {
            formData[el.id].push({'keyword': keyword});
          });
        } else if(el.id === 'releaseDate') {
          formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
        } else {
        }
        */
       
        data[el.id] = $(el).val();
        $(el).val('');
      }
    });

    console.log(data);
    if (data) {
      this.collection.create( data );
    }

    //this.collection.add( new Book(formData) );
    //console.log('on submit');
  }


  initialize() {
    console.log('HeaderLayout::initializate() [...]');     
  }
}