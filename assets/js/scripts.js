/******************************************************************
	
	
	@ Item          REFRAME - Personal One Page HTML Template
	@ Version       1.1
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/

/******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Init
	--  2. Page Loading
	--  3. Smooth Page Scroll
	--  4. Content Elements
	--  6. Menu
	--  7. Contact Form
	--  8. Scroll Bar / Progress Bar
	--  9. Lightbox
	--  10. Scroll Animations
	--  11. Profile Picture
	--  12. Misc
 
 
 ******************************************************************/

/** 1. Init
 *******************************************************************/

var is_mobile_device = false;
if (window.mobileAndTabletCheck()) is_mobile_device = true;
if (isIpadOS()) is_mobile_device = true;

function core_init() {
	smooth_scroll();
	accordions_setup();
	carousel_setup();
	lightbox_setup();
	menu_setup();
	scroll_down();
	scroll_animations();
	contact_form();
	tabs_setup();
	window.addEventListener("load", scroll_bar());
}
core_init();

/** 2. Page Loading
 *******************************************************************/

function page_intro() {
	var tl = gsap.timeline();

	tl.to([".loading-screen h3", ".loading-screen .line-frame"], {
		ease: "power4.inOut",
		duration: 1,
		opacity: 1,
		y: "100%",
	});
	tl.to(".loading-screen", {
		ease: "expo.out",
		duration: 1.4,
		y: "100%",
		delay: 0.15,
	});
	tl.set(".loading-screen", { zIndex: -100 });
	tl.from(
		"#main",
		{ ease: "power3.inOut", duration: 0.8, opacity: 0 },
		"-=0.6"
	);
}
window.addEventListener("load", page_intro);

/** 3. Smooth Page Scroll
 *******************************************************************/

function smooth_scroll() {
	viewport = null;
	content = gsap.utils.toArray(".right-content .inner-content")[0];
	smoothness = config_smooth_page_scroll_intensity;

	if (is_mobile_device == true)
		smoothness = config_smooth_page_scroll_intensity_mobile;

	gsap.set(viewport || content.parentNode, {
		overflow: "hidden",
		position: "fixed",
		height: "100%",
		width: "100%",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	});
	gsap.set(content, { overflow: "visible" });

	let getProp = gsap.getProperty(content),
		setProp = gsap.quickSetter(content, "y", "px"),
		setScroll = ScrollTrigger.getScrollFunc(window),
		removeScroll = function () {
			content.style.overflow = "visible";
		},
		killScrub = function (trigger) {
			let scrub = trigger.getTween
				? trigger.getTween()
				: gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
			scrub && scrub.kill();
			trigger.animation.progress(trigger.progress);
		},
		height,
		isProxyScrolling;

	function onResize() {
		height = content.clientHeight;
		content.style.overflow = "visible";
		document.body.style.height = height + "px";
	}
	onResize();

	ScrollTrigger.addEventListener("refreshInit", onResize);
	ScrollTrigger.addEventListener("refresh", function () {
		removeScroll();
		requestAnimationFrame(removeScroll);
	});

	ScrollTrigger.defaults({ scroller: content });
	ScrollTrigger.prototype.update = function (p) {
		p;
	};

	ScrollTrigger.scrollerProxy(content, {
		scrollTop: function scrollTop(value) {
			if (arguments.length) {
				isProxyScrolling = true;
				setProp(-value);
				setScroll(value);
				return;
			}

			return -getProp("y");
		},
		getBoundingClientRect: function getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
	});

	function el_resize_listener() {
		var erdUltraFast = elementResizeDetectorMaker({
			strategy: "scroll",
		});

		erdUltraFast.listenTo(
			document.getElementsByClassName("section-container"),
			function () {
				ScrollTrigger.refresh();
			}
		);
	}
	el_resize_listener();

	return ScrollTrigger.create({
		animation: gsap.fromTo(
			content,
			{ y: 0 },
			{
				y: function () {
					return document.documentElement.clientHeight - height;
				},
				ease: "none",
				onUpdate: ScrollTrigger.update,
			}
		),
		scroller: window,
		invalidateOnRefresh: true,
		start: 0,
		end: function () {
			return height - document.documentElement.clientHeight;
		},
		scrub: smoothness,
		onUpdate: function (self) {
			if (isProxyScrolling) {
				killScrub(self);
				isProxyScrolling = false;
			}
		},
		onRefresh: killScrub,
	});
}

