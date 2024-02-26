/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AdminPageTitle } from "@components/layouts";
import useSchool from "@hooks/useSchool";
import { Card, Col, Form, Input, Row } from "antd";
import { Button } from "flowbite-react";
import i18next from "i18next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CREATE_SCHOOL_FORM_FIELDS } from "./constants";

const onFinishFailed = (errorInfo: any) => {};

const EditSchoolView: React.FC = () => {
  const [form] = Form.useForm();
  const { editSchool, fetchSchool, school } = useSchool(form);

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchSchool(searchParams.get("schoolId") as string);
  }, []);

  return (
    <>
      <AdminPageTitle title={i18next.t("edit_school")} />

      <Row className="form-container">
        <Col span={24}>
          <Card
            className="form-card"
            title={<p className="form-label">{school?.name}</p>}
            bordered={false}
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={school || {}}
              onFinish={editSchool}
              onFinishFailed={() => {}}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <p className="form-label">
                    {CREATE_SCHOOL_FORM_FIELDS.name.label}
                  </p>
                }
                name={CREATE_SCHOOL_FORM_FIELDS.name.key}
                rules={[
                  {
                    required: true,
                    message: CREATE_SCHOOL_FORM_FIELDS.name.errorMsg,
                  },
                ]}
              >
                <Input defaultValue={school?.name} />
              </Form.Item>

              <Form.Item
                label={
                  <p className="form-label">
                    {CREATE_SCHOOL_FORM_FIELDS.description.label}
                  </p>
                }
                name={CREATE_SCHOOL_FORM_FIELDS.description.key}
                rules={[
                  {
                    required: true,
                    message: CREATE_SCHOOL_FORM_FIELDS.description.errorMsg,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  className={"form-submit-btn"}
                  type="submit"
                 
                >
                  {i18next.t("submit")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditSchoolView;
