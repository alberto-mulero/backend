/**
 * NotificacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
      const { tipo, fecha_notificacion, id_usuario } = req.body;
        try {
          const nuevaNotificacion = await Notificacion.create(
            {
              tipo,
              fecha_notificacion,
              id_usuario
            }
          ).fetch();
          res.status(201).json(nuevaNotificacion);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear la notificacion' });
        }
      },
    
      listar: async function (req, res) {
        //const idUsuario = req.param('idUsuario');
        //console.log(idUsuario);
        try {
          const notificaciones = await Notificacion.find();
          res.json(notificaciones);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de notificaciones' });
        }
      },

      listarUno: async function(req, res) {
        console.log(req.param("id"));
        try {
          const notificaciones = await Notificacion.find({ id_ajeno: req.param("id") }).populate("id_usuario");
          if (notificaciones.length === 0) {
            return res.notFound('Notificaciones no encontradas');
          }
          return res.json(notificaciones);
        } catch (error) {
          return res.serverError(error);
        }
      },

      eliminar: async function (req, res) {
        try {
          const notificacionEliminado = await Notification.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Notificacion no encontrado' });
            });
    
          res.json(notificacionEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar la notificacion' });
        }
      }

};

