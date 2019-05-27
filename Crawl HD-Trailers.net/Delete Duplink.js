const { Chromeless } = require('chromeless');
const fs = require('fs');
var MovieLink = fs.readFileSync('MovieLink.txt').toString().split("\n");


//Write File

var MovieLinkNotDup = [...new Set(MovieLink)]

for (var i=0; i > MovieLinkNotDup.length; i++){
  MovieLinkNotDup = MovieLinkNotDup[i] + '\n'
}


fs.appendFileSync('MovieLink_NotDup.txt', MovieLinkAll);



