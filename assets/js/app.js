$(function() {

  const render = function (NYTData) {

    // Get from the form the number of results to display
    // API doesn't have a 'limit' parameter, so we have to do this ourselves
    const numArticles = $('#article-count').val();
    // alert(NYTData.news);
    // const articles = NYTData.response.docs.slice(0, numArticles);
    const articles = NYTData.news.slice(0, numArticles);

    myFunction();
    articles.forEach(function(article) {

      // Append the article
      $('#article-section').append(buildArticle(article));
    });
  }

  const buildArticle = function(article) {

    // Create the  list group to contain the articles and add the article content for each
    const articleList = $('<ul>');

    // If the article has a news, log and append to $articleList
    const headline = article.headline;

    const articleListItem = $('<li>')

    if (headline) {
      console.log(headline);
      articleListItem.append(
        $('<h3>').text(article.datetime+ " "+headline)  
        // $('<h3>').text(datetime)
      );
    }

    // If the article has a byline, log and append to $articleList
    const byline = article.byline;

    if (byline && byline.original) {
      articleListItem.append($('<h5>').text(byline.original));
    }

    // Log section, and append to document if exists
    const section = article.section_name;

    if (section) {
      articleListItem.append($('<h5>').text(`Section: ${section}`));
    }

    // Log published date, and append to document if exists
    const pubDate = article.pub_date;

    if (pubDate) {
      articleListItem.append($('<p>').text(formatDate(article.pub_date)));
    }

    const articleLink = $('<a>')
      .attr('href', article.web_url)
      .attr('target', '_blank');

    articleLink.append(articleListItem)

    return articleLink;
  }

  const formatDate = function(date) {
    const months = [
      'January', 
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    // Create a new JavaScript Date object from the passed in date
    const dateObj = new Date(date);

    // return the date as a string in format 'Month DD, YYYY'
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  };
  // set the base array 
  // get the length of array in variable so that we do not repeat same task again and agan
  // as the arrat ay this atage is constant

  /* const displaySymbol = function (){
    var mySymbols = ['AAPL','FB','GOOG','NFLX','DOW'];
    var mySymbolsLength = mySymbols.length;
    for(mySymbolIndex=0;mySymbolIndex<mySymbolsLength;mySymbolIndex++){
    // lets show what we have 
    // alert(mySymbolIndex+ mySymbols[mySymbolIndex]);
    var btn = document.createElement('BUTTON');
    var t = document.createTextNode(mySymbols[mySymbolIndex]);
    btn.appendChild(t);
    // document.body.appendChild(btn);
    document.body.prepend(btn);
    
  };*/
  const isValidTicker = function (baseUrl, subjectTicker){
    prompt(baseUrl);
    retult = $.ajax({
      url: basUrl,
      method: 'GET'
    });
    prompt(result);
  }
  const RemoveThisGuy = function (thisbadboy) {
    MyDebug = false;
    // here will remove the elemnt from the array and remove corresponding button from scree as well
    // for( ind=0;ind<mySymbols.length && mySymbols[ind] == thisbadboy ;ind++) 
    for( ind=0;ind< mySymbols.length ;ind++) 
     if ( thisbadboy === mySymbols[ind] ) 
      {
        MyDebug && alert("before "+ mySymbols ) ; 
        MyDebug && alert(thisbadboy + " " + mySymbols[ind] ) ; 
        var tt = mySymbols.splice(ind) ; 
        MyDebug && alert("after "+ mySymbols ) ; 
        // locate the button for bad boy and delete it 
        var elem = document.getElementById(thisbadboy);
        elem.parentNode.removeChild(elem);
      } 
     
  }
  const search = function (event) {

    // This line allows us to take advantage of the HTML 'submit' property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the articles
    clear();

    // Build the query URL for the ajax request to the NYT API
    // check if the ticker is valid 
    // isValidTicker(baseUrl,"APPL");

    const queryURL = buildQueryURL();
    myFunction();
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the render function
    // alert("here in renedering" + queryURL);
    /* $.ajax({
      url: queryURL,
      method: 'GET',
      statusCode: { 404: function() { alert("page not found " + queryURL ); ; } }
    }).then(render);*/
    $.ajax({
      url: queryURL,
      method: 'GET',
      statusCode: { 404 : function() { alert("hi page not found " + queryURL +  " " + queryParams ) ; RemoveThisGuy(queryParams) ; myFunction(); } },
    }).then(render);
  }
  
  const buildQueryURL = function () {
  
    // queryURL is the url we'll use to query the API
    // let queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
    let queryURL = "https://api.iextrading.com/1.0/stock/";
    MyDebug && alert(baseUrl);
    // let baseUrl = "https://api.iextrading.com/1.0/ref-data/symbols"; 

    // aapl/batch?types=news&range=1m&last=10" ;
  
    // https://iextrading.com/developer/docs/#stocks";
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    // var queryParams = { 'api-key': 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931' };
    // const queryParams = { 'api-key': '59d9d23944844349af23e27e6c934b84' };
    queryParams = {};
    // console.log(queryURL);
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams= $('#search-term')
      .val()
      .trim();
      queryURL = queryURL + queryParams + "/batch?types=news";
    // console.log(" here it is " + queryURL+ $('#search-term').val().trim()+"/batch?types=news" );
    console.log(" here it is " + queryURL );
    MyDebug && alert(" length of existing array is "+mySymbols.length) ; 
    TargetSymbol=$('#search-term').val().trim();
    for( mySymbolIndex=0 ; ( mySymbolIndex < mySymbolsLength ) && ( mySymbols[mySymbolIndex] !== TargetSymbol ); mySymbolIndex++)
    {
     // did not find match so will continue till end
      MyDebug &&  alert(" checking  "+ TargetSymbol + " with " + mySymbols[mySymbolIndex] );
      if ( mySymbols[mySymbolIndex] === TargetSymbol ) {
        MyDebug && alert(" matched |" + TargetSymbol + "| matches  ? java script did not ! |" + mySymbols[mySymbolIndex]+"|")

    } else { 
      MyDebug && alert(" huh so do you think |" + TargetSymbol + "| matches  ? java script did not ! |" + mySymbols[mySymbolIndex]+"|");

           }
    } 

    if ( mySymbolIndex == mySymbolsLength )
     { mySymbols.push(TargetSymbol) ;
      MyDebug && alert(" now array length is "+mySymbols.length+ mySymbols);
      mySymbolsLength=mySymbols.length;
      for(mySymbolIndex=0;mySymbolIndex<mySymbolsLength;mySymbolIndex++){
      MyDebug && alert(" this is after adding " + mySymbolIndex + " " + mySymbols[mySymbolIndex]);
     }}
    
    // If the user provides a startYear, include it in the queryParams object
    const startYear = $('#start-year')
      .val()
      .trim();

    if (parseInt(startYear)) {
      queryParams.begin_date = `${startYear}0101`;
    }

    // If the user provides an endYear, include it in the queryParams object
    const endYear = $('#end-year')
      .val()
      .trim();

    if (parseInt(endYear)) {
      queryParams.end_date = `${endYear}0101`;
    }

    // Logging the URL so we have access to it for troubleshooting
    console.log('---------------\nURL: ' + queryURL + '\n---------------');
    console.log(queryURL + $.param(queryParams));

    // return "https://api.iextrading.com/1.0/stock/aapl/batch?types=news&range=1m&last=10";
    // return "https://api.iextrading.com/1.0/stock/aapl/batch?types=news&range=1m&last=10";
    return queryURL; // # + $.param(queryParams);
    // console.log(queryURL);
    // return queryURL;
  }
  const checkMyTicker = function (){
    // this part checks if the ticker exists 
    $.ajax({
      url: baseUrl,
      method: 'GET'
    }).then(render);
  }
  const addButtons = function (){
    for( mySymbolIndex=0 ; mySymbolIndex < mySymbolsLength ; mySymbolIndex++ ){
      // lets show what we have 
      MyDebug && alert(mySymbolIndex+ mySymbols[mySymbolIndex]);
      var btn = document.createElement('BUTTON');
      btn.onclick = function() { alert('you clicked me one '+btn.TEXT_NODE)}
      var t = document.createTextNode(mySymbols[mySymbolIndex]);
      btn.appendChild(t);
      // document.body.appendChild(btn);
      document.body.append(btn);
    }
  }
  // Function to empty out the article
  const clear = function () {
    $('#article-section').empty();
  }

  // CLICK HANDLERS
  // ==========================================================

  // .on('click') function associated with the Search Button
  $('#run-search').on('click', search);
  // $('#run-search').on('click', checkMyTicker());

  //  .on('click') function associated with the clear button
  $('#clear-all').on('click', clear);
});
