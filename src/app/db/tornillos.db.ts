import { iTornillos } from '../interfaces/iTornillos';

export class TornillosDB {
  /***
   * tornillosDB
   * @private
   * @type {iTornillos[]}
   * This variable is used to store the tornillos as it was a database.
   */
  private static tornillosDB: iTornillos[] = [
    {
      id: 1,
      nombre: 'Adrián',
      precio: 5.4,
      formato: 'black',
      marca: 'Enim aut.',
    },
    {
      id: 2,
      nombre: 'Verna',
      precio: 5.13,
      formato: 'azure',
      marca: 'Voluptatibus voluptas',
    },
    {
      id: 3,
      nombre: 'Laura',
      precio: 3.99,
      formato: 'red',
      marca: 'Dolorem id',
    },
    {
      id: 4,
      nombre: 'Carlos',
      precio: 7.25,
      formato: 'green',
      marca: 'Nemo vitae',
    },
    {
      id: 5,
      nombre: 'Elena',
      precio: 4.5,
      formato: 'blue',
      marca: 'Adipisci fugit',
    },
    {
      id: 6,
      nombre: 'Javier',
      precio: 6.75,
      formato: 'yellow',
      marca: 'Repellendus sint',
    },
    { id: 7, nombre: 'Ana', precio: 8.99, formato: 'pink', marca: 'Eum quod' },
    {
      id: 8,
      nombre: 'Hugo',
      precio: 2.99,
      formato: 'purple',
      marca: 'Consequuntur qui',
    },
    {
      id: 9,
      nombre: 'Nuria',
      precio: 9.5,
      formato: 'orange',
      marca: 'Tempora autem',
    },
    {
      id: 10,
      nombre: 'Sergio',
      precio: 1.75,
      formato: 'brown',
      marca: 'Omnis veritatis',
    },
    {
      id: 11,
      nombre: 'Marta',
      precio: 4.2,
      formato: 'white',
      marca: 'Fugiat incidunt',
    },
    {
      id: 12,
      nombre: 'Luis',
      precio: 5.95,
      formato: 'gray',
      marca: 'Doloribus iste',
    },
    {
      id: 13,
      nombre: 'Raquel',
      precio: 6.35,
      formato: 'black',
      marca: 'Veniam asperiores',
    },
    {
      id: 14,
      nombre: 'Pablo',
      precio: 7.1,
      formato: 'azure',
      marca: 'Vel voluptatum',
    },
    {
      id: 15,
      nombre: 'Beatriz',
      precio: 3.25,
      formato: 'red',
      marca: 'Odio aliquam',
    },
    {
      id: 16,
      nombre: 'Iván',
      precio: 8.49,
      formato: 'green',
      marca: 'Voluptate quasi',
    },
    {
      id: 17,
      nombre: 'Patricia',
      precio: 2.5,
      formato: 'blue',
      marca: 'Similique nam',
    },
    {
      id: 18,
      nombre: 'Daniel',
      precio: 9.8,
      formato: 'yellow',
      marca: 'Perspiciatis eligendi',
    },
    {
      id: 19,
      nombre: 'Cristina',
      precio: 4.75,
      formato: 'pink',
      marca: 'Nostrum dolorem',
    },
    {
      id: 20,
      nombre: 'Víctor',
      precio: 5.25,
      formato: 'purple',
      marca: 'Minima tempora',
    },
    {
      id: 21,
      nombre: 'Alba',
      precio: 6.99,
      formato: 'orange',
      marca: 'Explicabo facilis',
    },
    {
      id: 22,
      nombre: 'Diego',
      precio: 3.85,
      formato: 'brown',
      marca: 'Corporis laudantium',
    },
    {
      id: 23,
      nombre: 'Paula',
      precio: 7.99,
      formato: 'white',
      marca: 'Modi pariatur',
    },
    {
      id: 24,
      nombre: 'David',
      precio: 2.15,
      formato: 'gray',
      marca: 'Architecto ut',
    },
    {
      id: 25,
      nombre: 'Carmen',
      precio: 8.3,
      formato: 'black',
      marca: 'Mollitia quas',
    },
    {
      id: 26,
      nombre: 'Rubén',
      precio: 1.99,
      formato: 'azure',
      marca: 'Nisi assumenda',
    },
    {
      id: 27,
      nombre: 'Rosa',
      precio: 4.6,
      formato: 'red',
      marca: 'Ipsam rerum',
    },
    {
      id: 28,
      nombre: 'Alberto',
      precio: 6.25,
      formato: 'green',
      marca: 'Magni earum',
    },
    {
      id: 29,
      nombre: 'Eva',
      precio: 5.75,
      formato: 'blue',
      marca: 'Harum sequi',
    },
    {
      id: 30,
      nombre: 'Mario',
      precio: 9.1,
      formato: 'yellow',
      marca: 'Quo delectus',
    },
    {
      id: 31,
      nombre: 'Silvia',
      precio: 3.45,
      formato: 'pink',
      marca: 'Voluptas eum',
    },
    {
      id: 32,
      nombre: 'Enrique',
      precio: 7.7,
      formato: 'purple',
      marca: 'Veritatis sint',
    },
    {
      id: 33,
      nombre: 'Lucía',
      precio: 4.1,
      formato: 'orange',
      marca: 'Ducimus culpa',
    },
    {
      id: 34,
      nombre: 'José',
      precio: 5.5,
      formato: 'brown',
      marca: 'Omnis quibusdam',
    },
    {
      id: 35,
      nombre: 'Gloria',
      precio: 6.15,
      formato: 'white',
      marca: 'Voluptatem quasi',
    },
    {
      id: 36,
      nombre: 'Óscar',
      precio: 8.75,
      formato: 'gray',
      marca: 'Suscipit alias',
    },
    {
      id: 37,
      nombre: 'Lorena',
      precio: 3.05,
      formato: 'black',
      marca: 'Adipisci saepe',
    },
    {
      id: 38,
      nombre: 'Andrés',
      precio: 7.35,
      formato: 'azure',
      marca: 'Quisquam dicta',
    },
    {
      id: 39,
      nombre: 'Clara',
      precio: 2.9,
      formato: 'red',
      marca: 'Repudiandae itaque',
    },
    {
      id: 40,
      nombre: 'Ángel',
      precio: 9.45,
      formato: 'green',
      marca: 'Deleniti animi',
    },
    {
      id: 41,
      nombre: 'Teresa',
      precio: 4.85,
      formato: 'blue',
      marca: 'Possimus hic',
    },
    {
      id: 42,
      nombre: 'Santiago',
      precio: 6.55,
      formato: 'yellow',
      marca: 'Maxime fugiat',
    },
    {
      id: 43,
      nombre: 'Rocío',
      precio: 1.5,
      formato: 'pink',
      marca: 'Voluptatum eius',
    },
    {
      id: 44,
      nombre: 'Manuel',
      precio: 8.2,
      formato: 'purple',
      marca: 'Accusamus ullam',
    },
    {
      id: 45,
      nombre: 'Natalia',
      precio: 5.05,
      formato: 'orange',
      marca: 'Ut aliquam',
    },
    {
      id: 46,
      nombre: 'Gonzalo',
      precio: 2.8,
      formato: 'brown',
      marca: 'Facilis soluta',
    },
    {
      id: 47,
      nombre: 'Isabel',
      precio: 9.9,
      formato: 'white',
      marca: 'Consectetur magni',
    },
    {
      id: 48,
      nombre: 'Fernando',
      precio: 4.45,
      formato: 'gray',
      marca: 'Fuga amet',
    },
    {
      id: 49,
      nombre: 'Sandra',
      precio: 7.65,
      formato: 'black',
      marca: 'Atque ab',
    },
    {
      id: 50,
      nombre: 'Joaquín',
      precio: 3.55,
      formato: 'azure',
      marca: 'Quia doloremque',
    },
    {
      id: 51,
      nombre: 'Pilar',
      precio: 5.95,
      formato: 'red',
      marca: 'Illo voluptate',
    },
    {
      id: 52,
      nombre: 'Ramón',
      precio: 6.85,
      formato: 'green',
      marca: 'Tempore esse',
    },
    {
      id: 53,
      nombre: 'Alicia',
      precio: 8.1,
      formato: 'blue',
      marca: 'Cupiditate nobis',
    },
    {
      id: 54,
      nombre: 'Víctor',
      precio: 4.35,
      formato: 'yellow',
      marca: 'Dolorem nostrum',
    },
  ];

  /**
   * getTornillos
   * @returns {iTornillos[]}
   * This method is used to get the tornillos.
   */
  static getTornillos(): iTornillos[] {
    return this.tornillosDB;
  }

  /**
   * setTornillos
   * @param {iTornillos[]} tornillos
   * This method is used to set the tornillos.
   */
  static setTornillos(tornillos: iTornillos[]): void {
    this.tornillosDB = tornillos;
  }
}
