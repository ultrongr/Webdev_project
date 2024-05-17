
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
    try{
        res.render('song-player', {song: "request.song"});
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}