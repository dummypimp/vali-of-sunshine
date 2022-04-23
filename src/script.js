var s = Snap('#svg-xp');

var sunfill = s.circle(330,300,0).attr({class: 'sunfill'});
var ray = s.path('M 330, 300 l -800, 0').attr({class: 'ray'});
var ray = s.path('M 330, 300 l 800, 0').attr({class: 'ray'});

// animates as a circle
// anime({
//   targets: $('.sun').get(),
//   strokeDashoffset: 0,
//   strokeWidth: 10,
//   duration: 400,
//   easing: 'easeInSine'
// });

// animates the sun fill color
anime({
  targets: $('.sunfill').get(),
  r: 180,
  duration: 300,
  easing: 'easeInOutExpo',
  delay: 20
});
// animates the rays
anime({
  targets: $('.ray').get(),
  strokeDashoffset: 0,
  strokeWidth: 0,
  duration: 100,
  easing: 'easeInOutQuint'
});

// splits each line by <br> and wraps with span and puts back
$broken = $('.stanza').text().trim().replace( /\n/g, '---' ).split('---');
$result = '';
for (var i = 0; i < $broken.length; i++) {
  $result += '<span class="new-line">' + $broken[i] + '</span>';
}
// replaces with split lines
$('.stanza').html($result);

// animates text
anime({
  targets: ['.poem-title', '.new-line'],
  top: 0,
  opacity: 1,
  duration: 1000,
  easing: 'easeInOutQuint',
  delay: function(el, index) {
    return index * 320
  }
});



// random circles function
$.fn.extend({
  randomCircles: function(options) {
    var defaults = {
      circleCount: 50,
      fillColor: '#ffae00',
      opacityVar: 0.6,
      useAnime: true
    };
    var options = $.extend(defaults, options);
    
    return this.each(function() {
      var o = options;
      for (var i = 0; i <= o.circleCount; i++) {
        var randomDi = Math.floor( Math.random() * 8 ) + 3;
        var randomX = Math.floor( Math.random() * $(window).width() );
        var randomY = Math.floor( Math.random() * $(window).height() );
        var opaciVar = Math.random() * o.opacityVar;
        var randomTra = (Math.random() * 500) + 200;
        
        $(this).append('<div class="rc--random-circle rc--' + i + '"></div>');
        $('.rc--' + i).css({
          background: o.fillColor,
          width: randomDi,
          height: randomDi,
          top: randomY,
          left: randomX
        });
        if (o.useAnime) {
          anime({
            targets: $('.rc--' + i).get(),
            opacity: opaciVar,
            duration: 100,
            easing: 'easeInOutQuint',
            delay: randomTra
          });
        } else {
          $('.rc--' + i).css('opacity', opaciVar);
        }
      }
    });
  }
});
// calling random circles
$('.rc--circles-wrap').randomCircles();