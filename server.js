const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Cria uma nova instância do cliente com as flags de Puppeteer
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']  // Adiciona as flags necessárias aqui
    }
});

// Gera o QR code para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Evento disparado quando o cliente está pronto
client.on('ready', () => {
    console.log('Cliente está pronto!');
});

// Rota para enviar mensagens via WhatsApp
app.post('/send-message', async (req, res) => {
    const { phoneNumber, message } = req.body;

    // Verifica se o número de telefone e a mensagem foram fornecidos
    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Número de telefone e mensagem são obrigatórios.' });
    }

    try {
        // Envia a mensagem
        await client.sendMessage(`${phoneNumber}@c.us`, message);
        return res.status(200).json({ success: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao enviar a mensagem.', details: error.message });
    }
});

// Iniciar o cliente e o servidor
client.initialize();
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
