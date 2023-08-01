import { Dropdown, MenuProps, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  ActionsElipsis,
  StyledTable,
} from "../../../../../components/globalComponents";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import DefaultButton from "../../../../../components/DefaultButton";
import CreateNamespace from "./CreateNamespace";
import EditNamespace from "./EditNamespace";

export interface Namespace {
  index?: number;
  name: string;
  status: string;
  creationTimeStamp: Date;
}
const NamespacesListing = () => {
  const axiosPrivate = useAxiosPrivate();
  const [axiosError, setAxiosError] = useState<string>("");
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<Namespace>(
    {} as Namespace
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [modalClosed, setModalClosed] = useState<boolean>(false);

  const resetModal = () => {
    setModalContent(null);
    setModalTitle("");
    setIsModalOpen(false);
    setModalClosed(true);
    setTimeout(() => {
      setModalClosed(false);
    }, 300);
  };

  useEffect(() => {
    if (firstRender || trigger) {
      (async () => {
        try {
          const { data: namespacesResponse } = await axiosPrivate.get(
            "/kubernetes/namespaces"
          );
          setNamespaces(
            namespacesResponse.data.map((ns: Namespace, index: number) => {
              return { index: index + 1, ...ns };
            })
          );
          setFirstRender(false);
          setTrigger(false);
        } catch (err) {
          const error = err as AxiosError;
          setAxiosError(error.message);
        }
      })();
    }
  }, [firstRender, trigger]);

  useEffect(() => {
    if (axiosError) {
      toast.error(axiosError);
    }
  }, [axiosError]);

  const handleEditNamespace = () => {
    setModalTitle(`Edit namespace ${selectedNamespace.name}`);
    setModalContent(<EditNamespace namespace={selectedNamespace} />);
    setIsModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          style={{ width: "100%" }}
          onClick={() => {
            handleEditNamespace();
          }}
        >
          Edit
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            // handleModalDeleteUser();
          }}
        >
          Delete
        </span>
      ),
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "index",
      key: "id",
    },
    {
      title: "Namespace",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTimeStamp",
      key: "creationTimeStamp",
      render: (creationTimeStamp: Date) => (
        <span>{dayjs(creationTimeStamp).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: Namespace) => (
        <Dropdown
          menu={{ items }}
          onOpenChange={(val) => {
            if (val) {
              setSelectedNamespace(row);
            } else {
              setSelectedNamespace({} as Namespace);
            }
          }}
        >
          <ActionsElipsis />
        </Dropdown>
      ),
    },
  ] as ColumnsType<any>;

  const refetchNamespaces = () => {
    setTrigger(true);
  };

  const handleCreateNamespace = () => {
    setModalTitle("Create Namespace");
    setModalContent(
      <CreateNamespace
        resetModal={resetModal}
        refetchNamespaces={refetchNamespaces}
        modalClosed={modalClosed}
      />
    );
    setIsModalOpen(true);
  };

  return (
    <>
      <DefaultButton
        title="Create Namespace"
        onClick={(e) => {
          e.preventDefault();
          handleCreateNamespace();
        }}
      />
      <StyledTable
        columns={columns}
        dataSource={namespaces}
        rowClassName={() => "custom-row"}
      />
      <Modal
        title={modalTitle}
        open={isModalOpen}
        footer={null}
        maskClosable={false}
        centered
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          resetModal();
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default NamespacesListing;
