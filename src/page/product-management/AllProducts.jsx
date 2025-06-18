import React from 'react';
import { Input, Select, Button, Card, Tag, Dropdown, Menu } from 'antd';
import {
          IoSearch,
          IoEllipsisVertical,
          IoEyeOutline,
          IoPencil,
          IoTrashOutline,
          IoAddOutline,
} from 'react-icons/io5';
import PageHeading from '../../shared/PageHeading';

const { Search } = Input;
const { Option } = Select;

const AllProducts = () => {
          // Dummy product data matching the image
          const products = [
                    {
                              id: 1,
                              image: 'https://via.placeholder.com/150', // Replace with actual image path
                              name: 'High-speed titanium handpiece with quattro spray, ergonomic grip',
                              price: 500.00,
                              category: 'Endodontics',
                              brand: 'Panora',
                    }
          ];


          const menu = (
                    <Menu>
                              <Menu.Item key="1" icon={<IoEyeOutline />}>View Details</Menu.Item>
                              <Menu.Item key="2" icon={<IoPencil />}>Edit</Menu.Item>
                              <Menu.Divider />
                              <Menu.Item key="3" danger icon={<IoTrashOutline />}>Delete</Menu.Item>
                    </Menu>
          );

          return (
                    <div className="p-6">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                        <PageHeading title="All Products" />
                                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                                  <Search
                                                            placeholder="Search products..."
                                                            allowClear
                                                            enterButton={<IoSearch />}
                                                            className="w-full md:w-64"
                                                  />
                                                  <Button
                                                            type="primary"
                                                            icon={<IoAddOutline />}
                                                            className="w-full md:w-auto"
                                                  >
                                                            Add New Product
                                                  </Button>
                                        </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {products.map((product) => (
                                                  <Card
                                                            key={product.id}
                                                            className="h-full flex flex-col"
                                                            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                                                            cover={
                                                                      <div className="h-48 bg-gray-100 flex items-center justify-center relative group">
                                                                                <img
                                                                                          alt={product.name}
                                                                                          src={product.image}
                                                                                          className="h-full w-full object-contain p-4"
                                                                                />
                                                                      </div>
                                                            }
                                                  >
                                                            <div className="flex-grow">
                                                                      <div className="flex justify-between items-start mb-2">
                                                                                <Tag color="blue" className="m-0">{product.brand}</Tag>
                                                                                <Dropdown overlay={menu} trigger={['click']}>
                                                                                          <Button
                                                                                                    type="text"
                                                                                                    icon={<IoEllipsisVertical />}
                                                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                                                          />
                                                                                </Dropdown>
                                                                      </div>

                                                                      <h3 className="font-medium text-gray-900 line-clamp-2 h-14">
                                                                                {product.name}
                                                                      </h3>

                                                                      <div className="mt-2">
                                                                                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                                                                {product.originalPrice && (
                                                                                          <span className="ml-2 text-sm text-gray-500 line-through">
                                                                                                    ${product.originalPrice.toFixed(2)}
                                                                                          </span>
                                                                                )}
                                                                      </div>

                                                                      <div className="flex justify-between items-center mt-2">
                                                                                <span className="text-sm text-gray-500">{product.category}</span>
                                                                      </div>
                                                            </div>
                                                  </Card>
                                        ))}
                              </div>
                    </div>
          );
};

export default AllProducts;