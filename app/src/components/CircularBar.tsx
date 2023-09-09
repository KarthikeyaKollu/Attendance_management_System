import { CircularProgressbar ,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props{
    percentage:number;
    width:number |string;
    height:number | string;
}

const CircularBar = ({percentage,width ,height}:Props) => {
  const hue = (percentage / 100) * 120;
    
  return (
    <>
    
    <div style={{ width, height }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`}  styles={{
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      // Path color
      stroke: `hsl(${hue}, 100%, 50%)`,
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'butt',
      // Customize transition animation
      transition: 'stroke-dashoffset 0.5s ease 0s',
      // Rotate the path
      transform: 'rotate(0.25turn)',
      transformOrigin: 'center center',
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: '#d6d6d6',
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'butt',
      // Rotate the trail
      transform: 'rotate(0.25turn)',
      transformOrigin: 'center center',
    },
    // Customize the text
    text: {
      // Text color
      fill: `hsl(${hue}, 100%, 50%)`,
      // Text size
      fontSize: '32px',
      fontWeight:'bold'
    },
    // Customize background - only used when the `background` prop is true
    background: {
      fill: '#0b5ed7',
    },
  }} />
    </div>
    
    
    
    </>
  )
}

export default CircularBar