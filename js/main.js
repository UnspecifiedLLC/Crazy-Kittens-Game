console.log("loaded");
let $playButton;
let $main = $('.main-index');

let $title = $('#title');

let $link = $('#title-link');
$link.on('click', function(){
  if($(this).text() == "Instructions"){
    console.log("Need to open the Instructions");
    loadInstructionMain();
  }else{
    $title.text("Welcome to Crazy Kittens");
    $(this).text("Instructions").css('margin-left', '575px');

    loadIndexMain();
  }

});

function loadIndexMain(){
  $main.empty();
  $main.removeClass();
  $main.addClass('main-index');

  let div = $('<div>').addClass('info');
  let section = $('<section>');
  let h2 = $('<h2>').text('In a nutshell');
  let h3 = $('<h3>').text('If the Crazy Kitten gets you, you lose.');
  let h31 = $('<h3>').text('If you can avert the Crazy Kitten, you win.');
  let h32 = $('<h3>').text('Increase your chance of winning by using the other Kitten cards wisely.');

  section.append(h2).append(h3).append(h31).append(h32);
  div.append(section);

  let img = $('<img>').attr('src', 'images/crazy.png');
  div.append(img);

  $main.append(div);

  $playButton = $('<button>').attr('id', 'play').text('Play');
  $main.append($playButton);

  $playButton.on('click', function(){
    console.log(`clicked the play button`);
    loadGameMain();
  });

}

function loadGameMain(){
  $title.text("Crazy Kittens");

  $link.text("Home").css('margin-left', '315px');

  $main.empty();
  $main.removeClass('main-index');
  $main.addClass('main-game');

  addComputerSection();
  addDrawDiscardPiles();
  addUserSection();
}

function loadInstructionMain(){
  $title.text("Welcome to Crazy Kittens");
  $link.text("Home").css('margin-left', '315px');

  $main.empty();
  $main.removeClass();
  $main.addClass('main-index');

  let $sectionSetUp = $('<section>').attr('id', 'setup');
  let p1 = $('<p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

  $sectionSetUp.append(p1);
  let $sectionTurn = $('<section>').attr('id', 'turn');

  let p2 = $('<p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  $sectionTurn.append(p2);

  $main.append($sectionSetUp);
  $main.append($sectionTurn);

}


function addComputerSection(){
  let $section = $('<section>');
  $section.addClass('game-section').attr('id', 'computer-section');

  let $div = $('<div>').attr('id', 'computer-table');


  for(let i = 0; i < 4; i++){
    let $img = $('<img>').attr('src', 'images/back.png')
        .attr('alt', "")
        .attr('title', "");

    $div.append($img);
  }
  $section.append($div);

  $main.append($section);

}

function addUserSection(){
  let $section = $('<section>');
  $section.addClass('game-section').attr('id', 'user-section');

  let $div = $('<div>').attr('id', 'user-table');


  for(let i = 0; i < 4; i++){
    let $img = $('<img>').attr('src', 'images/back.png')
        .attr('alt', "")
        .attr('title', "");

    $div.append($img);
  }
  $section.append($div);

  $main.append($section);

}

function addDrawDiscardPiles(){
  let $section = $('<section>');
  $section.addClass('game-section').attr('id', 'draw-discard');

  let $drawImg = $('<img>').attr('src', 'images/back.png')
      .attr('alt', "")
      .attr('title', "")
      .attr('id', 'draw-pile');

  let $discardImg = $('<img>').attr('src', 'images/back.png')
      .attr('alt', "")
      .attr('title', "")
      .attr('id', 'discard-pile');


  $section.append($drawImg);
  $section.append($discardImg);

  $main.append($section);
}

loadIndexMain();
