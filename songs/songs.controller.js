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


}

module.exports = new SongsController();