export const saveData = (data:any) => {
    localStorage.setItem('agendamentoData', JSON.stringify(data));
  };
  
  export const getData = () => {
    const data = localStorage.getItem('agendamentoData');
    return data ? JSON.parse(data) : null;
  };
  
import { setCookie, parseCookies,} from 'nookies';

export const saveDataCookies = (data: any): void => {
  
  setCookie(null, 'agendamentoData1', JSON.stringify(data), {
    maxAge: 30 * 24 * 60 * 60, // Expiração do cookie em segundos (30 dias neste exemplo)
    path: '/', // Caminho onde o cookie é válido (pode ser ajustado conforme necessário)
  });
};

export const getDataCookies = (): any | null => {
  // Recuperar os dados do cookie utilizando nookies
  const cookies = parseCookies();
  const data = cookies['agendamentoData1'];
  return data ? JSON.parse(data) : null;
};
