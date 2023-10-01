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

_app.startUp = () => {
  _app.videoFrameAnimation();
}

_app.startUp();