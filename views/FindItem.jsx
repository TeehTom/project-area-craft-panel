import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDebounce } from 'rooks';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

import PAInput from '@/components/PAInput'
import PALoader from '@/components/PALoader';
import PAButton from '@/components/PAButton';

import OBJECTS from '@/providers/objects.json';

const FindItem = props => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ search, setSearch ] = useState('');
    const [ copied, setCopied ] = useState('');

    const onClickCopy = useCallback(event => {
        const objClass = event?.target?.dataset?.class;
        setCopied(objClass);

        navigator.clipboard.writeText(objClass);

        setTimeout(() => setCopied(''), 500);
    }, [ setCopied ]);

    const onChange = useCallback(({ value }) => {
        setIsLoading(true);

        setSearch(value);

        setTimeout(() => setIsLoading(false), 1000);
    }, [ setSearch, setIsLoading ]);

    const objectSearched = OBJECTS.filter(obj => {
        const searchParsed = search.toLowerCase().replaceAll('_','').replaceAll('-','');

        return Boolean(search)
        && (
             obj.class.toLowerCase().replaceAll('_','').replaceAll('-','').includes(searchParsed)
            ||  obj.displayName.toLowerCase().replaceAll('_','').replaceAll('-','').includes(searchParsed)
        )
    });

    return (
        <div className='container objects'>
            <div className='filter-search'>
                <div className='search-container'>
                    <PAInput value={search} onChange={onChange} placeholder='Cherche le gauss ici...'/>
                </div>
            </div>
            {
                isLoading
                ? <PALoader />
                : (
                    <div className='weapon-wrapper'>
                    {
                        objectSearched && objectSearched?.map(obj => (
                            <div className='weapon-container' key={obj?.class}>
                                <div className='weapon' >
                                    <span className='title-category'>Nom de l'arme: <b>{obj?.displayName}</b></span>
                                    <span className='title-category'>
                                        Classname: <b>{obj?.class}</b>
                                        <PAButton
                                            className='weapon-copy'
                                            onClick={onClickCopy}
                                            data-class={obj?.class}
                                        >
                                            <FontAwesomeIcon icon={copied === obj?.class ? faCheck : faCopy} />
                                        </PAButton>
                                    </span>
                                    <span className='title-category'>Description: <b>{obj?.description}</b></span>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                )
            }
        </div>
    )
}

export default FindItem;
