/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AdminPageTitle } from "@components/layouts";
import useProgram from "@hooks/useProgram";
import { Card, Col, Form, Input, Row, Select } from "antd";
import { Button } from "flowbite-react";
import i18next from "i18next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CREATE_PROGRAM_FORM_FIELDS } from "./constants";
import useSchool from "@hooks/useSchool";

const EditProgramView: React.FC = () => {
  const [form] = Form.useForm();
  const { editProgram, fetchProgramById, program } = useProgram(form);
  const { fetchSchools, schools } = useSchool();

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProgramById({
      programId: searchParams.get("programId") as string,
      withMetaData: true,
    });

    fetchSchools({});
  }, []);

  return (
    <>
      <AdminPageTitle title={i18next.t("edit_program")} />

      <Row className="form-container">
        <Col span={24}>
          <Card
            className="form-card"
            title={<p className="form-label">{program?.name}</p>}
            bordered={false}
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={program || {}}
              onFinish={editProgram}
              onFinishFailed={() => {}}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <p className="form-label">
                    {CREATE_PROGRAM_FORM_FIELDS.name.label}
                  </p>
                }
                name={CREATE_PROGRAM_FORM_FIELDS.name.key}
                rules={[
                  {
                    required: true,
                    message: CREATE_PROGRAM_FORM_FIELDS.name.errorMsg,
                  },
                ]}
              >
                <Input defaultValue={program?.name} />
              </Form.Item>

              <Form.Item
                label={
                  <p className="form-label">
                    {CREATE_PROGRAM_FORM_FIELDS.description.label}
                  </p>
                }
                name={CREATE_PROGRAM_FORM_FIELDS.description.key}
                rules={[
                  {
                    required: true,
                    message: CREATE_PROGRAM_FORM_FIELDS.description.errorMsg,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <p className="form-label">
                    {CREATE_PROGRAM_FORM_FIELDS.school.label}
                  </p>
                }
                name={CREATE_PROGRAM_FORM_FIELDS.school.key}
                rules={[
                  {
                    required: true,
                    message: CREATE_PROGRAM_FORM_FIELDS.school.errorMsg,
                  },
                ]}
              >
                <Select
                  options={schools.map((i) => ({
                    value: i._id,
                    label: i.name,
                  }))}
                />
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

export default EditProgramView;
