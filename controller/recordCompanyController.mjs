
// const model = await import('../model/recordCompanyModel.mjs');

export async function home(req, res) {
    try{
        res.render('home', {title: 'Home'});
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
    const context = {
        audioPath: encodeURIComponent("/albums/The Dark Side of the Moon/03 Time.mp3").replace(/%2F/g, '/')
    };

    try{
        res.render('song-player', {song: "request.song", artist: "request.artist", image: "/images/record.png", audio: context.audioPath});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}