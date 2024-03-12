import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Button } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
 

  //handle form ' passing as a prop to CategoryForm'

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //creating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("went wrong in form");
    }
  };

  //get all category function
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting all category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // category update/edit function (modle)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("went wrong in updating category");
    }
  };

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("went wrong in updating category");
    }
  };

  return (
    <Layout title={"dashboard-create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1> Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <div class="table-responsive">
                <table className="table caption-top">
                  <caption>List of users</caption>
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <Button
                              type="primary"
                              onClick={() => {
                                setIsModalOpen(true);
                                setUpdatedName(c.name);
                                setSelected(c)
                              }}
                            >
                              Edit
                            </Button>
                            <button className="btn btn-danger ms-2" onClick={()=> handleDelete(c._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
