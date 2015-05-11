// Generated by CoffeeScript 1.6.3
(function() {
  var Block, Debriefing, InstGrid, Instruction, PracBlock, Questionnaire, Session, Word, all_cats, all_stim, blocks, categories, clearGrid, closeGrid, currSession, fillGrid, hideButtons, instructions, keyText, mean, psiTurk, stimLength,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  instructions = ["In this task, you'll see one word at a time from various categories.<br><br>Your job will be to remember the last word from specific categories. <br><br>Let's see how it works!", "The words you'll see belong to six categories.<br>Take a second to familiarize yourself with them. ", "You'll be told which categories to keep track of before you see the words. <br><br>For example, you may be asked to keep track of <i>only</i> 'Colors' and 'Animals'.<br><br>In this case, you'll want to ignore words from other categories, like 'Countries.'", "You'll always see on the screen the category names you should keep track of.<br><br>Above the categories you'll see one word at a time for about 2 seconds each.<br><br>Let's see an example.", "For this example, we're going to slow everything down to make it easier to understand.<br><br>You'll be keeping track of <strong>'Animals'</strong> and <strong>'Relatives'</strong>. <br><br>Only keep track of the <i>last</i> word from each of these categories.<br><br>Click start to begin! ", "The last Animal word was 'Cat' and the last Relative was 'Aunt'.  <br><br>Is that what you saw?<br><br> If you are confused watch that again, otherwise let's learn how to input your responses.", "You'll see a grid with all of the possible words in the categories you were asked to keep track of, like this:<br><br><br><br><br>To respond, just click on the word you thought was the last of each category. ", "Try entering, 'Cat' and 'Aunt', the correct answer of the example", "Good job. Notice how once you entered an answer, the other words in that category became disabled. <br><br>Let's do a longer example, this time at full speed.<br><br>Remember to pay attention to the categories and only keep track of the <i>last</i> item from each category", "Great! You're done with the practice"];

  psiTurk = PsiTurk(uniqueId, adServerLoc);

  psiTurk.preloadPages(['postquestionnaire.html', 'debriefing.html']);

  mean = function(numericArray) {
    var avg, sum;
    sum = numericArray.reduce(function(a, b) {
      return a + b;
    });
    avg = sum / numericArray.length;
    return avg;
  };

  hideButtons = function() {
    $("#leftButton").hide();
    return $("#rightButton").hide();
  };

  keyText = function(text, key) {
    if (key === 'left') {
      $("#leftText").html(text);
      return $("#leftButton").show();
    } else {
      $("#rightText").html(text);
      return $("#rightButton").show();
    }
  };

  fillGrid = function(cats) {
    var cat, cdiv, filt, i, x, _i, _len, _results;
    clearGrid();
    $('.btn-group').parent().addClass('hidden');
    $('#responses').show().removeClass('hidden');
    i = 1;
    _results = [];
    for (_i = 0, _len = cats.length; _i < _len; _i++) {
      cat = cats[_i];
      cdiv = "#c" + i.toString();
      filt = cdiv + ' > button';
      $(cdiv).parent().removeClass('hidden');
      $(cdiv).prev().html(cat + "&nbsp&nbsp");
      x = 0;
      $(filt).each(function() {
        $(this).html(categories[cat][x]);
        return x = x + 1;
      });
      _results.push(i = i + 1);
    }
    return _results;
  };

  closeGrid = function(func) {
    var _this = this;
    $('#responses').fadeOut();
    return setTimeout((function() {
      return func();
    }), 1000);
  };

  clearGrid = function() {
    return $('.resp').removeClass('btn-primary');
  };

  all_stim = {
    "pracLists": [[["Relatives", "Animals"], ["Aunt", "Cat"], ["Horse", "Mile", "Steel", "Cat", "Meter", "Green", "Aunt"]], [["Metals", "Countries", "Distances", "Colors"], ["Steel", "Mexico", "Yard", "Green"], ["Red", "Blue", "Tin", "Cow", "Yellow", "England", "Lion", "Meter", "Inch", "Mexico", "Black", "Brother", "Green", "Cat", "Yard", "Aunt", "Uncle", "Steel", "Horse", "Father"]]]
  };

  categories = {
    "Animals": ["Dog", "Cat", "Tiger", "Horse", "Lion", "Cow"],
    "Relatives": ["Sister", "Mother", "Brother", "Aunt", "Father", "Uncle"],
    "Distances": ["Mile", "Centimeter", "Inch", "Foot", "Meter", "Yard"],
    "Countries": ["Germany", "Russia", "Canada", "France", "England", "Mexico"],
    "Metals": ["Zinc", "Tin", "Steel", "Iron", "Copper", "Platinum"],
    "Colors": ["Red", "Green", "Blue", "Yellow", "Black", "Orange"]
  };

  all_cats = ['Distances', 'Relatives', 'Animals', 'Countries', 'Metals', 'Colors'];

  stimLength = 2000;

  Session = (function() {
    function Session(blocks) {
      this.blocks = blocks;
      hideButtons();
      this.blockNumber = 0;
      this.max_blocks = this.blocks.length;
      this.imgs_loaded = 0;
    }

    Session.prototype.start = function() {
      psiTurk.finishInstructions();
      this.imgs_loaded++;
      if (this.imgs_loaded === 2) {
        return this.nextBlock();
      }
    };

    Session.prototype.nextBlock = function() {
      var _this = this;
      this.currBlock = this.blocks[this.blockNumber];
      if (this.blockNumber >= this.max_blocks) {
        return this.endSession();
      } else {
        this.blockNumber++;
        $('.tasktext').html(' ');
        return this.currBlock.start((function(arg1) {
          return _this.exitBlock(arg1);
        }));
      }
    };

    Session.prototype.prevBlock = function() {
      var _this = this;
      if (this.blockNumber > 1) {
        this.blockNumber = this.blockNumber - 2;
      }
      this.currBlock = this.blocks[this.blockNumber];
      this.blockNumber++;
      return this.currBlock.start((function(arg1) {
        return _this.exitBlock(arg1);
      }));
    };

    Session.prototype.exitBlock = function(next) {
      if (next == null) {
        next = true;
      }
      if (next) {
        return this.nextBlock();
      } else {
        return this.prevBlock();
      }
    };

    Session.prototype.endSession = function() {
      return psiTurk.completeHIT();
    };

    Session.prototype.buttonClick = function(e) {
      return this.currBlock.buttonClick(e);
    };

    return Session;

  })();

  Instruction = (function() {
    function Instruction(message, leftKey, rightKey, corrResp) {
      this.message = message;
      this.leftKey = leftKey != null ? leftKey : null;
      this.rightKey = rightKey != null ? rightKey : "Continue";
      this.corrResp = corrResp != null ? corrResp : null;
    }

    Instruction.prototype.start = function(exitTrial) {
      this.exitTrial = exitTrial;
      this.startTime = (new Date).getTime();
      $('#inst').html(this.message);
      $('#inst').show();
      hideButtons();
      if (this.leftKey != null) {
        keyText(this.leftKey, 'left');
      }
      return keyText(this.rightKey, 'right');
    };

    Instruction.prototype.buttonClick = function(button) {
      var acc, rt,
        _this = this;
      rt = (new Date).getTime() - this.startTime;
      if (this.corrResp != null) {
        if (this.corrResp === button) {
          $('#correct').modal('show');
          setTimeout((function() {
            return $('#correct').modal('hide');
          }), 1250);
          setTimeout((function() {
            return _this.exitTrial();
          }), 1250);
          acc = 1;
        } else {
          $('#error').modal('show');
          setTimeout((function() {
            return $('#error').modal('hide');
          }), 1250);
          acc = 0;
        }
      } else {
        if (button.id === 'leftText' || button.id === 'leftButton') {
          acc = 'BACK';
          this.exitTrial(false);
        } else if (button.id === 'rightText' || button.id === 'rightButton') {
          acc = 'FORWARD';
          this.exitTrial();
        }
      }
      return psiTurk.recordTrialData({
        'block': this.message,
        'rt': rt,
        'resp': button,
        'acc': acc
      });
    };

    return Instruction;

  })();

  InstGrid = (function() {
    function InstGrid(message, categories, disabled, correct, leftKey, rightKey) {
      this.message = message;
      this.categories = categories != null ? categories : all_cats;
      this.disabled = disabled != null ? disabled : true;
      this.correct = correct != null ? correct : false;
      this.leftKey = leftKey != null ? leftKey : "Back";
      this.rightKey = rightKey != null ? rightKey : "Continue";
      this.maxClicks = this.correct.length;
      console.log(this.correct.length);
    }

    InstGrid.prototype.start = function(exitTrial) {
      this.exitTrial = exitTrial;
      fillGrid(this.categories);
      $('#inst').html(this.message);
      $('#inst').show();
      hideButtons();
      if (this.leftKey) {
        console.log(this.leftKey);
        keyText(this.leftKey, 'left');
      }
      if (this.rightKey) {
        keyText(this.rightKey, 'right');
      }
      if (this.correct !== false) {
        keyText('Submit', 'right');
        $('#rightButton').addClass('disabled');
        return $('#rightButton').removeClass('btn-success');
      }
    };

    InstGrid.prototype.reset = function() {
      return clearGrid();
    };

    InstGrid.prototype.buttonClick = function(button) {
      if (button.id === 'leftText' || button.id === 'leftButton') {
        return closeGrid(this.exitTrial(false));
      } else if (button.id === 'rightText' || button.id === 'rightButton') {
        if (!this.correct) {
          return closeGrid(this.exitTrial);
        } else {
          return this.checkResponses();
        }
      } else {
        if (!this.disabled) {
          $(button).siblings().removeClass('btn-primary');
          $(button).toggleClass('btn-primary');
        }
        if ($('.resp.btn-primary').length === this.maxClicks) {
          $('#rightButton').removeClass('disabled');
          return $('#rightButton').addClass('btn-success');
        } else if ($('.resp.btn-primary').length !== this.maxClicks) {
          $('#rightButton').addClass('disabled');
          return $('#rightButton').removeClass('btn-success');
        }
      }
    };

    InstGrid.prototype.checkResponses = function() {
      var allCorr, resp, responses, _i, _len,
        _this = this;
      responses = $('.resp.btn-primary').map(function() {
        return $(this).text();
      }).get();
      allCorr = true;
      for (_i = 0, _len = responses.length; _i < _len; _i++) {
        resp = responses[_i];
        if (__indexOf.call(this.correct, resp) >= 0 === false) {
          allCorr = false;
        }
      }
      if (allCorr) {
        closeGrid(this.exitTrial);
        $('#correct').modal('show');
        return setTimeout((function() {
          return $('#correct').modal('hide');
        }), 1250);
      } else {
        return this.showError();
      }
    };

    InstGrid.prototype.showError = function() {
      var _this = this;
      $('#error').modal('show');
      return setTimeout((function() {
        return $('#error').modal('hide');
      }), 1250);
    };

    return InstGrid;

  })();

  Block = (function() {
    function Block(condition, message, trial_structure) {
      var word;
      this.condition = condition;
      this.message = message;
      this.trialNumber = 0;
      this.categories = trial_structure[0];
      this.target_words = trial_structure[1];
      this.words = (function() {
        var _i, _len, _ref, _results;
        _ref = trial_structure[2];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          word = _ref[_i];
          _results.push(new Word(word));
        }
        return _results;
      })();
      this.max_trials = this.words.length;
      this.catText = this.categories.join("&nbsp&nbsp");
    }

    Block.prototype.start = function(exitBlock) {
      var _this = this;
      this.exitBlock = exitBlock;
      hideButtons();
      $('#topText').html(this.message);
      return setTimeout((function() {
        $('#topText').html(" ");
        $('#bottomText').html(_this.catText);
        return setTimeout((function() {
          return _this.nextTrial();
        }), stimLength);
      }), stimLength);
    };

    Block.prototype.nextTrial = function() {
      var _this = this;
      this.currTrial = this.words[this.trialNumber];
      if (this.trialNumber >= this.max_trials) {
        this.trialNumber++;
        return this.getResponses();
      } else {
        this.trialNumber++;
        return this.currTrial.show((function() {
          return _this.nextTrial();
        }));
      }
    };

    Block.prototype.getResponses = function() {
      $('#bottomText').html(" ");
      $('#topText').html(" ");
      $('#inst').html("Please enter the last word of each category");
      fillGrid(this.categories);
      this.maxClicks = this.categories.length;
      return this.clicks = 0;
    };

    Block.prototype.buttonClick = function(button) {
      this.clicks = this.clicks + 1;
      $(button).siblings().removeClass('btn-primary').addClass('disabled');
      $(button).toggleClass('btn-primary').addClass('disabled');
      if (this.clicks === this.maxClicks) {
        closeGrid(this.exitBlock);
      }
      return psiTurk.recordTrialData({
        'block': this.condition,
        'target_words': this.target_words,
        'input_words': this.data
      });
    };

    return Block;

  })();

  PracBlock = (function(_super) {
    __extends(PracBlock, _super);

    function PracBlock(condition, message, trial_structure, speed) {
      var word;
      this.condition = condition;
      this.message = message;
      if (speed == null) {
        speed = 3500;
      }
      PracBlock.__super__.constructor.call(this, this.condition, this.message, trial_structure);
      this.words = (function() {
        var _i, _len, _ref, _results;
        _ref = trial_structure[2];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          word = _ref[_i];
          _results.push(new Word(word, speed));
        }
        return _results;
      })();
    }

    PracBlock.prototype.getResponses = function() {
      $('#bottomText').html(" ");
      $('#topText').html(" ");
      return this.exitBlock();
    };

    return PracBlock;

  })(Block);

  Word = (function() {
    function Word(word, stimLength) {
      this.word = word;
      this.stimLength = stimLength != null ? stimLength : stimLength;
    }

    Word.prototype.show = function(exitTrial) {
      var _this = this;
      this.exitTrial = exitTrial;
      $('#topText').html(this.word);
      return setTimeout((function() {
        return _this.exitTrial();
      }), this.stimLength);
    };

    return Word;

  })();

  Questionnaire = (function() {
    function Questionnaire() {}

    Questionnaire.prototype.start = function(exitTrial) {
      this.exitTrial = exitTrial;
      return $('body').html(psiTurk.getPage('postquestionnaire.html'));
    };

    Questionnaire.prototype.buttonClick = function() {
      $("select").each(function(i, val) {
        psiTurk.recordUnstructuredData(this.id, this.value);
        return console.log([this.id, this.value]);
      });
      psiTurk.recordUnstructuredData('openended', $('#openended').val());
      return this.exitTrial();
    };

    return Questionnaire;

  })();

  Debriefing = (function() {
    function Debriefing() {}

    Debriefing.prototype.start = function(exitTrial) {
      this.exitTrial = exitTrial;
      return $('body').html(psiTurk.getPage('debriefing.html'));
    };

    Debriefing.prototype.buttonClick = function() {
      return this.exitTrial();
    };

    return Debriefing;

  })();

  jQuery(function() {
    $("body").on('click', 'button', function(event) {
      return currSession.buttonClick(event.target);
    });
    return currSession.start();
  });

  blocks = [new Instruction(instructions[0]), new InstGrid(instructions[1]), new Instruction(instructions[2]), new Instruction(instructions[3]), new Instruction(instructions[4], "Back", "Start!"), new PracBlock("prac1", "Ready?", all_stim['pracLists'][0]), new Instruction(instructions[5], "See again", "Continue"), new InstGrid(instructions[6], all_cats, true, false), new InstGrid(instructions[7], all_cats, false, ['Aunt', 'Cat'], false, false), new Instruction(instructions[8], null, "Start"), new PracBlock("prac1", "Ready?", all_stim['pracLists'][1], 2000), new InstGrid("Please enter the last word of each category", all_cats, false, all_stim['pracLists'][1][1], false, false), new Instruction(instructions[9]), new Questionnaire, new Debriefing];

  currSession = new Session(blocks);

  currSession.start();

}).call(this);
