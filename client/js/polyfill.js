if (!Array.isArray) {
  console.log('Polyfill to Array.isArray aplied.');
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

if(!Array.prototype.includes) {

  console.log('Polyfill to Array.includes aplied.');

  Array.prototype.includes = function(elemento) {
      return this.indexOf(elemento) != -1;
  };
}