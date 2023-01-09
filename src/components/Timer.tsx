import React, { useState, useRef, useEffect } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
        // eslint-disable-next-line
    }, [currentPlayer]);

    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback =
            currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    };

    const decrementBlackTimer = () => {
        setBlackTime((prev) => prev - 1);
    };

    const decrementWhiteTimer = () => {
        setWhiteTime((prev) => prev - 1);
    };

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    };

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
            <h2>Чёрные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};
export default Timer;
