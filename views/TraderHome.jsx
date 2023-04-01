import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faStore, faFileExport, faPenToSquare, faCheck, faTrash, faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import Trader from '@/views/Trader'
import PAButton from '@/components/PAButton'
import PAInput from '@/components/PAInput'

import TraderContext from '@/providers/TraderContext';

const TraderHome = props => {
    const [ loading, setLoading ] = useState(false);
    const [ edit, setEdit ] = useState(false);

    const refFile = useRef(null);
    const refLink = useRef(null);

    const {
        trader,
        traders,
        onParseTrader,
        onSelectTrader,
        onExport,
        traderActive,
        onRenameTrader,
        onDeleteTrader,
        onCreateTrader
    } = useContext(TraderContext);

    const onLoadFile = useCallback(event => {
        const result = event?.target?.result;
        setLoading(true);
        if (result) {
            onParseTrader(result);
        }
        setLoading(false);
    }, [ onParseTrader, setLoading ]);

    const onChangeFileInput = useCallback(event => {
        const reader = new FileReader();
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            reader.onload = onLoadFile;
            reader.onerror = evt => console.error('error reading file');
            reader.readAsText(selectedFile, 'UTF-8');
        }
    }, [ onLoadFile ]);

    const onClickUpload = useCallback(() => refFile?.current?.click(), [ refFile ]);

    const onSelect = useCallback(event => {
        const uuid = event?.target?.dataset?.uuid;
        if (uuid && !edit) {
            setEdit(false);
            onSelectTrader(uuid);
        }
    }, [ onSelectTrader, setEdit, edit ]);

    const onKeyUpName = useCallback(event => {
        if(event.code === 'Enter') {
            setEdit(false);
        }
    }, [ setEdit ]);

    const onClickExport = useCallback(event => onExport(refLink.current), [ onExport, refLink ]);
    const onClickEdit = useCallback(event => setEdit(true), [ setEdit ]);
    const onClickAccept = useCallback(event => setEdit(false), [ setEdit ]);
    const onClickNew = useCallback(event => onCreateTrader(), [ onCreateTrader ]);
    const onChangeName = useCallback(({ value }) => onRenameTrader(value), [ onRenameTrader ]);
    const onClickDelete = useCallback(() => onDeleteTrader(), [ onDeleteTrader ]);

    return (
        <div className='home-content'>
            <a ref={refLink} hidden />
            <input type="file" ref={refFile} onChange={onChangeFileInput} hidden />
            <div className='home-trader-wrapper'>
                <div className='home-trader-actions-wrapper'>
                    <span>Choisir trader</span>
                    <div className='home-trader-actions-btn'>
                        <PAButton onClick={onClickNew}>
                            <FontAwesomeIcon icon={faPlus} />
                        </PAButton>
                        <PAButton onClick={onClickUpload}>
                            <FontAwesomeIcon icon={faFileImport} />
                        </PAButton>
                        {
                            traders && (
                                <PAButton onClick={onClickExport}>
                                    <FontAwesomeIcon icon={faFileExport} />
                                </PAButton>
                            )
                        }
                    </div>
                </div>
                <div className={classnames('home-trader-options', { isEditing: edit })}>
                    {
                        traders && Object.values(traders || {}).map(({ uuid, name }) => (
                            <div
                                className={classnames('home-trader-option', { selected: traderActive === uuid})}
                                key={uuid}
                                data-uuid={uuid}
                                onClick={onSelect}
                            >
                                {
                                    edit && traderActive === uuid
                                    ? (
                                        <PAInput className='home-trader-option-edit' value={name} onChange={onChangeName} onKeyUp={onKeyUpName} />
                                    )
                                    : name
                                }
                                <div className='home-trader-option-actions'>
                                    {
                                        traderActive === uuid && (
                                            edit
                                            ? (
                                                <PAButton onClick={onClickAccept}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </PAButton>
                                            )
                                            : (
                                                <React.Fragment>
                                                    <PAButton onClick={onClickEdit}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </PAButton>

                                                    <PAButton onClick={onClickDelete}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </PAButton>
                                                </React.Fragment>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {!loading && trader && <Trader />}
            {
                loading && (
                    <div className='home-choose-btn'>
                        <FontAwesomeIcon icon="fa-duotone fa-spinner" spin />
                    </div>
                )
            }
            {
                !loading && !trader && (
                    <div className='home-import-file'>
                        {
                            !traders && (
                                <React.Fragment>
                                    <button className='home-import-btn' onClick={onClickUpload}>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </button>
                                    <span className='home-import-title' >Importer fichier Trader</span>
                                </React.Fragment>
                            )
                        }
                        {
                            traders && !trader && (
                                <React.Fragment>
                                    <div className='home-choose-btn'>
                                        <FontAwesomeIcon icon={faStore} />
                                    </div>
                                    <span className='home-import-title' >Choisir un trader</span>
                                </React.Fragment>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default TraderHome;
