var ss = require('socketstream').start();

describe('app.square', function(){

  it('should square a number', function(done){
    
    ss.rpc('app.square', 4, function(params){
      params.toString().should.equal('16');
      done();
    });

  });

});
