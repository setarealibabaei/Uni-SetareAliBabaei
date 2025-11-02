interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-stone-800 bg-opacity-50 flex font-IRANSans">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <div>
          <div className="text-lg font-bold text-text">
            آیا از حذف این محصول اطمینان دارید؟
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2  text-black rounded">
            لغو
          </button>

          <button
            className="bg-accent px-4 py-2  text-text-light rounded"
            onClick={() => onConfirm().finally(onClose)}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
