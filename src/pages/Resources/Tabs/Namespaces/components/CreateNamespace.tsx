import { Input } from "antd";
import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import { ErrorMessage } from "../../../../../components/globalComponents";
import InputGroup from "../../../../../components/InputGroup";
import { debounce, isEmpty } from "lodash";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface CreateNamespaceProps {
  resetModal: () => void;
  refetchNamespaces: () => void;
  modalClosed: boolean;
}
const CreateNamespace = ({
  resetModal,
  refetchNamespaces,
  modalClosed,
}: CreateNamespaceProps) => {
  const [namespaceName, setNamespaceName] = useState<string>("");
  const [errors, setErrors] = useState<{ namespace: string }>({
    namespace: "",
  });

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (namespaceName) {
        validateNamespace();
      }
    }, 500); // Adjust the debounce delay as needed (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [namespaceName]);

  useEffect(() => {
    if (modalClosed) {
      setNamespaceName("");
    }
  }, [modalClosed]);

  const handleSubmit = async () => {
    if (isEmpty(namespaceName)) {
      setErrors({ namespace: "Namespace name is required" });
      return;
    }
    const namespaceRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
    if (!namespaceRegex.test(namespaceName)) {
      setErrors({ namespace: "Namespace name is invalid" });
      return;
    }

    if (!isEmpty(errors.namespace)) {
      return;
    }

    try {
      const { data: createdNamespace } = await axiosPrivate.post(
        "/kubernetes/namespaces",
        {
          name: namespaceName,
        }
      );
      if (createdNamespace) {
        toast.success("Namespace created successfully");
        setErrors({ namespace: "" });
        resetModal();
        refetchNamespaces();
        setNamespaceName("");
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  const validateNamespace = async () => {
    try {
      const { data: validationResponse } = await axiosPrivate.get(
        `/kubernetes/validateNamespace?name=${namespaceName}`
      );
      console.log({ validationResponse });
      if (!validationResponse.data.success) {
        setErrors({ namespace: "Namespace already exists" });
        return;
      }
      return;
    } catch (err) {
      const error = err as AxiosError;
      setErrors({ namespace: error.message });
    }
  };

  const handleNamespaceChange = (value: string) => {
    if (!isEmpty(errors.namespace)) {
      setErrors({ namespace: "" });
    }
    setNamespaceName(value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <InputGroup>
        <ErrorMessage>{errors.namespace}</ErrorMessage>
        <label htmlFor="namespaceName">Namespace</label>
        <Input
          type="text"
          id="namespaceName"
          placeholder="Namespace name..."
          value={namespaceName}
          onChange={(e: { target: { value: string } }) =>
            handleNamespaceChange(e.target.value)
          }
        />
      </InputGroup>
      <Button full={false} type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateNamespace;