/** 4. Content Elements
 *******************************************************************/

/* Accordion */
function accordions_setup() {
	$(".accordion").accordionjs();
	$(".pricing-accordion").accordionjs();
}

/* Tabs */
function tabs_setup() {
	$(".tabs").tabslet({
		mouseevent: "click",
		attribute: "href",
		animation: true,
		autorotate: false,
		deeplinking: false,
		pauseonhover: true,
		delay: 200,
		active: 1,
	});
}

/* Carousel */
function carousel_setup() {
	function set_button_position(num) {
		if (num == "current") {
			num = $(".testimonial-carousel").slick("slickCurrentSlide");
		}

		var height_quote = $(".testimonial-carousel .item")
			.eq(num)
			.find(".quote")
			.height();
		var height_button = $(".testimonial-carousel .arrow-next").height();

		$(".testimonial-carousel .arrow-next").css(
			"top",
			height_quote + height_button
		);
	}

	$(window).on("load", function () {
		set_button_position(0);
	});

	window.addEventListener("resize", function () {
		set_button_position("current");
	});

	$(".testimonial-carousel").on(
		"beforeChange",
		function (event, slick, currentSlide, nextSlide) {
			set_button_position(nextSlide);
		}
	);

	$(".testimonial-carousel").on(
		"afterChange",
		function (event, slick, currentSlide, nextSlide) {
			ScrollTrigger.refresh();
		}
	);

	$(".testimonial-carousel").slick({
		dots: false,
		infinite: false,
		speed: 250,
		centerMode: true,
		variableWidth: false,
		nextArrow:
			'<div class="icon-button arrow-next"><span class="ti-arrow-right"></span></div>',
		prevArrow:
			'<div class="icon-button arrow-prev"><span class="ti-arrow-left"></span></div>',
		arrows: true,
		edgeFriction: 0.5,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: "ease",
	});

	$(".image-carousel").slick({
		dots: false,
		infinite: false,
		speed: 350,
		centerMode: true,
		variableWidth: false,
		nextArrow:
			'<div class="icon-button arrow-next"><span class="ti-arrow-right"></span></div>',
		prevArrow:
			'<div class="icon-button arrow-prev"><span class="ti-arrow-left"></span></div>',
		arrows: true,
		edgeFriction: 0.25,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: false,
		cssEase: "ease",
	});
}

/** 6. Menu
 *******************************************************************/

