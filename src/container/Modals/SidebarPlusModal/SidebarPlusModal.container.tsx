import { type FC } from 'react';
import IconComponent from '@/components/Icon/Icon.component';
import ModalComponent from '@/components/modal/Modal.component';
import useSidebarModalStore from '@/store/SidebarModal.store';
import repository from '@/repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import './SidebarPlusModal.container.css';

const SidebarPlusModalContainer: FC = () => {
  const { sidebarModalState, toggleSidebarModal, setSidebarModalValue, setSidebarModalColor } = useSidebarModalStore();
  const queryClient = useQueryClient();
  const { mutate: updateCategoryMutate } = useMutation({
    mutationKey: ['updateSidebarCategory'],
    mutationFn: async () => {
      const res = await repository.sidebar.putUpdateSidebarCategory({
        id: sidebarModalState.id,
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarCategory'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: addCategoryMutate } = useMutation({
    mutationKey: ['addSidebarCategory'],
    mutationFn: async () => {
      const res = await repository.sidebar.postAddSidebarCategory({
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarCategory'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationKey: ['deleteSidebarCategory'],
    mutationFn: async () => {
      const res = await repository.sidebar.deleteSidebarCategory({
        id: sidebarModalState.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarCategory'], data);
      toggleSidebarModal(false);
    },
  });

  // Monthly Mutations
  const { mutate: updateMonthlyMutate } = useMutation({
    mutationKey: ['updateSidebarMonthly'],
    mutationFn: async () => {
      const res = await repository.sidebar.putUpdateSidebarMonthly({
        id: sidebarModalState.id,
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarMonthly'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: addMonthlyMutate } = useMutation({
    mutationKey: ['addSidebarMonthly'],
    mutationFn: async () => {
      const res = await repository.sidebar.postAddSidebarMonthly({
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarMonthly'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: deleteMonthlyMutate } = useMutation({
    mutationKey: ['deleteSidebarMonthly'],
    mutationFn: async () => {
      const res = await repository.sidebar.deleteSidebarMonthly({
        id: sidebarModalState.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarMonthly'], data);
      toggleSidebarModal(false);
    },
  });

  // Shared Mutations
  const { mutate: updateSharedMutate } = useMutation({
    mutationKey: ['updateSidebarShared'],
    mutationFn: async () => {
      const res = await repository.sidebar.putUpdateSidebarShared({
        id: sidebarModalState.id,
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarShared'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: addSharedMutate } = useMutation({
    mutationKey: ['addSidebarShared'],
    mutationFn: async () => {
      const res = await repository.sidebar.postAddSidebarShared({
        value: sidebarModalState.value,
        color: sidebarModalState.color,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarShared'], data);
      toggleSidebarModal(false);
    },
  });

  const { mutate: deleteSharedMutate } = useMutation({
    mutationKey: ['deleteSidebarShared'],
    mutationFn: async () => {
      const res = await repository.sidebar.deleteSidebarShared({
        id: sidebarModalState.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['sidebarShared'], data);
      toggleSidebarModal(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarModalValue(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarModalColor(e.target.value);
  };

  const handleUpdate = () => {
    const { editType, currentCategory } = sidebarModalState;

    if (editType === 'edit') {
      if (currentCategory === 'category') updateCategoryMutate();
      if (currentCategory === 'monthly') updateMonthlyMutate();
      if (currentCategory === 'shared') updateSharedMutate();
    } else {
      if (currentCategory === 'category') addCategoryMutate();
      if (currentCategory === 'monthly') addMonthlyMutate();
      if (currentCategory === 'shared') addSharedMutate();
    }
  };

  const handleDelete = () => {
    const { currentCategory } = sidebarModalState;

    if (currentCategory === 'category') deleteCategoryMutate();
    if (currentCategory === 'monthly') deleteMonthlyMutate();
    if (currentCategory === 'shared') deleteSharedMutate();
  };

  return (
    sidebarModalState.isOpen && (
      <ModalComponent>
        <div className="sidebar-modal-plus">
          <header className="sidebar-modal__header">
            <button type="button" className="icon-btn" onClick={() => toggleSidebarModal(false)}>
              <IconComponent icon="icon-close" />
            </button>
            <button type="submit" className="icon-btn" onClick={handleUpdate}>
              <IconComponent icon="icon-check-complete" />
            </button>
          </header>
          <div className="sidebar-modal-plus__contents">
            <form className="sidebar-modal-plus__form">
              <input
                className="sidebar-modal-plus__input"
                type="text"
                name="new"
                id="new"
                value={sidebarModalState.value}
                placeholder={sidebarModalState.placeholder}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="color"
                name="color"
                id="color"
                value={sidebarModalState.color}
                onChange={(e) => handleChangeColor(e)}
              />
            </form>

            <button type="button" className="sidebar-modal__delete-btn" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
      </ModalComponent>
    )
  );
};

export default SidebarPlusModalContainer;
