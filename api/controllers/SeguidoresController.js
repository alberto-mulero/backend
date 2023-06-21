


module.exports = {
  seguirUsuario: async function (req, res) {
     try {
      var seguidor_id= req.body.seguidor_id;
      var seguido_id = req.body.seguido_id;
      // Verificar si el usuario ya sigue al usuario objetivo
      const existeSeguidor = await Seguidores.find({seguidor_id: seguidor_id, seguido_id: seguido_id});
      if (existeSeguidor) {
        return res.status(200).json(existeSeguidor)
      }

    } catch (error) {
      res.status(500).json({ error: 'Error al seguir al usuario' });
     }
  },

  obtenerSeguidores: async function (req, res) {
    try {
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      // Busca los seguidores del usuario especificado
      const seguidores = await Seguidores.find({ seguido_id: usuarioId })
        .populate('seguidor_id'); // Realiza el populate para obtener los datos de los seguidores
  
      res.status(200).json(seguidores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los seguidores' });
    }
  },
  
  obtenerSeguidos: async function (req, res) {
    try {
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      // Busca los usuarios seguidos por el usuario especificado
      const seguidos = await Seguidores.find({ seguidor_id: usuarioId })
        .populate('seguido_id'); // Realiza el populate para obtener los datos de los usuarios seguidos
  
      res.status(200).json(seguidos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios seguidos' });
    }
  },

  dejarSeguirUsuario: async function (req, res) {
    try {
      const seguidor_id = req.body.seguidor_id;
      const seguido_id = req.body.seguido_id;
  
      // Eliminar el seguidor
      await Seguidores.delete({ seguidor_id: seguidor_id, seguido_id: seguido_id });
  
      res.status(200).json({ message: 'Se ha dejado de seguir al usuario exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al dejar de seguir al usuario' });
    }
  },
  
  seguidorNuevo: async function (req, res) {
    try {
      const { fecha, seguidor_id, seguido_id } = req.body;

      const nuevo = await Seguidores.create( {
        fecha,
        seguidor_id,
        seguido_id
      }).fetch();
      return res.status(200).json(nuevo);
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al seguir el usuario', mensaje: error.message });
    }
  }
};
