import sqlite3

con = sqlite3.connect('database.db')
cur = con.cursor()

def myhash(s):
    return hash(s) % 10**7

def clear_db():
    tables = ['ARTIST', 'ALBUM', 'SONG', 'EVENT', 'VISITOR', 'Follows', 'Likes', 'Participates']
    for table in tables:
        cur.execute(f"DELETE FROM {table}")
        con.commit()

def get_artist_id(artist_name):
    cur.execute("SELECT ID FROM ARTIST WHERE Name = ?", (artist_name,))
    return cur.fetchone()[0]

def get_album_id(artist_id, album_name):
    cur.execute("SELECT ID FROM ALBUM WHERE Artist_id = ? AND Name = ?", (artist_id, album_name))
    return cur.fetchone()[0]

def add_artist(name, age, sex, bio):
    _id = myhash(name)
    picture = f'/images/artists/{name}.jpg'.replace(' ', '')
    
    cur.execute("INSERT INTO ARTIST (ID, Name, Age, Sex, Bio, picture) VALUES (?, ?, ?, ?, ?, ?)", 
                (_id, name, age, sex, bio, picture))
    con.commit()

def add_album(artist, name):
    _id = myhash(name + artist)
    artist_id = get_artist_id(artist)
    
    cur.execute(
        "INSERT INTO ALBUM (ID, Artist_id, Name) VALUES (?, ?, ?)",
        (_id, artist_id, name),
    )
    con.commit()
    
def add_song(name, artist, album, pg, release_date, song_file):
    _id = myhash(name + album)
    artist_id = get_artist_id(artist)
    album_id = get_album_id(artist_id, album)
    
    picture = f'/albums/{album}/{album}.jpg'
    
    cur.execute(
        "INSERT INTO SONG (ID, Name, Artist_id, Album_id, PG, Release_date, Audio_path, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (_id, name, artist_id, album_id, pg, release_date, song_file, picture),
    )
    con.commit()

def add_event(_id, date, title, type, description, location, picture):
    cur.execute(
        "INSERT INTO EVENT (ID, Date, Title, Type, Description, Location, picture) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (_id, date, title, type, description, location, picture),
    )
    con.commit()

def add_Participates(artist_id, event_id):
    cur.execute(
        "INSERT INTO Participates (Artist_id, Event_id) VALUES (?, ?)",
        (artist_id, event_id),
    )
    con.commit()

def add_follows(visitor_id, username):
    cur.execute(
        "INSERT INTO Follows (Visitor_username, Artist_id) VALUES (?, ?)",
        (visitor_id, username),
    )
    con.commit()

def add_to_database(artist, albums, songs):
    add_artist(*artist)
    for album in albums:
        add_album(*album)
    for song in songs:
        add_song(*song)

clear_db()

# artists = [
#     ['Rihanna', 30, 'F', 'Robyn Rihanna Fenty is a Barbadian singer, songwriter, actress, and businesswoman.', 'images/artists/rihanna.jpg'],
#     ['The Beatles', None, None, 'The Beatles were an English rock band formed in Liverpool in 1960. With members John Lennon, Paul McCartney, George Harrison and Ringo Starr.', 'images/artists/thebeatles.jpg'],
#     ['Imagine Dragons', None, None, 'Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead vocalist Dan Reynolds, lead guitarist Wayne Sermon, bassist Ben McKee, and drummer Daniel Platzman.', 'images/artists/imagine_dragons.jpg'],
#     ['Taylor Swift', 28, 'F', 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical plaudits and media coverage.', 'images/artists/taylor_swift.jpg'],
#     ['King Crimson', None, None, 'King Crimson are an English progressive rock band formed in London in 1968. They have been influential both on the early 1970s progressive rock movement and numerous contemporary artists.', 'images/artists/king_crimson.png']
# ]

# for artist in artists:
#     add_artist(*artist)

from eminem import *
add_to_database(eminem, eminem_albums, eminem_songs)

from pinkfloyd import *
add_to_database(pinkfloyd, pinkfloyd_albums, pinkfloyd_songs)


add_event('1', 
        '2024-07-12',
        'Eminem Live Concert',
        'Concert',
        'Eminem will be performing live at Wembley Stadium in London. Tickets are available now!',
        'Wembley Stadium, London',
        'images/events/eminem_concert.jpg')

add_event('2',
        '1994-07-02',
        'Pink Floyd Live Concert',
        'Concert',
        'Pink Floyd will be performing live at Earls Court in London. Tickets are available now!',
        'Earls Court, London',
        'images/events/pinkfloyd_concert.jpg')

add_Participates('1', '1')
add_Participates('2', '2')


add_follows('papaki', '1')
add_follows('papaki', '2')
