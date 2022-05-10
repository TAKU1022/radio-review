import React from 'react';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Radio } from '@/types/radikoProgram';
import { useUser } from '../../hooks/useUser';
import { createReviewComment } from '../../firebase/db/comment';
import { useMessage } from '../../hooks/useMessage';
import storage from 'store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  radio: Radio;
};

type FormData = {
  comment: string;
};

export const ReviewModal: React.FC<Props> = ({ isOpen, onClose, radio }) => {
  const { user } = useUser();
  const { openMessage } = useMessage();
  const { register, getValues, handleSubmit, reset, formState } =
    useForm<FormData>();

  const onCloseModal = () => {
    onClose();

    if (!formState.isSubmitted) {
      storage.set(radio.radioId, getValues('comment'));
    }
  };

  const onSubmit = (formData: FormData) => {
    createReviewComment({
      text: formData.comment,
      uid: user!.uid,
      radioId: radio.radioId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      reset();
      storage.remove(radio.radioId);
      openMessage('レビューを投稿しました', 'success');
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={'xl'} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>レビュー</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id={'review'} onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register('comment')}
              defaultValue={storage.get(radio.radioId)}
              placeholder={'コメントを記入'}
              rows={10}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type={'submit'} form={'review'} colorScheme={'blue'}>
            投稿
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
