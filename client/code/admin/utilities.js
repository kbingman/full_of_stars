require('inflections');

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
      attr: attr, 
      value: d.name,
      selected: object && d.name == object[attr]
    }
  });
}

// This needs to move to a form or events file...
exports.setFormActions = function(model, form){
  form.on('keyup', function(e){
    e.preventDefault();

    clearTimeout(Admin.timer);
    Admin.timer = setTimeout(function(){ 
      updateAttribute(e.target.name, e.target.value);
    }, 100);
  });
   
  // form.on('submit', function(e){
  //   e.preventDefault();
  //   exports.updateAttribute(e.target.name, e.target.value);
  // });
  
  form.find('select.live').on('change', function(e){
    e.preventDefault();
    updateAttribute(e.target.name, e.target.value);
  });
  
  form.find('.radio button.btn').on('click', function(e){
    e.preventDefault();

    if((e.currentTarget.tagName === 'BUTTON') && !e.currentTarget.className.has('active')){
      var value = $(e.currentTarget).data('value'),
          name = $(e.currentTarget).attr('rel');
          
      updateAttribute(name, value);
    }
  });
  
  var updateAttribute = function(name, value){
    var params = {};

    params[name] = value;
    model[name] = value; 

    model.update(params);  
  };
}



