/*
    event Routes
    /api/events
*/

//Todas tienen que pasar por la validación del jwt
const {validarJWT} = require("../../middlewares/validar-jwt")
const {check} = require("express-validator")
const {validarCampos} = require("../../middlewares/validar-campos")
const {isDate} = require("../../helpers/isDate")
const {Router} = require("express")

const router = Router()

const {
  getEventos,
  crearEvento,
  actualizarEventos,
  eliminarEventos,
} = require("../../controllers/events")

//Obtener eventos
router.get("/", validarJWT, getEventos)

//Crear un evento nuevo
router.post(
  "/",
  validarJWT,
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fechas de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
  ],
  validarCampos,
  crearEvento
)

//Actualizar Evento
router.put("/:id", validarJWT, actualizarEventos)

//Borrar Evento
router.delete("/:id", validarJWT, eliminarEventos)

module.exports = router
