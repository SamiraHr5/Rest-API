const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.get("/", (req, res) => {
    res.send("API FUNCIONANDO");
});

app.get("/operacion", (req, res) => {
    let { num1, num2, operator } = req.query;

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Numeros invalidos" });
    }

    if (operator === " " || operator === "%20") {
        operator = "+";
    }

    let result;
    switch (operator) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "/": 
            if (num2 === 0) return res.status(400).json({ error: "No se puede dividir por cero" });
            result = num1 / num2; 
            break;
        case "x": result = num1 * num2; break;
        default: return res.status(400).json({ error: "Operador invalido" });
    }

    res.json({ num1, num2, operator, result });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
