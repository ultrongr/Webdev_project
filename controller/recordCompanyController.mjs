
const model = await import('../model/better-sqlite/record-model-better-sqlite.mjs');

export async function home(req, res) {
    console.log('home');
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
    }
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
        res.render('login', {title: 'Login', message: '⚠ hey'});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function register(req, res) {
    try{
        res.render('register', {title: 'Register'});
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

export async function showFavouriteArtistsEvents(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        res.render('login', {title: 'Login', message: 'Please log in to view your favourite artists events'});
    }
    const events = model.getEventsByFavoriteArtists(req.session.username);
    for (let i = 0; i < events.length; i++) {
        events[i].event_artists = model.getArtistsInEvent(events[i].ID);
    }
    try{
        res.render('events', { title: 'Favourite Artists Events', events: events });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}