const _app = {}

_app.smooth = () => {
	const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute('href'), {offset: -100})
        });
    });
}

_app.startUp = () => {
    _app.smooth();
    _app.anim()
}

_app.anim = () => {
    const tl = gsap.timeline();

    tl.from (".plus", {
        y: 250,
        opacity: 0,
		duration: 1,
		stagger: {
			amount: .4,
		},
		ease: "power3.Out"
    })
    // const words = new SplitType("#heroTitle")
    // tl.from ("#heroTitle img", {
    //     y: 250,
	// 	duration: 1.3,
    //     skewY: 10,
	// 	ease: "power3.Out"
    // }, "-=1")

    tl.from(".block", {
        scaleX: 0,
        duration: .6,
        transformOrigin: 'center left',
        ease: "circ.inOut",
    })
    tl.from (".position-relative .textReveal", {
		duration: .4,
        opacity: 0,
		ease: "power3.inOut"
    })
    tl.to(".block", {
        scaleX: 0,
        duration: .6,
        transformOrigin: 'center right',
        ease: "circ.inOut",
    })
    tl.from (".position-relative .textReveal", {
		duration: .6,
        letterSpacing: -6,
        autoRound: false,
		ease: "power3.inOut"
    }, "-=.3")

	tl.from("#subHero div", {
		y: 150,
		duration: 1,
		stagger: {
			amount: .4,
		},
		ease: "power3.Out"
	}, "-=.5"); 
}

_app.startUp();