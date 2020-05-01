import React, {useState, useEffect} from 'react';


export default function Particle({fullTime, resetTimer, resetTimerCallback, timeOutCallback, active, question, width: windowWidth}) {
    const [time, setTime] = useState(fullTime - 1);


    const viewportHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
    const fullHeight = viewportHeight - 250;
    const pixPerTime = fullHeight / (fullTime - 1);
    const height = Math.floor(time * pixPerTime);
    const downTime = -Math.floor(fullTime / 5);

    useEffect(() => {
        if (time >= downTime && active) {
            const timerId = setInterval(() => {
                const newTime = time - 1;
                if (newTime === downTime || height <= 120) { // Bottle is already in the waves!
                    timeOutCallback();
                    clearInterval(timerId);
                }
                setTime(newTime);
            }, 1000);
            return () => clearInterval(timerId);
        }
    });

    useEffect(() => {
        if (resetTimer) {
            setTime(fullTime - 1);
            resetTimerCallback();
        }
    }, [resetTimer, fullTime, resetTimerCallback]);

    const runningOut = (time >= fullTime - 1) ? '' : 'not-over';

    const bottle = (colorID, bottleID) => {
        const d = [
            "M130.395 17.537 C 125.795 18.960,122.479 21.415,115.099 28.863 C 105.800 38.247,111.066 36.452,62.678 46.729 C 21.331 55.510,24.800 54.992,24.800 52.375 C 24.800 49.366,23.269 49.272,16.721 51.881 C 12.062 53.737,10.745 54.001,10.541 53.120 C 10.185 51.575,7.723 51.717,5.669 53.400 C 3.980 54.784,3.963 55.092,4.180 80.770 L 4.400 106.739 6.645 107.970 C 8.685 109.088,8.980 109.080,9.871 107.886 C 10.766 106.686,11.353 106.782,16.593 108.984 C 22.891 111.630,24.800 111.500,24.800 108.425 C 24.800 105.824,21.765 105.392,57.831 113.133 C 75.084 116.835,92.260 120.473,96.000 121.216 C 105.911 123.186,107.308 123.979,115.442 132.259 C 119.503 136.394,124.440 140.637,126.413 141.688 L 130.000 143.600 203.600 143.600 L 277.200 143.600 281.745 141.470 C 284.821 140.027,287.082 138.244,288.745 135.950 L 291.200 132.560 291.200 80.400 L 291.200 28.240 288.858 25.007 C 287.348 22.922,284.863 20.963,281.858 19.487 L 277.200 17.200 204.800 17.058 C 164.980 16.980,131.498 17.196,130.395 17.537 ",
            "M161.200 17.705 C 153.103 18.722,140.911 21.922,130.800 25.686 C 96.781 38.349,82.012 42.498,56.887 46.453 C 45.619 48.227,35.804 49.854,35.076 50.069 C 34.226 50.320,33.101 49.547,31.938 47.913 L 30.124 45.366 28.662 47.172 C 27.858 48.165,27.200 49.439,27.200 50.003 C 27.200 50.963,25.531 52.000,23.985 52.000 C 23.609 52.000,23.189 50.830,23.051 49.400 L 22.800 46.800 15.549 46.572 C 3.969 46.208,3.750 46.916,4.159 83.502 C 4.514 115.221,3.973 113.898,16.403 113.437 L 22.800 113.200 23.053 110.563 C 23.254 108.473,26.800 107.088,26.800 109.099 C 26.800 112.679,30.836 114.819,32.271 112.000 C 32.831 110.900,33.809 110.067,34.444 110.149 C 67.255 114.379,85.921 118.602,111.600 127.604 C 161.639 145.145,150.101 143.396,218.362 143.789 C 285.208 144.173,283.676 144.393,288.697 133.686 L 290.800 129.200 290.800 80.000 L 290.800 30.800 288.916 27.009 C 286.611 22.371,282.647 18.766,278.622 17.648 C 274.898 16.614,169.485 16.665,161.200 17.705 ",
            "M52.794 18.218 C 49.109 21.903,48.010 25.568,48.004 34.200 L 48.000 40.800 45.200 40.800 C 39.711 40.800,39.200 42.197,39.200 57.200 L 39.200 70.400 36.000 70.400 C 33.120 70.400,32.800 70.200,32.800 68.400 C 32.800 65.912,31.298 65.823,26.719 68.039 C 16.920 72.783,17.252 88.856,27.256 94.029 C 30.798 95.860,32.800 95.561,32.800 93.200 C 32.800 91.400,33.120 91.200,36.000 91.200 L 39.200 91.200 39.200 103.476 C 39.200 119.879,37.577 118.636,59.550 119.062 C 78.377 119.427,80.000 119.025,80.000 114.000 C 80.000 112.007,80.027 112.000,87.590 112.000 L 95.180 112.000 98.100 117.800 C 103.938 129.393,116.722 139.329,128.709 141.588 C 136.190 142.998,265.670 142.643,271.808 141.196 C 288.139 137.345,301.550 123.157,305.217 105.852 C 306.847 98.158,306.836 62.615,305.201 54.800 C 301.553 37.367,287.886 22.594,271.926 18.832 C 265.743 17.375,136.379 16.980,128.709 18.395 C 116.689 20.613,103.480 30.985,97.775 42.685 L 95.184 48.000 87.592 48.000 C 80.533 48.000,80.000 47.888,80.000 46.400 C 80.000 44.042,77.151 41.600,74.400 41.600 L 72.000 41.600 72.000 33.053 C 72.000 19.792,68.909 15.200,59.982 15.200 C 56.225 15.200,55.513 15.499,52.794 18.218 M64.355 24.178 C 65.276 25.493,65.600 27.993,65.600 33.778 L 65.600 41.600 59.925 41.600 L 54.250 41.600 54.525 33.682 C 54.748 27.273,55.090 25.444,56.324 24.082 C 58.422 21.766,62.701 21.817,64.355 24.178 "
        ];
        const colors = ['#04867e', '#3ccecc', '#81451b', '#2baa43', '#d0b900'];

        const rotate = "rotate(" + (180*(colorID%2)) + ")";

        return (
            <svg id="svg" xmlns="http://www.w3.org/2000/svg" width="400" height="160" viewBox="0, 0, 400,160" transform={rotate} opacity={0.9}>
                <g id="svgg">
                    <path id="path0"

                          d={d[bottleID]}
                          stroke="none" fill={colors[colorID]}/>
                </g>
            </svg>
        )
    };

    const left = () => {
        const marginRight = 400 + 50;
        const usableWidth = Math.max(windowWidth - marginRight, 0);
        const pos = (question.id * 11 % 6 / 6) * usableWidth;
        return pos;
    };


    return (
        <div className="particle" style={{left: left() + 'px'}}>
            <div className="under-bar">
                <div className={`over-bar ${runningOut}`} style={{bottom: height + 'px'}}>
                    {bottle(question.id * 11 %5, question.id * 11 %3)}
                    <div className="particle-text">
                        {question.question}
                    </div>
                </div>
            </div>
        </div>
    );
}