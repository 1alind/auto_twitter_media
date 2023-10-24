const {
    postmedia
} = require("./post_media")

const file = 'video.mp4'
const text = "enter the text you want to share with media. leave blank if you want to share media only";

(async () => {
    const stats = await postmedia(file, text);
    console.log(stats);
})();