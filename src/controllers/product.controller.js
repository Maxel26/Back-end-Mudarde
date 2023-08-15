const { response, request } = require( 'express' );
const { hashSync, genSaltSync, compareSync } = require( 'bcryptjs' );

const { generateToken } = require( '../helpers/jwt.js' );
const { insertProduct, getAllProducts, getProductByID, updateProductByID, removeProductByID, getProductByUserID, getProductsByFamily, insert2Product } = require( '../services/product.service' );

const User = require( '../models/User' );


const getProducts = async ( req = request, res = response ) => {

    try {
        const data = await getAllProducts()   // Pendiente

        res.status( 201 ).json({
            ok: true,
            path: '/products',
            msg: 'Obtiene todos los productos',
            products: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al obtener los productos'
        });    
    }

}

const getProductsByFamil = async (req = request, res = response) => {
    const familyProd = req.params.family;
    try {
        const data = await getProductsByFamily(familyProd)
        console.log(data);
        res.status(201).json({
            ok: true,
            path: '/products',
            msg: 'Obtiene productos por familia',
            products: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            path: '/products',
            msg: 'Error al obtener los productos por familia'
        })
    }
}

const getProductById = async ( req = request, res = response ) => {
    const productId = req.params.id;

    try {
        const data = await getProductByID( productId );

        res.status( 201 ).json({
            ok: true,
            path: `/products/${ productId }`,
            msg: 'Obtiene producto por ID',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al obtener producto por ID'
        });    
    }

}

const getProductsByUserId = async ( req = request, res = request ) => {
    const userId = req.params.id;

    try {
        const data = await getProductByUserID( userId );

        console.log( data );

        res.status( 201 ).json({
            ok: true,
            path: `/products/user/${ userId }`,
            msg: 'Obtiene el listado de productos por usuario',
            products: data
        }); 
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/user/${ userId }`,
            msg: 'Error al obtener el listado de productos por usuario'
        });    
    }
}

const createProduct = async ( req = request, res = response ) => {
    const inputData = req.body;
    const userId = req.authUser.uid;

    try {
        inputData.userId = userId;

        const data = await insertProduct( inputData );

        res.status( 201 ).json({
            ok: true,
            path: '/products',
            msg: 'Crea producto',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al crear producto'
        });    
    }

}

const create2Product = async ( req = request, res = response ) => {
    const URL =`${ req.protocol }://${ req.get( 'host' )}`;
    const userId = req.authUser.uid;

    const inputData = req.body;

    console.log(req.body);

    const newProduct = {
        name: inputData.name,
        description: inputData.description,
        family: inputData.family,
        userId,
        urlImage: `${ URL }/uploads/${ req.file.filename }`
    };


    try {
        const data = await insert2Product( newProduct );
    
        // Devuelve una respuesta adecuada al cliente
        res.status( 200 ).json({
            ok: true,
            path: '/products',
            msg: 'Producto creado exitosamente',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al crear producto'
        });   
    }


}

const updateProduct = async ( req = request, res = response ) => {
    const 
        productId = req.params.id,
        inputData = req.body;

        console.group( '----' );
        console.log( productId );
        console.log( inputData );
        console.groupEnd( '----' );


    try {
        const data = await updateProductByID( productId, inputData );

        res.status( 201 ).json({
            ok: true,
            path: `/products/${ productId }`,
            msg: 'Actualiza producto',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al actualizar producto'
        });    
    }

}

const deleteProduct = async ( req = request, res = response ) => {
    const productId = req.params.id;

    try {
        const data = await removeProductByID( productId );

        res.status( 201 ).json({
            ok: true,
            path: `/products/${ productId }`,
            msg: 'Eliminar producto',
            product: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/products/${ productId }`,
            msg: 'Error al eliminar producto'
        });    
    }

}


module.exports = {
    getProducts,
    getProductsByFamil,
    createProduct,
    create2Product,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUserId
}