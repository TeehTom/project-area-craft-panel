import React, { useContext } from 'react';

import WeaponContext from '@/providers/WeaponContext';

const Attachments = ({ attachments }) => {
    const { cfgAttachments } = useContext(WeaponContext);

    const data = (cfgAttachments || [])
        .filter(attach => attach?.inventorySlot.some(r=> attachments.indexOf(r) >= 0))
        .map(attach => attach?.displayName.length > 0 ? attach: null)
        .filter(Boolean);

    return (
        <React.Fragment>
            <span className='title-category'>Accessoires:</span>
            <div className='attachments'>
                {
                    data.map(attach => (
                        <div className='attachment' key={attach?.class}>
                            <span>Nom de l'accessoire: <b>{attach?.displayName}</b></span>
                            <span>Classname: <b>{attach?.class}</b></span>
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    )
};

export default Attachments;
