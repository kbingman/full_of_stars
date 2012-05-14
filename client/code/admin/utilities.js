exports.jsonifyParams = function(array){
  var params = {};
  array.map(function(p){
    params[p.name] = p.value;
  });
  return params
}

exports.openModal = function(){
  var modal = $('#modal').find('.modal');
  modal.modal();

  // Centers window
  modal.css({
    'margin-left': -1 * (modal.width() / 2) + 'px'
  }); 
}

exports.mustachizeSelect = function(attr, array, object){
  return array.map(function(d){
    return { 
      name: d.name,
      selected: object && d.name == object[attr] ? 'selected' : '' 
    }
  });
}
