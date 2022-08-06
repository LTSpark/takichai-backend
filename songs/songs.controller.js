const SongsService = require("./songs.service");

class SongsController {

    async create(req, res) {
        try {
            const { id } = req.user;
            const song = await SongsService.create(req.body, req.files.song, req.files.img, id);
            return res.status(201).json({
                song,
                msg: "Song created successfully!",
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "Song creation failed!"
            });
        }
    }

    async getAll(req, res) {
        const { from, limit, sort, order, name, userId } = req.query;
        const query = {
            name: new RegExp(name, 'i'),
            userId
        };
        const songs = await SongsService.getAll(query, from, limit, sort, order);
        return res.json({
            ok: true,
            songs,
            totalsongs: songs.length || 0
        })
    }

    async getSongById(req, res) {
        const song = await SongsService.getOne(req.params.id);
        if (!song)
            return res.json({
                ok: false,
                msg: `Song with id ${req.params.id} not founded`
            });
        return res.json({
            ok: true,
            msg: `Song with id ${song.id} founded`,
            song
        });
    }



}

module.exports = new SongsController();