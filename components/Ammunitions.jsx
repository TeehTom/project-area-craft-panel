import React, { useContext } from 'react';

import WeaponContext from '@/providers/WeaponContext';

const Ammunitions = ({ ammunitions }) => {
    const { cfgAmmunitions } = useContext(WeaponContext);

    const data = (cfgAmmunitions || [])
        .filter(ammo => ammunitions.includes(ammo?.class))
        .map(ammo => ammo?.displayName.length > 0 ? ammo : null)
        .filter(Boolean);

    return (
        <React.Fragment>
            <span className='title-category'>Munitions:</span>
            <div className='ammunitions'>
                {
                    data.map(ammo => (
                        <div className='ammunition'>
                            <span>Nom de la munition: <b>{ammo?.displayName}</b></span>
                            <span>Classname: <b>{ammo?.class}</b></span>
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    )
};

export default Ammunitions;
