/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/

function ContactForm() {
	if ($("#contact-formular").length > 0) {
		$("#contactform").submit(function () {
			var action = $(this).attr("action");
			$("#message").slideUp(750, function () {
				$("#message").hide();
				$("#submit").attr("disabled", "disabled");
				$.post(
					action,
					{
						name: $("#name").val(),
						email: $("#email").val(),
						comments: $("#comments").val(),
						verify: $("#verify").val()
					},
					function (data) {
						document.getElementById("message").innerHTML = data;
						$("#message").slideDown("slow");
						$("#contactform img.loader").fadeOut("slow", function () {
							$(this).remove();
						});
						$("#submit").removeAttr("disabled");
						if (data.match("success") != null) $("#contactform").slideUp("slow");
					}
				);
			});
			return false;
		});
	}
} //End ContactForm

/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/

function ContactMap() {} //End ContactMap
