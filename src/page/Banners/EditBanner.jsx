import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import {
  useAddProcedureMutation,
  useUpdateBannerMutation,
  useUpdateProcedureMutation,
} from "../redux/api/productManageApi";
import { imageUrl } from "../redux/api/baseApi";


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
const EditBanner = ({ editModal, setEditModal, selectedProcedure }) => {
  console.log(selectedProcedure);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [updateProcedure] = useUpdateBannerMutation();
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    if (selectedProcedure) {
      form.setFieldsValue({
        name: selectedProcedure?.name,
        description: selectedProcedure?.description,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${selectedProcedure?.imageUrl}`,
        },
      ]);
    }
  }, [selectedProcedure, form]);
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);

    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
     

      const res = await updateProcedure({
        id: selectedProcedure?._id,
        data: formData,
      });
      console.log(res);
      message.success(res.data.message);
      setLoading(false);
      setEditModal(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(message?.data?.error);
      setEditModal(false);
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="">
        <div>
          <div className="font-bold text-center mb-7">Update Banner</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            <Form.Item label="Photos">
              <Upload
                style={{ width: "100%", height: "160px" }}
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

export default EditBanner;
