/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { Router } from "./routes/index";

const container = document.getElementById("root");
const root = createRoot(container!);
const materialTheme = materialExtendTheme();

root.render(
  <StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <SnackbarProvider>
          <CssBaseline />
          <StoreProvider>
            <Router />
          </StoreProvider>
        </SnackbarProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
