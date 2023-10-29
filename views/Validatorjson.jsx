import React, { useState, useCallback, useRef } from 'react';
import { fromEvent } from 'file-selector';
import JSZip from 'jszip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames';


import PACheckbox from '@/components/PACheckbox';
import PALoader from '@/components/PALoader';
import { generateUUID } from '@/utils/generateUUID';

const Validatorjson = () => {
    const [ jsonFiles, setJsonFiles ] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ replaceByRef, setReplaceByRef ] = useState(false);
    const [ errorMultipleZip, setErrorMultipleZip ] = useState(false);

    const inputFileRef = useRef(null);

    const getFiles = useCallback(fs => {
        const fsValues = Object.values(fs);
        return fsValues.filter(d => {
            const ext = d.name.split('.').pop();
            return ext === 'json';
        });
    }, []);

    const onReaderLoad = useCallback((name, event, multiple) => {
        try {

            const fileToAdd = {
                name,
                uuid: generateUUID(),
                jsonData: JSON.parse(event.target.result),
                error: []
            }

            setJsonFiles(prev => multiple ? [ ...prev, fileToAdd ] : [ fileToAdd ]);
        }catch(error) {
            const fileToAdd = {
                name,
                uuid: generateUUID(),
                jsonData: null,
                error: [
                    error
                ]
            }
            setJsonFiles(prev => multiple ? [ ...prev, fileToAdd ] : [ fileToAdd ]);
        }
    }, [ setJsonFiles ]);


    /**
     *  Function that take a file in input
     *      - if it's a json, just read the data to check is there are valid or not
     *      - if it's a zip, extract all json and read the data to check is there are valid or not
     */
    const onParseFile = useCallback(async files => {
        if (files) {
            const alljson = files.every(file => file?.name?.endsWith('.json'));

            if(alljson) {
                files.forEach(async file => {
                    const reader = new FileReader();
                    reader.onload = event => onReaderLoad(file?.name, event, files?.length > 1);
                    await reader.readAsText(file);
                });
                setTimeout(() => setIsLoading(false), 1000);
            } else {
                if (files.length > 1) {
                    setErrorMultipleZip(true);
                    setIsLoading(false);
                    return;
                }
                const zip = new JSZip();
                const loadedZip = await zip.loadAsync(files?.[ 0 ]);
                const jsonFilesDataPromises = Object.keys(loadedZip.files)
                    .filter(fileName => fileName.endsWith('.json'))
                    .map(async fileName => {
                        try {
                            const fileContent = await loadedZip.file(fileName).async('text');
                            return {
                                name: fileName,
                                uuid: generateUUID(),
                                jsonData: JSON.parse(fileContent),
                                error: []
                            };
                        }catch(error) {
                            return {
                                name: fileName,
                                uuid: generateUUID(),
                                jsonData: null,
                                error: [
                                    error
                                ]
                            };
                        }
                    })
                    .filter(Boolean);
                const resolvedJsonFilesData = await Promise.all(jsonFilesDataPromises);
                setJsonFiles(resolvedJsonFilesData);
                setTimeout(() => setIsLoading(false), 1000);
            }
        }
    }, [ onReaderLoad, setJsonFiles, setIsLoading ]);

    const onChangeDrop = useCallback(async event => {
        setHover(false);
        setErrorMultipleZip(false);
        setIsLoading(true);
        event.preventDefault();
        const filesFolder = await fromEvent(event);

        onParseFile(filesFolder);
    }, [ onParseFile, setHover, setIsLoading ]);

    const onClick = useCallback(() => {
        const input = inputFileRef?.current;
        input.value = null;
        setJsonFiles([]);

        input.click();
    }, [ inputFileRef ]);


    const onDragOver = useCallback(event => {
        setHover(true);
        event.preventDefault();
    }, [ setHover ]);

    const onDragLeave = useCallback(event => {
        setHover(false);
        event.preventDefault();
    }, [ setHover ]);

    const onCheckReplace = useCallback(({ value }) => setReplaceByRef(value), [setReplaceByRef]);

    return (
        <div className='validatorjson'>
            <div className='filezone-filter'>
                <div className='filezone-check'>
                    <PACheckbox
                        id='replacer'
                        value={replaceByRef}
                        onChange={onCheckReplace}
                    />
                    <label htmlFor='replacer' className='filezone-check-text' >
                        <i>(pas encore prêt)</i>Remplace les classnames (trouvés) par les classnames du fichier de référence
                    </label>
                </div>
            </div>

            <div className='divider' />
            <div className='fileZone-wrapper'>
                <div
                    className={classnames('fileZone', { hover })}
                    onClick={onClick}
                    onDrop={onChangeDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                >
                    <FontAwesomeIcon icon={faUpload} />
                    <span className={classnames('fileZone-text', { uploaded: jsonFiles.length > 0 })}>Upload un { jsonFiles.length > 0 && 'nouveau ' }fichier zip ou json</span>
                </div>
                { errorMultipleZip && <span className='fileZone-error'>Tu ne peux pas upload plusieurs fichier zip</span> }
            </div>

            <input
                ref={inputFileRef}
                className='inputFileHidden'
                type='file'
                onChange={onChangeDrop}
                accept='.zip,.json'
                multiple
            />
            {
                isLoading
                    ? <PALoader />
                    : jsonFiles.length > 0 && (
                        <React.Fragment>
                            <div className='divider' width='max' />
                            <span className='file-list-title'>Validité d{jsonFiles?.length > 1 ? `es` : 'u'} fichier{jsonFiles?.length > 1 ? `s` : ''}:</span>
                            <div className='file-list'>
                                {
                                    jsonFiles.map((file, index) => (
                                        <div
                                            className={`file${file?.error?.length > 0 ? ' error' : ''}`}
                                            key={file.uuid}
                                        >
                                            {file.name}
                                            {
                                                file?.error?.length > 0 && (
                                                    <ul>
                                                        {
                                                            file?.error.map((error, index) => (
                                                                <li className='file-error' key={`${file.uuid}${index}`}>{error.message}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    )
            }
        </div>
    );
};

export default Validatorjson;
