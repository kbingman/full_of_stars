var ss = require('socketstream').start();

describe('ships.all', function(){

  it('should return true', function(done){
    
    ss.rpc('ships.all', function(params){
      params.should.equal(true);
      done();
    });

  });

});
