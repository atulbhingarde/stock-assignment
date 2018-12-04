
const MyDebug = false ;
const baseUrl = "https://api.iextrading.com/1.0/ref-data/symbols"; 

const baseUrl1 = "https://api.iextrading.com/1.0/stock/" ; //  to check if its a valid ticker 

var isValidSym = true;
var firstTime = true; 
if ( typeof firstTime === undefined ) {  var firstTime = true; }
console.log(firstTime) ;
var mySymbols = ['AAPL','FB','GOOG','NFLX']; 
var completeList = Array();
var validationList = Array();
function getCompleteList (thisUrl) { 
  $.ajax({
    url: thisUrl,
    method: 'GET'
  }).then( function(response) 
             { 
                MyDebug && alert( thisUrl ); 
                MyDebug && alert( response ); 
                completeList = response ;
                lenMasterList=completeList.length ; 
                for(i=0;i<lenMasterList;i++) validationList[i] = completeList[i].symbol ; 
             });
  
  }
getCompleteList(baseUrl);
function testFunc () {
    if ( firstTime === true ) 
     {
     var mySymbols = ['AAPL','FB','GOOG','NFLX','DOW']; 
     console.log("loading this should appear only once");
     init1(); 
     firstTime = false; 
     
    }
    else { alert("will not execute any as we are here not for first time " ); firstTime = false;}
    
  };

function Once(){
    mySymbols = ['AAPL','FB','GOOG','NFLX'] ;

    console.log("run");

    let Once = function(){};
}
function init1()
 {
  
  
  if ( ( typeof mySymbols === undefined ) || !( mySymbols instanceof Array ) ) 
     {
      
      MyDebug && alert("current "+mySymbols);
      myRender();
     } 
  myRender();
  
 }
 
 init1();
 function checkMyTicker(thisUrl, myTicker){
    isValidSym=true;
    isValidSym = ( validationList.indexOf(myTicker) !== -1 ) ; // && alert( myTicker + " is a valid ticker " ) ;
    // this part checks if the ticker exists 
    
    if ( isValidSym ) { $.ajax({
              url: thisUrl,
              type: 'GET',
              success: function(response) 
               { 
                MyDebug && alert(thisUrl + " looks ok" );
                if ( mySymbols.indexOf(myTicker) === -1  ) 
                  { 
                    mySymbols.push(myTicker) ; 
                    MyDebug && alert( mySymbols );
                    myRender();
                  }
                },
              error: function(response) 
               {
                alert( ' woops! symbol ' + myTicker + " " + thisUrl + ' does not work it retutrned ' + response.status ); //or whatever
                                     
               }
           }
          ); } else { alert("ticker " + myTicker + " does not appear to be a real one"); }
    
    return isValidSym ; 
  }
   
        
function reply_click(clicked_id)
{
 // thisTick = clicked_id.innerText;
 thisTick = clicked_id ; 
 MyDebug &&  alert(thisTick);
 MyUrl = baseUrl1+thisTick+"/batch?types=quote,news,company&range=5y&last=400" ; 
 console.log(MyUrl+" for additional info "); 
 ( ( validationList.indexOf(thisTick) !== -1 ) && MyDebug ) && alert( thisTick + " is a valid ticker " ) ;
 $.ajax({
    url: MyUrl,
    method: 'GET'
  }).then( function(response) { 
                              MyDebug && alert( MyUrl ); 
                              MyDebug && alert( response ); 
                              // console.log(response.news[0].source);
                              lcompanyName = response.quote.companyName ;
                              latestPrice =  response.quote.latestPrice ;
                              // news = response.news[0].headline ; 
                              news = response.news ; 
                              ceo = response.company.CEO;
                              tags1 = response.company.tags ; 
                              console.log(lcompanyName);
                              isValidSym = ( lcompanyName !== 'undefined' ) ; 
                              $('#article-section').empty();
                              $('#article-section').append('<h1>Company Name :'+lcompanyName+'</h1>');
                              $('#article-section').append('<h2>LatestPrie :'+latestPrice+'</h2>');
                              $('#article-section').append('<h2>CEO :'+ceo+'</h2>');

                              for(i=0;( i < news.length ) && ( i < 10 ) ;i++) { $('#article-section').append('<h3>News '+i+" "+news[i].headline+'</h3>'); }
                              $('#article-section').append('<h3>tags :'+tags1+'</h3>');
                              // return isValidSym;                       
                              } ) ; // + response.companyName));
}
function searchMe(){
    TickerSym = document.getElementById('search-term');
    event.preventDefault();
    // firstTime = false ; 
    if ( TickerSym !== 'undefined' ) 
     {
     thisTick = TickerSym.value ; 
     MyDebug && alert(thisTick);
     // check if this symbol is a valid symbol by using proper API call
     MyUrl = baseUrl1+thisTick+"/batch?types=quote" ; 
     isitValid = checkMyTicker(MyUrl, thisTick);
     console.log(MyUrl + " is " + isitValid ) ;
     /* if ( ( isitValid === true ) && ( mySymbols.indexOf(thisTick) === -1  ) ) 
      { 
        mySymbols.push(thisTick) ; 
        alert(mySymbols);
        myRender();
      }*/
    }
   else 
    { alert(TickerSym + "appears to be undefined is it ?");}

}
function myRender() {
 var maxlength = mySymbols.length;
 // var mysymbolsind;
 for(var mysymbolsind=0; mysymbolsind < maxlength ; mysymbolsind++)
  {
   var para = document.createElement("BUTTON");
   var t = document.createTextNode(mySymbols[mysymbolsind]);
   // para.onclick = function() { alert("this is "+ mySymbols[mysymbolsind]) + " button "};
   // para.onClick="alert('ha ha ' + mysymbolsind )" ; 
   para.setAttribute("id", mySymbols[mysymbolsind]);

   para.setAttribute("onClick",`reply_click('${mySymbols[mysymbolsind]}')`);

   para.appendChild(t);
   tt1 = document.getElementById(mySymbols[mysymbolsind]) ;
   if ( tt1 === null )
    { document.getElementById("myDIV").appendChild(para); } 
  }
        
}
const buildQueryURL = function (thisSymbol) {
  
    // queryURL is the url we'll use to query the API
    let queryURL = "https://api.iextrading.com/1.0/stock/";
    MyDebug && alert(baseUrl);
    queryParams = {};
    // console.log(queryURL);
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams= $('#search-term')
      .val()
      .trim();
    // queryURL = queryURL + queryParams + "/batch?types=news";
    queryURL = queryURL + thisSymbol + "/batch?types=news";
    checkMyTicker(queryURL);
    // console.log(" here it is 1 " + queryURL+ $('#search-term').val().trim()+"/batch?types=news" );
    console.log(" here it is " + queryURL + " " + thisSymbol );
    MyDebug && alert(" length of existing array is "+mySymbols.length) ; 
    TargetSymbol=$('#search-term').val().trim();
    mySymbolsLength = mySymbols.length ; 
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

    return queryURL; // # + $.param(queryParams);
  };
// });

    
