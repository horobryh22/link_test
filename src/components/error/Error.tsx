import {Alert} from 'react-bootstrap';
import {useAppDispatch, useTypedSelector} from '../../hooks';
import {selectError} from '../../store/selectors/app/selectError/selectError';
import {appActions} from '../../store/slices';
import cls from './Error.module.scss';

export const Error = () => {
    const dispatch = useAppDispatch();
    const error = useTypedSelector(selectError);

    const onClose = () => {
        dispatch(appActions.clearError());
    }

    if (error) {
        return (
            <div className={cls.error}>
                <Alert variant="danger" onClose={onClose} dismissible>
                    <Alert.Heading>Произошла ошибка</Alert.Heading>
                    <p>
                        Попробуйте перезагрузить страницу или вернитесь на главную
                    </p>
                </Alert>
            </div>
        );
    }
};