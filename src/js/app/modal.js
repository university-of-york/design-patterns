/*

---
title: Modal Module
name: modal-module
category: Javascript
---

 */
define(['jquery', 'app/utils', 'app/focus-trap', 'app/youtube-embed'], function ($, UTILS, FOCUSTRAP, YOUTUBE) {

  var currentModal = false;
  var modalWrapper = false;
  var modalPrev = false;
  var modalNext = false;

  var MODAL = function (options) {

    this.content = options.content || this.defaults.content;
    this.title = options.title || this.defaults.title;
    this.caption = options.caption || this.defaults.caption;
    this.type = options.type || this.defaults.type;
    this.scrollContent = options.scrollContent || this.defaults.scrollContent;
    this.prev = options.prev || false;
    this.next = options.next || false;
    
    // Use setTimout to get unique ID
    this.id = setTimeout(function (){});

    this.checkModal();
    this.createModal();

  };

  MODAL.prototype.defaults = {
    content: false,
    title: false,
    caption: false,
    type: 'framed',
    scrollContent: ''
  };

  MODAL.prototype.open = function () {

    // Store the currently focussed element - we'll return focus to it on close
    this.previouslyActiveElement = document.activeElement;

    // Show wrapper
    var thisModal = $('#modal-'+this.id);
    if( this.activate(modalWrapper) ) modalWrapper.focus();
    // Close existing modals
    var otherModals = $('.c-modal').not(thisModal).not('.is-hidden');
    if (otherModals.length > 0) this.deactivate(otherModals);
    // Add content (if needed)
    if (this.modalContent !== false && this.modalContent.text() === '') {
      this.loadContent();
    }
    // Add modal if needed - check if ID is in DOM
    if (thisModal.length === 0) this.modalContainer.insertAfter(modalPrev);
    this.activate(this.modalContainer);

    // Show/hide prev/next button
    if (this.prev === false) { this.deactivate(modalPrev); } else { this.activate(modalPrev); }
    if (this.next === false) { this.deactivate(modalNext); } else { this.activate(modalNext); }
    currentModal = this;
};

  MODAL.prototype.activate = function ($el) {
    if ( $el.hasClass('is-hidden')) {
    $el.removeClass('is-hidden');
    $el.removeAttr('disabled');
    // setTimeout(function () {
      $el.addClass('is-active'); 
      // }, 30); 
      
      // Init YouTube embeds
      setTimeout(function () {
        UTILS.eachIfExists('.youtube-video-embed', function (i, a) {
          new YOUTUBE({
            link: $(a)
          });
        });
      }, 50); 

    return true;
  }   
  };

  MODAL.prototype.close = function () {
    // Deactivate all the modals (in case one is hanging around)
    this.deactivate($('.c-modal'));
    this.deactivate($('.c-modal__wrapper'));
    this.deactivate($('.c-modal__nav'));

    // Hand focus back to the element that had it before opening the modal
    this.previouslyActiveElement.focus();
  };

  MODAL.prototype.deactivate = function ($el) {

    var called = false;
    $el.removeClass('is-active');
    if (Modernizr.csstransitions) {
      $el.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e){
        // Stop it affecting the wrapper
        e.stopPropagation();
        $el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
        called = true;
        $el.addClass('is-hidden');
        $el.attr('disabled');
      });
      // In case it doesn't fire
      setTimeout(function () {
        if (called !== true) {
          $el.trigger('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
        }
      }, 1000);
    } else {
      // Do the same thing, but in unsupported or broken implementations
      if (called !== true) {
        called = true;
        $el.addClass('is-hidden');
      }
    }

    // Pause any YouTube embeds
    var youtube_embed_iframes = $el.find('.c-video iframe');
    if( youtube_embed_iframes.length ) youtube_embed_iframes[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  };

  MODAL.prototype.loadContent = function() {
    this.modalContent.html(this.content);
    if (this.caption !== false) {
      this.modalContent.append($('<div>').addClass('c-modal__caption').html(this.caption));
    }
  };

  MODAL.prototype.navigate = function(dir) {
    dir = dir || 'next';
    if (this[dir] !== false) this[dir].click();
  };

  MODAL.prototype.checkModal = function () {

    // Temporary this-holder
    // var that = this;

    if ($('.c-modal__wrapper').length > 0) return true;

    modalWrapper = $('<div>').attr( 'tabindex' , 0 ).addClass('c-modal__wrapper is-hidden').on('click', function (e) {
      currentModal.close();
    });
  
    modalPrev = $('<button disabled>').addClass('c-modal__nav c-modal__nav--prev is-hidden')
                        .html('<i class="c-icon c-icon--3x c-icon--chevron-left c-icon--light"></i>')
                        .on('click', function (e) {
                          e.stopPropagation();
                          currentModal.navigate('prev');
                        })
                        .appendTo(modalWrapper);
    modalNext = $('<button disabled>').addClass('c-modal__nav c-modal__nav--next is-hidden')
                        .html('<i class="c-icon c-icon--3x c-icon--chevron-right c-icon--light"></i>')
                        .on('click', function (e) {
                          e.stopPropagation();
                          currentModal.navigate('next');
                        })
                        .appendTo(modalWrapper);

    $('body').append(modalWrapper);

    var focusTrap = new FOCUSTRAP(modalWrapper[0]);

    modalWrapper.on('keydown', function (e) {
      if (e.keyCode == 27) { 
        currentModal.close();
      }
      
    });

    modalWrapper.on('keydown', function (e) {
      if (e.keyCode == 37) { 
        currentModal.navigate('prev');
        // modalPrev.focus();
        e.preventDefault();
      }   
    });

    modalWrapper.on('keydown', function (e) {
      if (e.keyCode == 39) { 
        currentModal.navigate('next');
        // modalNext.focus();
        e.preventDefault();
      } 
    });

    

    return modalWrapper;

  };

  MODAL.prototype.createModal = function () {

    // Temporary this-holder
    var that = this;
    this.modalContainer = $('<div>').addClass('c-modal c-modal--' + this.type + ' ' + that.scrollContent + ' is-hidden').attr('id', 'modal-'+this.id).on('click', function (e) {
      // Don't allow the click to get to the wrapper, or it will close
      e.stopPropagation();
    });
    this.modalTitle = this.title !== false ? $('<h4>').addClass('c-modal__title').text(this.title) : false;
    this.modalContent = this.content !== false ? $('<div>').addClass('c-modal__content') : false;
    this.modalClose = $('<button>').addClass('c-modal__close').attr('title', 'Close this window').html('&times;').on('click', function (e) {
      that.close();
    });

    this.modalContainer.append([this.modalTitle, this.modalContent, this.modalClose]);
    
  };
  

  return MODAL;

});
