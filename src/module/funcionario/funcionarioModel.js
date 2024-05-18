const mongoose = require('mongoose');

const funcionarioSchema = mongoose.Schema(
    {
        id: { type: String, required: true },
        nome: String,
        idade: Number,
        cpf: Number,
        cargo: String,
    },
    {
        timestamps: true,
    }
);

const funcionarioModel = mongoose.model('funcionarios', funcionarioSchema);

module.exports = funcionarioModel;