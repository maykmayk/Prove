const _app = {}

_app.smooth = () => {
	const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

}

_app.startUp = () => {
    _app.smooth();
    _app.anim()
}

_app.anim = () => {
    // let cards = document.querySelectorAll('.cardCont')
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', () => {
    //         console.log("ole")
    //         _app.revealOpen()
    //     })
    //     card.addEventListener('mouseleave', () => {
    //         console.log("addio")
    //         _app.revealClose()
    //     })
    // })

    // _app.revealOpen = () => {
    //     const tl = gsap.timeline();

    //     tl.to(".imageContOverlay", {
    //         delay: .5,
    //         scaleY: 0,
    //         transformOrigin: 'center bottom',
    //         duration: .5,
    //     });
    // }

    // _app.revealClose = () => {
    //     const tl = gsap.timeline();

    //     tl.to(".imageContOverlay", {
    //         delay: .5,
    //         scaleY: 100,
    //         transformOrigin: 'center bottom',
    //         duration: .5,
    //     });
    // }
}

_app.startUp();