import React, { useMemo, useState, useEffect } from 'react';

import WeaponContext from './WeaponContext';
import items from './weapons.json';

const WeaponProvider = ({ children }) => {

    const [ cfgWeapons, setCfgWeapons] = useState(null);
    const [ cfgMagazines, setCfgMagazines] = useState(null);
    const [ cfgAmmunitions, setCfgAmmunitions] = useState(null);
    const [ cfgAttachments, setCfgAttachments] = useState(null);

    useEffect(() => {
        setCfgWeapons(items.Weapons);
        setCfgMagazines(items.Magazines);
        setCfgAmmunitions(items.Ammunitions);
        setCfgAttachments(items.Attachments);
    }, []);

    const WeaponContextValue = useMemo(() => ({
        cfgWeapons,
        cfgMagazines,
        cfgAmmunitions,
        cfgAttachments
    }), [
        cfgWeapons,
        cfgMagazines,
        cfgAmmunitions,
        cfgAttachments
    ]);

    return (
        <WeaponContext.Provider value={WeaponContextValue}>
            {children}
        </WeaponContext.Provider>
    );
};

export default WeaponProvider;
