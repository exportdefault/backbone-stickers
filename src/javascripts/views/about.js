import BaseLayout   from './../core/layout';
import AboutTemplate from './../../templates/about.handlebars';

export default class AboutLayout extends BaseLayout {

  constructor(options) {
    super(options);
    this.template = AboutTemplate;
  }
}