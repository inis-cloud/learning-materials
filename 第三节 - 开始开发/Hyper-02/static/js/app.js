/* 
   Author: Coderthemes Design LLP
   File Description: Main JS
*/


//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.navbar-nav a,.smooth-link').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

(function ($) {

    "use strict";

    // Counter Number
    var a = 0;
    $(window).scroll(function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },

                    {

                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            a = 1;
        }
    });

})(jQuery);


/*global jQuery */
jQuery(function ($) {
    'use strict';

    /**
     * Contact Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#ajax-form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name2"),
        $contactFormEmail: $("#email2"),
        $contactFormMessage: $("#message2"),
        $confirmMessage: $("#ajaxsuccess"),
        $errorMessages: $(".error"),
        $errorName: $("#err-name"),
        $errorEmail: $("#err-emailvld"),
        $errorMessage: $("#err-message"),
        $errorCaptcha: $("#err-captcha"),
        $errorForm: $("#err-form"),
        $errorTimeout: $("#err-timedout"),
        $errorState: $("#err-state"),

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = this.$contactFormName.val(); // get the value of the input field
            if(name == "" || name == " " || name == "Name") {
                this.$errorName.show(500);
                this.$errorName.delay(4000);
                this.$errorName.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
                error = true; // change the error state to true
            }

            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = this.$contactFormEmail.val().toLowerCase(); // get the value of the input field

            if (email == "" || email == " " || email == "E-mail") { // check if the field is empty
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }
            else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }

            var message = this.$contactFormMessage.val(); // get the value of the input field
            
            if(message == "" || message == " " || message == "Message") {              
                this.$errorMessage.show(500);
                this.$errorMessage.delay(4000);
                this.$errorMessage.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }

            //capctah
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                this.$errorCaptcha.show(500);
                this.$errorCaptcha.delay(4000);
                this.$errorCaptcha.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }

            if(error == true) {
                this.$errorForm.show(500);
                this.$errorForm.delay(4000);
                this.$errorForm.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
            }

            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() == false) {

                var data_string = $('#ajax-form').serialize(); // Collect data from form

                var $this = this;
                $.ajax({
                    type: "POST",
                    url: $this.$contactForm.attr('action'),
                    data: data_string,
                    timeout: 6000,
                    cache: false,
                    crossDomain: false,
                    error: function(request,error) {
                        if (error == "timeout") {
                            $this.$errorTimeout.slideDown('slow');
                        }
                        else {
                            $this.$errorState.slideDown('slow');
                            $this.$errorState.html('An error occurred: ' + error + '');
                        }
                    },
                    success: function() {
                        $this.$confirmMessage.show(500);
                        $this.$confirmMessage.delay(4000);
                        $this.$confirmMessage.animate({
                            height: 'toggle'  
                            }, 500, function() {
                        });    
                        
                        $this.$contactFormName.val('');
                        $this.$contactFormEmail.val('');
                        $this.$contactFormMessage.val('');
                    }
                });
            }
            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            console.log('Contact form is initialized');
            this.bindEvents();
            return this;
        }
    };

    //Initializing the app
    ContactFormApp.init({});

});