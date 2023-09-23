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
    _app.shuffleText()
}

_app.shuffleText = () => {
    document.addEventListener("DOMContentLoaded", function (event) {
        const items = document.querySelectorAll(".shuffleTextCont");

        items.forEach((item) => {
            item.addEventListener("mouseenter", shuffleAnim);
        });
    });

    function getRandomChar() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$#&%*+-_/¶◊§}{€=!?";
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function shuffleAnim(event) {
        const target = event.currentTarget;

        if (target.dataset.animating) {
            return;
        }

        target.dataset.animating = true;

        const words = target.querySelectorAll(".shuffleText");
        const originalWords = Array.from(words).map((word) => word.textContent);
        console.log(originalWords);

        let shuffles = 0;
        let maxShuffles = 10;
        let intervalDuration = 500 / maxShuffles;

        let animationInterval = setInterval(() => {
            if (shuffles >= maxShuffles) {
                clearInterval(animationInterval);
                words.forEach((word, index) => {
                    word.textContent = originalWords[index];
                });

                delete target.dataset.animating;
            } else {
                words.forEach((word) => {
                    const length = word.textContent.length;
                    let shuffledText = "";
                    for (let i = 0; i < length; i++) {
                        shuffledText += getRandomChar();
                    }
                    word.textContent = shuffledText;
                });
                shuffles++;
            }
        }, intervalDuration);
    }
};


_app.startUp();