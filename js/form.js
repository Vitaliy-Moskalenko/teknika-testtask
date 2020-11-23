$(document).ready(function() { 	

	// Include css files
	$('<link/>', {rel: 'stylesheet', type: 'text/css', href: 'css/jquery.datetimepicker.min.css'}).appendTo('head');
	$('<link/>', {rel: 'stylesheet', type: 'text/css', href: 'css/main.css'}).appendTo('head');
	
	// Include datetime picker
	$("head").append($('<script type="text/javascript" src="js/jquery.datetimepicker.full.min.js"></script>'));

	// Make a github repo
	// Deploy on the test server

	// Create form element
	var form = $('<form>');
	form.attr({'id':'contact-form', 'method':'post', 'action':''});
	
	// Add form header
	form.append('<h2>Simple Contact Form</h2>').append('<br/>');
 	
	// Create inputs
	var contactSelect = $('<select id="contacts" name="contacts" required />');
	var datePicker    = $('<input id="date" name="date" type="text" required />');
	var commentField  = $('<input id="comment" name="comment" type="text" />');
	var submitButton  = $('<input id="submit" type="submit" value="Submit" />');
	
	// Popup block for display form values
	var formValues    = $('<div id="form-values"><div class="close">X</div></div>');
	
	$('#form-container').append(form);	
	$('#form-container').append(formValues);	
	
	// Get json cage for contacts dropdown list
	$.getJSON("https://reqres.in/api/users?page=1", function(result) {	
		$.each(result.data, function(i, field) {			
			contactSelect.append(`<option value="${field.id}">
										${field.email}
										${field.first_name}
										${field.last_name}																				
								  </option>`); 
		});
	}).fail(function() {
		alert( "Fail to get data!" );
	});
	
	// Add fields to the form
	form.append('<label for="contacts">* Contacts:</label>').append(contactSelect);
	form.append('<label for="date">* Date:</label>').append(datePicker);	
	form.append('<label for="comment">Comment:</label>').append(commentField);
	form.append(submitButton);

	// Setting DateTime picker
	$('#date').datetimepicker({
		format:'Y-m-d H:i:s',
		defaultTime:'00:00',
		lang:'ru',
	});

	
	// Form submit handler
	$('#submit').click(function(e) {  
		e.preventDefault();
		
		var contact = $('#contacts').val();
		var date    = $('#date').val();
		var comment = $('#comment').val();  
		
		$('#form-values').append('<p id="vals">'); 
		
		if(contact.length == 0 || date.length == 0)
			$('#vals').text('Please fill all required fields').css({'color':'red'});	
		else 	
			$('#vals').html(contact + '<br>' + date + '<br>' + comment).css({'color':'#000'});
		
		$('#form-values').fadeIn('slow');
		
		return false;
	});
	
	// Close button for results block hiding
	$('.close').click(function() {
		$('#form-values').fadeOut('slow');
	});
	
});

	