// =================== SCRIPT.JS ===================

// 1️⃣ Preload rating sounds
const ratingSounds = [
    "sound1.mp3.wav", // 1-star
    "sound2.mp3.wav", // 2-star
    "sound3.mp3.wav", // 3-star
    "sound4.mp3.wav", // 4-star
    "sound5.mp3.wav"  // 5-star
];
const preloadedSounds = ratingSounds.map(src => new Audio(src));

// 2️⃣ Store ratings for each image using base64 key
const imageRatings = {};

// 3️⃣ Rate Decoration Function
function rateDecoration() {
    const event = document.getElementById("eventType").value;
    const imageInput = document.getElementById("imageUpload");
    const file = imageInput.files[0];

    if (!file) {
        alert("Please upload a picture first!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result; // unique key for image content
        let rating;

        if (imageRatings[base64]) {
            rating = imageRatings[base64]; // use existing rating
        } else {
            rating = Math.floor(Math.random() * 5) + 1; // generate new rating
            imageRatings[base64] = rating;
        }

        // 4️⃣ Display rating
        const result = document.getElementById("result");
        const commentBox = document.getElementById("comment");
        result.innerHTML = `⭐ Rating: ${rating} / 5`;

        // 5️⃣ Fun comments and emojis
        const comments = {
            birthday: {
                1:["Yikes… did someone forget the balloons? 😅🎈",["🤦‍♀️","😥","😒"]],
                2:["Hmm… cake is present, but where’s the magic? 🎂✨",["🎂","✨","🪄"]],
                3:["Not bad at all! The vibes are there 🎉🎶",["🎉","🎂","🎶"]],
                4:["Wow! Party energy is contagious 💃🕺🎊",["🎊","🔥","💃🕺"]],
                5:["Absolute birthday genius 👑🎉 Cake, balloons, fun overload! 🎂🔥",["🎉","👑","🎂"]]
            },
            wedding: {
                1:["Uh oh… flowers missing! Needs bouquet rescue 😬🌸",["🌸","😬","😑"]],
                2:["Elegant attempt, but more sparkle needed ✨💐",["💐","✨","🕯️"]],
                3:["Pretty setup! Just missing fairy-tale magic 👰💍",["👰","💍","💎"]],
                4:["Ooooh, classy! Wedding magazine vibes 💎✨",["💍","✨","💎"]],
                5:["Royal vibes unlocked! Luxury & love 👑💍💖",["👑","💍","✨"]]
            },
            corporate: {
                1:["Looks like a meeting 😅📋 Maybe spreadsheets only?",["📋","😅","🙄"]],
                2:["Branding is trying, still snooze-level 💼💤",["💼","📊","💤"]],
                3:["Not bad! People want to network 👍📊",["💼","👏","👍"]],
                4:["Sharp & professional! Makes people say ‘Wow!’ 🔥📈",["📈","🔥","💪"]],
                5:["CEO mode! Definition of corporate excellence 🏆📈",["🏆","📈","💼"]]
            },
            festival: {
                1:["Meh… festival spirit hiding 😅🎨 Need confetti!",["🎨","😅","💥"]],
                2:["Colors show up, but more sparkle 🎆✨",["🎆","✨","🦚"]],
                3:["Good energy! People ready to dance 🎊🔥",["🎊","🔥","⚡"]],
                4:["Bright & cheerful! Festive happiness 🎇🎉",["🎇","🎉","🤗"]],
                5:["Festival overload! Lights, magic & energy 🔥🎉🎆",["🎉","🔥","🎆"]]
            },
            romantic: {
                1:["Uh oh… love took a day off 😅💔",["💔","😅","🥹"]],
                2:["Candle lit, but sparks missing 🕯️✨",["🕯️","✨","🥶"]],
                3:["Cozy vibes! Just add rose petals 💕🌙",["💕","🌙","😍"]],
                4:["Impressive! Like a date from a love movie 💖🔥",["💖","🔥","💌"]],
                5:["Cupid jealous! Perfect romantic setup 👑💘✨",["💘","👑","✨","😻"]]
            }
        };

        const [comment, emojis] = comments[event][rating];

        // 6️⃣ Show comment with animation
        commentBox.classList.remove("show");
        void commentBox.offsetWidth;
        commentBox.innerHTML = comment;
        commentBox.classList.add("show");

        // 7️⃣ Play sound for rating
        preloadedSounds[rating - 1].currentTime = 0;
        preloadedSounds[rating - 1].play().catch(err => console.log("Sound error:", err));

        // 8️⃣ Floating emojis
        const totalEmojis = 30 + rating * 5;
        for (let i = 0; i < totalEmojis; i++) {
            setTimeout(() => {
                createEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            }, Math.random() * 1000);
        }

        // 9️⃣ Store 4 & 5-star images in localStorage for gallery
        if (rating >= 4) {
            const topImages = JSON.parse(localStorage.getItem("topImages") || "[]");
            if (!topImages.includes(base64)) {
                topImages.push(base64);
                localStorage.setItem("topImages", JSON.stringify(topImages));
            }
        }
    };

    reader.readAsDataURL(file);
}

// 10️⃣ Floating emoji creation
function createEmoji(emoji) {
    const span = document.createElement("span");
    span.innerText = emoji;
    span.classList.add("floating-emoji");
    span.style.left = Math.random() * 90 + "vw";
    span.style.fontSize = (30 + Math.random() * 40) + "px";
    span.style.transform = `rotate(${Math.random() * 360}deg)`;
    const duration = 4 + Math.random() * 5;
    span.style.transition = `transform ${duration}s linear, bottom ${duration}s linear, opacity ${duration}s linear`;
    setTimeout(() => {
        const drift = (Math.random() - 0.5) * 50;
        span.style.bottom = "100vh";
        span.style.left = `calc(${span.style.left} + ${drift}px)`;
        span.style.opacity = 0;
        span.style.transform += ` rotate(${Math.random()*360}deg) scale(${0.5 + Math.random()})`;
    }, 50);
    document.body.appendChild(span);
    setTimeout(() => span.remove(), duration * 1000);
}