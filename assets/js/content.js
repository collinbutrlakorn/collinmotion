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
    // EDIT ME: one sentence under the name on the home page
    tagline: "Short films and photographs about people, places, and the feelings that stay after.",
    // The full-screen reel. Export a 20–40s loop, 1080p, no audio needed,
    // H.264 MP4 under ~15 MB, and save it as media/reel.mp4.
    reel: "media/reel.mp4",
    reelPoster: "media/reel-poster.jpg",
    youtube: "https://www.youtube.com/@collinbutrlakorn",
    instagram: "https://www.instagram.com/collinmotion",
    email: "", // optional; leave empty to hide
  },

  // EDIT ME: home page statement under the reel
  statement:
    "I make things about connection: the people I love, the places that raised me, and the moments that hurt a little and mean a lot.",

  films: [
    {
      title: "Film title",
      youtube: "",
      year: "2026",
      runtime: "6 min",
      place: "Alaska",
      feeling: "EDIT ME: what this one feels like, in a sentence.",
    },
    {
      title: "Second film",
      youtube: "",
      year: "2025",
      runtime: "4 min",
      place: "Oregon",
      feeling: "EDIT ME: what this one feels like, in a sentence.",
    },
    {
      title: "Third film",
      youtube: "",
      year: "2025",
      runtime: "3 min",
      place: "Pacific Northwest",
      feeling: "EDIT ME: what this one feels like, in a sentence.",
    },
  ],

  photography: [
    {
      id: "series-one",
      title: "Series one",
      place: "Wasilla, Alaska",
      year: "2026",
      note: "EDIT ME: a couple of sentences about what you were looking for in this set.",
      photos: [], // e.g. ["media/photos/series-one/01.jpg", "media/photos/series-one/02.jpg"]
    },
    {
      id: "series-two",
      title: "Series two",
      place: "Oregon coast",
      year: "2025",
      note: "EDIT ME: a couple of sentences about this set.",
      photos: [],
    },
    {
      id: "series-three",
      title: "Series three",
      place: "On the road",
      year: "2025",
      note: "EDIT ME: a couple of sentences about this set.",
      photos: [],
    },
  ],

  shorts: [
    // { title: "First light", url: "https://www.instagram.com/reel/XXXX/", cover: "media/shorts/first-light.jpg" },
  ],

  about: {
    portrait: "", // e.g. "media/collin.jpg"
    // EDIT ME: each string is a paragraph. The first one is set larger.
    paragraphs: [
      "I'm Collin. I shoot films and photographs between Alaska and Oregon.",
      "CollinMotion is where my personal work lives: the projects I make because I need to, not because anyone asked. Most of it comes back to connection, the good kind and the kind that's hard to sit with.",
      "If something here stays with you, I'd love to hear about it.",
    ],
    // EDIT ME: what you shoot with
    kit: ["Camera body", "Lenses", "Lighting", "Microphones"],
  },
};
