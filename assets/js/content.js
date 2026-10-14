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
    Export at 2000px on the long edge, JPG quality ~80. For faster grids, also
    save a 1000px copy with "-sm" on the end (01.jpg -> 01-sm.jpg); if it's
    missing, the full photo is used.

  SHORTS
    Leave the list empty and the shorts section quietly says more are coming.
    url:   link to the reel on Instagram or the short on YouTube.
    cover: a 9:16 still, e.g. "media/shorts/first-light.jpg" (720x1280 is plenty).
    with:  optional, the collaborator's handle when the reel lives on their account.

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

  // Optional line under the reel. Left empty, the section is hidden.
  statement: "",

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

  photography: [
    // note: optional, a sentence or two about the set. Left empty, it's hidden.
    {
      id: "marion-lake-1",
      title: "Marion Lake I",
      place: "Oregon",
      year: "",
      note: "",
      photos: ["media/photos/marion-lake-1/01.jpg", "media/photos/marion-lake-1/02.jpg"],
    },
    {
      id: "marion-lake-2",
      title: "Marion Lake II",
      place: "Oregon",
      year: "",
      note: "",
      photos: ["media/photos/marion-lake-2/01.jpg", "media/photos/marion-lake-2/02.jpg", "media/photos/marion-lake-2/03.jpg", "media/photos/marion-lake-2/04.jpg"],
    },
    {
      id: "newport",
      title: "Newport, OR",
      place: "",
      year: "",
      note: "",
      photos: ["media/photos/newport/01.jpg", "media/photos/newport/02.jpg", "media/photos/newport/03.jpg"],
    },
    {
      id: "seaside",
      title: "Seaside, OR",
      place: "",
      year: "",
      note: "",
      photos: ["media/photos/seaside/01.jpg", "media/photos/seaside/02.jpg", "media/photos/seaside/03.jpg", "media/photos/seaside/04.jpg"],
    },
    {
      id: "san-francisco",
      title: "San Francisco",
      place: "California",
      year: "",
      note: "",
      photos: ["media/photos/san-francisco/01.jpg", "media/photos/san-francisco/02.jpg", "media/photos/san-francisco/03.jpg"],
    },
  ],

  // Newest first. "with" credits a collaborator whose account posted it.
  // EDIT ME: "At the falls", "The house" and "The coast" are placeholder titles.
  shorts: [
    { title: "At the falls", url: "https://www.instagram.com/reel/DK5C71lvzQN/", cover: "media/shorts/DK5C71lvzQN.jpg" },
    { title: "Elijah's Cuts", url: "https://www.instagram.com/reel/DK3rBe7OBng/", cover: "media/shorts/DK3rBe7OBng.jpg", with: "@elijahscuts" },
    { title: "The house", url: "https://www.instagram.com/reel/DJ5mD6Axxqe/", cover: "media/shorts/DJ5mD6Axxqe.jpg" },
    { title: "Anchored to the Ocean", url: "https://www.instagram.com/reel/DFsuE2oRklR/", cover: "media/shorts/DFsuE2oRklR.jpg" },
    { title: "The Golden Touch", url: "https://www.instagram.com/reel/C_W5D7ZPKHw/", cover: "media/shorts/C_W5D7ZPKHw.jpg", with: "@daragoldd" },
    { title: "The coast", url: "https://www.instagram.com/reel/C_KT3ofxOeU/", cover: "media/shorts/C_KT3ofxOeU.jpg" },
  ],

  about: {
    portrait: "", // e.g. "media/collin.jpg"
    // Each string is a paragraph. The first one is set larger.
    paragraphs: [
      "I've always been an artist in every respect.",
      "Grew up drawing and got into acting and even wrote books. Throughout my lifetime I wanted to create things for other people to enjoy.",
      "Years later, CollinMotion is where I can bring my vision to life.",
    ],
    kit: [], // optional, e.g. ["Sony A7 IV", "35mm f/1.4"]; leave empty to hide
  },
};
