const Peliculas = require('../lib/models/peliculas');
const sync = require('./syncdb');
const movies = require('./load');


const movies = [
  {
    nombre: "Avengers: Endgame",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2019, 4, 22),
    director: "Anthony Russo, Joe Russo",
    reparto: "Rober Downey Jr., Chris Evans, Chris Hemsworth"
  },
  {
    nombre: "The Lion King",
    pais: "Estaod Unidos",
    fecha_estreno: new Date(1994, 6, 15),
    director: "Roger Allers, Rob Minkoff",
    reparto: "Matthew Broderick, Jeremy Irons, Nathan Lane"
  },
  {
    nombre: "Frozen",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2013, 11, 22),
    director: "Chris Buck, Jennifer Lee",
    reparto: "Kristen Bell, Indina Menzel, Josh Gad"
  },
  {
    nombre: "Spider-Man: Homecoming",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2017, 6, 28),
    director: "Jon Watts",
    reparto: "Tom Holland, Michael Keaton, Jon Favreau"
  },
  {
    nombre: "Toy Story 3",
    pais: "Estaods Unidos",
    fecha_estreno: new Date(2010, 6, 12),
    director: "Lee Unkrich",
    reparto: "Tom Hanks, Tim Allen, Joan Cusack"
  },
  {
    nombre: "Joker",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2019, 8, 21),
    director: "Todd Phillips",
    reparto: "Joaquin Phoenix, Rober De Niro, Zazie Beetz"
  },
  {
    nombre: "Alladin",
    pais: "Estados Unidos",
    fecha_estreno: new Date(1992, 11, 13),
    director: "Ron Clements, John Musker",
    reparto: "Scott Weinger, Robin Williams, Linda Larkin"
  },
  {
    nombre: "Star Wars",
    pais: "Estados Unidos",
    fecha_estreno: new Date(1977, 5, 25),
    director: "George Lucas",
    reparto: "Mark Hamill, Harrison Ford, Carrie Fisher"
  },
  {
    nombre: "Jurassic Park",
    pais: "Estados Unidos",
    fecha_estreno: new Date(1993, 6, 9),
    director: "Steven Spielberg",
    reparto: "Sam Neill, Laura Dern, Jeff Goldblum"
  },
  {
    nombre: "The Incredibles",
    pais: "Estaodos Unidos",
    fecha_estreno: new Date(2004, 10, 27),
    director: "Brad Bird",
    reparto: "Craig T. Nelson, Holly Hunter, Sarah Vowell"
  },
  {
    nombre: "Mission: Impossible",
    pais: "Estados Unidos",
    fecha_estreno: new Date(1996, 5, 22),
    director: "Brian De Palma",
    reparto: "Tom Cruise, Jon Voight, Henry Czerny"
  },
  {
    nombre: "Deadpool",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2016, 2, 8),
    director: "Tim Miller",
    reparto: "Ryan Reynolds, Morena Baccarin, Ed Skerein"
  },
  {
    nombre: "Fantastic Beasts: The Crimes of Grindelwald",
    pais: "Inglaterra, Estados Unidos",
    fecha_estreno: new Date(2018, 11, 8),
    director: "David Yates",
    reparto: "Eddie Redmayne, Dan Fogler, Allison Sudol"
  },
  {
    nombre: "Alice in Wonderland",
    pais: "Estados Unidos",
    fecha_estreno: new Date(2010, 2, 25),
    director: "Tim Burton",
    reparto: "Johnny Depp, Anne Hathaway, Crispin Glover"
  }
];


movies.forEach(movie => {
  sync().then(() => Peliculas.create(movie))
});