import React from 'react';
import loading from './../resource/loadingDot.gif';

const Loader = () => {
  return (
    <div className="container">
      <div className="row h-100 mt-auto mb-auto">
        <div className="col-sm-12 col-md-8 offset-md-2 text-center">
          <img src={loading} width="200" height="200" alt="loading..." />
        </div>
      </div>
    </div>
  );
};

export default Loader;
