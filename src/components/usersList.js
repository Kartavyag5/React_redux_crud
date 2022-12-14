/** @format */

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Pagination,
  Popconfirm,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUser } from "../redux/userSlice";
import axios from "axios";

const UsersList = () => {
  const pageSize = 3;
  const [paginationData, setPaginationData] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const [editUser, setEditUser] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const Users = useSelector((state) => state.users.users);
  console.log("Users", Users);

  const handlePagination = (page) => {
    setPaginationData({
      ...paginationData,
      data: Users,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  const confirm = (e, id) => {
    console.log(e);
    message.success("User Deleted successfully");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("deletion cancel");
  };

  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((res) => {
      dispatch(getUsers(res.data.data));
      setPaginationData({
        data: res.data.data,
        totalPage: res.data.data.length / pageSize,
        minIndex: 0,
        maxIndex: pageSize,
      });
    });
  }, []);

  useEffect(() => {
    setSearchResult(
      Users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase()) ||
          user.first_name
            .concat(" ", user.last_name)
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  }, [search]);

  const onFinish = () => {
    dispatch(updateUser(editUser));
    message.success("user Updated");
    setEdit(false);
    setEditUser({});
    form.resetFields();
  };

  const UserCard = (props) => (
    <div key={props.user.id} style={{ margin: "10px" }}>
      <Card
        hoverable
        style={{
          width: 300,
        }}
        cover={<img alt='avatar' src={props.user.avatar} />}>
        <h1>
          {props.user.first_name} {props.user.last_name}
        </h1>
        <Button
          onClick={() => {
            setEdit(true);
            setEditUser(props.user);
            form.resetFields();
          }}>
          Edit
        </Button>{" "}
        <Popconfirm
          title='Are you sure to delete this User?'
          onConfirm={() => {
            confirm();
            dispatch(deleteUser(props.user.id));
          }}
          onCancel={cancel}
          okText='Yes'
          cancelText='No'>
          <Button danger>Delete</Button>
        </Popconfirm>
      </Card>
    </div>
  );

  return (
    <>
      <h1>Users List</h1>
      <>
        <Input
          placeholder='Search here'
          style={{ width: "400px", marginBottom: "10px" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </>
      <div>
        <Pagination
          pageSize={pageSize}
          current={paginationData.current}
          total={paginationData.data.length}
          onChange={handlePagination}
          style={{ bottom: "0px", marginBottom: "10px" }}
        />
        {!search
          ? Users.map(
              (user, i) =>
                i >= paginationData.minIndex &&
                i < paginationData.maxIndex && (
                  <UserCard user={user} key={user.id} />
                )
            )
          : searchResult.map(
              (user, i) =>
                i >= paginationData.minIndex &&
                i < paginationData.maxIndex && (
                  <UserCard user={user} key={user.id} />
                )
            )}
        <Pagination
          pageSize={pageSize}
          current={paginationData.current}
          total={paginationData.data.length}
          onChange={handlePagination}
          style={{ bottom: "0px", marginBottom: "10px" }}
        />
      </div>
      <Modal
        title='Edit User Form'
        open={edit}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onOk={() => {
          form.resetFields();
          setEdit(false);
          setEditUser({});
        }}
        onCancel={() => {
          form.resetFields();
          setEdit(false);
          setEditUser({});
        }}>
        {/* <Form
          form={form}
          name='Edit Form'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          initialValues={{
            first_name: edit && editUser?.first_name,
            last_name: edit && editUser?.last_name,
            avatar: edit && editUser?.avatar,
          }}
          preserve={false}>
          <Form.Item
            label='Firstname'
            name='first_name'
            rules={[
              {
                required: false,
                message: "Please input your First name!",
              },
            ]}>
            <Input
              onChange={(e) =>
                setEditUser({ ...editUser, first_name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label='Lastname'
            name='last_name'
            rules={[
              {
                required: false,
                message: "Please input your lastname!",
              },
            ]}>
            <Input
              onChange={(e) =>
                setEditUser({ ...editUser, last_name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label='Avatar Url'
            name='avatar'
            rules={[
              {
                required: false,
                message: "Please input avatar Url",
              },
            ]}>
            <Input
              onChange={(e) =>
                setEditUser({ ...editUser, avatar: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <form>
          <div>
            <div style={{ display: "flex", margin: "10px" }}>
              <div style={{ marginRight: "10px" }}>First Name :</div>
              <div>
                <input
                  style={{
                    width: "200px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                  type='text'
                  name='first_name'
                  value={editUser.first_name}
                  onChange={(e) => {
                    setEditUser({ ...editUser, first_name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "10px" }}>
              <div style={{ marginRight: "10px" }}>Last Name :</div>
              <div>
                <input
                  style={{
                    width: "200px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                  type='text'
                  name='last_name'
                  value={editUser.last_name}
                  onChange={(e) => {
                    setEditUser({ ...editUser, last_name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "10px" }}>
              <div style={{ marginLeft: "25px", marginRight: "10px" }}>
                {" "}
                Avatar :
              </div>
              <div>
                {" "}
                <input
                  style={{
                    width: "300px",
                    height: "25px",
                    borderRadius: "6px",
                  }}
                  type='text'
                  name='avatar'
                  value={editUser.avatar}
                  onChange={(e) => {
                    setEditUser({ ...editUser, avatar: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            style={{ marginLeft: "92px" }}
            type='primary'
            onClick={(e) => {
              e.preventDefault();
              dispatch(updateUser(editUser));
              setEdit(false);
            }}>
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UsersList;
