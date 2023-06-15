import React, { useCallback, useRef, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Mousetrap from 'mousetrap';

const MapStalker = () => {

    const [ lock, setLock ] = useState(true);
    const [ tiktok, setTitok ] = useState(false);

    const [ xPos, setXPos] = useState(0);
    const [ yPos, setYPos] = useState(0);
    const imageRef = useRef(null);

    const onClick = useCallback(event => {
        const rect = imageRef.current.getBoundingClientRect();
        const imageHeight = imageRef.current.naturalHeight; // Hauteur réelle de l'image

        //const t = rect.left /
        setXPos(((event.clientX - rect.left) / rect.width * imageHeight).toFixed(3));
        setYPos(((rect.height - (event.clientY - rect.top)) / rect.height * imageHeight).toFixed(3));

    }, [ imageRef, setXPos, setYPos ]);

    const onClickIci = useCallback(() => {
        setTitok(prev => !prev);
    }, [ setTitok ]);

    useEffect(() => {
        Mousetrap.bind([ 'q u o i c o u b e h' ], () => setLock(false));
        return () => {
            Mousetrap.unbind([ 'q u o i c o u b e h' ]);
        };
    }, []);

    if (lock) {
        return (
            <div className='MapStalker-span-wrapper'>
                <span className='MapStalker-span-title'>
                    {
                        Boolean(tiktok)
                        ? (
                            <React.Fragment>
                                Eh bah non en faite, si tu as cliqué, c'est que t'as pas accès, quoi cou beh
                            </React.Fragment>
                        )
                        : (
                            <React.Fragment>
                                Pour avoir accès, click <button onClick={onClickIci} className='MapStalker-btn'>ici</button>
                            </React.Fragment>
                        )
                    }
                </span>
                {
                    tiktok && (
                        <div>
                            <video
                                src='https://cdn.discordapp.com/attachments/1070771362282606693/1115625040331952258/RPReplay_Final1686056058.mov'
                                className='MapStalker-video'
                                height='750px'
                                playsInline
                                autoPlay
                                loop
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div className='MapStalker-container'>
            <div className='MapStalker-wrapper' onClick={onClick} >
                <TransformWrapper maxScale={24} wheel={{step: 1}}>
                    <TransformComponent onClick={onClick}>
                        <img src='/satka_ecoLQ.png' className='MapStalker-image' ref={imageRef} alt="map" style={{ height: '100vh' }}/>
                    </TransformComponent>
                </TransformWrapper>
            </div>
            {
                yPos > 0 && xPos > 0 && (
                    <div className='MapStalker-axes-wrapper'>
                        <div className='MapStalker-axe'>
                            <span className='MapStalker-title'>X: </span>
                            <span className='MapStalker-value'>{xPos}</span>
                        </div>
                        <div className='MapStalker-axe'>
                            <span className='MapStalker-title'>Y: </span>
                            <span className='MapStalker-value'>{yPos}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default MapStalker;

//3680 / 420
