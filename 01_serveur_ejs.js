const express = require('express');
const fs = require("fs");
const app = express();
const MongoClient = require('mongodb').MongoClient; // le pilote MongoDB
 var util = require("util");
app.use(express.static('public'));


/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template


app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.render('formulaire.ejs');

})

app.get('/membres', (req, res) => {
 /*fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	let json = JSON.parse(data);
   	res.render('membres.ejs', {membres: json});

 });*/

	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
		 if (err) return console.log(err)
		 console.log('util = ' + util.inspect(resultat));
		 // transfert du contenu vers la vue gabarit.ejs (renders)
		 // affiche le contenu de la BD
		 res.render('membres.ejs', {membres: resultat})
	})
})


app.get('/', (req, res) => {
	console.log('accueil')
   	res.render('accueil.ejs');
})




app.get('/ajouter', function (req, res) {

console.log('la route /ajouter')


// on utilise l'objet req.query pour récupérer les données GET
/* let reponse = {
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

 res.render('nouveauMembre.ejs', {membreAjoute: reponse});*/



 db.collection('adresse').save(req.query, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/membres')

})



})

 /*var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)*/

 let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })

})