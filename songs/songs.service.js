const Song = require('../schemas/song.schema');
const User= require('../schemas/user.schema');

const Utils = require('../common/utils/utils');

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

    async getAll(query={}, from=0, limit=0, sort='_id', order='asc') {
        return await Song.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort(Utils.parseSort(sort, order))
            .exec();
    }

    async getOne(id) {
        return await Song.findById(id).populate('author').exec();
    }

    async addFavouriteSong(userId, songId) {
        User.findByIdAndUpdate(userId, {
            $addToSet: {
                favouriteSongs: songId
            }
        }).exec();
    }
}

module.exports = new SongsService();