function menu_setup() {
	var menu_position = "closed";
	var menu_moving = false;
	var menu_timeline = gsap.timeline();
	var menu_btn = $(".m-menu-button");

	$("#main").append('<div class="menu-overlay"></div>');

	gsap.set(".m-menu", { x: "100%" });
	gsap.set(".m-menu .head p", { y: "100%" });
	gsap.set(".m-menu .main-items a", { y: "100%" });
	gsap.set(".m-menu .social-items a", { y: "100%" });

	function update_timeline(mode) {
		menu_timeline = gsap.timeline();

		if (mode == "open") {
			menu_timeline.to(
				".m-menu-button .line:first-child",
				{
					duration: 0.35,
					rotate: 45,
					y: "0.4rem",
					ease: "power4.inOut",
				},
				0
			);
			menu_timeline.to(
				".m-menu-button .line:last-child",
				{
					duration: 0.35,
					rotate: -45,
					y: "-0.4rem",
					ease: "power4.inOut",
				},
				0
			);

			gsap.set(".menu-overlay", { css: { zIndex: 100 } });

			menu_timeline.to(
				"#main",
				{
					duration: 0.8,
					opacity: 0.45,
					x: "-24%",
					ease: "power4.inOut",
				},
				0
			);

			menu_timeline.to(
				".m-menu",
				{ duration: 0.8, x: "0%", ease: "power4.inOut" },
				"-=0.8"
			);

			menu_timeline.to(".m-menu .head p", {
				duration: 0.6,
				y: "0%",
				ease: "expo.out",
			});
			menu_timeline.to(
				".m-menu .main-items a",
				{ duration: 0.6, y: "0%", ease: "expo.out", stagger: 0.1 },
				"-=0.6"
			);
			menu_timeline.to(
				".m-menu .social-items a",
				{ duration: 0.6, y: "0%", ease: "expo.out", stagger: 0.1 },
				"-=0.6"
			);

			menu_timeline.eventCallback("onComplete", function () {
				menu_position = "opened";
				menu_moving = false;
			});
		}

		if (mode == "close") {
			gsap.set(".menu-overlay", { css: { zIndex: -100 } });

			menu_timeline.to(".m-menu .head p", {
				duration: 0.6,
				y: "100%",
				ease: "power2.in",
			});
			menu_timeline.to(
				".m-menu .main-items a",
				{ duration: 0.6, y: "100%", ease: "power2.in" },
				"-=0.6"
			);
			menu_timeline.to(
				".m-menu .social-items a",
				{ duration: 0.6, y: "100%", ease: "power2.in" },
				"-=0.6"
			);

			menu_timeline.to(".m-menu", {
				duration: 0.7,
				x: "100%",
				ease: "power4.inOut",
			});

			menu_timeline.to(
				"#main",
				{ duration: 0.7, opacity: 1, x: "0", ease: "power4.inOut" },
				"-=0.7"
			);

			menu_timeline.to(".m-menu-button .line:first-child", {
				duration: 0.35,
				rotate: 0,
				y: 0,
				ease: "power4.inOut",
			});
			menu_timeline.to(
				".m-menu-button .line:last-child",
				{ duration: 0.35, rotate: 0, y: 0, ease: "power4.inOut" },
				"-=0.35"
			);

			menu_timeline.eventCallback("onComplete", function () {
				menu_position = "closed";
				menu_moving = false;
			});
		}
	}

	$(".menu-overlay").on("click", function () {
		if (menu_moving == true) return;

		if (menu_position == "opened") {
			menu_moving = true;
			update_timeline("close");
		}
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			if (menu_moving == true) return;
			menu_moving = true;

			if (menu_position == "opened") {
				update_timeline("close");
			} else {
				update_timeline("open");
			}
		}
	});

	menu_btn.on("click", function () {
		if (menu_moving == true) return;
		menu_moving = true;

		if (menu_position == "opened") {
			update_timeline("close");
		} else {
			update_timeline("open");
		}
	});

	// Scroll to section on nav item click
	function setupLinks(scroller) {
		let linkElements = gsap.utils.toArray(
				".m-menu .main-items a.scroll-to"
			),
			linkTargets = linkElements.map(function (e) {
				return document.querySelector(e.getAttribute("href"));
			}),
			linkPositions = [],
			calculatePositions = function calculatePositions() {
				var offset = gsap.getProperty(scroller, "y");
				linkTargets.forEach(function (e, i) {
					return (linkPositions[i] =
						e.getBoundingClientRect().top - offset);
				});
			};

		linkElements.forEach(function (element, i) {
			element.addEventListener("click", function (e) {
				e.preventDefault();
				gsap.to(window, {
					scrollTo: linkPositions[i],
					ease: "power4",
					duration: 2,
					overwrite: true,
				});
				if (menu_position != "opened") return;
				if (config_scroll_animation_on_mobile == true)
					update_timeline("close");
			});
		});

		ScrollTrigger.addEventListener("refresh", calculatePositions);
	}
	setupLinks(document.querySelector(".right-content .inner-content"));

	var sections = Array.prototype.slice.call(
		document.querySelectorAll(".section")
	);
	sections.forEach(function (section, index) {
		ScrollTrigger.create({
			trigger: section,
			id: index + 1,
			start: "top center",
			end: function end() {
				return "+=".concat(section.clientHeight - 30);
			},
			toggleActions: "play reverse none reverse",
			toggleClass: {
				targets: section,
				className: "is-active",
			},
			onToggle: function onToggle() {
				$(".m-menu .main-items a").removeClass("is-active");

				if (section.id != "") {
					$(
						'.m-menu .main-items a[href*="#' + section.id + '"]'
					).addClass("is-active");
				}
			},
		});
	});
}

