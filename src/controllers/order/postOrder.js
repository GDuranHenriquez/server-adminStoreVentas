const dotenv = require('dotenv');
dotenv.config();
const { Cliente, DetalleOrden, UbicacionOrden, Orden, Usuario, StatusPagos, StatusOrden } = require('../../db');
const saveBase64Image = require('../../utils/saveImageLocal');

const getNameImage = (numberOrder, idDetalleOrden, index) => {
  const strIdDetalleOrden = idDetalleOrden.toString().length < 2 ? idDetalleOrden.toString().padStart(2, '0'): idDetalleOrden.toString();
  const name = `${numberOrder.replace('-', '_')}_${strIdDetalleOrden}_${index}`;
  return name;
}

async function postOrder(req, res){
  try {
    const {id_cliente, id_vendedor, detalle_orden} = req.body;
    
    const cliente = await Cliente.findByPk(id_cliente);
    if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

    const vendedor = await Usuario.findByPk(id_vendedor);
    if(!vendedor) return res.status(404).json({error: 'Vendedor no encontrado'});

    if(detalle_orden.length === 0) return res.status(404).json({error: 'No hay detalles en la orden'});

    let totalOrden = 0;
    for(const detalle of detalle_orden){
        totalOrden += parseFloat(detalle.amount) * parseFloat(detalle.numero_items);        
    }

    const statusPago = await StatusPagos.findOne({where: {name_reference: 'pendiente'}});
    const statusOrden = await StatusOrden.findOne({where: {name_reference: 'tomada'}});

    const maxNumberOrder = await Orden.count();
    const numberOrder = 'ORD-' + (maxNumberOrder < 999 ? (maxNumberOrder + 1).toString().padStart(4, '0'): (maxNumberOrder + 1).toString());

    const OrdenCreate = {
      id_cliente: id_cliente,
      id_vendedor: id_vendedor,
      ordenCliente: id_cliente,
      ordenUsuario: id_vendedor,
      numero_orden: numberOrder,
      total_orden: totalOrden,
      total_abonado: 0,
      total_pendiente: totalOrden,
      status_pago: statusPago.id,
      status_orden: statusOrden.id,
      ordenStatusPago: statusPago.id,
      ordenStatusOrden: statusOrden.id,
      created_at: new Date().toISOString()
    }
    const newOrder = await Orden.create(OrdenCreate);
    
    for(const detalle of detalle_orden){
      const ubicacion = await UbicacionOrden.findByPk(parseInt(detalle.ubicacion));
      if(!ubicacion) return res.status(404).json({error: 'Ubicación no encontrada'});

      const newDetalleOrden = {
          id_orden: newOrder.id,
          idOrden: newOrder.id,
          nombre: detalle.nombre_producto,
          descripcion: detalle.descripcion || null,
          link_item: detalle.link_item || null,
          imagen_path: null,
          numero_items: detalle.numero_items,
          monto_unitario_ucd: detalle.amount,
          totalUCD: parseFloat(detalle.amount) * parseFloat(detalle.numero_items),
          iva: 0,
          ubicacion: ubicacion.id,
          created_at: new Date().toISOString()
      }
      const newDetalle = await DetalleOrden.create(newDetalleOrden);
      let imagePaths = [];
      if('imagenes' in detalle && Array.isArray(detalle.imagenes)){
        for(let i = 0; i < detalle.imagenes.length; i++){
          const imagen = detalle.imagenes[i];
          const nameImage = getNameImage(numberOrder, newDetalle.id, i);
          const imagePath = await saveBase64Image(imagen.thumbUrl, nameImage);
          imagePaths.push(imagePath);
        }
      }
      newDetalle.imagen_path = imagePaths.join(',');
      await newDetalle.save();
    }

    return res.status(200).json({message: 'Orden creada correctamente'});
  } catch (error) {
    console.log(error);
    return res.status(404).json({error: 'Algo salio mal'});
  }
}

module.exports = postOrder;