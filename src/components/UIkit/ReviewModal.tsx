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
import { FirebaseTimestamp } from '../../firebase';

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
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    createReviewComment({
      text: formData.comment,
      uid: user!.uid,
      radioId: radio.radioId,
      createdAt: FirebaseTimestamp.now(),
      updatedAt: FirebaseTimestamp.now(),
    }).then(() => {
      openMessage('レビューを投稿しました', 'success');
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered={true}>
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
