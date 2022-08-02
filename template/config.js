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
	

	--  1. ReadMe
	--  2. Basic Config
	--  3. Profile Picture
	--  4. Background Config
	
		--  4.1 Background Config [ Color Background ]
		--  4.2 Background Config [ Square Background ]


 ******************************************************************/



/** 1. README
*******************************************************************/
	  
	  
	  
	  // 1. DO NOT REMOVE QUOTATION MARKS WHEN GIVEN
	  // 2. SAVE THE FILE AND REFRESH YOUR BROWSER TO SEE CHANGES
	


/** 2. BASIC CONFIG
*******************************************************************/



		// COLOR SCHEME [ SEE OPTIONS BELOW ]

		// "warning_yellow" = WARNING YELLOW COLOR SCHEME
		// "future_blue" = FUTURE BLUE COLOR SCHEME
		// "dynamic_red" = DYNAMIC RED COLOR SCHEME
		// "mystic_orange" = MYSTIC ORANGE COLOR SCHEME
		// "dreamy_turquoise" = DREAMY TURQUIOSE COLOR SCHEME
		// "polar_white" = POLAR WHITE COLOR SCHEME
		// "acid_green" = YELLOW COLOR SCHEME
		// "sweet_purple" = SWEET PURPLE COLOR SCHEME
		// "eco_green" = ECO GREEN COLOR SCHEME
		// "colors_coated_grey" = COATED GREY COLOR SCHEME

		var config_color_scheme = "warning_yellow";



		// SCROLL BAR [ SEE OPTIONS BELOW ]

		// "default" = DEFAULT SCROLL BAR
		// "progress" = CUSTOM PROGRESS BAR
		// "bar" = CUSTOM SCROLL BAR

		var config_scroll_bar = "bar";



		// CURSOR SETUP [ SEE OPTIONS BELOW ]

		// "default" = DEFAULT BROWSER CURSOR
		// "cursor_1" = CUSTOM CURSOR STYLE 1
		// "cursor_2" = CUSTOM CURSOR STYLE 2
		
		var config_cursor_mode = "cursor_2";



		// AUTO CLOSE MENU ON MENU ITEM CLICK ( false = DISABLED )
		
		var config_menu_close_on_click = true;



		// SMOOTH PAGE SCROLL INTENSITY ( 0 = DISABLED )
		var config_smooth_page_scroll_intensity = 1;



		// SMOOTH PAGE SCROLL INTENSITY FOR MOBILE DEVICES ( 0 = DISABLED )
		var config_smooth_page_scroll_intensity_mobile = 0;



		// MAX SCREEN WIDTH FOR MOBILE LAYOUT
		var config_mobile_max_width_for_layout = 800;



		// ALLOW ON SCROLL ANIMATIONS ON MOBILE ( false = DISABLED )
		var config_scroll_animation_on_mobile = true;



		// ON SCROLL ANIMATIONS DEFAULT SETTINGS
		var config_scroll_animation_defaults = {
			duration: 1.2,
			ease: "power4.out",
			animation: "fade_from_bottom",
			once: false,
		};
		
		

/** 3. PROFILE PICTURE CONFIG
*******************************************************************/



		// PROFILE PICTURE URL
		var config_profile_image_url = "assets/images/person.jpg";



		// PROFILE PICTURE HOVER EFFECT [ SEE OPTIONS BELOW ]

		// "tech" = IMAGE EFFECT TECH
		// "abstract" = IMAGE EFFECT ABSTRACT
		// "bricks" = IMAGE EFFECT BRICKS
		// "claw" = IMAGE EFFECT CLAW	
		// "cult" = IMAGE EFFECT CULT
		// "numbers" = IMAGE EFFECT NUMBERS
		// "pieces" = IMAGE EFFECT PIECES
		// "species" = IMAGE EFFECT SPECIES
		// "waves" = IMAGE EFFECT WAVES
		// "custom" = IMAGE EFFECT CUSTOM

		var config_profile_image_effect = "tech";



		// CUSTOM HOVER EFFECT IMAGE MAP URL
		var config_profile_image_effect_url = "assets/images/effect_maps/custom.jpg";



		// PROFILE PICTURE HOVER EFFECT MAP INTENSITY
		var config_profile_image_effect_intensity = 0.3;