/** 7. Contact Form
 *******************************************************************/

function contact_form() {
	$("#contact-form").submit(function (e) {
		e.preventDefault();

		var postdata = $(this).serializeArray(),
			pD_el_count = postdata.length;

		for (var count = 0; count < pD_el_count; count++) {
			if (
				$(
					"#contact-form input[name='" + postdata[count].name + "']"
				).attr("data-require-filling") == "true"
			) {
				postdata.push({
					name: postdata[count].name + "_required",
					value: true,
				});
			} else {
				postdata.push({
					name: postdata[count].name + "_required",
					value: false,
				});
			}
		}

		$.ajax({
			type: "POST",
			url: "assets/php/contact.php",
			data: postdata,
			dataType: "json",
			success: function (json) {
				$("#contact-form .error").removeClass("error");

				setTimeout(function () {
					if (json.nameMessage !== "") {
						$("#contact-form-name").addClass("error");
					}

					if (json.emailMessage !== "") {
						$("#contact-form-email").addClass("error");
					}

					if (json.messageMessage !== "") {
						$("#contact-form-message").addClass("error");
					}
				}, 25);

				if (json.succesMessage !== "") {
					$("#contact-form").addClass("success");
					$("#contact-form .button-area").css("display", "none");
					$(
						"#contact-form input,#contact-form textarea,#contact-form button"
					)
						.val("")
						.prop("disabled", true);
				}
			},
		});
	});
}

/** 8. Scroll Bar / Progress Bar
 *******************************************************************/

function scroll_bar() {
	if (config_scroll_bar == "default" || is_mobile_device == true) return;

	var scroll_bars = {};

	function hide_default_scrollbar() {
		var styles =
			"body::-webkit-scrollbar {display: none;} body {-ms-overflow-style: none;scrollbar-width: none; }:root{ scrollbar-width: none !important } ";
		var styleSheet = document.createElement("style");
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
	}

	scroll_bars.progress = function () {
		$("body").prepend(
			'<div class="scroll-progress"><div class="inner"></div></div>'
		);
		$("body").addClass("cursor-hidden");

		gsap.to(".scroll-progress .inner", {
			height: "100%",
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				toggleClass: { targets: ".section", className: "active" },
				scrub: 0,
				invalidateOnRefresh: true,
			},
		});
	};

	scroll_bars.bar = function () {
		var calc_out, content_h, window_h;

		$("body").prepend(
			'<div class="scroll-bar"><div class="inner"></div></div>'
		);
		$("body").addClass("cursor-hidden");

		function calc() {
			window_h = $(window).height();
			content_h = $(".right-content .inner-content").height();
			calc_out = Math.round(100 / (content_h / window_h));
			$(".scroll-bar .inner").css("height", calc_out + "%");
		}
		calc();
		window.addEventListener("resize", calc);

		gsap.to(".scroll-bar .inner", {
			top: 100 - calc_out + "%",
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				toggleClass: { targets: ".section", className: "active" },
				scrub: 0,
				invalidateOnRefresh: true,
			},
		});
	};

	scroll_bars[config_scroll_bar]();
}

/** 9. Lightbox
 *******************************************************************/

