const locoScroll = new LocomotiveScroll({
	el: document.querySelector("main"),
	smooth: true,
	smoothMobile: true,
	lerp: 0.03,
});

gsap.registerPlugin(ScrollTrigger);

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("main", {
	scrollTop(value) {
		return arguments.length
			? locoScroll.scrollTo(value, 0, 0)
			: locoScroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
	pinType: document.querySelector("main").style.transform
		? "transform"
		: "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

gsap.to("html,body", {
	scrollTrigger: {
		scroller: "main",
		markers: true,
		trigger: "#contacts",
		scrub: true,
		start: "top bottom",
		end: "bottom bottom",
	},
	duration: 1,
	backgroundColor: "#f3653a",
	ease: "none",
});
