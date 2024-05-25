import { addSongToFavourites } from '../model/better-sqlite/record-model-better-sqlite.mjs';

const model = await import('../model/better-sqlite/record-model-better-sqlite.mjs');

export async function home(req, res) {
    console.log('home');
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
    }
    const artists = model.getAllArtists();
    try {
        res.render('home', { title: 'Home', artists: artists.slice(0, 4), username: req.session.username });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function contact(req, res) {
    try {
        res.render('contact', { title: 'Contact' });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function login(req, res) {
    try {
        res.render('login', { title: 'Login', message: '⚠ hey' });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function register(req, res) {
    try {
        res.render('register', { title: 'Register' });
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
    const isFavourite = model.isSongFavourite(req.session.username, song.ID);
    const totalLikes = model.getTotalLikesBySongId(song.ID);
    try {
        res.render('song-player', { song: song.Name, artist: artist.Name, image: song.picture, audio: song.Audio_path, isFavourite: isFavourite, totalLikes: totalLikes });
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
    const albums = model.getAlbumsByArtistId(artist.ID);

    const albumsWithSongs = albums.map(album => {
        album.songs = model.getSongsByAlbumId(album.ID);
        return album;
    });
    const singles = model.getArtistsSingles(artist.ID);
    const events = model.getEventsByArtistId(artist.ID);
    const follows = model.followsArtist(req.session.username, artist.ID);

    const hasntReleased = albumsWithSongs.length === 0 && singles.length === 0;

    const totalFollows = model.getNumberFollowsByArtistId(artist.ID);

    try {
        res.render('artist', {
            artist: artist, albums: albumsWithSongs, singles: singles,
            hasntReleased: hasntReleased, events: events, follows: follows, totalFollows: totalFollows
        });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function artists(req, res) {
    const artists = model.getAllArtists();
    try {
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
        res.redirect('/login/Please log in to view your favourite artists upcoming events');
        return;
    }
    const events = model.getEventsByFavouriteArtists(req.session.username);
    for (let i = 0; i < events.length; i++) {
        events[i].event_artists = model.getArtistsInEvent(events[i].ID);
    }
    try {
        res.render('events', { title: 'Favourite Artists Events', events: events });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function addToFavouriteSongs(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        res.redirect('/login/Please log in to add songs to your favourites');
        return;
    }
    const song = model.getSongByName(req.params.songName);
    if (song === undefined) {
        res.send('Error (404): Song not found');
        return;
    }
    const result = model.addSongToFavourites(req.session.username, song.ID);
    try {
        res.redirect('/song-player/' + song.Name);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function removeFromFavouriteSongs(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        res.redirect('/login/Please log in to remove songs from your favourites');
        return;
    }
    const song = model.getSongByName(req.params.songName);
    if (song === undefined) {
        res.send('Error (404): Song not found');
        return;
    }
    const result = model.removeSongFromFavourites(req.session.username, song.ID);
    try {
        res.redirect('/song-player/' + song.Name);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}
export async function addToFollowedArtists(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        res.redirect('/login/Please log in to add artists to your favourites');
        return;
    }
    const artist = model.getArtistByName(req.params.artistName);
    if (artist === undefined) {
        res.send('Error (404): Artist not found');
        return;
    }
    const result = model.addArtistToFollowed(req.session.username, artist.ID);
    try {
        res.redirect('/artist/' + artist.Name);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function removeFromFollowedArtists(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        res.redirect('/login/Please log in to remove artists from your favourites');
        return;
    }
    const artist = model.getArtistByName(req.params.artistName);
    if (artist === undefined) {
        res.send('Error (404): Artist not found');
        return;
    }
    const result = model.removeArtistFromFollowed(req.session.username, artist.ID);
    try {
        res.redirect('/artist/' + artist.Name);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

export async function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

export async function profile(req, res) {
    if (req.session.username) {
        console.log('Logged in as: ' + req.session.username);
    } else {
        console.log('Not logged in');
        // res.redirect('/login/Please log in to view your profile');
        res.render('login', { title: 'Login', message: '⚠ Please log in to view your profile' })
        return;
    }
    const followedArtists = model.getFavouriteArtistsByUsername(req.session.username);
    const favouriteSongs = model.getFavouriteSongsByUsername(req.session.username);
    for (let i = 0; i < favouriteSongs.length; i++) {
        favouriteSongs[i].artist = model.getArtistById(favouriteSongs[i].Artist_id);
    }
    console.log(followedArtists)
    console.log(favouriteSongs)
    try {
        res.render('profile', { title: 'Profile', username: req.session.username, artists: followedArtists, songs: favouriteSongs });
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}