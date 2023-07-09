import React, { useMemo, useState, useEffect, useCallback } from 'react';

import WeaponContext from './WeaponContext';
import items from './weapons.json';

const EXPORT_TYPES = {
    json: {
        value: 'JSON',
        name: 'Fichier JSON'
    },
    xml: {
        value: 'XML',
        name: 'Fichier XML'
    },
    trade: {
        value: 'TRADER',
        name: 'Fichier Trader'
    }
}

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
    }, [
        setCfgWeapons,
        setCfgMagazines,
        setCfgAmmunitions,
        setCfgAttachments
    ]);

    const exportData = useCallback((data, type) => {
        if(type === 'XML') {
            return data;
        } else if(type === 'TRADER') {
            let dataStringified = '';

            if(data?.class) {
                dataStringified +=`\t\t${data?.class},\t\t\t\t\t\t\tW,\t\t-1,\t\t-1`
                dataStringified += '\n\n'
            }

            if(data?.ammunitions) {
                dataStringified += data?.ammunitions?.map(ammo => `\t\t${ammo},\t\t\t\t\t\t\t*,\t\t-1,\t\t-1`).join('\n');
                dataStringified += '\n\n'
            }

            if(data?.magazines) {
                dataStringified += data?.magazines?.map(mag => `\t\t${mag},\t\t\t\t\t\t\tM,\t\t-1,\t\t-1`).join('\n');
                dataStringified += '\n\n'
            }

            if(data?.attachments) {
                dataStringified += data?.attachments?.map(attach => `\t\t${attach},\t\t\t\t\t\t\t*,\t\t-1,\t\t-1`).join('\n');
            }

            return dataStringified;
        }


        return JSON.stringify(data, null, '\t');
    }, []);

    const WeaponContextValue = useMemo(() => ({
        cfgWeapons,
        cfgMagazines,
        cfgAmmunitions,
        cfgAttachments,
        EXPORT_TYPES,
        exportData
    }), [
        cfgWeapons,
        cfgMagazines,
        cfgAmmunitions,
        cfgAttachments,
        exportData
    ]);

    return (
        <WeaponContext.Provider value={WeaponContextValue}>
            {children}
        </WeaponContext.Provider>
    );
};

export default WeaponProvider;
