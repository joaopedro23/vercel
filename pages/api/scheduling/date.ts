import { NextApiRequest, NextApiResponse } from 'next';

type DateResponse = Array<string>;

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
  const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
  return `${year}-${month}-${day}`;
}

function getDates(startDate: Date, endDate: Date): Array<string> {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Incrementa um dia
  }
  return dates;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DateResponse>
) {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Uma semana à frente

  const dates = getDates(today, nextWeek);
  
  res.status(200).json(dates);
}
