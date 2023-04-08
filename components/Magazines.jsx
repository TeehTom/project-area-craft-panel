import React, { useContext } from 'react';

import WeaponContext from '@/providers/WeaponContext';

const Magazines = ({ magazines }) => {
    const { cfgMagazines } = useContext(WeaponContext);

    const data = (cfgMagazines || [])
        .filter(mag => magazines.includes(mag?.class))
        .map(mag => mag?.displayName.length > 0 ? mag : null)
        .filter(Boolean);

    return (
        <React.Fragment>
            <span className='title-category'>Chargeurs:</span>
            <div className='magazines'>
                {
                    data.map(magazine => (
                        <div className='magazine'>
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
