import React, { useContext, useEffect } from 'react';

import WeaponContext from '@/providers/WeaponContext';

const Magazines = ({ magazines }) => {
    const { cfgMagazines } = useContext(WeaponContext);

    const data = (cfgMagazines || [])
        .filter(mag =>
            magazines.map(magw => magw && magw.toLowerCase())
            .filter(Boolean)
            .includes(mag?.class.toLowerCase())
        )
        .map(mag => mag?.displayName.length > 0 ? mag : null)
        .filter(Boolean);

    //console.log(magazines, data);

    return (
        <React.Fragment>
            <span className='title-category'>Chargeurs:</span>
            <div className='magazines'>
                {
                    data.map(magazine => (
                        <div className='magazine' key={magazine?.class}>
                            <span>Nom de la munition: <b>{magazine?.displayName}</b></span>
                            <span>Classname: <b>{magazine?.class}</b></span>
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    )
};

export default Magazines;
