import './styles.css'
import homeIcon from '../../assets/images/home_icon.png';
import { Link } from 'react-router-dom';
import homeFigma from '../../assets/images/home_figma.png';
import calendarIcon from '../../assets/images/calendar_icon.png';
import handPillIcon from '../../assets/images/hand_pill_icon.png';
import nurseIcon from '../../assets/images/nurse_icon.png';
import pillIcon from '../../assets/images/pill_icon.png';

export default function Home() {
  return (
    <div className='home-container'>
      <div className='home-content'>
        <div className='home-image'>
          <img src={homeIcon} alt='home' />
        </div>
        <h1>Bem-vindo à Nossa Aplicação!</h1>
      </div>
      <nav className='home-nav'>
        <Link to='/'>
          <button><img src={calendarIcon} alt='calendar' className='home-nav-icon'/></button>
        </Link>
        <Link to='/'> 
          <button><img src={nurseIcon} alt='nurse' className='home-nav-icon'/></button>
        </Link>
        <Link to='/'>
          <button style={{width: '6rem', height: '5rem', transform: 'translateY(-1rem)'}}><img src={homeFigma} alt='home' className='home-nav-icon'/></button>
        </Link>
        <Link to='/'>
          <button><img src={pillIcon} alt='ill' className='home-nav-icon'/></button>
        </Link>
        <Link to='/'>
          <button><img src={handPillIcon} alt='profile' className='home-nav-icon'/></button>
        </Link>
      </nav>
    </div>
  );
}
