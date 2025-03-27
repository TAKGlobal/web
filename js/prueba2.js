const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/verify-captcha', async (req, res) => {
    const { captcha } = req.body;
    const secretKey = '6Leq38UqAAAAAJKeikjIgJ75_Mvekba2D93SYu8S'; // Reemplaza con tu Secret Key de reCAPTCHA

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`
        );
        res.json({ success: response.data.success });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});