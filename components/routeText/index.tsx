 // Divide o caminho em partes
 // Captura o caminho da página atual
 
import { useRouter } from 'next/router';
import styles from './styled.module.css'

const Breadcrumb: React.FC = () => {
  const router = useRouter();

 
  const path = router.asPath;

  const pathParts = path.split('/').filter(Boolean);

  return (
    <div className='breadcrumb'>
    <span>
      <a href="/" className={`${styles['breadcrumb-link']} ${styles['breadcrumb-home']}`}>
        Home
      </a>
    </span>
    {pathParts.map((part, index) => (
      <span key={part} className={styles['breadcrumb-separator']} >
        {' > '}
        {index === pathParts.length - 1 ? (
          <span className={styles['breadcrumb-current']}>{part.toLowerCase()}</span>
        ) : (
          <a href={`/${part}`}
          className={`${styles['breadcrumb-link']} ${styles['breadcrumb-about']}`}
           >
            {part.toLowerCase()}
          </a>
        )}
      </span>
    ))}
  </div>
  );
};

export default Breadcrumb;
