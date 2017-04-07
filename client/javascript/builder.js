(function() {

  var builder = {

    // Start the builder
    start: function() {
      console.log('builder')
    },
    
  };

  //
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = builder;
  else
    window.builder = builder;
})();
