'use strict';

// Το better-slite3 είναι εντελώς σύγχρονο
import db from 'better-sqlite3'
const sql = new db('model/db/database.db', { fileMustExist: true });

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

console.log(getAllArtists());
console.log("end of record-model-better-sqlite.mjs");
