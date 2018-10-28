// IIFE invoked immediately, creating it's own execution context.
// Semicolon ';' used as a safety to close any scripts called before.
;(function(global, $) {

    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        // Create function constructor to generate object
        // (avoids setting up object with new keyword each time).
        return new Greetr.init(firstName, lastName, language);
    }
    
    // Hidden within the scope of the IIFE - never directly accessible.
    // Not exposed to the outside world unless desired (not returned - 
    // can't be changed without accessing source code).
    var supportedLangs = ['en', 'es', 'fr'];

    // Informal greetings.
    // Set up as objects so that properties can be referenced
    // as strings using Computed Member Access (e.g. 'greetings[en]').
    // Can be changed dynamically so ideal for libraries/frameworks.
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Salut'
    };

    // Formal greetings.
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Bonjour'
    };

    // Logger messages.
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión',
        fr: 'Connecté'
    };

    // Prototype holds methods (to save memory space).
    // Will be exposed to outside world.
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time.
        fullName: function() { // Method with function expression.
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            // Check that it's a valid language.
            // References the externally inaccessible 'supportedLangs' within
            // the closure.
            // Throw error if language doesn't exist in array (created
            // by indexOf).
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        // Retrieve messages from object by referring to properties using '[]'
        // syntax.
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function(formal) {

            var msg;

            // If undefined or null, it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time.
            // Makes the method chainable.
            return this;

        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            // Make chainable.
            return this;
        },

        setLang: function(lang) {
            // Update object with current language.
            this.language = lang;
            // Call validate to check language is valid.
            this.validate();
            // Make chainable.
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            // Determine the message.
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // Inject the message in the chosen place in the DOM.
            $(selector).html(msg);

            // Make chainable.
            return this;
        }

    };

    // The actual object is created here, allowing you to 'new' and object
    // without calling 'new'.
    Greetr.init = function(firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();

    }

    // Objects created with Greetr.init point to Greetr.prototype 
    // as prototype chain.
    // They can then access any properties and methods on the 
    // Greetr.prototype.
    Greetr.init.prototype = Greetr.prototype;

    // Expose Greetr globally - make it available outside by attaching 
    // to the window object (window is passed in as global).
    global.Greetr = global.G$ = Greetr;
    // Both 'Greetr' and 'G$' will point to the Greetr function 
    // (var = Greetr).

}(window, jQuery));