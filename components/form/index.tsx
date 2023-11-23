import { useEffect, useState } from 'react';
import './styled.module.css'
import axios from 'axios';
import styles from  './styled.module.css'
import { saveData, saveDataCookies } from '../validations/savedata'
import { isNameAlreadyScheduled, submitAppointment } from '../validations/appointmentValidation'
import { useRouter } from 'next/router';


const AgendamentoForm = () => {

    const [pokemonCount, setPokemonCount] = useState(1);
    const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
    const [agendamento, setAgendamento] = useState<any>({});

    const [dataAtendimento, setDataAtendimento] = useState('');
    const [horaAtendimento, setHoraAtendimento] = useState('');
    const [datasDisponiveis, setDatasDisponiveis] = useState([]);
    const [horasDisponiveis, setHorasDisponiveis] = useState([]);
    

    const router = useRouter();

    const handleAddPokemon = () => {
    setPokemonCount(pokemonCount + 1);
};
    const handleRemovePokemon = (index: number) => {
    const updatedPokemons = [...selectedPokemons];
    updatedPokemons.splice(index, 1);
    setSelectedPokemons(updatedPokemons);
    setPokemonCount(pokemonCount - 1);
};
    const handlePokemonSelection = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedPokemons = [...selectedPokemons];
    updatedPokemons[index] = event.target.value;
    setSelectedPokemons(updatedPokemons);
};
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para lidar com o envio do formulário
    // enviar os dados para um servidor, por exemplo
    

    const form = event.currentTarget;
    const nome = form.nome.value;
    const sobrenome = form.sobrenome.value;
    const regiao = form.regiao.value;
    const cidade = form.cidade.value;
    const dataAtendimento = form.dataAtendimento.value;
    const horaAtendimento = form.horaAtendimento.value;
    const pokemons = selectedPokemons;
    
    
    if (isNameAlreadyScheduled(nome)) {
        alert('Este nome já possui um agendamento.');
        return;
      }
      const appointmentDetails = {
        nome,
        sobrenome,
        regiao,
        cidade,
        pokemons,
        dataAtendimento,
        horaAtendimento,

      };
      
      // Redirecionar para a página de sucesso ou fazer algo após o agendamento
    const isAppointmentSubmitted = submitAppointment(nome, appointmentDetails);
    if (isAppointmentSubmitted) {
        await router.push('/ConsultaAgendada');
        console.log(isAppointmentSubmitted)
    }
// validação de dados//
    saveData({
    nome: nome,
    sobrenome: sobrenome,       
    regiao: regiao,
    cidade: cidade,
    pokemons: selectedPokemons,
    dataAtendimento: dataAtendimento, 
    horaAtendimento: horaAtendimento
    });

    saveDataCookies({
        nome: nome,
        sobrenome: sobrenome,       
        regiao: regiao,
        cidade: cidade,
        pokemons: selectedPokemons,
        dataAtendimento: dataAtendimento, 
        horaAtendimento: horaAtendimento
        });

};

    useEffect(() => {
        // Função para obter as datas disponíveis
        const fetchDates = async () => {
        try {
        const response = await axios.get('/api/scheduling/date');
            setDatasDisponiveis(response.data);
        } catch (error) {
            // Tratar erros
            console.error('Erro ao buscar datas:', error);
        }
        };
    
        // Função para obter as horas disponíveis
        const fetchTimes = async () => {
        try {
            const response = await axios.post('/api/scheduling/time', { date: dataAtendimento });
            setHorasDisponiveis(response.data);
        } catch (error) {
            // Tratar erros
            console.error('Erro ao buscar horas:', error);
        }
        };
    
        // Chamada para buscar as datas disponíveis ao carregar o componente
        fetchDates();
        fetchTimes();

    }, [dataAtendimento]);

    

return (
    <form onSubmit={handleSubmit}>

    <div>
        <div className='label-group'>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required />
        </div>
    </div>

    <div>
        <div className='label-group'>
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" name="sobrenome" required />
        </div> 
    </div>

    <div>
        <label htmlFor="regiao">Região:</label>
        <input type="text" id="regiao" name="regiao" required />
    </div>

    <div>
        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" required />
    </div>

    {[...Array(pokemonCount)].map((_, index) => (
        <div key={index}>
        <label htmlFor={`pokemon${index + 1}`} className='pokemon'>Pokémon {index + 1}:</label>
        <select id={`pokemon${index + 1}`} name={`pokemon${index + 1}`} onChange={(e) => handlePokemonSelection(e, index)}>
            <option value="pikachu">Pikachu</option>
            <option value="bulbasaur">Bulbasaur</option>
            {/* Adicione mais opções conforme necessário */}
        </select>
            {index > 0 && ( // Para evitar a remoção do primeiro Pokémon //
                <button type="button" onClick={() => handleRemovePokemon(index)}>
                    Remover Pokémon
                </button>
                )}
        </div>
    ))}

    <button type="button" onClick={handleAddPokemon}>
        Adicionar Pokémon
    </button>
<div className={styles['text-time']}>Cadastre seu time</div>

  {/* trata aqui */}
    <div>
    <label htmlFor="dataAtendimento">Data de Atendimento:</label>
    <select id="dataAtendimento" name="dataAtendimento" value={dataAtendimento} onChange={(e) => setDataAtendimento(e.target.value)}>
        <option value="">Selecione a data</option>
        {datasDisponiveis.map((data, index) => (
            <option key={index} value={data}>
                {data} {/* Aqui você pode formatar a exibição da data conforme necessário */}
            </option>
        ))}
    </select>
    </div>

    <div>
        <label htmlFor="horaAtendimento">Hora de Atendimento:</label>
            <select id="horaAtendimento" name="horaAtendimento" value={horaAtendimento} onChange={(e) => setHoraAtendimento(e.target.value)}>
        <option value="">Selecione a hora</option>
        {horasDisponiveis.map((hora, index) => (
            <option key={index} value={hora}>
        {hora}
            </option>
        ))}
        </select>
    </div>
    {/* trata aqui */}
    <div>
        <p>Número de Pokémon selecionados: {selectedPokemons.length}</p>
        {/* Lógica para calcular o valor total dos Pokémon selecionados */}
        {/* Exemplo de exibição do valor total */}
        <p>Valor Total: R$ {selectedPokemons.length * 10}</p>
    </div>

    <button type="submit">Concluir Agendamento</button>

    </form>
);
};

export default AgendamentoForm;