var utilities = require('/utilities');

exports.present = function (system) { 
  var html = ss.tmpl['app-systems-tactical'].render({});

  $('#content').html(html);
  $('#overlay').show();

};
