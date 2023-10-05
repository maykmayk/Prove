const _app = {};

_app.videoFrameAnimation = () => {
  console.clear();
  const video = document.querySelector(".video-background");
  let src = video.currentSrc || video.src;
  console.log(video, src);

  /* Make sure the video is 'activated' on iOS */
  function once(el, event, fn, opts) {
    var onceFn = function (e) {
      el.removeEventListener(event, onceFn);
      fn.apply(this, arguments);
    };
    el.addEventListener(event, onceFn, opts);
    return onceFn;
  }

  once(document.documentElement, "touchstart", function (e) {
    video.play();
    video.pause();
  });

  /* ---------------------------------- */
  /* Scroll Control! */

  gsap.registerPlugin(ScrollTrigger);

  let tl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: "#container",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  once(video, "loadedmetadata", () => {
    tl.fromTo(
      video,
      {
        currentTime: 0
      },
      {
        currentTime: video.duration || 1
      }
    );
  });

  setTimeout(function () {
    if (window["fetch"]) {
      fetch(src)
        .then((response) => response.blob())
        .then((response) => {
          var blobURL = URL.createObjectURL(response);

          var t = video.currentTime;
          once(document.documentElement, "touchstart", function (e) {
              video.play();
              video.pause();
          });

          video.setAttribute("src", blobURL);
          video.currentTime = t + 0.01;
        });
    }
  }, 1000);
};

_app.smooth = () => {
	const lenis = new Lenis({
		direction: 'vertical',
		smooth: true,
		smoothTouch: false,
		touchMultiplier: 2,
    infinite: true,
	  })

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
}

_app.startUp = () => {
  _app.loader();
  _app.smooth();
  _app.videoFrameAnimation();
}

_app.loader = () => {
  let tl = gsap.timeline();

  tl.from(".loader", {
    duration: 1,
    y: "50vh",
    ease: "power4.out",
    scale: 2.5,
    delay: 1,
  });
  // tl.from(".videoHero", {
  //   duration: 1,
  //   opacity: 0,
  //   delay:1,
  //   y: "-20vh",
  // }, "-=1")
  tl.from("#container", {
    duration: 1,
    opacity: 0,
    delay:1,
    y: "-20vh",
  }, "-=2")
}

_app.startUp();