/*
  CollinMotion content
  --------------------
  Everything on the site comes from this one file. Edit it, commit, and the
  site updates. Nothing else needs touching to add work.

  FILMS
    youtube: the video ID, the part after "watch?v=" in a YouTube link.
             https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
    feeling: one line on what the film feels like, in your own words.
             This shows instead of a genre, so make it honest.
    zoom:    optional, e.g. 1.3, to crop black letterbox bars off a thumbnail.
    still:   optional custom thumbnail, e.g. "media/stills/cold-water.jpg".
             If left out, the YouTube thumbnail is used.
    The first film in the list is shown largest, so put your favorite first.

  PHOTOGRAPHY
    Each series is a group of photos. Put the images in media/photos/<series id>/
    and list them in "photos". The first photo is the cover.
    Keep each image under ~500 KB (long edge 2000px, JPG quality ~80).

  SHORTS
    Leave the list empty and the shorts section quietly says more are coming.
    url: link to the reel on Instagram or the short on YouTube.
    cover: a 9:16 still, e.g. "media/shorts/first-light.jpg".

  Anything marked "EDIT ME" is placeholder copy written to show the shape.
*/

window.CM = {
  site: {
    name: "CollinMotion",
    // Your signature line, written in pen under the name on the home page
    tagline: "Vision made visible.",
    // The reel at the top of the home page. Export a 20–40s loop, 1080p,
    // no audio needed, H.264 MP4 under ~15 MB, save it as media/reel.mp4,
    // then set reel: "media/reel.mp4". While it's empty, the top of the page
    // shows your first film's thumbnail and plays that film when clicked.
    reel: "",
    reelPoster: "",
    youtube: "https://www.youtube.com/@CollinButrlakorn",
    instagram: "https://www.instagram.com/collinmotion",
    email: "", // optional; leave empty to hide
  },

  // EDIT ME if it doesn't sound like you: the line under the reel
  statement:
    "Most of what I make comes back to home: leaving it, missing it, and finally seeing it clearly.",

  films: [
    {
      title: "My Great Alaskan Adventure",
      youtube: "Mx37hpye3yI",
      year: "",
      runtime: "",
      place: "Alaska",
      feeling: "Going back to the town that raised me, and actually seeing it this time.",
    },
    {
      title: "The Grass Is (Not) Always Greener",
      youtube: "YpY3vTVp_io",
      year: "",
      runtime: "",
      place: "",
      feeling: "Just me and the camera, on leaving for a better life and wondering if I ever needed to.",
    },
    {
      title: "Fifty Feet of Falling Water",
      youtube: "dUCl4FJAXcc",
      year: "",
      runtime: "",
      place: "",
      feeling: "Even in the dark stretches, there is something beautiful if you look.",
      zoom: 1.32, // the film is letterboxed wider than 16:9; this crops the black bars off the thumbnail
    },
  ],

  // Series with no photos yet stay hidden. When every series is empty, the
  // site points people to Instagram instead.
  photography: [
    {
      id: "home",
      title: "Home",
      place: "Alaska",
      year: "",
      note: "EDIT ME: a couple of sentences about what you were looking for in this set.",
      photos: [], // e.g. ["media/photos/home/01.jpg", "media/photos/home/02.jpg"]
    },
  ],

  shorts: [
    // { title: "First light", url: "https://www.instagram.com/reel/XXXX/", cover: "media/shorts/first-light.jpg" },
  ],

  about: {
    portrait: "", // e.g. "media/collin.jpg"
    // EDIT ME: each string is a paragraph. The first one is set larger.
    paragraphs: [
      "I'm Collin. I make films and photographs, mostly about home and the people and places that make it.",
      "CollinMotion is where my personal work lives: the things I make because I want to, not because anyone asked. Some of it is polished and some of it was thrown together the night before. All of it is honest.",
      "If something here stays with you, I'd love to hear about it.",
    ],
    kit: [], // optional, e.g. ["Sony A7 IV", "35mm f/1.4"]; leave empty to hide
  },
};
