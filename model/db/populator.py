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



clear_db()

# add_artist('1', 'Eminem', 45, 'M', 'Eminem, born Marshall Bruce Mathers III, is an American rapper, songwriter, record producer, record executive, and actor.', 'eminem.jpg')
