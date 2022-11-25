
import Beata from '../assets/Beata.png';
import Maria from '../assets/Maria.png';
import George_Warshington from '../assets/George Washington.png';
import './BotAvatar.scss';

const BotAvatar =({name})=>{

    const images = () => {
        switch (name) {
          case 'Beata':
            return Beata;
          case 'Maria':
            return Maria;
          case 'George Washington':
            return George_Warshington;
          default:
            return null;
        }
      };
    
    return (
        <img className="botAvatar" src={images()} alt="botAvatar"/>
    )
      
   
};

export default BotAvatar;
