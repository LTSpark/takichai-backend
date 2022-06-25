const Song = require('../schemas/song.schema');
const User= require('../schemas/user.schema');

const { cloudinaryAudioUpload, cloudinaryImageUpload } = require("../common/cloudinary.upload");

class SongsService {

    async create(createSong, songFile, imgFile, userId) {

        const { 
            name, 
            year, 
            genre, 
            description, 
            mood, 
            instrumental, 
        } = createSong;

        const { url: songUrl, duration } = await cloudinaryAudioUpload(songFile);
        const { url: imageUrl } = await cloudinaryImageUpload(imgFile);

        const song = new Song({
            name, year, genre, description,
            instrumental, songUrl,
            imageUrl, mood, duration,
            author: userId
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                songs: song
            }
        }).exec();

        return song.save();

    }
}

module.exports = new SongsService();