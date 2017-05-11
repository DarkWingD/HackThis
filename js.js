$(function () {
  const hint_ = '#hint';
  const backstory_ = '#backstory';
  const container_ = '#container';
  const dialogue_ = '#dialogue';
  //create command objects with help text as param and command as another.
  const CMDS_ = [
    'cat', 'clear', 'clock', 'date', 'echo', 'help', 'uname', 'whoami', 'su'
  ];
  //create file objects, file name and file contents.
  const FILES_ = [
    'logfile_2015-01-20.txt', 'logfile_2015-06-2.txt', 'report1.doc', 'web.config'
  ];
  const USERS = [
    'admin', 'report', 'logviewer', 'guest'
  ];
  const HACKERHISTORY_ = `<div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="cat logfile_2015-01-20.txt" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="cp logfile_2015-01-20.txt /media" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="empty!" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="delete logfile_2015-01-20.txt" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="unknown command : delete" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="rm logfile_2015-01-21.txt" readonly=""></div></div>
        <div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
        <div><input class="cmdline" value="logout" readonly=""></div></div>`;

  var currentDateYear = 2;
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  var beenLS = false;
  var beenHelp = false;
  var beenCat = false;
  var beenWhoami = false;
  var beenDate = false;

  var currentUser = 'guest';
  var currentSystem = '@svr-1A89:/# '
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.addEventListener('click', function (e) {
    cmdLine_.focus();
  }, false);

  $(container_).hide();
  $(dialogue_).hide();
  $(hint_).hide();

  $('#input-line .prompt').html(currentUser + currentSystem);
  var cmdLine_ = document.querySelector('#input-line .cmdline');
  var output_ = document.querySelector('#container output');

  //cmdLine_.addEventListener('click', inputTextClick_, false);
  //cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processInput, false);
  generateHackerHistory();

  function processInput(e) {
    //manage history
    if (e.keyCode == 9) {//tab
      e.preventDefault(); 
      var incomplete = this.value;
      var result = isInArray(incomplete, FILES_);
      this.value = result;
    }
    else if (e.keyCode == 38) {//up		
      this.value = history_[history_.length - histpos_];
      histpos_--;
    }
    else if (e.keyCode == 40) {//down		
      this.value = history_[history_.length - histpos_];
      histpos_++;
    }
    else if (e.keyCode == 13) {//enter
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      var args = this.value;
      args = this.value.split(' ');
      var cmd = args[0];
      switch (cmd) {
        case 'su':
          if (!args[2]){
            output('Usage: ' + cmd + ' username password');
          }
          else {
            if (validateLogin(args[1], args[2])){

            }
          }
          break;
        case 'ls':
          hideHint();
          output('<div class="ls-files">' + FILES_.join('<br>') + '</div>');
          break;
        case 'help':
          output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'whoami':
          output('<p>' + currentUser + '</p>');
          break;
        case 'date':
          var date = new Date();
          date.setFullYear(date.getFullYear() + currentDateYear);
          output('<p>' + date + '</p>');
          break;
        case 'cat':
          showHint('Pressing TAB key will complete the file name if it is unique.');
          if (!args[1]) {
            output('Usage: ' + cmd + 'fileToOpen.txt');
          }
          else {
            openFile(args[1]);
          }
          break;
        default:
          output('unknown command : ' + args);
          break;
      }
      window.scrollTo(0, getDocHeight_());
      this.value = '';
    }
  };

  function validateLogin(uname,pword){
    if (uname == 'admin' && pword == 'Password1'){
      c
    }
  };

  function getLoginPrompt() {
    return currentUser + currentSystem;
  };

  function openFile(e) {
    switch (e) {
      case 'logfile_2015-01-20.txt':
        output(printLogFile1());
        break;
    }
  };

  function doesFileExist(fileName){
    return true;
  };

  function printLogFile1(fileName) {
    switch(fileName){
      case ''
    }
    return '<div>2015-02-03:11:04:34| invalid password for user "admin"</div><div>2015-02-03:11:04:34| unknown command "Password1"</div>'
  };

  function output(e) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + e + '</p>');
  };

  function getDocHeight_() {
    var d = document;
    return Math.max(
      Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
      Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
      Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  };

  function setCurrentUser(user) {
    currentUser = user;
    $('#input-line .prompt').html(currentUser + currentSystem);
  };

  $('#openTerminal').click(function () {
    hideBlurb();
    setTimeout(function () { showDialogue('You', 'What the?', 5000); }, 3000);
    setTimeout(function () { showDialogue('You', 'What is this?', 5000); }, 10000);
    setTimeout(function () { showDialogue('You', 'Looks like someone has been looking at the server logs.', 5000); }, 17000);
    setTimeout(function () { showDialogue('You', 'I should look at the logs to see what information is there.', 8000); }, 26000);
    setTimeout(function () { showHint('"ls" will display the list of files'); }, 26000);
    setTimeout(function () { showDialogue('You', 'What is in that first file?', 5000); }, 32000);
  });

  //Player dialogue and hints
  function hideHint() {
    if ($(hint_).is(":visible")) {
      $('#hint-text').text('');
      $(hint_).fadeOut('slow');
    }
  };

  function showHint(s) {
    $('#hint-text').text(s);
    $(hint_).fadeIn('slow');
  };

  function showDialogue(characterName, text, duration) {
    //$('#character-photo')
    $('#dialogue-text').text(characterName + ': ' + text);
    $(dialogue_).fadeIn('slow');
    setTimeout(function () { $(dialogue_).fadeOut('slow'); }, duration);
  };

  function hideBlurb() {
    $(backstory_).fadeOut("slow", function () { $('#container').fadeIn(); });
  };

  function isInArray(s, array) {
    //if(array.some(function(i){return (new RegExp()).text(s);}))
    for (var i = 0; i < array.length; i++) {
      if (new RegExp('\\b' + array[i] + '\\b').text(s)) {
        return array[i];
      }
    };
  };

  function generateHackerHistory() {
    output(HACKERHISTORY_);
  };
});
