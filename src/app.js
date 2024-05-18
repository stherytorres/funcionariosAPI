const express = require('express');
const funcionarioModel = require('./module/funcionario/funcionarioModel');
const { connectToMongo } = require("./config/mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({}));
connectToMongo();

app.get('/funcionarios', async (req, res) => { // Listar funcionarios
    const funcionarios = await funcionarioModel.find({});
    return res.status(200).json(funcionarios);
});

app.post('/funcionarios/cadastro', async (req, res) => { // Cadastrar funcionarios
    if (!req.body.cpf) {
        return res.status(400).json({ message: 'O campo cpf é obrigatório' });
    }

    //Verifica se o funcionario ja existe na base
    const funcionarioExistente = await funcionarioModel.find({ id: req.body.id });

    if (funcionarioExistente && funcionarioExistente.length) {
        return res.status(400).json({ message: 'O funcionário já existe na base' });
    }

    const funcionario = await funcionarioModel.create({
        id: req.body.id,
        nome: req.body.nome,
        idade: req.body.idade,
        cpf: req.body.cpf,
        cargo: req.body.cargo,
    });

    return res.status(201).json(funcionario);
});

app.put("/funcionarios/edicao/:id", async (req, res) => {
    try {
        const funcionarioExistente = await funcionarioModel.find({ id: req.body.id });

        if (funcionarioExistente && funcionarioExistente.length) {
        return res.status(400).json({ message: 'Esse ID ja existe na base. Por favor, introduza um ID diferente.' });
    }
        const funcionario = await funcionarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!funcionario) {
            return res.status(404).send("Funcionario não encontrado")
        }
        res.status(200).send(funcionario)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.delete("/funcionarios/:id", async (req, res) => {
    try {
        const funcionario = await funcionarioModel.findByIdAndDelete(req.params.id)
        if (!funcionario) {
            return res.status(404).send("Funcionário não encontrado")
        }
        res.status(200).send("Funcionário apagado")
    } catch (error) {
        res.status(500).send(error)
    }
});


app.listen(8080, () => {
    console.log('Servidor funcionando na porta 8080');
});