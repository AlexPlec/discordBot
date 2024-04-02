const makimaFolderPath = ['files/makima/makima', 'files/makima/memes', 'files/makima/femboys'];
const memesFolderPath = ['files/memes'];
const nsfwFolderPath = ['files/nsfw/memes', 'files/nsfw/femboys'];

const postsParametrs = [
  [
    { start: 10, end: 12, content: makimaFolderPath[0], numberOfPosts: 2 },
    { start: 10, end: 12, content: makimaFolderPath[1], numberOfPosts: 2 },
    { start: 13, end: 15, content: makimaFolderPath[2], numberOfPosts: 2 }
  ],
  [
    { start: 10, end: 12, content: memesFolderPath[0], numberOfPosts: 2 }
  ],
  [
    { start: 10, end: 12, content: nsfwFolderPath[0], numberOfPosts: 2 },
    { start: 10, end: 12, content: nsfwFolderPath[1], numberOfPosts: 2 },
  ]
];

module.exports = {
  postsParametrs,
};
