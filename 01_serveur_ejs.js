const express = require('express');
const fs = require("fs");
const app = express();
app.use(express.static('public'));


/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template


app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.render('formulaire.ejs');

})

app.get('/membres', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	let json = JSON.parse(data);
   	res.render('membres.ejs', {membres: json});

 });
})


app.get('/', (req, res) => {
	console.log('accueil')
   	res.render('accueil.ejs');
})




app.get('/traiter_get', function (req, res) {

console.log('la route /traiter_get')


// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };


fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	if (err) throw err;
	let tab = JSON.parse(data);
	tab.push(reponse);
	let json = JSON.stringify(tab);

	 fs.writeFile(__dirname + "/public/data/" + "adresses.json", json, function(err, data) {
		if (err) throw err;
	 	console.log('Terminé');
	 })

 });

 res.render('nouveauMembre.ejs', {membreAjoute: reponse});

})

 var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})