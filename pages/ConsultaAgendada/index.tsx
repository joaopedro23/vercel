import { useEffect, useState } from 'react';
import { getDataCookies } from '../../components/validations/savedata'; // Substitua pelo caminho correto do seu arquivo
import styles from './styles.module.css'
import NavBar from '../../components/navBar';
import Breadcrumb from '../../components/routeText';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface AgendamentoData {
  nome: string;
  sobrenome: string;
  dataAtendimento: string;
  horaAtendimento: string;
  pokemons: string[];
}

function ConsultaAgendada() {
  const [agendamentoData, setAgendamentoData] = useState<AgendamentoData | null>(null);
  const [parsedPokemons, setParsedPokemons] = useState<string>('');
  const router = useRouter(); 
  useEffect(() => {
    function handleCookieChange() {

    const storedData = getDataCookies();
    if (storedData) {
      const parsedData: AgendamentoData = storedData;
      setAgendamentoData(parsedData);

      if (parsedData.pokemons) {
        const filteredPokemons = parsedData.pokemons.filter(
          (pokemon: string | null): pokemon is string => typeof pokemon === 'string'
        );
        const pokemonsArray = filteredPokemons.join(', ');
        setParsedPokemons(pokemonsArray);
      }
    }
  }
  handleCookieChange();

  const interval = setInterval(() => {
    handleCookieChange();
  }, 1000);

  return () => clearInterval(interval);

  }, []);

  if (!agendamentoData) {
    return <p>Carregando...</p>;
  }

  const cancelaConsulta = () => {
    router.push('/ConsultaCancelada'); 
  };

  return (
    <>
      <div className={styles['texto-Agendado']}>
      <NavBar/>
      <Breadcrumb/>
      <h2 className={styles['texto-01']}>Consulta Agendada com Sucesso!</h2>
      <div className={styles['text-02']}>Dados do Agendamento:</div>
      </div>

      <div className={styles['super-contanier']}>

      

      <div className={styles.container}>
      <div className={styles.icon}>
                        <Image src="check.svg" alt="Verificado"/>
                    </div>
            <div className={styles['styles.info']}>
              <p>Nome: {agendamentoData.nome}</p>
              <p>Sobrenome: {agendamentoData.sobrenome}</p>
              <p>
                Data de Agendamento: {agendamentoData.dataAtendimento}, Hora: {agendamentoData.horaAtendimento}
              </p>
              <p>Pokemons: {parsedPokemons}</p>
            </div>
            <button type="submit" className={styles['button-type']} onClick={cancelaConsulta}>Cancela Consulta</button>
        </div>
      </div>
    </>
  );
}

export default ConsultaAgendada;
