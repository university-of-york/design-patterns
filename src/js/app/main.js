define(
  ['jquery', 'es5shim', 'picturefill',
   'app/utils', 'app/modal-link', 'app/accordion', 'app/sticky-nav',
   'app/targeted-nav', 'app/clearing-table', 'app/tabs', 'app/responsive-tables',
   'app/toggle', 'app/wrapper-height', 'app/youtube-embed', 'app/soundcloud-embed',
   'app/searchable-tables', 'app/filterable-tables', 'app/equal-height-row', 'app/analytics'],
  function (
    $, ES5SHIM, PICTUREFILL,
    UTILS, MODALLINK, ACCORDION, STICKYNAV,
    TARGETEDNAV, CLEARINGTABLE, TABS, TABLE,
    TOGGLE, WRAPPERHEIGHT, YOUTUBE, SOUNDCLOUD,
    SEARCHABLE, FILTERABLE, EQUALHEIGHT, ANALYTICS) {

  $(function(){

    if (typeof window.console === 'undefined') {
      console = {};
      console.log = function (a) { /*alert(a);*/ };
    }

    // Disable buttons
    $('.btn-disabled').click(function (e) {
      e.preventDefault();
      return false;
    });

    var $window = $(window);
    var $html = $('html');

    // Interval to check if fonts have loaded
    var t = setInterval(function() {
      if ($html.hasClass('wf-active')) {
        $window.trigger('fonts.active');
        clearInterval(t);
      }
    }, 15);

    //Prevent orphaned words in headings and paras
    $('h1, h2, h3, p').each(function(){
        var string = $(this).html();
        string = string.replace(/ ([^ ]*)$/,' $1');
        $(this).html(string);
    });

    // Add accordion functionality
    UTILS.eachIfExists('.js-accordion__item', function (i, accordion) {
      var a = new ACCORDION({
        container: accordion
      });
      // Wait till fonts are loaded
      UTILS.fontsActive(a.setAccordionHeight, a);
    });

    // Add responsive tables functionality
    UTILS.eachIfExists('.js-responsive-table', function (i, table) {
      new TABLE({
        container: table
      });
    });

    // Add tab functionality
    UTILS.eachIfExists('.js-tabs', function (i, tabs) {
      new TABS({
        container: tabs
      });
    });

    // Go to tab if hash is set
    UTILS.scrollToHash();

    // Add menu toggle functionality
    UTILS.eachIfExists('.js-toggle-button', function (i, button) {
      var $b = $(button);
      var $c = $($b.attr('href'));
      // console.log($b.attr('href'));
      new TOGGLE({
        container: $c,
        button: $b,
        className:'is-open'
      });
    });

    // Use anchors to submit forms
    UTILS.eachIfExists('.js-submit-form', function (i, a) {
      var $a = $(a);
      var thisForm = $a.parents('form');
      $a.on('click', function (e) {
        e.preventDefault();
        thisForm.submit();
      });
      // Enter won't submit form when there's no <input> or <button>
      thisForm.find('input, textarea').keypress(function(e) {
        // Was Enter pressed?
        if (e.which == 10 || e.which == 13) {
          this.form.submit();
        }
      });
    });

    // Clearing tables
    UTILS.eachIfExists('#clearing-courses-uk-eu', function (i, a) {
      new CLEARINGTABLE({
        type: 'Home/EU',
        container: $(a)
      });
    });

    UTILS.eachIfExists('#clearing-courses-international', function (i, a) {
      new CLEARINGTABLE({
        type: 'International',
        container: $(a)
      });
    });

    // A link with class .js-modal will href modal content
    UTILS.eachIfExists('.js-modal', function (i, a) {
      new MODALLINK({
        link: $(a)
      });
    });

    // Add sticky nav functionality to nav
    UTILS.eachIfExists('.js-sticky-nav', function (i, a) {
      new STICKYNAV({
        container: $(a)
      });
    });

    // Add targeted nav functionality to nav
    UTILS.eachIfExists('.js-targeted-nav', function (i, a) {
      new TARGETEDNAV({
        container: $(a)
      });
    });

    // Add youtube video to embed links
    UTILS.eachIfExists('.youtube-video-embed', function (i, a) {
      new YOUTUBE({
        link: $(a)
      });
    });

    // Add youtube video to embed links
    UTILS.eachIfExists('.soundcloud-audio-embed', function (i, a) {
      new SOUNDCLOUD({
        link: $(a)
      });
    });

    // Make a table searchable
    UTILS.eachIfExists('.js-searchable-table', function (i, a) {
      var $a = $(a),
          hasHeader = $a.attr('data-header') == 'true' ? true : false ,
          isCaseSensitive = $a.attr('data-case-sensitive') == 'true' ? true : false ,
          includeCols = $a.attr('data-include-cols') ? $a.attr('data-include-cols').split(',') : false ,
          excludeCols = $a.attr('data-exclude-cols') ? $a.attr('data-exclude-cols').split(',') : false ;

      var s = new SEARCHABLE({
        table: $a,
        header: hasHeader,
        cols: {
          include: includeCols,
          exclude: excludeCols
        },
        caseSensitive: isCaseSensitive
      });
    });

    // Make a table filterable
    UTILS.eachIfExists('.js-filterable-table', function (i, a) {
      var $a = $(a),
          hasHeader = $a.attr('data-header') == 'true' ? true : false ;
      var f = new FILTERABLE({
        table: $a,
        header: hasHeader
      });
    });

    // Make a table filterable
    UTILS.eachIfExists('.js-equal-height-row', function (i, a) {
      var e = new EQUALHEIGHT({
        row: $(a)
      });
    });

    // Update 'More' text
    $window.on('toggle', function(e, options) {
      if (options.container.attr('id') === 'Main-Navigation') {
        var newText = options.button.html() === 'Close' ? 'More…' : 'Close' ;
        options.button.html(newText);
      }
    });

    // Set min-height on wrapper (to ensure footer is (at least) at bottom of page)
    var w = new WRAPPERHEIGHT();

    UTILS.eachIfExists('#Course-Search', function(i, a) {
      var $a = $(a),
          inputs = $a.find('input[type=radio]');
      inputs.change(function(e) {
        var level = $(this).attr('id').substr(6),
            action = '/study/'+level+'/courses/search/';
        $a.attr('action', action);
      });
    });

    // Broadcast window events
    if (UTILS.isDev) {
      $window.on('data,font,nav,content', function(e) {
        console.log(this);
      });
    }

    console.log('Javascript loaded');

  });

});
