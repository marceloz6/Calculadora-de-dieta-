export interface Alimento {
  id: number;
  nome: string;
  porcao: number;
  unidade: string;
  carboidratos: number;
  proteinas: number;
  gorduras: number;
}

export interface Refeicao {
  id: number;
  nome: string;
  alimentos: {
    alimento: Alimento;
    quantidade: number;
  }[];
}