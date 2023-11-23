import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = localStorage.getItem('AgendamentoForm');
    res.status(200).json(data ? JSON.parse(data) : null);
  } else {
    res.status(405).end(); // Método não permitido
  }
}