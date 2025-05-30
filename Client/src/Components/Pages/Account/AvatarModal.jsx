import SetAvatar from "./Avatars";

export default function AvatarModal({ currentAvatar, onAvatarSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <SetAvatar 
          onAvatarSelect={onAvatarSelect}
          onClose={onClose}
          currentAvatar={currentAvatar}
        />
      </div>
    </div>
  );
}