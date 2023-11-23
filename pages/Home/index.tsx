import NavBar from "../../components/navBar";
import './Home.css'

export default function HomePage() {
  return (
    <div className='background-image'>

      <NavBar />

      <div className='text-over-image'>
        
        <h1 className='home-text'>
          Cuidamos bem do seu pokémon,
            para ele cuidar bem de você
        </h1>
        
      </div>
    </div>
  );
}
