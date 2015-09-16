
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=whiskey&includes=Images,Shop";



fetchJSONP(url, function(response){
  console.log(response);
  var items = response.results;
  items.forEach(displayItem);
});


function displayItem(whiskey){
  var source = document.querySelector('#whiskey-template').innerHTML;
  var template = Handlebars.compile(source);
  var outputHTML = template(whiskey);

  var whiskey_listUl = document.querySelector('.js_whiskey_list');
  whiskey_listUl.insertAdjacentHTML('beforeend', outputHTML);
}
