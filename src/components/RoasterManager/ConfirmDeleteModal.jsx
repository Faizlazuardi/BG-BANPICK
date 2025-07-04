import {  Trash2 } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, onClose, onDelete, value, game }) {
    
    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/50">
            <div className="flex flex-col items-center gap-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <Trash2 className="p-2 border-5 rounded-full w-20 h-20 text-gray-400"/>
                <h2 className="font-bold text-lg">Are you sure?</h2>
                <p>Are you sure you want to delete <b>{value.Name}</b></p>
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-white hover:bg-gray-200 px-4 py-2 border-gray-400 rounded text-gray-800"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                        onClick={() => 
                            onDelete(game, value.Id)
                            .then(() => {
                                onClose();
                                window.location.reload();
                            })
                        }
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}