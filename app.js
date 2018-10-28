var g = G$('Luke', 'Prosser');

g.setLang('es').greet(true).log();

// Click event on login button.
$('#login').click(function() {

    // Make new object.
    var loginGrtr = G$('John', 'Doe');

    // Hide interface (select and button) on click.
    $('#logindiv').hide();

    // Set language of object using value of select option passed in as string.
    // Chain method HTMLGreeting() passing in jQuery selector as '#greeting' (so that h1 is updated).
    // Set formal greeting to true.
    // Log to the console.
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});