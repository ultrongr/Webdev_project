
const model = await import('../model/better-sqlite/record-model-better-sqlite.mjs');

export async function home(req, res) {
    const artists = model.getAllArtists();
    const selectedAttributes = artists.map(artist => ({
        Name: artist.Name,
        picture: artist.picture
    }));
    
    try{
        res.render('home', {title: 'Home', artists: selectedAttributes.slice(0, 4)});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function contact(req, res) {
    try{
        res.render('contact', {title: 'Contact'});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function login(req, res) {
    try{
        res.render('login', {title: 'Login'});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function songPlayer(req, res) {
    const song = model.getSongByName(req.params.songName);
    console.log(req.params.songName);
    const artist = model.getArtistById(song.Artist_id);
    console.log(artist);
    try{
        res.render('song-player', { song: song.Name, artist: artist.Name, image: song.picture, audio: song.YT_link });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}