/** 4. BACKGROUND CONFIG
*******************************************************************/
		
		

		// BACKGROUND MODE [ SEE OPTIONS BELOW ]
		
		// "twisted" = TWISTED BACKGORUND 
		// "color" = IMAGE BACKGROUND
		// "square" = VIDEO BACKGORUND
		// "asteroids" = ASTEROIDS BACKGORUND
		// "circle" = CIRCLE BACKGORUND
		// "lines" = LINES BACKGORUND 
		
		var option_hero_background_mode = "twisted";



		// BACKGROUND MODE MOBILE [ SEE OPTIONS BELOW ]
		
		// "color" = IMAGE BACKGROUND
		// "square" = VIDEO BACKGORUND
		// "asteroids" = ASTEROIDS BACKGORUND
		// "circle" = CIRCLE BACKGORUND
		// "lines" = LINES BACKGORUND 
		// "twisted" = TWISTED BACKGORUND
		// "match" = MATCHES BACKGROUND FROM (option_hero_background_mode)
		
		var option_hero_background_mode_mobile = "match";



		/** 4.1 BACKGROUND CONFIG [ COLOR BACKGROUND ]
		*******************************************************************/
				
				
				
				// BACKGROUND COLOR
				var option_hero_background_color_bg = "#212121";
		


 		/** 4.2 BACKGROUND CONFIG [ SQUARE BACKGROUND ]
		*******************************************************************/
		


				// SQUARE COLORING [ SEE OPTIONS BELOW ]

				// "white" = WHITE COLOR
				// "black" = BLACK COLOR

				var option_hero_background_square_mode = "white";



				// BACKGROUND COLOR
				var option_hero_background_square_bg = "#212121";



		/** 4.3 BACKGROUND CONFIG [ ASTEROIDS BACKGROUND ]
		*******************************************************************/
		


				// BACKGROUND COLOR
				var option_hero_background_asteroids_bg_color = "#212121";



				// CUBE COLOR
				var option_hero_background_asteroids_cube_color = "#727272";



				// PARTICLE COLOR
				var option_hero_background_asteroids_particle_color = "#666";



				// SPOTLIGHT COLOR
				var option_hero_background_asteroids_spotlight_color = "#111";



				// SPOTLIGHT INTENSITY
				var option_hero_background_asteroids_spotlight_intensity = 4;



				// POINTLIGHT COLOR
				var option_hero_background_asteroids_pointlight_color = "#111";



				// POINTLIGHT INTENSITY
				var option_hero_background_asteroids_pointlight_intensity = 1;

				

				// RECTAREALIGHT COLOR
				var option_hero_background_asteroids_rectarealight_color = "#111";



				// RECTAREALIGHT INTENSITY
				var option_hero_background_asteroids_rectarealight_intensity = 30;



				// SCENE OPACITY ( 0 - 1.0 )
				var option_hero_background_asteroids_scene_opacity = 0.1;




		/** 4.4 BACKGROUND CONFIG [ CIRCLE BACKGROUND ]
		*******************************************************************/
		


				// LINE COLOR
				var option_hero_background_circle_line_color = "#e3af00";



				// BACKGROUND COLOR
				var option_hero_background_circle_bg_color = "#212121";



				// SCENE OPACITY ( 0 - 1.0 )
				var option_hero_background_circle_scene_opacity = 0.2;



				// ROTATION SPEED
				var option_hero_background_circle_speed = 0.035;



		/** 4.5 BACKGROUND CONFIG [ LINES BACKGROUND ]
		*******************************************************************/
		


				// LINE COLOR
				var option_hero_background_lines_line_color = "#e3af00";



				// BACKGROUND COLOR
				var option_hero_background_lines_bg_color = "#212121";



				// SCENE OPACITY ( 0 - 1.0 )
				var option_hero_background_lines_scene_opacity = 0.1;



		/** 4.6 BACKGROUND CONFIG [ TWISTED BACKGROUND ]
		*******************************************************************/
		


				// LINE COLOR
				var option_hero_background_twisted_line_color = "#fff";



				// FILL COLOR
				var option_hero_background_twisted_fill_color = "#212121";



				// BACKGROUND COLOR
				var option_hero_background_twisted_bg_color = "#212121";



				// SCENE OPACITY ( 0 - 1.0 )
				var option_hero_background_twisted_scene_opacity = 0.07;



				// ROTATION SPEED
				var option_hero_background_twisted_speed = 0.005;



				// HORIZONTAL OFFSET
				var option_hero_background_twisted_x_offset = "10%";