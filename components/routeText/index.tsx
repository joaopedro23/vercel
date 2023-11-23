 // Divide o caminho em partes
 // Captura o caminho da página atual
 
import { useRouter } from 'next/router';
import styles from './styled.module.css'
import Link from "next/link"; 

const Breadcrumb: React.FC = () => {
  const router = useRouter();

 
  const path = router.asPath;

  const pathParts = path.split('/').filter(Boolean);

  return (
    <div className='breadcrumb'>
    <span>
      <Link href="/" className={`${styles['breadcrumb-link']} ${styles['breadcrumb-home']}`}>
        Home
      </Link>
    </span>
    {pathParts.map((part, index) => (
      <span key={part} className={styles['breadcrumb-separator']} >
        {' > '}
        {index === pathParts.length - 1 ? (
          <span className={styles['breadcrumb-current']}>{part.toLowerCase()}</span>
        ) : (
          <Link href={`/${part}`}
          className={`${styles['breadcrumb-link']} ${styles['breadcrumb-about']}`}
           >
            {part.toLowerCase()}
          </Link>
        )}
      </span>
    ))}
  </div>
  );
};

export default Breadcrumb;
