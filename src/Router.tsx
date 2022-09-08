import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { useConfigContext } from "./common/context/config";
import { useFormsContext } from "./common/context/forms";
import { usePersistedConfigFile } from "./common/hook/usePersistedConfigFile";
import { NavigationBar } from "./components/NavigationBar";
import { FooterBar } from "./components/FooterBar";
import { routes, Routes } from "./routes";

export const Router = (): ReactElement => {
  const { configFile } = usePersistedConfigFile();
  const { setConfig, config } = useConfigContext();
  const { setForms, setActiveFormIndex } = useFormsContext();

  const logout = (): void => {
    setForms([]);
    setActiveFormIndex(undefined);
    setConfig(undefined);
  };

  return (
    <>
      <NetworkBar network={configFile?.network}>
        You are currently on <span className="capitalize">{configFile?.network}</span> network. To change it, please
        upload a new config file.
      </NetworkBar>
      <BrowserRouter>
        <main className="bg-cerulean-50 bg-cover" style={{ backgroundImage: "url(/wave-lines.png)" }}>
          <NavigationBar logout={config ? logout : undefined} />
          <Routes routes={routes} />
        </main>
        <FooterBar />
      </BrowserRouter>
      <Overlay />
    </>
  );
};
