const express = require('express');
const fs = require("fs");
const app = express();
app.use(express.static('public'));


/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template


app.get('/formulaire', function (req, res) {
 console.log(__dirname);

 res.render('gabarit_4.ejs');

})

app.get('/membres', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	let json = JSON.parse(data);
	//res.end(transforme_en_tableau(json));

   	res.render('gabarit_2.ejs', {membres: json});

 });
})


app.get('/', (req, res) => {
	console.log('accueil')
	//res.end('<h1>Accueil</h1>')
   	res.render('gabarit_3.ejs');
})



// RETIRER DÉFINITION VARIABLE ET AJOUTER let DIRECTEMENT À L'ASSIGNATION
let reponse = {};

app.get('/traiter_get', function (req, res) {

console.log('la route /traiter_get')


// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
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

 res.end(JSON.stringify(reponse));

})


const transforme_en_tableau = (collection) =>
{
	let chaine = '<table>';
	for (elm of collection) {

		chaine += '<tr>';

		for(p in elm) {
			chaine += '<td>' + p + ' : ' + elm[p] + '</td>';
		}

		chaine += '</tr>';

	}

	chaine += '</table>';
	return chaine;
}



 var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})