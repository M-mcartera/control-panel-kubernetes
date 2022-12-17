import React, { useEffect, useState } from 'react';
import Card from '../../../components/Card/Card';
import { isEmpty, isEqual, trim } from 'lodash';
import { format } from 'date-fns';
import { Divider, Input, Select, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import Error from '../../../components/Error/Error';
import {
  HeadButtons,
  HeadTitle,
  HeadWrapper,
  AntdDivider,
  InputLabel
} from './UserEditView.styled';
import {
  FormButtonsWrapper,
  FormCancelButton,
  FormSubmitButton,
  FormWrapper,
  Row
} from '../../../theme/GlobalComponents';

import DeleteButton from '../../../components/Buttons/DeleteButton';
import { USERS_LISTING } from '../../../routes/RoutePaths';
import { validateEmail } from '../../../utils';

const { Option } = Select;
const UsersEditView = ({
  onLoad,
  user,
  roles,
  updateUser,
  deleteUser,
  createUser
}) => {
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  const [formData, setFormData] = useState({
    createdOn: '',
    email: '',
    username: '',
    password: '',
    reTypePassword: '',
    roles: []
  });
  const [changed, setChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const setFormDefault = () => {
    setFormData(prevState => {
      return {
        ...prevState,
        createdOn: '',
        email: '',
        username: '',
        password: '',
        reTypePassword: '',
        roles: []
      };
    });
  };

  const handleResetForm = () => {
    if (isNew) {
      setFormDefault();
    } else {
      setFormData(prevState => {
        return {
          ...prevState,
          createdOn: format(new Date(user.createdTimestamp), 'eeee, io yyyy'),
          email: user.email,
          username: user.username,
          roles: user.roles
        };
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      if (user.isNew) {
        setIsNew(true);
        setFormDefault();
      } else {
        handleResetForm();
      }
    }
  }, [user, roles]);

  const handleChange = (field, value) => {
    if (!isEmpty(errors[field])) {
      setErrors(prevState => {
        delete prevState[field];
        return prevState;
      });
    }
    setFormData(prevState => {
      return {
        ...prevState,
        [field]: value
      };
    });
  };

  const checkIsChanged = formValues => {
    if (!isEmpty(formValues.password) || !isEmpty(formValues.reTypePassword)) {
      return true;
    }

    const {
      createdTimestamp: createdOn = '',
      username = '',
      email = '',
      roles = []
    } = user;

    const compareInitialValues = {
      createdOn: createdOn ? format(new Date(createdOn), 'eeee, io yyyy') : '',
      username,
      email,
      roles
    };

    const compareFormValues = {
      createdOn: formValues.createdOn,
      username: formValues.username,
      email: formValues.email,
      roles: formValues.roles
    };

    return !isEqual(compareFormValues, compareInitialValues);
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      setChanged(checkIsChanged(formData));
    }
  }, [formData]);

  const handleCancelButton = () => {
    history.push(USERS_LISTING);
  };

  const validate = () => {
    const errors = {};
    const requiredFields = ['username', 'email', 'roles'];
    if (isNew) {
      requiredFields.push('password', 'reTypePassword');
    }
    requiredFields.forEach(field => {
      if (isEmpty(trim(formData[field]))) {
        errors[field] = 'This field is required';
      } else {
        delete errors[field];
      }
    });

    if (!validateEmail(formData.email)) {
      errors['email'] = 'Invalid email';
    }

    if (!isEmpty(formData.password)) {
      if (isEmpty(formData.reTypePassword)) {
        errors['reTypePassword'] = 'This field is required';
      } else {
        if (
          formData.password.trim().toLowerCase() !==
          formData.reTypePassword.trim().toLowerCase()
        ) {
          errors['reTypePassword'] = 'Re-typed password should match';
        }
      }
    }

    if (isEmpty(errors)) {
      return true;
    }

    setErrors(errors);
    return false;
  };

  const handleSubmit = () => {
    const validaTeResponse = validate();

    if (validaTeResponse) {
      if (isNew) {
        createUser(formData);
      } else {
        updateUser(formData);
      }
    }
  };

  if (isEmpty(user)) {
    return <></>;
  }

  return (
    <Card>
      <HeadWrapper>
        <HeadTitle>
          {isNew ? 'Create new user' : `Edit ${user.username}'s details`}
        </HeadTitle>
        <HeadButtons>
          <DeleteButton
            onDelete={() => {
              setIsVisible(true);
            }}
          />
        </HeadButtons>
      </HeadWrapper>
      <AntdDivider />

      <FormWrapper>
        {!isNew ? (
          <Row>
            <div>
              <InputLabel>Created on</InputLabel>
              <div>
                <Input disabled value={formData.createdOn} />
              </div>
            </div>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <div>
            <InputLabel>Username</InputLabel>
            <div>
              <Input
                disabled={!isNew}
                value={formData.username}
                onChange={e => {
                  handleChange('username', e.target.value);
                }}
              />
            </div>
            <Error error={errors.username} />
          </div>
        </Row>
        <Row>
          <div>
            <InputLabel>Email</InputLabel>
            <div>
              <Input
                onChange={e => {
                  handleChange('email', e.target.value);
                }}
                value={formData.email}
              />
            </div>
            <Error error={errors.email} />
          </div>
        </Row>

        <Row>
          <div>
            <InputLabel>Password</InputLabel>
            <div>
              <Input
                type="password"
                onChange={e => {
                  handleChange('password', e.target.value);
                }}
                value={formData.password}
              />
            </div>
            <Error error={errors.password} />
          </div>
        </Row>
        <Row>
          <div>
            <InputLabel>Retype Password</InputLabel>
            <div>
              <Input
                type="password"
                onChange={e => {
                  handleChange('reTypePassword', e.target.value);
                }}
                value={formData.reTypePassword}
              />
            </div>
            <Error error={errors.reTypePassword} />
          </div>
        </Row>
        <Row>
          <div>
            <InputLabel>Roles</InputLabel>
            <div>
              <Select
                onChange={values => {
                  handleChange('roles', values);
                }}
                mode="multiple"
                placeholder="Select roles"
                showArrow
                value={formData.roles}
              >
                {roles.map(role => (
                  <Option key={role.name} value={role.name}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Error error={errors.roles} />
          </div>
        </Row>
        <Divider />
        <FormButtonsWrapper>
          <FormCancelButton
            onClick={() => {
              handleCancelButton();
            }}
          >
            Cancel
          </FormCancelButton>
          <FormCancelButton onClick={() => handleResetForm()}>
            Reset
          </FormCancelButton>
          <FormSubmitButton
            disabled={!changed}
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </FormSubmitButton>
        </FormButtonsWrapper>
      </FormWrapper>
      <Modal
        centered
        open={isVisible}
        onOk={() => {
          deleteUser();
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
      >
        Are you sure you want to remove this user?
      </Modal>
    </Card>
  );
};

export default UsersEditView;
