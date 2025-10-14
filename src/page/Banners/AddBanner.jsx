import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useAddBannerMutation, useAddProcedureMutation } from "../redux/api/productManageApi";

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};
const AddBanner = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [addProcedure] = useAddBannerMutation();
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);

    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });

      const res = await addProcedure(formData);
      console.log(res);
      message.success(res.data.message);
      setLoading(false);
      setOpenAddModal(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(message?.data?.error);
      setOpenAddModal(false);
    } finally {
      setLoading(false);
      setOpenAddModal(false);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className=" ">
        <div>
          <div className="font-bold text-center mb-7">+ Add Banner</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className=""
          >
          


            <Form.Item label="Photos">
              <Upload
              style={{width:'100%' , height:'160px'}}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={true}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </Form.Item>

            {/* Save Button */}
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-[#E63946] text-white rounded-md"
              >
                {loading ? <Spin size="small" /> : "Add"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddBanner;
