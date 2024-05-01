import { Typography, Card, Row, Col, Input, Button, Form, Select, Upload, Modal } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Text } = Typography
const { Option } = Select
const { TextArea } = Input

type FieldType = {
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    picture?: string;
};


function EditProduct() {

    const authToken = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
    };

    const { productID } = useParams();
    const [initialValues, setInitialValues] = useState<any>({});
    const [fileList, setFileList] = useState<any>([]);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState(initialValues);

    const handleInputChange = (fieldName: any, value: any) => {
        setFormValues({ ...formValues, [fieldName]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4200/api/product-details/${productID}`);
                const data = response.data;
                setInitialValues(data);

                if (data?.picture) {
                    setCurrentImage(`http://localhost:4200/image/${data.picture}`)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    const onFinish = async (values: any) => {
        try {
            const editedData: any = { ...initialValues }
            Object.keys(formValues).forEach((key) => {
                // Only include fields that have been edited by the user
                if (formValues[key] !== initialValues[key]) {
                    editedData[key] = formValues[key];
                }
            });

            const { name, type, price, description } = editedData
            const { picture } = values

            const formData = new FormData()

            formData.append('name', name)
            formData.append('type', type)
            formData.append('price', price)
            formData.append('description', description)

            console.log(`picture: ${picture}`)
            if (picture != null) {
                formData.append('image', picture[0]?.originFileObj)
            }

            const response = await axios.put(`http://localhost:4200/api/products/update/${productID}`, formData, { headers })

            if (response.data != null) {
                Modal.success({
                    title: 'UPDATE SUCCESSFUL',
                    content: 'Information has been updated.',
                });
            }

            setTimeout(function () {
                window.location.reload()
            }, 3000);

        } catch (error) {
            console.error('Error uploading image:', error)

            Modal.error({
                title: 'UPDATE FAILED',
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
                paddingTop: "3vh"
            }}
        >
            <Card
                style={{
                    height: "70vh",
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
                        แก้ไขข้อมูลสินค้า
                    </Text>
                </Row>

                <Form
                    name="edit_product"
                    encType="multipart/form-data"
                    method="put"
                    form={form}
                    onFinish={onFinish}
                >
                    <Row>
                        <Form.Item<FieldType>
                            name="name"
                            label="ชื้อสินค้า"
                            initialValue={initialValues?.name}
                            style={{
                                width: "92%"
                            }}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <Input
                                name="name"
                                value={formValues.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item<FieldType>
                                name="type"
                                label="ประเภทสินค้า"
                                initialValue={initialValues?.type}
                                style={{
                                    width: "100%"
                                }}
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Select 
                                    placeholder="เลือกประเภทสินค้า" 
                                    onChange={(value) => handleInputChange('type', value)}
                                >
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
                                initialValue={initialValues?.price}
                            >
                                <Input
                                    placeholder="หน่วยเป็นบาท"
                                    value={formValues.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                    </Row>
                    <Row>
                        <Form.Item<FieldType>
                            name="description"
                            label="รายละเอียดสินค้า"
                            initialValue={initialValues?.description}
                            style={{
                                width: "92%"
                            }}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <TextArea
                                rows={3}
                                value={formValues.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            label="รูปภาพ"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <img src={currentImage} alt="Current" style={{ maxWidth: '200px', borderRadius: '5%' }} />
                            </div>
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
                                name="image"
                                accept="image/*"
                                maxCount={1}
                                beforeUpload={() => false} // Prevent default upload behavior
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
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
                                    แก้ไขรายการสินค้า
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

export default EditProduct