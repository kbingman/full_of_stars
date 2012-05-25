var utilities = require('/utilities');

exports.present = function (system) { 
  var html = ss.tmpl['app-systems-tactical'].render(exports.context(system));

  $('#content').html(html);
  $('#overlay').show();

};
