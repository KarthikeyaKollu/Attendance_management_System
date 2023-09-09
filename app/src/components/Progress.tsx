import React from 'react';

interface Props {
  value: number;
  width:number;
}

const Progress: React.FC<Props> = ({ value ,width}) => {
    const colorClass=value <= 30 ? 'bg-danger' : value <= 75 ? 'bg-warning' : 'bg-success';
  return (
     <div  style={{width:width ,position:"relative"}}>
    <div className="progress my-2 ">
      <div
        className={`progress-bar ${colorClass}`}
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >{value}%</div>
    </div>
    </div>
  );
};

export default Progress;
