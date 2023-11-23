import { NextPage } from "next";
import Head from "next/head";
import NavBar from "../../components/navBar";
import './About.css'
import Breadcrumb from "../../components/routeText";
import  { Alta, Pokemon, centroPokemon, curaPokemon, tradicao,}  from '../../components/text/textAbout'
import {loremIpsum, loremIpsum2, loremIpsum3, loremIpsum4} from '../../components/text/textAbout'



const About: NextPage = () => (
  <>
    <div className="quem-somos">

      <NavBar />
      <Head>
        <title> Quem Somos - Nome do projeto</title>
      </Head>
      <Breadcrumb />
      <h2 className="texto-quem-somos">Quem Somos</h2>
      <div className="text-contanie">A maior rede de tratamento</div>

    </div>
    <div className="text-container">
    <h3 className="centroPokemon">{centroPokemon}</h3>
    <h5 className="curaPokemon">{curaPokemon}</h5>
      {loremIpsum}
      <h4 className="tradicao">{tradicao}</h4>
      {loremIpsum2}
      <h4 className="Pokemon">{Pokemon}</h4>
      {loremIpsum3}
      <h4 className="Alta">{Alta}</h4>
      {loremIpsum4}
    </div>
    
  </>
)

export default About
