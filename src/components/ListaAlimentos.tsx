import React from 'react';
import { Trash2 } from 'lucide-react';
import { Alimento } from '../types';

interface Props {
  alimentos: Alimento[];
  onRemover: (id: number) => void;
  onSelecionar: (alimento: Alimento) => void;
}

export function ListaAlimentos({ alimentos, onRemover, onSelecionar }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Alimentos Cadastrados</h2>
      <div className="space-y-4">
        {alimentos.map((alimento) => (
          <div key={alimento.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
               onClick={() => onSelecionar(alimento)}>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{alimento.nome}</h3>
              <div className="text-sm text-gray-600">
                Porção: {alimento.porcao}{alimento.unidade} | 
                Carbs: {alimento.carboidratos}g | 
                Prot: {alimento.proteinas}g | 
                Gord: {alimento.gorduras}g
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemover(alimento.id);
              }}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {alimentos.length === 0 && (
          <p className="text-center text-gray-500 py-4">Nenhum alimento cadastrado</p>
        )}
      </div>
    </div>
  );
}