// Math
let math = {
	rand_num(a,b) { return Math.floor(Math.random() * (b - a + 1)) + a; },
	rand_bool() { return Math.random() >= 0.5; },
	rand_sign() { return Math.random() < 0.5 ? -1 : 1; },
	lerp(a,b,c) { return (1 - c) * a + c * b; }
};

// Elements
let html = document.querySelector('html'),
	body = document.querySelector('body'),
	main = document.querySelector('main');

// Measurements (Declaration)
var win_w = html.innerWidth,
	win_h = html.innerHeight,
	vw = win_w/100,
	vh = win_h/100,
	main_w = main.clientWidth,
	main_h = main.clientHeight,
	max_axis = ( win_w > win_h ) ? win_w : win_h;
	aspect_ratio = ( win_w > win_h ) ? "landscape" : "portrait";
	resize = new ResizeObserver(entries => {measure_core()});

// Measurements (Function)
function measure_core() {
	win_w = html.innerWidth;
	win_h = html.innerHeight;
	vw = win_w/100;
	vh = win_h/100;
	main_w = main.clientWidth;
	main_h = main.clientHeight;
	max_axis = ( win_w > win_h ) ? win_w : win_h;
	aspect_ratio = ( win_w > win_h ) ? "landscape" : "portrait";
};
document.addEventListener("DOMContentLoaded", measure_core);
html.addEventListener('resize', measure_core);
resize.observe(html);

// Mouse
var mouse = { px: 0, py: 0, cx: 0, cy: 0 };

html.addEventListener('mousemove', e => {
    mouse.px = e.clientX;
    mouse.py = e.clientY;
	mouse.cx = (((e.pageX*2)/win_w).toFixed(3))-1;
	mouse.cy = -(((e.pageY*2)/win_h).toFixed(3))+1;	
});

// Utils 
function edit_classes(t){var e=t.classList;return{toggle:function(t){return e.toggle(t),this},add:function(t){return e.add(t),this},remove:function(t){return e.remove(t),this}}};