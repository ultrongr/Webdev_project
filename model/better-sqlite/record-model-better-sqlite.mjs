'use strict';

// Το better-slite3 είναι εντελώς σύγχρονο
import db from 'better-sqlite3'
const sql = new db('model/db/database.db', { fileMustExist: true });

//Artists
export let getAllArtists = () => {
    const stmt = sql.prepare('SELECT * FROM ARTIST');
    let artists;
    try {
        artists = stmt.all();
        return artists;
    } catch (error) {
        return error;
    }
}

export let getArtistById = (id) => {
    const stmt = sql.prepare('SELECT * FROM ARTIST WHERE ID = ?');
    let artist;
    try {
        artist = stmt.get(id);
        return artist;
    } catch (error) {
        return error;
    }
}

export let getArtistByName = (name) => {
    const stmt = sql.prepare('SELECT * FROM ARTIST WHERE NAME = ?');
    let artist;
    try {
        artist = stmt.get(name);
        return artist;
    } catch (error) {
        return error;
    }
}

//Users
export let getUserByUsername = (username) => {
    const stmt = sql.prepare('SELECT * FROM USER WHERE USERNAME = ?');
    let user;
    try {
        user = stmt.get(username);
        return user;
    } catch (error) {
        return error;
    }
}

export let getFavouriteArtistsByUsername = (username) => {
    const stmt = sql.prepare('SELECT * FROM Follows WHERE Visitor_username = ?');
    let artists;
    try {
        artists = stmt.all(username);
        return artists;
    } catch (error) {
        return error;
    }
}

//Songs
export let getAllSongs = () => {
    const stmt = sql.prepare('SELECT * FROM SONG');
    let songs;
    try {
        songs = stmt.all();
        return songs;
    } catch (error) {
        return error;
    }
}

export let getSongById = (id) => {
    const stmt = sql.prepare('SELECT * FROM SONG WHERE ID = ?');
    let song;
    try {
        song = stmt.get(id);
        return song;
    } catch (error) {
        return error;
    }
}

export let getSongByName = (name) => {
    const stmt = sql.prepare('SELECT * FROM SONG WHERE NAME = ?');
    let song;
    try {
        song = stmt.get(name);
        return song;
    } catch (error) {
        return error;
    }
}

export let getSongsByArtistId = (id) => {
    const stmt = sql.prepare('SELECT * FROM SONG WHERE Artist_id = ?');
    let songs;
    try {
        songs = stmt.all(id);
        return songs;
    } catch (error) {
        return error;
    }
}

export let getFavoriteSongsByUsername = (username) => {
    const stmt = sql.prepare('SELECT * FROM Likes WHERE Visitor_username = ?');
    let songs;
    try {
        songs = stmt.all(username);
        return songs;
    } catch (error) {
        return error;
    }
}

//Albums
export let getAlbumsByArtistId = (id) => {
    const stmt = sql.prepare('SELECT * FROM ALBUM WHERE Artist_id = ?');
    let albums;
    try {
        albums = stmt.all(id);
        return albums;
    } catch (error) {
        return error;
    }
}

export let getAlbumById = (id) => {
    const stmt = sql.prepare('SELECT * FROM ALBUM WHERE ID = ?');
    let album;
    try {
        album = stmt.get(id);
        return album;
    } catch (error) {
        return error;
    }
}

//Events
export let getEventsByArtistId = (id) => {
    const stmt = sql.prepare('SELECT * FROM EVENT WHERE ID in (SELECT Event_id FROM Participates WHERE Artist_id = ?)');
    let events;
    try {
        events = stmt.all(id);
        return events;
    } catch (error) {
        return error;
    }
}

export let getEventsByFavoriteArtists = (username) => {
    const stmt = sql.prepare('SELECT * FROM EVENT WHERE Artist_id IN (SELECT Artist_id FROM Follows WHERE Visitor_username = ?)');
    let events;
    try {
        events = stmt.all(username);
        return events;
    } catch (error) {
        return error;
    }
}

export let getEventById = (id) => {
    const stmt = sql.prepare('SELECT * FROM EVENT WHERE ID = ?');
    let event;
    try {
        event = stmt.get(id);
        return event;
    } catch (error) {
        return error;
    }
}