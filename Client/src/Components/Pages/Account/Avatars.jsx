import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  uniqueNamesGenerator,
  colors,
  animals,
  countries,
  names,
  languages,
} from "unique-names-generator";

const sprites = [
  "adventurer",
  "micah",
  "avataaars",
  "bottts",
  "initials",
  "adventurer-neutral",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "croodles",
  "identicon",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
];

const SetAvatar = ({ onAvatarSelect, onClose, currentAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState(sprites[0]);
  const [imgURL, setImgURL] = useState([]);

  // Initialize with the current avatar's sprite if available
  useEffect(() => {
    if (currentAvatar) {
      const spriteFromCurrent = sprites.find(sprite => 
        currentAvatar.includes(`/7.x/${sprite}/`)
      );
      if (spriteFromCurrent) {
        setSelectedSprite(spriteFromCurrent);
      }
    }
    generateNewAvatars(selectedSprite);
  }, []);

  // Regenerate avatars when sprite changes
  useEffect(() => {
    if (selectedSprite) {
      generateNewAvatars(selectedSprite);
    }
  }, [selectedSprite]);

  const randomName = () => {
    return uniqueNamesGenerator({
      dictionaries: [animals, colors, countries, names, languages],
      length: 2,
    });
  };

  const generateNewAvatars = (sprite) => {
    setLoading(true);
    const newAvatars = [];
    for (let i = 0; i < 4; i++) {
      newAvatars.push(
        `https://api.dicebear.com/7.x/${sprite}/svg?seed=${randomName()}`
      );
    }
    setImgURL(newAvatars);
    setLoading(false);
  };

  const handleSpriteChange = (e) => {
    const sprite = e.target.value;
    setSelectedSprite(sprite);
    setSelectedAvatar(undefined);
  };

  const handleSetProfilePicture = () => {
    if (selectedAvatar === undefined) {
      alert("Please select an avatar");
      return;
    }
    onAvatarSelect(imgURL[selectedAvatar]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Choose Your Avatar</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading avatars...</div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Selected style: <span className="font-semibold">{selectedSprite}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {imgURL.map((image, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  selectedAvatar === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={image}
                  alt={`Avatar option ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${randomName()}`;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label htmlFor="avatar-style" className="block text-sm font-medium text-gray-700 mb-2">
              Avatar Style
            </label>
            <select 
              id="avatar-style"
              onChange={handleSpriteChange} 
              value={selectedSprite}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {sprites.map((sprite, index) => (
                <option value={sprite} key={index}>
                  {sprite}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSetProfilePicture}
              disabled={selectedAvatar === undefined}
              className={`px-4 py-2 rounded-md text-white ${
                selectedAvatar === undefined 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Set as Profile Picture
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SetAvatar;