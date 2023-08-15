const { request } = require( 'express' );
const multer = require( 'multer' );
const path = require('path')


// Ruta de almacenamiento para los archivos subidos
const PATH_STORAGE = `./public/uploads/`;

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
    destination( req = request, file, cb ) {
        // La función `destination` define la carpeta de destino para almacenar los archivos
        // En este caso, se utiliza `PATH_STORAGE` como carpeta de destino

        cb( null, PATH_STORAGE );
    },
    filename( req = request, file, cb ) {
        // La función `filename` define el nombre del archivo en el servidor
        // En este caso, se genera un nombre aleatorio utilizando la fecha actual y la extensión del archivo original
        const ext = path.extname(file.originalname)
        let fileName = path.basename( file.originalname, ext );
        console.log( fileName )
        fileName = fileName.toLocaleLowerCase().split(' ').join( '-' );
        
        const fileNameRandom = `${fileName}-${ Date.now() }${ext}`;

        cb( null, fileNameRandom );
    }
});


// Middleware de Multer para gestionar la subida de archivos sobre las rutas de Express
const multerMiddleware = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    } // ,
    // fileFilter: ( req, file, done ) => {
    //     if( file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif' ) {
    //         done( null, true );
    //     }
    //     else {
    //         done( null, false );
    //     }

    //     return done( new Error( 'Only .png, .jpg, .jpeg and .gif' ) );
    // } 
});


// Exporta directamente el middleware de Multer, sin el objeto que lo contiene
module.exports = { multerMiddleware, PATH_STORAGE };