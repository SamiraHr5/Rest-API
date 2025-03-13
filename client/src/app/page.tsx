"use client";
import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!num1 || !num2) {
      setError("Ingrese ambos numeros");
      setResult(null);
      return;
    }
  
    try {
      const encodedOperator = encodeURIComponent(operator); 
      const response = await fetch(
        `http://localhost:3001/operacion?num1=${num1}&num2=${num2}&operator=${encodedOperator}`
      );
      const data = await response.json();
  
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.result);
        setError(null);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      setResult(null);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center space-y-5 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-700">Calculadora</h1>

        <div className="flex space-x-4 items-center">
          {/* numero 1 */}
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-32 h-12 px-4 py-2 border text-lg rounded-lg text-center"
            placeholder="Numero 1"
          />

          {/* dropdown */}
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-20 h-12 px-4 py-2 border text-lg rounded-lg bg-white cursor-pointer"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">/</option>
            <option value="x">x</option>
          </select>

          {/* numero 2 */}
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-32 h-12 px-4 py-2 border text-lg rounded-lg text-center"
            placeholder="Numero 2"
          />
        </div>

        {/* boton calcular*/}
        <button
          onClick={handleCalculate}
          className="w-full py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          CALCULAR
        </button>

        
        {error && <p className="text-red-500 text-lg">{error}</p>}
        {result !== null && (
          <p className="text-green-600 text-xl font-bold">Resultado: {result}</p>
        )}
      </div>
    </div>
  );
}
