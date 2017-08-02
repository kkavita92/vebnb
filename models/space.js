var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  name: {
        type: String,
        required: true
      },
  description: {
        type: String,
        required: true
      },
  price: {
        type: Number,
        required: true
      },
  address: {
        type: String,
        required: true
      },
  booked:  {
        type: Boolean,
        default: false
      },
	requested: {
				type: Boolean,
				default: false
	},
	image: {
				type: String,
		default: 'http://statics.viralizalo.com/virs/2016/03/VIR_169186_14014_puedes_adivinar_a_que_dibujo_animado_pertenecen_las_siguientes_casas_segunda_parte.jpg?cb=74163'
	}
})

var Space = mongoose.model('Space', spaceSchema);

module.exports = {
  Space: Space
}
