
var baseUrlforTicker="https://api.iextrading.com/";
var version=1.0;

function myFunction() {
  $myTicker =  document.getElementById("mytext").val;
  alert($myTicker);
  console.log($myTicker);
  var formedUrl=baseUrlforTicker+"/"+$myTicker+"/company";
  document.getElementById("mytext").val("hi there");
  console.log(formedUrl);
  
}
function getFullName(ticker){
    function createGist(opts) {
        ChromeSamples.log('Posting request to GitHub API...');
        fetch('https://api.github.com/gists', {
          method: 'post',
          body: JSON.stringify(opts)
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          ChromeSamples.log('Created Gist:', data.html_url);
        });
      }
      
      
}