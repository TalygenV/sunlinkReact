import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '', prefix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.6, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        
        setCount(value);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default Counter;