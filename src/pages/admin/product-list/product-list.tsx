import { Card, Table, Image, Typography, Modal, Row } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";


const { Text } = Typography

interface DataType {
    key: string;
    name: string;
    picture: string;
    type: string;
    description: string;
    price: number;
}

function ProductList(props: any) {

    const { data } = props
    let navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const authToken = localStorage.getItem('token')
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const dataItem: DataType[] = data?.map((item: any) => {
        return {
            key: item?.id,
            name: item?.name,
            picture: item?.picture,
            type: item?.type,
            description: item?.description,
            price: item?.price,
        }
    });

    console.log(`dataItem: ${dataItem}`)


    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: dataItem?.length,
    });

    // Handle page change
    const handleTableChange = (
        pagination: any,
    ) => {
        setPagination(pagination);
    };

    const onEditIconClick = (data: any) => {
        navigate(`edit-product/${data}`);
    };


    const onDeleteIconClick = async (data: any) => {
        setDeleteId(data)
        setIsModalOpen(true)
    };

    const handleOk = async () => {

        setIsModalOpen(false)

        try {
            const response = await axios.delete(`http://localhost:4200/api/products/delete/${deleteId}`, { headers })

            if (response.data != null) {
                setTimeout(function () {
                    Modal.success({
                        title: 'SUCCESSFULLY DELETED',
                        content: 'The product has been deleted.',
                    });
                }, 1000);    
            }

            setTimeout(function () {
                window.location.reload()
            }, 4000);


        } catch (error) {
            console.error('Error uploading image:', error)

            Modal.error({
                title: 'DELETE FAILED',
                content: 'Please try again.',
            });

        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeleteId(null)
    };


    return (
        <>
            <Card
                style={{
                    height: "80vh",
                    padding: "1rem",
                    borderRadius: "2rem",
                    backgroundColor: "rgba(37, 130, 176, 0.906)",
                    flexWrap: "wrap",
                    overflowX: "hidden",
                    paddingTop: "2rem"
                }}
            >
                <Row>
                    <Text style={{ fontSize: "3rem", fontWeight: "bolder", fontFamily: "Mali", paddingBottom: "2rem" }}>รายการสินค้า</Text>
                </Row>

                <Table
                    dataSource={dataItem?.slice(
                        (pagination.current - 1) * pagination.pageSize,
                        pagination.current * pagination.pageSize
                    )}
                    pagination={pagination} // Pass pagination settings directly to the Table component
                    onChange={handleTableChange}
                >
                    <Table.Column title="ชื้อสินค้า" dataIndex="name" key="name" />
                    <Table.Column title="รูปภาพ" dataIndex="picture" key="picture" align="center"
                        render={(_, record: any) => (
                            <Image
                                src={`http://localhost:4200/image/${record?.picture}`}
                                style={{
                                    width: "10rem",
                                    height: "7rem",
                                    borderRadius: "1rem",
                                    objectFit: "cover"
                                }}
                            />
                        )}
                    />
                    <Table.Column title="ประเภท" dataIndex="type" key="type" align="center"
                        render={(_, record: any) => (
                            <>
                                {record?.type == 'shirt' ? <Text>เสื้อ</Text>
                                    : (record?.type == 'sports-pants' ? <Text>กางเกง</Text>
                                        : (record?.type == 'sock' ? <Text>ถุงเท้า</Text>
                                            : (record?.type == 'shoe' ? <Text>ร้องเท้า</Text>
                                                : "-"
                                            )))}
                            </>
                        )} />
                    <Table.Column title="รายละเอียด" dataIndex="description" key="description" />
                    <Table.Column title="ราคา" dataIndex="price" key="price" align="end" />
                    <Table.Column title="แก้ไข" key="action" align="center"
                        render={(_, record: any) => (
                            <EditOutlined
                                style={{ color: "blue" }}
                                onClick={() => onEditIconClick(record?.key)}
                            />
                        )}
                    />
                    <Table.Column title="ลบ" key="action" align="center"
                        render={(_, record: any) => (
                            <>
                                <DeleteOutlined
                                    style={{ color: "red" }}
                                    onClick={() => onDeleteIconClick(record?.key)}
                                />
                                <Modal title="Are you sure you want to delete this product?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
                            </>


                        )}
                    />
                </Table>

            </Card>

        </>
    )
}

export default ProductList