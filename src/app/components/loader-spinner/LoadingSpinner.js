import { InfinitySpin } from "react-loader-spinner";
import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-4">
      <InfinitySpin
        visible={true}
        width="500"
        color="Black"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default LoadingSpinner;
