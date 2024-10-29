import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Alimento } from '../types';

interface Props {
  onAdicionar: (alimento: Alimento) => void;
}

export function AdicionarAlimento({ onAdicionar }: Props) {
  const [nome, setNome] = useState('');
  const [porcao, setPorcao] = useState('');
  const [unidade, setUnidade] = useState('g');
  const [carboidratos, setCarboidratos] = useState('');
  const [proteinas, setProteinas] = useState('');
  const [gorduras, setGorduras] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoAlimento: Alimento = {
      id: Date.now(),
      nome,
      porcao: Number(porcao),
      unidade,
      carboidratos: Number(carboidratos),
      proteinas: Number(proteinas),
      gorduras: Number(gorduras)
    };

    onAdicionar(novoAlimento);
    setNome('');
    setPorcao('');
    setUnidade('g');
    setCarboidratos('');
    setProteinas('');
    setGorduras('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Cadastrar Novo Alimento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nome do alimento"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Porção"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none w-2/3"
            value={porcao}
            onChange={(e) => setPorcao(e.target.value)}
            required
          />
          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none w-1/3"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
          </select>
        </div>
        <input
          type="number"
          step="0.1"
          placeholder="Carboidratos (g)"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
          value={carboidratos}
          onChange={(e) => setCarboidratos(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Proteínas (g)"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
          value={proteinas}
          onChange={(e) => setProteinas(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Gorduras (g)"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
          value={gorduras}
          onChange={(e) => setGorduras(e.target.value)}
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Alimento
        </button>
      </div>
    </form>
  );
}