import { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  Upload,
  Button,
  message,
  Modal,
  Radio,
  Checkbox,
  Divider,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;
`;

const Preview = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
  height: 500px;

  iframe {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    height: 400px;
    max-width: 100%;
  }
`;

const StyledTitle = styled(Title)`
  margin: 0;
`;

const mainOptions = [
  { label: "אומדן", value: "basic" },
  { label: "חשבון", value: "simple" },
  { label: "כמויות", value: "calculated" },
  { label: "הזמנת חומרים", value: "order_material" },
  { label: "*", value: "custom" },
];

const elementOptions = [
  { label: "ריצוף", value: "01" },
  ...Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i}`,
    value: i.toString(),
  })),
];

const additionalOptions = Array.from({ length: 5 }, (_, i) => ({
  label: `Option ${i}`,
  value: i.toString(),
}));

const ConstructionQuantityExtractor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMainOption, setSelectedMainOption] =
    useState<string>("custom");
  const [selectedElementOptions, setElementOptions] = useState<string[]>([]);
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState<
    string[]
  >([]);
  const [freeText, setFreeText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any>(null);

  const handleBeforeUpload = (file: File) => {
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are supported.");
      return false;
    }
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    return false;
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("main_option", selectedMainOption);
    formData.append("element_options", JSON.stringify(selectedElementOptions));
    formData.append(
      "additional_options",
      JSON.stringify(selectedAdditionalOptions),
    );
    formData.append("free_text", freeText);

    try {
      setLoading(true);
      const res = await fetch("https://buil-server.onrender.com/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const json = await res.json();
      setTableData(json);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      message.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };
  //
  // const columns =
  //   tableData?.columns?.map((col: string, index: number) => ({
  //     title: col,
  //     dataIndex: `col_${index}`,
  //     key: `col_${index}`,
  //   })) || [];
  //
  // const dataSource =
  //   tableData?.rows?.map((row: string[], rowIndex: number) => {
  //     const rowObj: any = { key: rowIndex };
  //     row.forEach((cell, cellIndex) => {
  //       rowObj[`col_${cellIndex}`] = cell;
  //     });
  //     return rowObj;
  //   }) || [];
  console.log({ tableData });
  return (
    <UploadSection>
      <Box>
        <StyledTitle level={4}>מטרת השימוש:</StyledTitle>
        <Radio.Group
          options={mainOptions}
          value={selectedMainOption}
          onChange={(e) => setSelectedMainOption(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        />
      </Box>

      <Divider />

      {selectedMainOption === "custom" ? (
        <Input.TextArea
          showCount
          maxLength={250}
          onChange={({ target: { value } }) => setFreeText(value)}
          placeholder="Custom question for AI"
          style={{ height: 120, width: 500, resize: "none" }}
        />
      ) : (
        <>
          <Box>
            <StyledTitle level={4}>בחירת אלמנטים מהתוכנית:</StyledTitle>
            <Checkbox.Group
              options={elementOptions}
              value={selectedElementOptions}
              onChange={(list) => setElementOptions(list as string[])}
            />
          </Box>

          <Divider />

          <Box>
            <StyledTitle level={4}>הגדרות נוספות:</StyledTitle>
            <Checkbox.Group
              options={additionalOptions}
              value={selectedAdditionalOptions}
              onChange={(list) =>
                setSelectedAdditionalOptions(list as string[])
              }
            />
          </Box>
        </>
      )}

      <Divider />

      <Box>
        <StyledTitle level={3}>Upload a PDF File</StyledTitle>
        <Upload
          beforeUpload={handleBeforeUpload}
          showUploadList={false}
          accept="application/pdf"
        >
          <Button icon={<UploadOutlined />}>Select PDF</Button>
        </Upload>

        {previewUrl && (
          <Preview>
            <iframe title="PDF Preview" src={previewUrl} />
          </Preview>
        )}
      </Box>

      <Divider />

      <Box>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={!file}
          loading={loading}
        >
          Upload to Server
        </Button>
      </Box>

      <Modal
        title="טבלת כמויות"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="80%"
      >
        <pre style={{ whiteSpace: "normal" }}>
          {JSON.stringify(tableData, null, 2)}
        </pre>
      </Modal>
    </UploadSection>
  );
};

export default ConstructionQuantityExtractor;
