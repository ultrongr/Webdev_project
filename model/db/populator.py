import sqlite3

con = sqlite3.connect('database.db')
cur = con.cursor()


def clear_db():
    tables = ['ARTIST', 'ALBUM', 'SONG', 'EVENT', 'VISITOR', 'Follows', 'Likes', 'Participates']
    for table in tables:
        cur.execute(f"DELETE FROM {table}")
        con.commit()


def add_artist(_id, name, age, sex, bio, picture):
    
    cur.execute("INSERT INTO ARTIST (ID, Name, Age, Sex, Bio, picture) VALUES (?, ?, ?, ?, ?, ?)", 
                (_id, name, age, sex, bio, picture))
    con.commit()

def add_album(_id, artist_id, name):
    cur.execute(
        "INSERT INTO ALBUM (ID, Artist_id, Name) VALUES (?, ?, ?)",
        (_id, artist_id, name),
    )
    con.commit()
    
def add_song(_id, name, artist_id, album_id, pg, release_date, song_file, picture):
    cur.execute(
        "INSERT INTO SONG (ID, Name, Artist_id, Album_id, PG, Release_date, YT_link, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (_id, name, artist_id, album_id, pg, release_date, song_file, picture),
    )
    con.commit()


clear_db()

add_artist('1', 'Eminem', 45, 'M', 'Eminem, born Marshall Bruce Mathers III, is an American rapper, songwriter, record producer, record executive, and actor.', 'images/artists/eminem.jpg')
add_artist('2', 'Pink Floyd', None, None, 'Pink Floyd were an English rock band formed in London in 1965. They achieved international acclaim with their progressive and psychedelic music.', 'images/artists/PinkFloyd.jpg')
add_artist('3', 'Rihanna', 30, 'F', 'Robyn Rihanna Fenty is a Barbadian singer, songwriter, actress, and businesswoman.', 'images/artists/rihanna.jpg')
add_artist('4', 'The Beatles', None, None, 'The Beatles were an English rock band formed in Liverpool in 1960. With members John Lennon, Paul McCartney, George Harrison and Ringo Starr.', 'images/artists/thebeatles.jpg')

add_album('1', '2', 'The Dark Side of the Moon')
add_album('2', '2', 'Wish You Were Here')

add_song('1', 'Speak to Me', '2', '1', 18, '1973-03-01', '/albums/The Dark Side of the Moon/01 Speak to Me_Breathe.mp3', '/albums/The Dark Side of the Moon/cover.png')
add_song('2', 'On the Run', '2', '1', 18, '1973-03-01', '/albums/The Dark Side of the Moon/02 On the Run.mp3', '/albums/The Dark Side of the Moon/cover.png')
add_song('3', 'Time', '2', '1', 18, '1973-03-01', '/albums/The Dark Side of the Moon/03 Time.mp3', '/albums/The Dark Side of the Moon/cover.png')
add_song('4', 'The Great Gig in the Sky', '2', '1', 18, '1973-03-01', '/albums/The Dark Side of the Moon/04 The Great Gig in the Sky.mp3', '/albums/The Dark Side of the Moon/cover.png')