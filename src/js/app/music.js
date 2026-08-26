const playlist = [
    {
      artist: "betutbc",
      track: "like-it-too",
      id: "3280588009",
      title: "Like It Too by betu"
    },
    {
      artist: "betutbc",
      track: "circles",
      id: "1671000892",
      title: "Circles by betu"
    },
    {
      artist: "betutbc",
      track: "losing-me",
      id: "3363665284",
      title: "Losing Me by betu"
    },
    {
      artist: "betutbc",
      track: "crawling",
      id: "3123355526",
      title: "Crawling by betu"
    },
    {
      artist: "betutbc",
      track: "ignore-me",
      id: "1294657913",
      title: "Ignore Me by betu"
    },
    {
      artist: "betutbc",
      track: "hours",
      id: "3756049293",
      title: "Hours by betu"
    },
    {
        artist: "yonkagor",
        track: "linger-in-the-rain",
        id: "2695856234",
        title: "Linger in the Rain by YonKaGor"
    },
    {
        artist: "yonkagor",
        track: "our-season",
        id: "259982107",
        title: "Our Season by YonKaGor"
    },
    {
        artist: "yonkagor",
        track: "constelacion",
        id: "1753130469",
        title: "WHSPRS - Constelación by YonKaGor"
    },
    {
        artist: "yonkagor",
        track: "memory-merge",
        id: "856013264",
        title: "Memory Merge by YonKaGor"
    },
    {
        artist: "yonkagor",
        track: "i-still-create",
        id: "4041660650",
        title: "I Still Create by YonKaGor"
    },
    {
        artist: "yonkagor",
        track: "youre-just-like-pop-music",
        id: "1647283209",
        title: "You're Just Like Pop Music by YonKaGor"
    },
    {
        artist: "frizk",
        track: "leave-me-gone",
        id: "4080832699",
        title: "Leave Me GONE by Frizk"
    },
    {
        artist: "frizk",
        track: "give-it-a-rest",
        id: "22862600",
        title: "GIVE IT A REST by Frizk"
    },
    {
        artist: "friendswithoutfaces",
        track: "lake-jesup",
        id: "3328355208",
        title: "Lake Jesup by Friends Without Faces"
    },
    {
        artist: "friendswithoutfaces",
        track: "imperfect-lifetimes",
        id: "3215909920",
        title: "Imperfect Lifetimes by Friends Without Faces"
    },
    {
        artist: "whsprs",
        track: "portals",
        id: "1867203296",
        title: "PORTALS by WHSPRS"
    },
    {
        artist: "whsprs",
        track: "how-to-get-over-somebody",
        id: "2043479130",
        title: "How To Get Over Somebody by WHSPRS"
    },
    {
        artist: "whsprs",
        track: "revenge-dress",
        id: "3841637765",
        title: "Revenge Dress by WHSPRS"
    },
    {
        artist: "whsprs",
        track: "sad-drunk-and-needy",
        id: "3430696586",
        title: "Sad, Drunk and Needy by WHSPRS"
    }
];

// bandcamp extractor
// let obj = { artist: document.URL.match(/(?<=https:\/\/)[^\.]*/)[0], track: document.URL.match(/(?<=bandcamp.com\/track\/)[^\.]*/)[0] , id: document.querySelector("meta[property=\"og:video\"]").content.match(/track=\d*/)[0].substring(6), title: document.querySelector(".trackTitle").innerText + " by " + document.querySelectorAll(".albumTitle > span > a")[document.querySelectorAll(".albumTitle > span > a").length - 1].innerText }

const emb = document.getElementById("embed");

const road = () => {
    let chosen = (Math.floor(Math.random() * playlist.length) % playlist.length);
    console.log(chosen);
    let band = document.createElement("iframe");
    let link = document.createElement("a");
    link.href = `${playlist[chosen].artist}.bandcamp.com/tract/${playlist[chosen].track}`;
    link.innerText = playlist[chosen].title;

    band.src = `https://bandcamp.com/EmbeddedPlayer/track=${playlist[chosen].id}/size=large/bgcol=333333/linkcol=e99708/tracklist=false/transparent=true/`;
    emb.innerHTML = "";
    emb.appendChild(band);
}

document.getElementById("rand").addEventListener("click", () => road());

// disable during dev
road();