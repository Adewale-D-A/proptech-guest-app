/** @format */

const VolumeProgressBar = ({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume?: () => void;
}) => {
  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="relative w-full">
        <input
          id="volume"
          type="range"
          min="0"
          max="10"
          value={volume}
          className="w-full rounded-md h-2 bg-transparent appearance-none pointer-events-none"
          style={{
            background: `linear-gradient(to right, #2E4393 0%, #2E4393 ${
              (volume / 10) * 100
            }%, #e5e7eb ${(volume / 10) * 100}%, #e5e7eb 100%)`,
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            width: 16px;
            height: 16px;
            background-color: #2e4393; /* Custom color for the thumb */
            border-radius: 50%;
            cursor: pointer;
            -webkit-appearance: none;
            appearance: none;
          }

          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background-color: #2e4393; /* Custom color for the thumb */
            border-radius: 50%;
            cursor: pointer;
          }

          input[type="range"]::-ms-thumb {
            width: 16px;
            height: 16px;
            background-color: #2e4393; /* Custom color for the thumb */
            border-radius: 50%;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
};

export default VolumeProgressBar;
