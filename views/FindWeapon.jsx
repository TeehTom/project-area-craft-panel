import React, { useCallback, useState, useContext } from 'react';

import PAInput from '@/components/PAInput'
import Attachments from '@/components/Attachments';
import Magazines from '@/components/Magazines';
import Ammunitions from '@/components/Ammunitions';

import WeaponContext from '@/providers/WeaponContext';

const FindWeapon = props => {
    const { cfgWeapons } = useContext(WeaponContext);

    const [ value, setValue ] = useState('');

    const onChange = useCallback(({ value: val }) => setValue(val), [ setValue ]);

    if(!cfgWeapons) {
        return null;
    }

    const weaponSearched = cfgWeapons
        .filter(weapon =>
            value?.length >= 3
            && (
                weapon?.displayName?.toLowerCase()?.includes(value.toLowerCase())
                || weapon?.class.toLowerCase()?.includes(value.toLowerCase())
            )
        );

    return (
        <div className='wrapper'>
        <span className='title'>WEAPON FINDER 9000</span>
            <div className='container'>
                <PAInput value={value} onChange={onChange} placeholder='Cherche le gauss ici...'/>

                <div className='weapon-wrapper'>
                    {
                        weaponSearched && weaponSearched?.map(weapon => (
                            <div className='weapon'>
                                <span className='title-category'>Nom de l'arme: <b>{weapon?.displayName}</b></span>
                                <span className='title-category'>Classname: <b>{weapon?.class}</b></span>
                                <Ammunitions ammunitions={weapon?.chamberableFrom} />
                                <Magazines magazines={weapon?.magazines} />
                                <Attachments attachments={weapon?.attachments} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FindWeapon;
