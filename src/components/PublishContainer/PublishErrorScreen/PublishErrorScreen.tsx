import React, { FunctionComponent } from "react";
import { useConfigContext } from "../../../common/context/config";
import { useFormsContext } from "../../../common/context/forms";
import { Container } from "../../Container";
import { ProgressBar } from "../../ProgressBar";
import { Button } from "../../UI/Button";
import { SvgIcon, SvgIconCheckCircle, SvgIconDownload, SvgIconXCircle } from "../../UI/SvgIcon";
import { Title } from "../../UI/Title";

interface PublishErrorScreen {
  error?: Error;
}

export const PublishErrorScreen: FunctionComponent<PublishErrorScreen> = ({ error }) => {
  const { setConfig } = useConfigContext();
  const { setForms, setActiveFormIndex } = useFormsContext();

  const onDone = (): void => {
    setForms([]);
    setActiveFormIndex(undefined);
    setConfig(undefined);
  };

  return (
    <Container>
      <div className="container mx-auto pt-8">
        <ProgressBar step={3} />
        <div className="flex justify-between items-end">
          <Title className="flex items-center mb-8">
            <SvgIcon className="mr-2 text-teal">
              <SvgIconCheckCircle />
            </SvgIcon>
            Document(s) failed to issue
          </Title>
          <Button
            className="bg-orange text-white self-end py-3 px-4 mb-6"
            data-testid="form-logout-button"
            onClick={onDone}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="bg-lightgrey-lighter p-6 h-screen">
        <div className="container mx-auto">
          <div className="bg-red-lighter p-3 flex flex-col">
            <div className="flex">
              <SvgIcon className="text-red">
                <SvgIconXCircle />
              </SvgIcon>
              <div className="flex flex-col flex-grow">
                <div className="text-red ml-2 flex-grow">Failed to publish due to:</div>
                <div className="text-red ml-2 flex-grow">- {error?.message}</div>
                <div className="text-red ml-2 flex-grow">
                  Kindly rectify and try publishing again.
                </div>
              </div>
              <Button className="bg-white text-red px-4 py-3 h-12">
                <a
                  download="error_log.txt"
                  href={`data:text/plain;charset=UTF-8,${JSON.stringify(error, null, 2)}`}
                >
                  <div className="flex">
                    <SvgIcon>
                      <SvgIconDownload />
                    </SvgIcon>
                    <div className="text-red ml-2">Download Error Log</div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};