import { useEffect, useState } from 'react';
import { getDataCookies } from '../../components/validations/savedata'; // Substitua pelo caminho correto do seu arquivo
import styles from './styles.module.css'
import NavBar from '../../components/navBar';
import Breadcrumb from '../../components/routeText';
import Image from 'next/image';

interface AgendamentoData {
  nome: string;
  sobrenome: string;
  dataAtendimento: string;
  horaAtendimento: string;
  pokemons: string[];
}

function ConsultaCancelada() {
  const [agendamentoData, setAgendamentoData] = useState<AgendamentoData | null>(null);
  const [parsedPokemons, setParsedPokemons] = useState<string>('');

  useEffect(() => {
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
  }, []);

  if (!agendamentoData) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className={styles['texto-Agendado']}>
      <NavBar/>
      <Breadcrumb/>
      <h2 className={styles['texto-01']}>Consulta Cancelada com Sucesso!</h2>
      
      </div>

      <div className={styles['super-contanier']}>

      

      <div className={styles.container}>
      <div className={styles.icon}>
                        <Image src="check.svg" alt="Verificado"/>
                    </div>
            <div className={styles['styles.info']}>
              <p>Consulta Cancelada</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default ConsultaCancelada;