function lightbox_setup() {
	function generate_lightbox_html(content) {
		return (
			'<div id="glightbox-body" class="glightbox-container">' +
			'<div class="gloader visible"></div>' +
			'<div class="goverlay"></div>' +
			'<div class="gcontainer">' +
			'<div class="info"><div class="info-container">' +
			content +
			'</div></div><div class="info-overlay"></div>' +
			'<div id="glightbox-slider" class="gslider"></div>' +
			'<div class="info-button"><div class="icon-button"><span class="ti-info"></span></div></div>' +
			'<button class="gnext gbtn" tabindex="0" aria-label="Next"><span class="ti-arrow-right"></span></button>' +
			'<button class="gprev gbtn" tabindex="1" aria-label="Previous"><span class="ti-arrow-left"></span></button>' +
			'<button class="gclose gbtn" tabindex="2" aria-label="Close"><span class="ti-close"></span></button>' +
			"</div>" +
			"</div>"
		);
	}

	$(".work-lightbox").each(function () {
		// Set lightbox instance
		var lightbox = GLightbox({
			touchNavigation: true,
			loop: false,
			preload: true,
			zoomable: false,
			closeOnOutsideClick: false,
			lightboxHTML: generate_lightbox_html(
				$(this).find(".info-content").html()
			),
		});

		// Add slides to lightbox
		$($(this).find(".lightbox-images .item")).each(function () {
			var url = $(this).data("image");

			lightbox.insertSlide({
				href: url,
				type: "image",
				zoomable: false,
			});
		});

		// Do on lightbox opening
		lightbox.on("open", function () {
			var block = false;
			var info_open = false;
			var info_tl = gsap.timeline();

			function menu_controller() {
				if (block == true) return;
				block = true;

				if (info_open) {
					$(".glightbox-container .info-button span")
						.removeClass("ti-close")
						.addClass("ti-info");
					info_tl.clear();
					info_tl.set(".gcontainer .gbtn", { display: "block" });
					info_tl.to(".gcontainer .info .info-container", {
						duration: 0.2,
						opacity: 0,
						ease: "power1.in",
					});
					info_tl.to(".gcontainer .info", {
						duration: 0.7,
						x: "-100%",
						ease: "power4.inOut",
					});
					info_tl.to(
						".gcontainer .info-overlay",
						{ duration: 0.4, opacity: 0, ease: "none" },
						"<"
					);
					info_tl.set(".gcontainer .info-overlay", { left: "100%" });
					info_tl.eventCallback("onComplete", function () {
						block = false;
						info_open = false;
					});
				} else {
					$(".glightbox-container .info-button span")
						.removeClass("ti-info")
						.addClass("ti-close");
					info_tl.clear();
					info_tl.set(".gcontainer .gbtn", { display: "none" });
					info_tl.set(".gcontainer .info-overlay", { left: "0" });
					info_tl.to(".gcontainer .info-overlay", {
						duration: 0.4,
						opacity: 1,
						ease: "none",
					});
					info_tl.to(
						".gcontainer .info",
						{ duration: 0.7, x: "0%", ease: "power4.out" },
						"0"
					);
					info_tl.to(
						".gcontainer .info .info-container",
						{ duration: 0.3, opacity: 1, ease: "power1.out" },
						"-=0.6"
					);
					info_tl.eventCallback("onComplete", function () {
						block = false;
						info_open = true;
					});
				}
			}

			$(".glightbox-container .info-overlay").on(
				"click touchend",
				function () {
					menu_controller();
				}
			);

			$(".glightbox-container .info-button").on(
				"click touchend",
				function () {
					menu_controller();
				}
			);

			$(".gcontainer").on("click touchend", function (e) {
				if ($(e.target).closest(".gcontainer .info").length > 0) return;
				if ($(e.target).closest(".gcontainer .info-button").length > 0)
					return;
				if ($(e.target).closest(".gcontainer .info-overlay").length > 0)
					return;
				if ($(e.target).closest(".gcontainer .gslide-media").length > 0)
					return;
				if ($(e.target).closest(".gcontainer .gbtn").length > 0) return;
				lightbox.close();
			});
		});

		// Open lightbox on item click
		$(this).on("click", function () {
			lightbox.open();
		});
	});
}

/** 10. Scroll Animations
 *******************************************************************/

