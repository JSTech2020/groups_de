import Wave from 'react-wavify';
import React from "react";

export default function Waves({}) {
    return (
        <div>
            <div className='wave-container'>
                <Wave className='wave' mask="url(#mask)" fill="#1277b0"
                      options={{points: 4, speed: 0.3, amplitude: 20}}>
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0" stopColor="white"/>
                            <stop offset="0.8" stopColor="black"/>
                        </linearGradient>
                        <mask id="mask">
                            <rect width="2000" height="300" fill="url(#gradient)"/>
                        </mask>
                    </defs>
                </Wave>

                <Wave className='wave' fill='#0d4672'
                      paused={false}
                      options={{
                          amplitude: 20,
                          speed: 0.3,
                          points: 6
                      }}
                />
            </div>
            <div className="wave-lowerpart"/>
        </div>
    )
}