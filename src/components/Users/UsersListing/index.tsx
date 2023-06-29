import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { User } from "../types";
import { Dropdown, MenuProps, Table } from "antd";
import {
  ActionsElipsis,
  FooterButtons,
  StyledTable,
} from "../../globalComponents";
import { Modal } from "antd";
import HandleUser from "../HandleUser/HandleUser";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import DefaultButton from "../../DefaultButton";
import { ColumnsType } from "antd/lib/table";
import ModuleTitle from "../../ModuleTitle";
import SocketContext from "../../../context/SocketContext/SocketContext";

export type UserCreatePayload = {
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "USER";
};
const UsersListing = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on("message", (data: any) => {
      console.log(data);
    });
  }, [socket]);
  useEffect(() => {
    if (firstRender || trigger) {
      (async () => {
        try {
          const response = await axiosPrivate.get("/users");
          console.log({ response: response.data });
          const users = response.data;
          setData(
            users.map((u: any, index: number) => ({ ...u, index: index + 1 }))
          );
          setFirstRender(false);
          setTrigger(false);
        } catch (error) {
          console.log({ error });
        }
      })();
    }
  }, [trigger, firstRender]);

  const resetModal = () => {
    setModalContent(null);
    setModalTitle("");
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          style={{ width: "100%" }}
          onClick={() => {
            handleEditUser();
          }}
        >
          Edit
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            handleModalResendInvitation();
          }}
        >
          Resend Invitation
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            handleModalDeleteUser();
          }}
        >
          Delete
        </span>
      ),
    },
  ];

  interface UserColumn {
    title: string;
    dataIndex: string;
    key?: string;
    render?: (_: any, row: User) => React.ReactNode;
  }
  const columns = [
    {
      title: "Id",
      dataIndex: "index",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Active",
      key: "active",
      render: (_: any, row: User) => {
        return (
          <span>
            {row.active ? (
              <CheckCircleOutlined
                style={{ color: "green", fontSize: "24px" }}
              />
            ) : (
              <CloseCircleOutlined style={{ color: "red", fontSize: "24px" }} />
            )}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: User) => (
        <Dropdown
          menu={{ items }}
          onOpenChange={(val) => {
            if (val) {
              setSelectedUser(row);
            } else {
              setSelectedUser({} as User);
            }
          }}
        >
          <ActionsElipsis />
        </Dropdown>
      ),
    },
  ] as ColumnsType<any>;

  const handleCreateUser = async (payload: UserCreatePayload) => {
    try {
      const response = await axiosPrivate.post("/users/invite", payload);
      toast.success("User created successfully");
      setTrigger(true);
      resetModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.log({ err });
    }
  };

  const handleUpdateUser = async (payload: UserCreatePayload) => {
    try {
      const id = selectedUser._id;
      const response = await axiosPrivate.put(`users/${id}`, payload);
      toast.success("User updated successfully");
      setTrigger(true);
      resetModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.log({ err });
    }
  };

  const handleAddNewUser = () => {
    setModalTitle("Add new user");
    setModalContent(
      <HandleUser
        onSubmit={(data: UserCreatePayload) => {
          handleCreateUser(data);
        }}
        buttonName={"Inivte User"}
      />
    );
    setIsModalOpen(true);
  };

  const handleEditUser = () => {
    setIsModalOpen(true);
    setModalTitle(`Edit User: ${selectedUser.email}`);
    setModalContent(
      <HandleUser
        user={selectedUser}
        onSubmit={(data: UserCreatePayload) => {
          handleUpdateUser(data);
        }}
        buttonName={"Update User"}
      />
    );
  };

  const deleteUser = async () => {
    try {
      const id = selectedUser._id;
      const response = await axiosPrivate.delete(`users/${id}`);
      toast.success("User deleted successfully");
      setTrigger(true);
      resetModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.log({ err });
    }
  };
  const handleModalDeleteUser = () => {
    setIsModalOpen(true);
    setModalTitle(`Are you sure you want to delete ${selectedUser.email}?`);
    setModalContent(
      <FooterButtons>
        <span
          onClick={() => {
            resetModal();
          }}
        >
          No
        </span>
        <span
          onClick={() => {
            deleteUser();
          }}
        >
          Yes
        </span>
      </FooterButtons>
    );
  };

  const resendInvitation = async () => {
    try {
      const id = selectedUser._id;
      const response = await axiosPrivate.post(`users/${id}/resend-invitation`);
      toast.success("Invitation sent successfully");
      setTrigger(true);
      resetModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.log({ err });
    }
  };
  const handleModalResendInvitation = () => {
    setIsModalOpen(true);
    setModalTitle(
      `Are you sure you want to resend invitation to ${selectedUser.email}?`
    );
    setModalContent(
      <FooterButtons>
        <span
          onClick={() => {
            resetModal();
          }}
        >
          No
        </span>
        <span
          onClick={() => {
            resendInvitation();
          }}
        >
          Yes
        </span>
      </FooterButtons>
    );
  };
  return (
    <div>
      <ModuleTitle title="Users Listing" backButtonPath="/settings" />
      <DefaultButton
        title="  Create user"
        onClick={(e) => {
          e.preventDefault();
          handleAddNewUser();
        }}
      />

      <StyledTable
        columns={columns}
        dataSource={data}
        rowClassName={() => "custom-row"}
      ></StyledTable>
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
    </div>
  );
};

export default UsersListing;
