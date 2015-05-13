// Generated by CoffeeScript 1.6.3
(function() {
  var blocks, currSession;

  jQuery(function() {
    $("body").on('click', 'button', function(event) {
      return currSession.buttonClick(event.target);
    });
    return currSession.start();
  });

  blocks = [new kTrack.Instruction(kTrack.instructions[0]), new kTrack.InstGrid(kTrack.instructions[1]), new kTrack.Instruction(kTrack.instructions[2]), new kTrack.Instruction(kTrack.instructions[3]), new kTrack.Instruction(kTrack.instructions[4], "Back", "Start!"), new kTrack.PracBlock("prac1", "Ready?", kTrack.stim['pracLists'][0]), new kTrack.Instruction(kTrack.instructions[5], "See again", "Continue"), new kTrack.InstGrid(kTrack.instructions[6], kTrack.stim['pracLists'][0][0], true, false), new kTrack.InstGrid(kTrack.instructions[7], kTrack.stim['pracLists'][0][0], false, ['Cat'], false, false), new kTrack.Instruction(kTrack.instructions[8], null, "Start"), new kTrack.PracBlock("prac1", "Ready?", kTrack.stim['pracLists'][1], 2000), new kTrack.InstGrid("Please enter the last word of each category", kTrack.stim['pracLists'][1][0], false, kTrack.stim['pracLists'][1][1], false, false), new kTrack.Instruction(kTrack.instructions[9])];

  currSession = new kTrack.Session(blocks);

  currSession.start();

}).call(this);
