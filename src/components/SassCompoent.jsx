import React from 'react';
import './SassComponent.scss';
import classNames from 'classnames';

const SassCompoent = () => {
  return (
    <h1 className={classNames('sass-title', { highlighted: true })}>
      SassCompoenet
    </h1>
  );
};

export default SassCompoent;
