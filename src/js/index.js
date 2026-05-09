const MESSAGE = [
    "POP. POUR. PERFORM.",
    "BE ANYBODY BE EVERYBODY BE ISEUL-T.",
    "DIGITALLY INSURED, VIRTUALLY SECURED.",
    "BEYOND BOUNDARIES; WITHIN REACH.",
    "POWER IS POWER.",
    "MINIMIZE RISK. MAXIMIZE FIREPOWER.",
    "VAIIYA - WE. AS. ONE."
];

document.getElementById("message").innerText = MESSAGE[Math.round(Math.random() * 10) % 7];

setInterval(() => {
    let dt = new Date();
    let utc = dt.getTime() - (dt.getTimezoneOffset() + 420) * 60_000;
    let cur = new Date(utc);
    document.getElementById("time").innerText = cur.toLocaleTimeString("en-US");
}, 1000);