function scroll_animations() {
	if (config_scroll_animation_on_mobile == false && is_mobile_device) return;

	var defaults = {
		duration: 1.2,
		ease: "power4.out",
		animation: "fade_from_bottom",
		once: false,
	};

	defaults =
		config_scroll_animation_defaults === "undefined"
			? defaults
			: config_scroll_animation_defaults;

	gsap.utils.toArray(".scroll-animation").forEach(function (box) {
		var gsap_obj = {};

		var settings = {
			ease: box.dataset.animationEase || defaults.ease,
			duration: box.dataset.animationDuration || defaults.duration,
		};

		var animations = {
			fade_from_bottom: {
				y: 150,
				opacity: 0,
			},
			fade_from_left: {
				x: -150,
				opacity: 0,
			},
			fade_from_right: {
				x: 150,
				opacity: 0,
			},
			fade_in: {
				opacity: 0,
			},
			rotate_up: {
				y: 150,
				rotation: 10,
				opacity: 0,
			},
		};

		var scroll_trigger = {
			scrollTrigger: {
				trigger: box,
				once: defaults.once,
				start: "top bottom+=5%",
				toggleActions: "play none none reverse",
				markers: false,
			},
		};

		$.extend(gsap_obj, settings);
		$.extend(
			gsap_obj,
			animations[box.dataset.animation || defaults.animation]
		);
		$.extend(gsap_obj, scroll_trigger);

		gsap.from(box, gsap_obj);
	});
}

/** 12. Misc
 *******************************************************************/

/* Scroll Down Function */
function scroll_down() {
	$("body").prepend(
		'<div class="provoke-scroll-bottom"><div class="fill"><div class="inner"></div></div><div class="text"><p class="tag">SCROLL</p></div></div>'
	);

	ScrollTrigger.create({
		trigger: ".right-content .inner-content",
		start: "top center",
		end: 30,
		toggleClass: {
			targets: ".provoke-scroll-bottom",
			className: "is-active",
		},
	});

	var tl_animation_fill = gsap.timeline({ repeat: -1 });

	tl_animation_fill.to(".provoke-scroll-bottom .fill .inner", {
		duration: 1.5,
		top: "100%",
		ease: "power3.inOut",
	});
	tl_animation_fill.set(".provoke-scroll-bottom .fill .inner", {
		top: "-100%",
	});
	tl_animation_fill.to(".provoke-scroll-bottom .fill .inner", {
		duration: 1.5,
		top: "0%",
		ease: "power3.inOut",
	});
}

// Set Colors
$("body").addClass("colors_" + config_color_scheme);

