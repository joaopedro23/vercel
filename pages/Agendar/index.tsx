import Head from "next/head";
import NavBar from "../../components/navBar";
import Breadcrumb from "../../components/routeText";
import { NextPage } from "next";
import styles from './Agendar.module.css'
import AgendamentoForm from "../../components/form";


const Agendar: NextPage = () => { 
  return(
    <>
    <div className={styles['agendar-01']}>
      <NavBar/>
      <Breadcrumb/>
        <Head>
          <title>
          Agendar Consulta - Nome do projeto
          </title>
        </Head>
                <h2 className={styles["Agendar-quem-somos"]}>Quem Somos</h2>
                <div className={styles["text-contanie"]}>A maior rede de tratamento</div>
    </div>
          <h1 className={styles["agendamento-text"]}>Preencha o formulario abaixo para agendar sua consulta</h1>
                          <AgendamentoForm></AgendamentoForm>

    
    </>
  )
}
export default Agendar; 
