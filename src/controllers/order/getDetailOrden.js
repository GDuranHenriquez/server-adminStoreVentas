const { DetalleOrden, UbicacionOrden } = require('../../db');
const dotenv = require('dotenv');

dotenv.config();

const SERVER_URL = process.env.SERVER_URL;

const getDetailOrden = async (req, res) => {
    try {
        const { id_orden } = req.params;
        if(!id_orden){
            return res.status(400).json({ error: 'No se indicó el id de la orden' });
        };

        const orden = await DetalleOrden.findAll({ 
            where: { idOrden: id_orden }, 
            include: [ 
                { model: UbicacionOrden, as: 'detalleOrden_ubicacion' }
            ] 
        });

        const ordenConImagenes = orden.map(item => {
            const paths = item.imagen_path
                ? item.imagen_path.split(',').map(p => p.trim()).filter(p => p !== '')
                : [];

            const imagenes = paths.map(path => `${SERVER_URL}${path}`);

            return {
                ...item.toJSON(), // asegúrate de convertir Sequelize object a JSON plano
                imagenes
            };
        });
        
        return res.status(200).json(ordenConImagenes);        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDetailOrden;