function options_panel() {
	if (is_mobile_device) return;

	var panel_html =
		'<div class="open-options-panel noselect"><span class="ti-settings"></span></div>' +
		'<div class="options-panel noselect">' +
		'<div class="panel">' +
		'<div class="headline"><p>Configuration</p><div class="seperator-line m-t-2"></div></div>' +
		'<div class="option-grid m-t-6"></div>' +
		"</div>" +
		'<div class="panel-overlay"></div>' +
		'<span class="ti-close close-button"></span>' +
		"</div>";

	var option_color_html =
		'<div class="item" id="option-color">' +
		'<p class="tag">COLOR</p>' +
		'<div class="options">' +
		'<div class="option"><div class="color active" data-value="colors_warning_yellow"><div class="bg" style="background-color: #e3af00;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_future_blue"><div class="bg" style="background-color: #1338f3;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_dynamic_red"><div class="bg" style="background-color: #f31313;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_mystic_orange"><div class="bg" style="background-color: #ff6f1e;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_dreamy_turquoise"><div class="bg" style="background-color: #0bc5fc;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_polar_white"><div class="bg" style="background-color: #fff;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_sweet_purple"><div class="bg" style="background-color: #ff99cc;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_eco_green"><div class="bg" style="background-color: #0dd02e;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_acid_green"><div class="bg" style="background-color: #cceb00;"></div></div></div>' +
		'<div class="option"><div class="color" data-value="colors_coated_grey"><div class="bg" style="background-color: #c0c0c0;"></div></div></div>' +
		"</div>" +
		"</div>";

	var option_scrollbar_html =
		'<div class="item m-t-6" id="option-scrollbar">' +
		'<p class="tag">SCROLLBAR</p>' +
		'<div class="options">' +
		'<div class="option"><div class="button active" data-value="bar"><p class="small">Bar</p></div></div>' +
		'<div class="option"><div class="button" data-value="progress"><p class="small">Progress</p></div></div>' +
		'<div class="option"><div class="button" data-value="default"><p class="small">Default</p></div></div>' +
		"</div>" +
		"</div>";

	var option_hover_html =
		'<div class="item m-t-6" id="option-hover">' +
		'<p class="tag">HOVER EFFECT ( MAIN IMAGE )</p>' +
		'<div class="options">' +
		'<div class="option"><div class="button active" data-value="tech"><p class="small">Tech</p></div></div>' +
		'<div class="option"><div class="button" data-value="abstract"><p class="small">Abstract</p></div></div>' +
		'<div class="option"><div class="button" data-value="bricks"><p class="small">Bricks</p></div></div>' +
		'<div class="option"><div class="button" data-value="claw"><p class="small">Claw</p></div></div>' +
		'<div class="option"><div class="button" data-value="numbers"><p class="small">Numbers</p></div></div>' +
		'<div class="option"><div class="button" data-value="cult"><p class="small">Cult</p></div></div>' +
		'<div class="option"><div class="button" data-value="pieces"><p class="small">Pieces</p></div></div>' +
		'<div class="option"><div class="button" data-value="waves"><p class="small">Waves</p></div></div>' +
		'<div class="option"><div class="button" data-value="species"><p class="small">Species</p></div></div>' +
		"</div>" +
		"</div>";

	$("body").append(panel_html);
	$(".options-panel .option-grid").append(option_color_html);
	$(".options-panel .option-grid").append(option_scrollbar_html);
	$(".options-panel .option-grid").append(option_hover_html);

	function panel() {
		var tl_panel = gsap.timeline({});
		var lock = false;

		function close() {
			if (lock == 1) return;
			lock = true;
			tl_panel.to(".options-panel .panel", {
				duration: 0.5,
				opacity: 0,
				ease: "power2.inOut",
			});
			tl_panel.to(".options-panel", {
				duration: 0.5,
				opacity: 0,
				ease: "power2.inOut",
			});
			tl_panel.set(".options-panel", { zIndex: -10000 });
			tl_panel.to(".open-options-panel", {
				duration: 0.2,
				x: "0",
				ease: "power1.inOut",
			});
			tl_panel.call(function () {
				lock = false;
			});
		}

		function open() {
			if (lock == 1) return;
			lock = true;
			tl_panel.to(".open-options-panel", {
				duration: 0.2,
				x: "-100%",
				ease: "power1.inOut",
			});
			tl_panel.set(".options-panel", { zIndex: 100 });
			tl_panel.to(".options-panel", {
				duration: 0.5,
				opacity: 1,
				ease: "power2.inOut",
			});
			tl_panel.to(".options-panel .panel", {
				duration: 0.5,
				opacity: 1,
				ease: "power2.inOut",
			});
			tl_panel.call(function () {
				lock = false;
			});
		}

		$(".open-options-panel").click(open);
		$(".panel-overlay").click(close);
		$(".options-panel .ti-close").click(close);
	}
	panel();

	function option_colors() {
		var last_color;
		var upcoming_color;

		$(".options-panel .color").click(function () {
			last_color = $(".options-panel .color.active").data("value");
			upcoming_color = $(this).data("value");

			$(".options-panel .color").removeClass("active");
			$(this).addClass("active");

			$("body").removeClass(last_color);
			$("body").addClass(upcoming_color);
		});
	}
	option_colors();

	function option_scrollbar() {
		config_scroll_bar = "progress";
		window.addEventListener("load", scroll_bar());
		var btn_active = $("#option-scrollbar .button.active").data("value");

		function update(data) {
			switch (data) {
				case "bar":
					$("body").addClass("cursor-hidden");
					gsap.set(".scroll-progress", { opacity: 0 });
					gsap.set(".scroll-bar", { opacity: 1 });
					break;
				case "progress":
					$("body").addClass("cursor-hidden");
					gsap.set(".scroll-progress", { opacity: 1 });
					gsap.set(".scroll-bar", { opacity: 0 });
					break;
				case "default":
					$("body").removeClass("cursor-hidden");
					gsap.set(".scroll-progress", { opacity: 0 });
					gsap.set(".scroll-bar", { opacity: 0 });
					break;
				default:
			}
		}
		update(btn_active);

		$("#option-scrollbar .button").click(function () {
			btn_active = $(this).data("value");

			$("#option-scrollbar .button.active").removeClass("active");
			$(this).addClass("active");

			update(btn_active);
		});
	}
	option_scrollbar();
}
