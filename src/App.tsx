import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { AdicionarAlimento } from './components/AdicionarAlimento';
import { ListaAlimentos } from './components/ListaAlimentos';
import { AdicionarRefeicao } from './components/AdicionarRefeicao';
import { Alimento, Refeicao } from './types';
import { alimentosBase } from './data/alimentos';

function App() {
  const [alimentos, setAlimentos] = useState<Alimento[]>(alimentosBase);
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<Alimento | null>(null);

  const adicionarAlimento = (novoAlimento: Alimento) => {
    setAlimentos([...alimentos, novoAlimento]);
  };

  const removerAlimento = (id: number) => {
    setAlimentos(alimentos.filter(alimento => alimento.id !== id));
  };

  const adicionarRefeicao = (novaRefeicao: Refeicao) => {
    setRefeicoes([...refeicoes, novaRefeicao]);
    setAlimentoSelecionado(null);
  };

  const removerRefeicao = (id: number) => {
    setRefeicoes(refeicoes.filter(refeicao => refeicao.id !== id));
  };

  const totais = refeicoes.reduce(
    (acc, refeicao) => {
      const refTotais = refeicao.alimentos.reduce(
        (refAcc, { alimento, quantidade }) => ({
          carboidratos: refAcc.carboidratos + (alimento.carboidratos * quantidade / alimento.porcao),
          proteinas: refAcc.proteinas + (alimento.proteinas * quantidade / alimento.porcao),
          gorduras: refAcc.gorduras + (alimento.gorduras * quantidade / alimento.porcao),
        }),
        { carboidratos: 0, proteinas: 0, gorduras: 0 }
      );

      return {
        carboidratos: acc.carboidratos + refTotais.carboidratos,
        proteinas: acc.proteinas + refTotais.proteinas,
        gorduras: acc.gorduras + refTotais.gorduras,
        calorias: acc.calorias + (refTotais.carboidratos * 4 + refTotais.proteinas * 4 + refTotais.gorduras * 9),
      };
    },
    { carboidratos: 0, proteinas: 0, gorduras: 0, calorias: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">NutriCalc</h1>
          </div>
          <p className="text-gray-600">Acompanhe sua dieta e macronutrientes diários</p>
        </header>

        <AdicionarAlimento onAdicionar={adicionarAlimento} />
        <ListaAlimentos 
          alimentos={alimentos} 
          onRemover={removerAlimento}
          onSelecionar={setAlimentoSelecionado}
        />
        <AdicionarRefeicao 
          alimentoSelecionado={alimentoSelecionado}
          onAdicionar={adicionarRefeicao}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Totais Diários</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calorias:</span>
                <span className="font-semibold">{totais.calorias.toFixed(0)} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carboidratos:</span>
                <span className="font-semibold">{totais.carboidratos.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Proteínas:</span>
                <span className="font-semibold">{totais.proteinas.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gorduras:</span>
                <span className="font-semibold">{totais.gorduras.toFixed(1)}g</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribuição de Macros</h2>
            <div className="space-y-4">
              <div className="relative pt-1">
                <div className="text-xs text-gray-600 mb-1">
                  Carboidratos ({((totais.carboidratos * 4 / totais.calorias) * 100 || 0).toFixed(1)}%)
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${(totais.carboidratos * 4 / totais.calorias) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="text-xs text-gray-600 mb-1">
                  Proteínas ({((totais.proteinas * 4 / totais.calorias) * 100 || 0).toFixed(1)}%)
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-red-500 rounded-full"
                    style={{ width: `${(totais.proteinas * 4 / totais.calorias) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="text-xs text-gray-600 mb-1">
                  Gorduras ({((totais.gorduras * 9 / totais.calorias) * 100 || 0).toFixed(1)}%)
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-500 rounded-full"
                    style={{ width: `${(totais.gorduras * 9 / totais.calorias) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Refeições do Dia</h2>
          <div className="space-y-4">
            {refeicoes.map((refeicao) => (
              <div key={refeicao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{refeicao.nome}</h3>
                  {refeicao.alimentos.map(({ alimento, quantidade }, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {alimento.nome} - {quantidade}{alimento.unidade}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => removerRefeicao(refeicao.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                </button>
              </div>
            ))}
            {refeicoes.length === 0 && (
              <p className="text-center text-gray-500 py-4">Nenhuma refeição registrada ainda</p>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>NutriCalc © {new Date().getFullYear()} - Todos os direitos reservados</p>
          <p>marcelonascimento77@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

export default App;