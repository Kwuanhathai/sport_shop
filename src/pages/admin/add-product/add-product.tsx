import { Typography, Card, Row, Col, Input, Button, Form, Select, Upload, Modal } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"

const { Text } = Typography
const { Option } = Select
const { TextArea } = Input

type FieldType = {
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    picture?: any;
};

const addUrl = "https://sport-shop-8.onrender.com/api/products/add"

function AddProduct() {
    const authToken = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
    };

    const onFinish = async (values: any) => {
        // Extract the image file and other form values
        const { name, type, price, description, picture } = values
  
        // Create a new FormData object
        const formData = new FormData()
        formData.append('name', name)
        formData.append('type', type)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', picture[0]?.originFileObj)

        try {
            const response = await axios.post(addUrl, formData, { headers })

            if (response.data != null) {

                Modal.success({
                    title: 'SUCCESSFULLY UPLOADED',
                    content: 'The product list has been uploaded',
                });
            }

            setTimeout(function () {
                // window.location.reload()
                history.go(0)
            }, 3000);


        } catch (error) {
            console.error('Error uploading image:', error)

            Modal.error({
                title: 'UPLOAD FAILED',
                content: 'Please try again.',
            });

        }
    };


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                paddingTop: "5vh"
            }}
        >
            <Card
                style={{
                    height: "60vh",
                    width: "50vw",
                    padding: "1rem",
                    paddingTop: "2rem",
                    borderRadius: "2rem",
                    backgroundColor: "rgba(37, 130, 176, 0.906)",
                    flexWrap: "wrap",
                    overflowX: "hidden"
                }}
            >
                <Row>
                    <Text
                        style={{
                            fontSize: "2.4rem",
                            fontFamily: "mali",
                            fontWeight: "bold",
                            paddingBottom: "3rem"
                        }}
                    >
                        เพิ่มข้อมูลสินค้า
                    </Text>
                </Row>

                <Form
                    name="upload_product"
                    encType="multipart/form-data"
                    method="post"
                    onFinish={onFinish}
                >
                    <Row>
                        <Form.Item<FieldType>
                            name="name"
                            label="ชื้อสินค้า"
                            style={{
                                width: "92%"
                            }}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <Input></Input>

                        </Form.Item>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item<FieldType>
                                name="type"
                                label="ประเภทสินค้า"
                                style={{
                                    width: "100%"
                                }}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Select placeholder="เลือกประเภทสินค้า">
                                    <Option value="shirt">เสื้อ</Option>
                                    <Option value="sports-pants">กางเกง</Option>
                                    <Option value="sock">ถุงเท้า</Option>
                                    <Option value="shoe">ร้องเท้า</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={1} />
                        <Col span={10}>
                            <Form.Item<FieldType>
                                name="price"
                                label="ราคาสินค้า"
                            >
                                <Input placeholder="หน่วยเป็นบาท"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                    </Row>
                    <Row>
                        <Form.Item<FieldType>
                            name="description"
                            label="รายละเอียดสินค้า"
                            style={{
                                width: "92%"
                            }}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <TextArea />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item<FieldType>
                            name="picture"
                            label="ไฟล์ภาพ"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                            style={{
                                width: "92%"
                            }}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <Upload
                                name="file"
                                listType="picture"
                                beforeUpload={() => false}
                                action={addUrl}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>

                            </Upload>
                        </Form.Item>
                    </Row>
                    <Row justify="end">
                        <Col>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    style={{ backgroundColor: "#b0c9d1" }}
                                >
                                    เพิ่มรายการสินค้า
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                    </Row>
                </Form>

            </Card>
        </div>
    )
}

export default AddProduct