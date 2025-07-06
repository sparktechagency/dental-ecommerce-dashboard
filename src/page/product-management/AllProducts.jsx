import React, { useState } from "react";
import { Input, Card, Menu, Select } from "antd";
import { Modal, Form, message } from "antd";
import {
  IoSearch,
  IoEyeOutline,
  IoPencil,
  IoTrashOutline,
} from "react-icons/io5";
import { MdClose, MdCloudUpload, MdKeyboardArrowDown } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import t1 from "../../assets/t1.png";
import t2 from "../../assets/t2.jpg";
import t3 from "../../assets/t3.jpg";
import t5 from "../../assets/t5.jpg";
import t6 from "../../assets/t6.png";
import t7 from "../../assets/t7.jpg";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const { Search } = Input;
const { Option } = Select;

const AllProducts = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const products = [
    {
      id: 1,
      image: t1,
      name: "High-speed titanium handpiece",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
      price: 500.0,
      category: "Endodontics",
      brand: "Panora",
    },
    {
      id: 2,
      image: t2,
      name: "LED Curing Light – Cordless & Rechargeable",
      description: "LED Curing Light – Cordless & Rechargeable",
      price: 120.0,
      category: "Restorative",
      brand: "DentLight",
    },
    {
      id: 3,
      image: t3,
      name: "Digital Apex Locator",
      description: "Digital Apex Locator with Precision Sensors",
      price: 230.0,
      category: "Endodontics",
      brand: "ApexPro",
    },
    {
      id: 4,
      image: t1,
      name: "Ultrasonic Scaler – Multi-Tip Compatible",
      description: "Ultrasonic Scaler – Multi-Tip Compatible",
      price: 320.0,
      category: "Periodontics",
      brand: "SonicCare",
    },
    {
      id: 5,
      image: t5,
      name: "Portable X-ray Unit – Battery Operated",
      description: "Portable X-ray Unit – Battery Operated",
      price: 750.0,
      category: "Radiology",
      brand: "XPro",
    },
    {
      id: 6,
      image: t6,
      name: "Rubber Dam Kit – Complete with Clamps & Frame",
      description: "Rubber Dam Kit – Complete with Clamps & Frame",
      price: 80.0,
      category: "Endodontics",
      brand: "SealDent",
    },
    {
      id: 7,
      image: t7,
      name: "Intraoral Camera – HD with USB Connection",
      description: "Intraoral Camera – HD with USB Connection",
      price: 270.0,
      category: "Imaging",
      brand: "ViewDent",
    },
    {
      id: 8,
      image: t1,
      name: "Disposable Saliva Ejectors – Pack of 100",
      description: "Disposable Saliva Ejectors – Pack of 100",
      price: 15.0,
      category: "General",
      brand: "Ejecto",
    },
    {
      id: 9,
      image: t1,
      name: "Fiber Optic Dental Handpiece – Quiet & Lightweight",
      description: "Fiber Optic Dental Handpiece – Quiet & Lightweight",
      price: 460.0,
      category: "Prosthodontics",
      brand: "BrightLite",
    },
    {
      id: 10,
      image: t2,
      name: "Surgical Aspirator Tips – Autoclavable",
      description: "Surgical Aspirator Tips – Autoclavable",
      price: 25.0,
      category: "Surgery",
      brand: "AspiraMed",
    },
    {
      id: 11,
      image: t3,
      name: "Dental Tray Setup Kit – 5 Instruments Included",
      description: "Dental Tray Setup Kit – 5 Instruments Included",
      price: 55.0,
      category: "General",
      brand: "KitDent",
    },
    {
      id: 12,
      image: t1,
      name: "Implant Driver Set – Hex, Torx, Square",
      description: "Implant Driver Set – Hex, Torx, Square",
      price: 290.0,
      category: "Implantology",
      brand: "Implanta",
    },
    {
      id: 13,
      image: t5,
      name: "Cotton Roll Dispenser – Dustproof Lid",
      description: "Cotton Roll Dispenser – Dustproof Lid",
      price: 18.0,
      category: "Operatory",
      brand: "SafeRoll",
    },
    {
      id: 14,
      image: t6,
      name: "Air-Water Syringe Tips – Disposable, 250/box",
      description: "Air-Water Syringe Tips – Disposable, 250/box",
      price: 22.0,
      category: "Operatory",
      brand: "EZTips",
    },
    {
      id: 15,
      image: t7,
      name: "Dental Mirror – Front Surface, Anti-Fog",
      description: "Dental Mirror – Front Surface, Anti-Fog",
      price: 12.0,
      category: "Diagnostic",
      brand: "VisionPro",
    },
    {
      id: 16,
      image: t1,
      name: "Endo Motor with Cordless Handpiece",
      description: "Endo Motor with Cordless Handpiece",
      price: 610.0,
      category: "Endodontics",
      brand: "EndoMax",
      description: "Impression Tray Set – Upper & Lower",
    },
    {
      id: 17,
      image: t2,
      name: "Impression Tray Set – Upper & Lower",
      description: "Impression Tray Set – Upper & Lower",
      price: 40.0,
      category: "Prosthodontics",
      brand: "MoldDent",
    },
    {
      id: 18,
      image: t3,
      name: "Surgical Kit for Implant Placement – Complete System",
      description: "Surgical Kit for Implant Placement – Complete System",
      price: 990.0,
      category: "Surgery",
      brand: "ImplaKit",
    },
    {
      id: 19,
      image: t1,
      name: "Amalgam Carrier – Large Capacity",
      description: "Amalgam Carrier – Large Capacity",
      price: 38.0,
      category: "Restorative",
      brand: "CarryFill",
    },
    {
      id: 20,
      image: t5,
      name: "Dental Articulator – Semi-Adjustable",
      description: "Dental Articulator – Semi-Adjustable",
      price: 310.0,
      category: "Prosthodontics",
      brand: "Articulite",
    },
  ];

  // Extract unique categories for filter
  const categories = [...new Set(products.map((product) => product.category))];

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<IoEyeOutline />}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" icon={<IoPencil />}>
        Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" danger icon={<IoTrashOutline />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const showAddModal = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onAddFinish = (values) => {
    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...values,
      image: values.image?.[0]?.thumbUrl || t1, // Default image if none uploaded
    };

    console.log("New product:", newProduct);

    message.success("Product added successfully!");
    setIsAddModalVisible(false);
  };

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    brand: "Squre Pharma",
    category: "Endodontics",
    procedureGuide: "Root canal",
    availability: "In Stock",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <PageHeading title="All Products" />
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full md:w-auto">
          <div className="flex gap-2">
            <div className="relative w-full md:w-[200px] h-[46px]">
              <Input
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-[46px] pl-12 pr-4 rounded-md border-2 border-[#3b3b3b]"
                prefix={
                  <IoSearch
                    className="text-gray-400 absolute left-3 top-3.5"
                    size={20}
                  />
                }
              />
            </div>
            <Select
              className="w-full md:w-[200px] h-[46px]"
              placeholder="Filter by category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((category) => ({
                  value: category,
                  label: category,
                })),
              ]}
            />
          </div>
          <button
            onClick={showAddModal}
            className="w-full md:w-[200px] p-[10px] bg-[#136BFB] rounded text-white"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
            cover={
              <div className="h-48 bg-gray-50 flex items-center justify-center">
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-full w-full object-contain p-4"
                />
              </div>
            }
          >
            <div className="flex-grow flex flex-col">
              <h1 className="font-medium text-gray-900 line-clamp-2 h-10">
                {product.name}
              </h1>

              <h3 className="font-medium text-[#9F9C96] line-clamp-2 h-14">
                {product.description}
              </h3>
              <div className="mt-auto pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#136BFB]">
                    ${product.price.toFixed(2)}
                  </span>
                  <p className="m-0 text-[#29A366] font-semibold">
                    {product.brand}
                  </p>
                </div>
                <p className="m-0 text-[#9F9C96]">{product.category}</p>
              </div>
            </div>
            <div className="flex justify-start gap-2 mt-4">
              <Link to={`/view-product/${product.id}`}>
                <button
                  className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
                  title="View Details"
                >
                  <IoEyeOutline className="w-6 h-6 text-[#3b3b3b]" />
                </button>
              </Link>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setIsEditModalVisible(true);
                }}
                className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2"
              >
                <BiEditAlt className="w-6 h-6 text-[#3b3b3b]" />
              </button>
              <button className="border-2 border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-2">
                <IoTrashOutline className="w-6 h-6 text-[#3b3b3b]" />
              </button>
            </div>
          </Card>
        ))}
      </div>
      {/* Add Product Modal */}
      {isAddModalVisible && (
        <AddProduct
          isVisible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onAddProduct={(newProduct) => {
            console.log("New product:", newProduct);
            setIsAddModalVisible(false);
          }}
        />
      )}
      {/* Edit Product Modal */}
      {isEditModalVisible && (
        <EditProduct
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          product={selectedProduct}
          onUpdateProduct={(updatedProduct) => {
            console.log("Updated product:", updatedProduct);
            setIsEditModalVisible(false);
          }}
        />
      )}
      {/* <Modal
        title="Edit Product"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        width={700}
      >
        <EditProduct
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          product={selectedProduct}
          onUpdateProduct={(updatedProduct) => {
            console.log("Updated product:", updatedProduct);
            setIsEditModalVisible(false);
          }}
        />
      </Modal> */}
    </div>
  );
};

export default AllProducts;
