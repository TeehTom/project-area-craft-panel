import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import { generateUUID } from '@/utils/generateUUID';
import TraderContext from './TraderContext';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any.isRequired
};

const defaultTrader = uuid => ({
    uuid,
    name: 'Nouveau Trader',
    categories: {}
});

const TraderProvider = ({ children }) => {
    const [ traders, setTraders ] = useState(null);
    const [ traderActive, setTraderActive ] = useState(null);

    const onSelectTrader = useCallback(value => setTraderActive(value), [setTraderActive ]);
    const onParseTrader = useCallback(value => {
        if(value) {
            try {
                const tradersStr = value.replace(/\t/g, '').replace(/\r/g, '').split('<Trader>');
                tradersStr.shift();
                const categories = tradersStr.map(trader => trader.trim().split('<Category>').filter(Boolean)
                                          .map(category => category.trim().split('\n').filter(Boolean)
                                          .map(items => (items.trim().charAt(0) === '/' ? '' : items).trim().split(',').filter(Boolean)
                                          .map(item => item.trim()))));

                const tradersJSON = categories.map((trader, i) => ({
                    uuid: generateUUID(),
                    name: trader[0][0][0].replace('//', '-'),
                    categories: trader.filter((value, index) => index > 0).map(value => ({
                        uuid: generateUUID(),
                        name: value[0][0].replace('//', '-'),
                        items: value.filter((valueCat, indexCat) => indexCat > 0).filter(item => item.length === 4).map(item => {
                            if(item.length > 0) {
                                const classObject = item?.[0];
                                const quantity = item?.[1];
                                const priceBuy = item?.[2];
                                const priceSell = item?.[3];

                                classObject.slice(classObject.indexOf('//', classObject.length));
                                quantity.slice(quantity.indexOf('//', quantity.length));
                                priceBuy.slice(priceBuy.indexOf('//', priceBuy.length));
                                priceSell.slice(priceSell.indexOf('//', priceSell.length));

                                return {
                                    uuid: generateUUID(),
                                    classObject,
                                    quantity,
                                    priceBuy: parseInt(priceBuy),
                                    priceSell: parseInt(priceSell)
                                }
                            }
                        })
                    }))
                }));

                // array of object to object
                const tradersReduced = tradersJSON.reduce((newTraders, traderObj) => (newTraders[traderObj.uuid] = {
                    ...traderObj,
                    categories: traderObj?.categories?.reduce((newCategories, category) => (newCategories[category.uuid] = {
                        ...category,
                        items: category?.items?.reduce((newItems, item) => (newItems[item.uuid] = item, newItems) ,{})
                    }, newCategories) ,{})
                }, newTraders) ,{});

                setTraders(tradersReduced);
            } catch (error){
                console.error(error);
            }
        }
    }, [ setTraders ]);

    /**
     *
        var dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
     */
    const onExport = useCallback(element => {
        if (element) {
            let traderTxtFile = '';
            Object.values(traders || {}).map(trader => {
                traderTxtFile += `<Trader> ${trader.name.replace('-', '//')}\n\n`;
                Object.values(trader?.categories || {}).map(category => {
                    traderTxtFile += `\t<Category> ${category.name}\n`;
                    Object.values(category?.items || {}).map((item, index, array) => {
                        traderTxtFile += Boolean(item.classObject)
                            ?`\t\t${item.classObject}, ${item.quantity}, ${item.priceBuy}, ${item.priceSell}\n${array.length-1 === index ? '\n' : ''}`
                            : '';
                    })
                })
            })

            var dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(traderTxtFile);
            element.setAttribute("href", dataStr);
            element.setAttribute("download", "Trader.txt");
            element.click();
        }
    }, [ traders ]);

    /***************** TRADER *****************/

    const onRenameTrader = useCallback(value => {
        if (traderActive) {
            setTraders(prev => dotProp.set(prev, `${traderActive}.name`, value));
        }
    }, [ setTraders, traderActive ]);

    const onDeleteTrader = useCallback(() => {
        if (traderActive) {
            setTraders(prev => {
                const newTraders = dotProp.delete(prev, traderActive);
                return Object.values(newTraders || {}).length > 0 ? newTraders : null;
            });
        }
    }, [ setTraders, traderActive ]);

    const onCreateTrader = useCallback(() => {
        const uuid = generateUUID();
        setTraders(prev => dotProp.set(Boolean(prev) ? prev : {}, uuid, defaultTrader(uuid)));
    }, [ setTraders ]);

    /***************** TRADER *****************/

    /***************** CATEGORIES *****************/

    const onAddChangeCategory = useCallback(category => {
        if (category && category.uuid) {
            setTraders(prev => dotProp.set(prev, `${traderActive}.categories.${category.uuid}`, category));
        }
    }, [ traderActive, setTraders ]);

    const onDeleteCategory = useCallback(uuid => {
        if (uuid) {
            setTraders(prev => dotProp.delete(prev, `${traderActive}.categories.${uuid}`));
        }
    }, [ traderActive, setTraders ]);

    const onRenameCategory = useCallback((uuid, name) => {
        if (uuid) {
            setTraders(prev => dotProp.set(prev, `${traderActive}.categories.${uuid}.name`, name));
        }
    }, [ traderActive, setTraders ]);

    const getCategories = useCallback(() => dotProp.get(traders, `${traderActive}.categories`), [ traders, traderActive ]);

    /***************** CATEGORIES *****************/

    /***************** ITEMS *****************/

    const onAddChangeItems = useCallback((categoryId, item) => {
        if (traderActive && categoryId && item && item.uuid) {
            setTraders(prev => dotProp.set(prev, `${traderActive}.categories.${categoryId}.items.${item.uuid}`, item));
        }
    }, [ traderActive, setTraders ]);

    const onDeleteItems = useCallback((categoryId, itemId) => {
        if (traderActive && categoryId && itemId) {
            setTraders(prev => dotProp.delete(prev, `${traderActive}.categories.${categoryId}.items.${itemId}`));
        }
    }, [ traderActive, setTraders ]);

    /***************** ITEMS *****************/

    const TraderContextValue = useMemo(() => ({
        trader: traders && traderActive && (traders?.[ traderActive ] || null),
        traders,
        traderActive,
        onParseTrader,
        onSelectTrader,
        onExport,
        onAddChangeCategory,
        onDeleteCategory,
        onRenameCategory,
        onAddChangeItems,
        onDeleteItems,
        getCategories,
        onRenameTrader,
        onDeleteTrader,
        onCreateTrader,
    }), [
        traderActive,
        traders,
        onParseTrader,
        onSelectTrader,
        onExport,
        onAddChangeCategory,
        onDeleteCategory,
        onRenameCategory,
        onAddChangeItems,
        onDeleteItems,
        getCategories,
        onRenameTrader,
        onDeleteTrader,
        onCreateTrader
    ]);

    return (
        <TraderContext.Provider value={TraderContextValue}>
            {children}
        </TraderContext.Provider>
    );
};

TraderProvider.propTypes = propTypes;

export default TraderProvider;
