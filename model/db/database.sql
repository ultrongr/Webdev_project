CREATE TABLE IF NOT EXISTS "VISITOR" (
	"Username" string,
	"Name" string,
	"Hash_password" string,
	"Age" integer,
	PRIMARY KEY ("Username")
);

CREATE TABLE IF NOT EXISTS "ARTIST" (
	"ID" string,
	"Name" string,
	"Age" integer,
	"Sex" string,
	"Bio" string,
	"picture" string,
	PRIMARY KEY ("ID")
);

CREATE TABLE IF NOT EXISTS "EVENT" (
	"ID" string,
	"Date" datetime,
	"Title" string,
	"Type" string,
	"Description" string,
	"Location" string,
	"picture" string,
	PRIMARY KEY ("ID")
);

CREATE TABLE IF NOT EXISTS "ALBUM" (
	"ID" string,
	"Artist_id" string,
	"Name" string,
	PRIMARY KEY ("ID"),
	FOREIGN KEY ("Artist_id") REFERENCES "ARTIST" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "SONG" (
	"ID" string,
	"Name" string,
	"Artist_id" string,
	"Album_id" string,
	"PG" integer,
	"Release_date" datetime,
	"Audio_path" string,
	"picture" string,
	PRIMARY KEY ("ID"),
	FOREIGN KEY ("Artist_id") REFERENCES "ARTIST" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("Album_id") REFERENCES "ALBUM" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Likes" (
	"Visitor_username" string,
	"Song_id" string,
	"Date_of_liking" datetime,
	PRIMARY KEY ("Visitor_username", "Song_id"),
	FOREIGN KEY ("Visitor_username") REFERENCES "VISITOR" ("Username")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("Song_id") REFERENCES "SONG" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Participates" (
	"Artist_id" string,
	"Event_id" string,
	PRIMARY KEY ("Artist_id", "Event_id"),
	FOREIGN KEY ("Artist_id") REFERENCES "ARTIST" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("Event_id") REFERENCES "EVENT" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Follows" (
	"Artist_id" string,
	"Visitor_username" string,
	PRIMARY KEY ("Artist_id", "Visitor_username"),
	FOREIGN KEY ("Artist_id") REFERENCES "ARTIST" ("ID")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
	FOREIGN KEY ("Visitor_username") REFERENCES "VISITOR" ("Username")
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

