var greet = function(name){
  return 'hi:'+name
}
var exclaim = function(statement){
  return statement.toUpperCase()+'!' 
} 
var compose = function(greet,exclaim){
  return function(name){
    console.log(exclaim(greet(name)).replace(/(\w+:)/,function($1){
      return $1.toLowerCase() 
    }))  
  }  
} 

var welcome=compose(greet,exclaim)
welcome('dot')

//'hi: DOT!'

export default function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}