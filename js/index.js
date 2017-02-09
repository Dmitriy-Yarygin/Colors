var colorCode = [ '#A52A2A', '#FF0000', '#FF7F50', '#FFA500', '#FFD700', '#FFFF00',  '#808000', '#008000', '#00FFFF', '#40E0D0', 'Cornflowerblue', '#0000FF', '#4B0082' ],
    colorNames = [ 'Brown' , 'Red', 'Coral', 'Orange', 'Gold', 'Yellow', 'Olive', 'Green', 'Cyan', 'Turquoise', 'Cornflowerblue', 'Blue', 'Indigo'  ],
    colorNamesRu = ['Коричневый', 'Красный', 'Коралловый', 'Оранжевый', 'Золотистый', 'Желтый', 'Оливковый', 'Зеленый', 'Голубой', 'Бирюзовый', 'Васильковый', 'Синий', 'Индиго'  ],
    guessedColorIndex = getRandomInt( colorCode.length ),
    attemptsCount=0;
makeColorTable( colorCode.length );
$( ".childUlElem" ).click( fnColorClick );
//$('#youWinModal').on('show.bs.modal', function(){ } );
$('#youWinModal').on('hide.bs.modal', stopYoutube );


/******************************************************************************************************/
/******************************************************************************************************/
function fnBegin() {
  document.querySelector('.winner').setAttribute( "class", "childUlElem");   
  var spanBlocks = document.querySelectorAll('.pointers');
  for (var i = 0; i < spanBlocks.length; i++) {
    spanBlocks[i].firstElementChild.setAttribute( "class", "glyphicon"); 
    spanBlocks[i].lastElementChild.setAttribute( "class", "glyphicon"); 
  }
  guessedColorIndex = getRandomInt( colorCode.length );
  attemptsCount=0;
}
/******************************************************************************************************/
function getRandomInt(n) {
    var guessedColorIndex = Math.floor( Math.random() * n )
    console.log('guessedColorIndex='+guessedColorIndex);
    return guessedColorIndex;
}
/******************************************************************************************************/
function makeColorTable(n) {
    var parentElem = document.querySelector( '.colorsList' ),
        tBodyElem = document.createElement('tbody'),
        parentUlElem = document.createElement('ul');
    parentUlElem.setAttribute( "class", "parentUlElem" ); 
  
    for ( var i = 0; i < n; i++ ) {
        var parentLiElem = document.createElement('li');
        var childUlElem = document.createElement('ul'); 
        childUlElem.setAttribute( "class", "childUlElem" ); 
        childUlElem.setAttribute( "colorIndex", i); 
      // добавляем название цвета на английском языке 
        var childLiElem = document.createElement('li');
        childLiElem.innerHTML = colorNames[i];
        childLiElem.setAttribute( "class", "childLiElem" );  
        childUlElem.appendChild( childLiElem );
      // добавляем "картику" цвета
        var childLiElem = document.createElement('li');
        childLiElem.style.background = colorCode[i]; 
        childLiElem.setAttribute( "class", "colorDivClass childLiElem" ); 
        childUlElem.appendChild( childLiElem );  
      // добавляем название цвета на русском языке   
        var childLiElem = document.createElement('li');
        childLiElem.innerHTML = colorNamesRu[i];
        childLiElem.setAttribute( "class", "childLiElem" );  
        childUlElem.appendChild( childLiElem );
      // добавляем пустой элемент - далее в нем будут появляться подсказки
        var childLiElem = document.createElement('li');
        childLiElem.setAttribute( "class", "childLiElem pointers" ); 
        insertArrows( childLiElem );
        childUlElem.appendChild( childLiElem );  

        parentLiElem.appendChild( childUlElem );
        parentUlElem.appendChild( parentLiElem );
    }    
    tBodyElem.appendChild( parentUlElem );
    parentElem.appendChild( tBodyElem );
}
/******************************************************************************************************/
function insertArrows( parent ) {
  // var icon = ['glyphicon-hand-right further', 'glyphicon-hand-up earlier', 
  //             'glyphicon-hand-down further', 'glyphicon-hand-left earlier'];
  for (var i=2; i--;) {
    var spanElem = document.createElement('span'); 
    spanElem.setAttribute( "class", "glyphicon");  
    parent.appendChild( spanElem );
  }
}  
/******************************************************************************************************/
function fnColorClick() {
  var k = this.getAttribute( "colorIndex"),
      spanBlock = this.lastElementChild,
      span1 = spanBlock.firstElementChild,
      span2 = spanBlock.lastElementChild;
  attemptsCount++;
  playSound( colorNames[k] );
  if ( k == guessedColorIndex ) {    // цвет угадан
    console.log( k + ' = ' + guessedColorIndex );
    $(this).addClass("winner orangeBorder");  
    var s = ' ' + attemptsCount,
        l = s.length;
    if (s.length>2 && s[l-2]=='1') 
      s +=' попыток';
    else switch( s[l-1] ) {
        case '1': s +=' попытку';
        break;
        case '2': 
        case '3': 
        case '4': s +=' попытки';
        break;
      default: s +=' попыток';
    }
    document.querySelector( '#attemptsCountNode' ).innerHTML = s;
    $('#youWinModal').modal('show');
    playYoutube( 0 );
    
  } else if ( k > guessedColorIndex ) {
    console.log( k + ' > ' + guessedColorIndex );  
    $( span1 ).addClass( "earlier glyphicon-hand-left" ).removeClass( "further glyphicon-hand-right" );
    $( span2 ).addClass( "earlier glyphicon-hand-up" )  .removeClass( "further glyphicon-hand-down" );
    $( spanBlock ).Show;
  } else {
    console.log( k + ' < ' + guessedColorIndex );  
    $( span1 ).removeClass( "earlier glyphicon-hand-left" ) .addClass( "further glyphicon-hand-right" );
    $( span2 ).removeClass( "earlier glyphicon-hand-up" ) .addClass( "further glyphicon-hand-down" );
    $( spanBlock ).Show;    
  }   
}
/******************************************************************************************************/
function playSound(fileName) { 
  console.log(fileName);
  var mySrc = "sound/"+fileName+".mp3";
  document.querySelector("audio").setAttribute( "src", mySrc ); 
} 
/******************************************************************************************************/
function playYoutube(start, end) { 
   var mySrc = "https://www.youtube.com/embed/ybt2jhCQ3lA?controls=0&showinfo=0&iv_load_policy=3&modestbranding=1&fs=0&rel=0&autoplay=1&start="+start;
   if (end) mySrc += "&end="+end;
   document.querySelector("iframe").setAttribute( "src", mySrc ); 
} 
/******************************************************************************************************/
function stopYoutube() { 
   $('#youWinModal iframe').removeAttr('src');
} 
/******************************************************************************************************/