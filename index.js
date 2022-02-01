require('dotenv').config();
const inquirer = require('inquirer');
const { inquirerMenu,
        leerInput,
        pausa,
        listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('colors');

const main = async() => {
    let opt = '';

    const busquedas = new Busquedas;

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const termino = await leerInput('Buscar ciudad: ');
                const lugares = await busquedas.ciudades( termino );
                
                
                const id = await listarLugares( lugares );
                const lugarSel = lugares.find( l => l.id === id );
                busquedas.agregarHistorial( lugarSel.nombre );
                const temp = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Clima:', temp.clima);
                console.log('Temperatura:', temp.temp);
                console.log('Mínima:', temp.min);
                console.log('Máxima:', temp.max);
            break;

            case 2:
                 busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ lugar } ` );
                 })

            break;       
        }


        await pausa();

    } while( opt !== 0 );
}

 main();
