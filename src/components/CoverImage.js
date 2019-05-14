import React from 'react';
import Logo from '../logo.svg';
import './custom.css';

const CoverImage = () => (
    <div className="cover-image" style={{
        backgroundImage: `url(${Logo})`
    }}>
    </div>
)

export default CoverImage;