import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDebounce } from 'rooks';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { generateUUID } from '@/utils/generateUUID';
import Storage from '@/utils/Storage';

import PAInput from '@/components/PAInput'
import PALoader from '@/components/PALoader';
import PAButton from '@/components/PAButton';
import PAToggle from '@/components/PAToggle';
import Attachments from '@/components/Attachments';
import Magazines from '@/components/Magazines';
import Ammunitions from '@/components/Ammunitions';

import WeaponContext from '@/providers/WeaponContext';



const FindWeapon = props => {
    const { cfgWeapons, cfgAmmunitions } = useContext(WeaponContext);

    const defaultValueFilter = useCallback((key, defaultValue) => {
        if (typeof window !== "undefined") {
            const filter = Storage.get(key);
            if (Boolean(filter)) {
                return filter === 'true';
            } else {
                Storage.set(key, defaultValue);
                return defaultValue;
            }
        } else {
            return defaultValue;
        }
    }, []);

    const [ showClassName, setShowClassName ] = useState(() => defaultValueFilter('weapons.showClassName', true));
    const [ showAmmunitions, setShowAmmunitions ] = useState(() => defaultValueFilter('weapons.showAmmunitions', true));
    const [ showMagazines, setShowMagazines ] = useState(() => defaultValueFilter('weapons.showMagazines', true));
    const [ showAttachments, setShowAttachments ] = useState(() => defaultValueFilter('weapons.showAttachments', true));

    const [ showFilter, setShowFilter ] = useState(false);

    const [ value, setValue ] = useState('');
    const [ valueSearch, setValueSearch ] = useState('');
    const [ weaponSearched, setWeaponSearched ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ timeoutId, setTimeoutId ] = useState(null);

    const setValueDebounced = useDebounce(setValueSearch, 500);

    const onClickFilter = useCallback(() => setShowFilter(prev => !prev), [ setShowFilter ]);

    const onToggleClassName = useCallback(({ value }) => {
        Storage.set('weapons.showClassName', value);
        setShowClassName(value)
    }, [ setShowClassName ]);
    const onToggleAmmunitions = useCallback(({ value }) => {
        Storage.set('weapons.showAmmunitions', value);
        setShowAmmunitions(value)
    }, [ setShowAmmunitions ]);
    const onToggleMagazines = useCallback(({ value }) => {
        Storage.set('weapons.showMagazines', value);
        setShowMagazines(value)
    }, [ setShowMagazines ]);
    const onToggleAttachments = useCallback(({ value }) => {
        Storage.set('weapons.showAttachments', value);
        setShowAttachments(value)
    }, [ setShowAttachments ]);

    const onChange = useCallback(({ value: val }) => {
        setIsLoading(true);
        setValue(val);
    }, [ setValue, setIsLoading ]);

    useEffect(() => {
        setValueDebounced(value);
        const id = setTimeout(() => setIsLoading(false), 750)
        setTimeoutId(id);

        return () => {
            setTimeoutId(prev => {
                if(prev) clearTimeout(prev);
                return null;
            });
        }
    }, [ value, setIsLoading, setTimeoutId ]);

    useEffect(() => {
        if(cfgWeapons && cfgAmmunitions) {
            const filterWeapons = async () => {
                if(valueSearch?.length >= 3) {
                    setWeaponSearched(cfgWeapons.filter(weapon =>
                        weapon?.displayName?.toLowerCase()?.includes(valueSearch.toLowerCase())
                        || weapon?.class.toLowerCase()?.includes(valueSearch.toLowerCase())
                        || (cfgAmmunitions || []).some(ammo =>
                                weapon?.chamberableFrom.includes(ammo?.class)
                                && ammo?.class.toLowerCase().includes(valueSearch.toLowerCase()))
                    ));
                } else {
                    setWeaponSearched([]);
                }
                setIsLoading(false);
                setTimeoutId(prev => {
                    if(prev) clearTimeout(prev);
                    return null;
                });
            };
            filterWeapons();
        }
    }, [ valueSearch, cfgWeapons, cfgAmmunitions, setWeaponSearched, setIsLoading, setTimeoutId ]);

    if(!cfgWeapons) {
        return null;
    }

    return (
        <div className={classnames('container', { showAmmunitions, showMagazines, showAttachments })}>
            <div className='filter-search'>
                <div className={classnames('search-container', { open: showFilter, })}>
                    <PAInput value={value} onChange={onChange} placeholder='Cherche le gauss ici...'/>
                    <div className='filters'>
                        <div className='filter'>
                            <span>Afficher les classnames</span>
                            <PAToggle value={showClassName} onChange={onToggleClassName} className='toggle-className' showText={false}/>
                        </div>
                        <div className='filter'>
                            <span>Afficher les munitions</span>
                            <PAToggle value={showAmmunitions} onChange={onToggleAmmunitions} className='toggle-className' showText={false}/>
                        </div>
                        <div className='filter'>
                            <span>Afficher les chargeurs</span>
                            <PAToggle value={showMagazines} onChange={onToggleMagazines} className='toggle-className' showText={false}/>
                        </div>
                        <div className='filter'>
                            <span>Afficher les accessoires</span>
                            <PAToggle value={showAttachments} onChange={onToggleAttachments} className='toggle-className' showText={false}/>
                        </div>
                    </div>
                </div>
                <PAButton onClick={onClickFilter}>
                    <FontAwesomeIcon icon={faFilter} />
                </PAButton>
            </div>
            {
                isLoading
                ? (
                    <PALoader />
                )
                : (
                    <div className='weapon-wrapper'>
                    {
                        weaponSearched && weaponSearched?.map(weapon => {
                            return (
                            <div className='weapon' key={weapon?.class}>
                                <span className='title-category'>Nom de l'arme: <b>{weapon?.displayName}</b></span>
                                {showClassName && <span className='title-category'>Classname: <b>{weapon?.class}</b></span>}
                                {showAmmunitions && weapon?.chamberableFrom.length > 0 && <Ammunitions ammunitions={weapon?.chamberableFrom} />}
                                {showMagazines && weapon?.magazines.length > 0 && <Magazines magazines={weapon?.magazines} />}
                                {showAttachments && weapon?.attachments.length > 0 && <Attachments attachments={weapon?.attachments} />}
                            </div>
                        )})
                    }
                    </div>
                )
            }
        </div>
    )
}

export default FindWeapon;
