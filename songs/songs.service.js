const Song = require('../schemas/song.schema');
const User= require('../schemas/user.schema');

const Utils = require('../common/utils/utils');

const { cloudinaryAudioUpload, cloudinaryBase64ImageUpload, cloudinaryDelete } = require("../common/cloudinary.upload");

class SongsService {

    async create(createSong, songFile, userId) {

        const { 
            name, 
            year, 
            genre, 
            description, 
            mood, 
            instrumental,
            img
        } = createSong;

        const { url: songUrl, duration } = await cloudinaryAudioUpload(songFile);

        const song = new Song({
            name, year, genre, description,
            instrumental, songUrl,
            mood, duration,
            author: userId
        });

        if (img) {
            let { url } = await cloudinaryBase64ImageUpload(img);
            song.imageUrl = url;
        }

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

    async delete(songId) {
        const song = await Song.findByIdAndDelete(songId).exec();
        cloudinaryDelete(song.imageUrl, 'Images');
        cloudinaryDelete(song.songUrl, 'Songs');
        await User.findByIdAndUpdate(song.author, {
            $pull: {
                songs: songId
            }
        }).exec();
    }
}

module.exports = new SongsService();