import React, { useCallback, useState, useEffect, useContext } from 'react';
import isEqual from 'react-fast-compare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faFolderClosed } from '@fortawesome/free-solid-svg-icons';

import PAButton from '@/components/PAButton'
import AddCategory from '@/views/AddCategory'
import Category from '@/views/Category'

import TraderContext from '@/providers/TraderContext';

const Trader = props => {
    const { trader, onAddChangeCategory } = useContext(TraderContext);

    const categories = Object.values(trader?.categories || {});

    const [ changed, setChanged ] = useState(false);
    const [ openAll, setOpenAll ] = useState(null);

    const onAddCategory = useCallback(category => onAddChangeCategory(category), [ onAddChangeCategory ]);

    const onClickClose = useCallback(() => setOpenAll('close'), [ setOpenAll ]);
    const onClickOpen = useCallback(() => setOpenAll('open'), [ setOpenAll ]);

    return (
        <div id='trader-wrapper'>
            <p className='trader-title'>Trader {trader?.name || ''}</p>
            <AddCategory />
            <div className='trader-categories-title'>
                <span>Categories</span>
                <div className='trader-categories-title-btn'>
                    <PAButton onClick={onClickClose}><FontAwesomeIcon icon={faFolderClosed} />Tout Fermer</PAButton>
                    <PAButton onClick={onClickOpen}><FontAwesomeIcon icon={faFolderOpen} />Tout Ouvrir</PAButton>
                </div>
            </div>
            <div className='trader-categories-wrapper'>
                {
                    categories.map(({ uuid }) => (
                        <Category
                            key={uuid}
                            uuid={uuid}
                            open={openAll}
                        />
                    ))
                }
            </div>

        </div>
    );
}

export default Trader;
