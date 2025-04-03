import { Alert } from "@mantine/core";

interface ErrorTextProps {
  text: string;
}

const ErrorText = ({ text }: ErrorTextProps) => {
  return <Alert variant="light" color="red" title={text} mt={"xs"}></Alert>;
};

export default ErrorText;
