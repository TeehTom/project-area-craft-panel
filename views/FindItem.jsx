import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDebounce } from 'rooks';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

import PAInput from '@/components/PAInput'
import PALoader from '@/components/PALoader';
import PACheckbox from '@/components/PACheckbox';
import PAButton from '@/components/PAButton';

import OBJECTS from '@/providers/objects.json';

const FindItem = props => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ search, setSearch ] = useState('');
    const [ copied, setCopied ] = useState(false);
    const [ selected, setSelected ] = useState([]);

    const onClickCopy = useCallback(event => {
        setCopied(true);

        const classes = selected
            .sort()
            .join('\n');

        navigator.clipboard.writeText(classes);

        setTimeout(() => setCopied(false), 500);
    }, [ setCopied, selected ]);

    const onChange = useCallback(({ value }) => {
        setIsLoading(true);

        setSearch(value);

        setTimeout(() => setIsLoading(false), 1000);
    }, [ setSearch, setIsLoading ]);

    const onCheckClass = useCallback(({ target, value }) => {
        const classObj = target.dataset.class;

        setSelected(prev => {
            const tempPrev = [ ...prev ];
            return value
                ? !tempPrev.includes(classObj)
                    ? [ ...tempPrev, classObj ]
                    : tempPrev
                : tempPrev.filter(obj => obj !== classObj);
        });
    }, [ setSelected ]);

    useEffect(() => {
        console.log(selected);
    }, [ selected ]);

    const objectSearched = OBJECTS
        .filter(obj => !selected.includes(obj.class))
        .filter(obj => {
            const searchParsed = search.toLowerCase().replaceAll('_','').replaceAll('-','');

            return Boolean(search)
            && (
                 obj.class.toLowerCase().replaceAll('_','').replaceAll('-','').includes(searchParsed)
                ||  obj.displayName.toLowerCase().replaceAll('_','').replaceAll('-','').includes(searchParsed)
            )
        });

    const objSel = OBJECTS.filter(obj => selected.includes(obj.class));

    return (
        <div className='container objects'>
            <div className='filter-search'>
                <div className='search-container'>
                    <PAInput value={search} onChange={onChange} placeholder='Cherche le gauss ici...'/>
                    {
                        selected && selected.length > 0 && (
                            <PAButton
                                className='item-copy'
                                onClick={onClickCopy}
                            >
                                Copier <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            </PAButton>
                        )
                    }
                </div>
            </div>
            {
                objSel && objSel.length > 0 && (
                    <React.Fragment>
                        <div id='selected' className='weapon-wrapper'>
                            {
                                objSel?.map(obj => (
                                    <div className='weapon-container' key={obj?.class}>
                                        <div className='weapon' >
                                            <PACheckbox
                                                value={selected.includes(obj?.class)}
                                                onChange={onCheckClass}
                                                data-class={obj?.class}
                                            />
                                            <div className='weapon-checkbox' >
                                                <span className='title-category'>Nom de l'arme: <b>{obj?.displayName}</b></span>
                                                <span className='title-category'>
                                                    Classname: <b>{obj?.class}</b>
                                                </span>
                                                <span className='title-category'>Description: <b>{obj?.description}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='weapon-divider' />
                    </React.Fragment>
                )
            }
            {
                isLoading
                ? <PALoader />
                : (
                    <div className='weapon-wrapper'>
                        {
                            objectSearched && objectSearched?.map(obj => (
                                <div className='weapon-container' key={obj?.class}>
                                    <div className='weapon' >
                                        <PACheckbox
                                            value={selected.includes(obj?.class)}
                                            onChange={onCheckClass}
                                            data-class={obj?.class}
                                        />
                                        <div className='weapon-checkbox' >
                                            <span className='title-category'>Nom de l'arme: <b>{obj?.displayName}</b></span>
                                            <span className='title-category'>
                                                Classname: <b>{obj?.class}</b>
                                            </span>
                                            <span className='title-category'>Description: <b>{obj?.description}</b></span>
                                        </div>
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
