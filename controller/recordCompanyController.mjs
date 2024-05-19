
const model = await import('../model/better-sqlite/record-model-better-sqlite.mjs');

export async function home(req, res) {
    const artists = model.getAllArtists();    
    try{
        res.render('home', {title: 'Home', artists: artists.slice(0, 4)});
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
    if (song === undefined) {
        res.send('Error (404): Song not found');
        return;
    }
    const artist = model.getArtistById(song.Artist_id);
    if (artist === undefined) {
        res.send('Error (404): Song artist not found');
        return;
    }
    try{
        res.render('song-player', { song: song.Name, artist: artist.Name, image: song.picture, audio: song.YT_link });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function artist(req, res) {
    const artist = model.getArtistByName(req.params.artistName);
    if (artist === undefined) {
        res.send('Artist not found');
        return;
    }
    const songs = model.getSongsByArtistId(artist.ID);
    const events = model.getEventsByArtistId(artist.ID);
    try{
        res.render('artist', { artist: artist, songs: songs, events: events });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function artists(req, res) {
    const artists = model.getAllArtists();
    try{
        res.render('all-artists', { artists: artists });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}