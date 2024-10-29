import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Alimento, Refeicao } from '../types';

interface Props {
  alimentoSelecionado: Alimento | null;
  onAdicionar: (refeicao: Refeicao) => void;
}

export function AdicionarRefeicao({ alimentoSelecionado, onAdicionar }: Props) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alimentoSelecionado) return;

    const novaRefeicao: Refeicao = {
      id: Date.now(),
      nome,
      alimentos: [{
        alimento: alimentoSelecionado,
        quantidade: Number(quantidade)
      }]
    };

    onAdicionar(novaRefeicao);
    setNome('');
    setQuantidade('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Refeição</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nome da refeição"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Quantidade"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 outline-none flex-1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            disabled={!alimentoSelecionado}
          />
          <span className="text-gray-600">{alimentoSelecionado?.unidade || 'g'}</span>
        </div>
        <button
          type="submit"
          disabled={!alimentoSelecionado}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
        >
          <Plus className="w-4 h-4" />
          Adicionar Refeição
        </button>
      </div>
      {alimentoSelecionado && (
        <div className="mt-4 text-sm text-gray-600">
          Alimento selecionado: {alimentoSelecionado.nome}
        </div>
      )}
    </form>
  );
}