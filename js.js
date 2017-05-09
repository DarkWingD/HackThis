$(function() {
  $('#openTerminal').click(function(){hideBlurb();});
  $('#container').hide();
  const CMDS_ = [
    'cat', 'clear', 'clock', 'date', 'echo', 'help', 'uname', 'whoami', 'su'
  ];
  const FILES_  = [
    'logfile_2015-01-20.txt', 'logfile_2015-06-2.txt', 'report1.doc', 'web.config'
  ];
  const USERS  = [
    'admin', 'report', 'logviewer', 'guest'
  ];
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  var currentUser = 'guest';
  var currentSystem = '@svr-1A89:/# '
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  $('#input-line .prompt').html(currentUser + currentSystem);
  var cmdLine_ = document.querySelector('#input-line .cmdline');
  var output_ = document.querySelector('#container output');

  //cmdLine_.addEventListener('click', inputTextClick_, false);
  //cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processInput, false);
  generateHackerHistory();

  function processInput(e){
    //manage history
    if (e.keyCode == 9){//tab
      //use regex here to fill out command based on FILES_
      var incomplete = this.value;
      var result = isInArray(incomplete,FILES_);
      this.value = "fdsafdsafdsa";
      e.preventDefault();
    }
    else if (e.keyCode == 38){//up

    }
    else if (e.keyCode == 40){//down

    }
    else if (e.keyCode == 13){//enter
      //History
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
      switch(cmd){
        case 'ls':
          output('<div class="ls-files">' + FILES_.join('<br>') + '</div>');
          break;
        case 'help':
          output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'whoami':
          output('<p>' + currentUser + '</p>');
          break;
        case 'cat':
          if (!args[1]){
            output('Usage: ' + cmd + 'fileToOpen.txt');
          }
          openFile(args[1]);
          break;
        default:
          output('unknown command : ' + args);
          break;
      }
      window.scrollTo(0, getDocHeight_());
      this.value = '';
    }
  };

  function getLoginPrompt(){
    return currentUser + currentSystem;
  };
  function openFile(e){
    switch(e){
      case 'logfile_2015-01-20.txt':
        output(printLogFile1());
        break;
    }
  };
  function printLogFile1(){
    return '<div>2015-02-03:11:04:34| ERROR</div><div>2015-02-03:11:04:34| ERROR</div>'
  };
  function output(e){
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

  function hideBlurb(){
    $('#backstory').fadeOut("slow",function(){$('#container').fadeIn();});
  };

  function isInArray(s,array){
    if(array.some(function(i){return (new RegExp()).text(s);}))
    for (var i = 0; i< array.length;i++){
      if (new RegExp('\\b' + array[i] +'\\b').text(s)){
        return array[i];
      }
    };
  };

  function generateHackerHistory(){
    output(`<div><div class="input-line line"><div class="prompt">admin@svr-1A89:/# </div>
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
          <div><input class="cmdline" value="logout" readonly=""></div></div>`);
  };
});
